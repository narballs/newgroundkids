# scripts/ship.ps1
# Smart ship script with Claude Code auto-fix for TypeScript, ESLint, and Build errors
# Usage: pnpm ship [-Message "commit message"] [-SkipTests] [-Force] [-MaxRetries 3] [-NoAutoFix] [-CheckOnly] [-AllowMain]

param(
    [string]$Message = "",
    [string]$FeatureName = "",
    [switch]$SkipTests = $false,
    [switch]$Force = $false,
    [int]$MaxRetries = 3,
    [switch]$NoAutoFix = $false,
    [switch]$CheckOnly = $false,
    [switch]$AllowMain = $true  # Default true for dev mode - change to $false when ready for PR workflow
)

# Navigate to project root (relative to script location)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Join-Path $scriptDir ".."
Set-Location $projectRoot

$ErrorActionPreference = "Continue"
$ErrorLogFile = ".ship-errors.log"
$RunningOnWindows = $env:OS -match "Windows"

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

function Write-Status {
    param([string]$Text, [string]$Status = "INFO")
    $colors = @{
        "OK"      = "Green"
        "WARN"    = "Yellow"
        "ERROR"   = "Red"
        "INFO"    = "Cyan"
        "STEP"    = "Blue"
        "SUCCESS" = "Green"
        "RETRY"   = "Magenta"
        "AI"      = "DarkCyan"
    }
    $color = if ($colors.ContainsKey($Status)) { $colors[$Status] } else { "White" }
    Write-Host $Text -ForegroundColor $color
}

function ConvertTo-BranchSlug {
    param([string]$Text)
    if (-not $Text) { return "update" }
    $slug = $Text.Trim().ToLower()
    $slug = $slug -replace '[^a-z0-9]+', '-'
    $slug = $slug.Trim('-')
    if (-not $slug) { return "update" }
    return $slug
}

function Test-LocalBranchExists {
    param([string]$BranchName)
    if (-not $BranchName) { return $false }
    git show-ref --verify --quiet "refs/heads/$BranchName" 2>&1 | Out-Null
    return $LASTEXITCODE -eq 0
}

function Get-UniqueBranchName {
    param([string]$BaseBranchName)
    if (-not $BaseBranchName) { return "" }
    $candidate = $BaseBranchName
    $counter = 2
    while (Test-LocalBranchExists $candidate) {
        $candidate = "$BaseBranchName-$counter"
        $counter++
    }
    return $candidate
}

function Test-ClaudeCodeAvailable {
    $claudeCmd = Get-Command claude -ErrorAction SilentlyContinue
    return $null -ne $claudeCmd
}

function Ensure-ClaudeGitBashPath {
    if (-not $RunningOnWindows) { return }

    # Respect existing configuration if valid
    if ($env:CLAUDE_CODE_GIT_BASH_PATH -and (Test-Path $env:CLAUDE_CODE_GIT_BASH_PATH)) {
        Write-Status "[AI] Using CLAUDE_CODE_GIT_BASH_PATH=$($env:CLAUDE_CODE_GIT_BASH_PATH)" "AI"
        return
    }

    # Try to derive bash.exe from Git installation path by walking up parent dirs
    $gitCmd = Get-Command git -ErrorAction SilentlyContinue
    if ($gitCmd) {
        $gitPath = $gitCmd.Source
        # Walk up parent directories looking for one that contains bin\bash.exe
        $current = Split-Path $gitPath
        for ($i = 0; $i -lt 5; $i++) {
            if (-not $current -or $current.Length -lt 4) { break }
            $candidateBash = Join-Path $current "bin\bash.exe"
            if (Test-Path $candidateBash) {
                $env:CLAUDE_CODE_GIT_BASH_PATH = $candidateBash
                Write-Status "[AI] Auto-configured CLAUDE_CODE_GIT_BASH_PATH to '$candidateBash'" "AI"
                return
            }
            $current = Split-Path $current
        }
    }

    # Fallback: try common install paths (C: and D: drives)
    $candidatePaths = @(
        "$env:ProgramFiles\Git\bin\bash.exe",
        "${env:ProgramFiles(x86)}\Git\bin\bash.exe",
        "C:\Program Files\Git\bin\bash.exe",
        "C:\Program Files (x86)\Git\bin\bash.exe",
        "D:\Program Files\Git\bin\bash.exe",
        "D:\Program Files (x86)\Git\bin\bash.exe"
    ) | Where-Object { $_ -and (Test-Path $_) }

    if ($candidatePaths.Count -gt 0) {
        $resolved = $candidatePaths[0]
        $env:CLAUDE_CODE_GIT_BASH_PATH = $resolved
        Write-Status "[AI] Auto-configured CLAUDE_CODE_GIT_BASH_PATH to '$resolved'" "AI"
        return
    }

    Write-Status "[WARN] Git Bash not found. Install from https://git-scm.com/downloads/win or set CLAUDE_CODE_GIT_BASH_PATH to your bash.exe" "WARN"
}

function Get-AiBranchSlug {
    # Use Claude to suggest a branch slug based on changed files
    if (-not (Test-ClaudeCodeAvailable)) {
        return $null
    }
    
    Write-Status "[AI] Analyzing changes to suggest branch name..." "AI"
    
    $diffStat = git diff --stat HEAD 2>&1
    if (-not $diffStat) {
        $diffStat = git status --short 2>&1
    }
    
    $promptLines = @(
        "Based on these changed files, suggest a SHORT branch slug (2-4 words, kebab-case, no prefix).",
        "Reply with ONLY the slug, nothing else. Example: superadmin-verify-column",
        "",
        "Changed files:",
        $diffStat
    )
    $prompt = $promptLines -join "`n"
    
    $tempPromptFile = Join-Path $env:TEMP "ship-slug-prompt.txt"
    [System.IO.File]::WriteAllText($tempPromptFile, $prompt)
    
    try {
        $slugOutput = Get-Content $tempPromptFile | claude --print 2>&1
        $slug = ($slugOutput | Select-Object -First 1).ToString().Trim()
        # Clean up the slug
        $slug = $slug -replace '[^a-z0-9\-]', ''
        $slug = $slug.Trim('-')
        if ($slug -and $slug.Length -ge 3 -and $slug.Length -le 50) {
            return $slug
        }
    }
    catch {
        # AI failed, return null
    }
    finally {
        if (Test-Path $tempPromptFile) {
            Remove-Item $tempPromptFile -Force -ErrorAction SilentlyContinue
        }
    }
    
    return $null
}

function Get-GitHubRepoSlug {
    # Extract owner/repo from git remote origin
    $remoteUrl = git remote get-url origin 2>&1
    if ($LASTEXITCODE -ne 0) { return $null }
    
    # Handle SSH format: git@github.com:owner/repo.git
    if ($remoteUrl -match "git@github\.com:([^/]+)/(.+?)(\.git)?$") {
        return "$($Matches[1])/$($Matches[2])"
    }
    # Handle HTTPS format: https://github.com/owner/repo.git
    if ($remoteUrl -match "github\.com/([^/]+)/(.+?)(\.git)?$") {
        return "$($Matches[1])/$($Matches[2])"
    }
    
    return $null
}

function Test-GitHubCliAvailable {
    $ghCmd = Get-Command gh -ErrorAction SilentlyContinue
    return $null -ne $ghCmd
}

function Get-ExistingPrForBranch {
    param([string]$BranchName)
    
    if (-not (Test-GitHubCliAvailable)) { return $null }
    
    # Check if a PR already exists for this branch
    $prList = gh pr list --head $BranchName --state open --json number,url 2>&1
    if ($LASTEXITCODE -ne 0) { return $null }
    
    # Parse JSON output
    try {
        $prs = $prList | ConvertFrom-Json
        if ($prs -and $prs.Count -gt 0) {
            return $prs[0]
        }
    }
    catch {
        return $null
    }
    
    return $null
}

function New-PullRequest {
    param(
        [string]$BranchName,
        [string]$Title
    )
    
    if (-not (Test-GitHubCliAvailable)) { return $null }
    
    # Create PR using GitHub CLI
    $prOutput = gh pr create --head $BranchName --base main --title $Title --body "Auto-created by ship script" 2>&1
    if ($LASTEXITCODE -eq 0) {
        # Extract URL from output (last line is usually the URL)
        $prUrl = ($prOutput | Select-Object -Last 1).ToString().Trim()
        if ($prUrl -match "^https://") {
            return $prUrl
        }
    }
    
    return $null
}

function Invoke-ClaudeCodeFix {
    param(
        [string]$ErrorType,
        [string]$ErrorOutput,
        [int]$Attempt
    )
    
    Write-Status "[AI] Invoking Claude Code to fix $ErrorType errors (attempt $Attempt)..." "AI"
    Write-Host ""
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor DarkCyan
    Write-Host "  |  CLAUDE CODE - Live Output                                |" -ForegroundColor DarkCyan
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor DarkCyan
    Write-Host ""
    
    # Build the prompt (avoiding here-string issues)
    $promptLines = @(
        "Fix the following $ErrorType errors in this codebase. Only fix what is broken - do not refactor or change anything else.",
        "",
        "ERRORS:",
        $ErrorOutput,
        "",
        "Instructions:",
        "- Read the affected files",
        "- Fix ONLY the reported errors",
        "- Do not add new features or refactor code",
        "- Maintain existing code style",
        "- After fixing, the $ErrorType check should pass"
    )
    $prompt = $promptLines -join "`n"
    
    $aiStart = Get-Date
    
    # Write prompt to temp file (handles long prompts and special chars)
    $tempPromptFile = Join-Path $env:TEMP "ship-claude-prompt.txt"
    [System.IO.File]::WriteAllText($tempPromptFile, $prompt)
    
    try {
        # Run Claude with prompt from stdin
        # The --dangerously-skip-permissions auto-accepts changes
        Write-Host ""
        Write-Host "  >>> Watch the CLAUDE CODE WINDOW for live activity <<<" -ForegroundColor Yellow
        Write-Host "  (Terminal output is minimal - Claude works in its own UI)" -ForegroundColor DarkGray
        Write-Host ""
        
        Get-Content $tempPromptFile | claude --dangerously-skip-permissions
        $exitCode = $LASTEXITCODE
    }
    catch {
        Write-Status "[AI] Claude Code error: $_" "ERROR"
        return $false
    }
    finally {
        if (Test-Path $tempPromptFile) {
            Remove-Item $tempPromptFile -Force -ErrorAction SilentlyContinue
        }
    }
    
    Write-Host ""
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor DarkCyan
    Write-Host ""
    
    $aiTime = [int]((Get-Date) - $aiStart).TotalSeconds
    
    if ($exitCode -eq 0) {
        Write-Status "[AI] Claude Code completed fixes in ${aiTime}s" "AI"
        return $true
    } else {
        Write-Status "[AI] Claude Code returned exit code: $exitCode" "WARN"
        return $false
    }
}

function Analyze-BuildOutput {
    param([string]$Output)
    
    $issues = @()
    
    if ($Output -match "Module parse failed|Error compiling") {
        $issues += "Compilation error detected"
    }
    if ($Output -match "Failed to load|Cannot find module") {
        $issues += "Missing dependency detected"
    }
    if ($Output -match "out of memory|ENOMEM") {
        $issues += "Out of memory - try closing other applications"
    }
    
    return $issues
}

function Show-Summary {
    param($Results)
    
    Write-Host ""
    Write-Status "=========================================" "INFO"
    Write-Status "         SHIP EXECUTION SUMMARY          " "INFO"
    Write-Status "=========================================" "INFO"
    
    $Results.GetEnumerator() | ForEach-Object {
        $step = $_.Key
        $result = $_.Value
        
        if ($result.Success) {
            Write-Status "  [OK] $step" "SUCCESS"
        }
        elseif ($result.HasWarnings -and -not $result.HasErrors) {
            Write-Status "  [WARN] $step (warnings only)" "WARN"
        }
        else {
            Write-Status "  [FAIL] $step" "ERROR"
            if ($result.Issues) {
                $result.Issues | ForEach-Object { Write-Status "      $_" "ERROR" }
            }
        }
    }
    
    Write-Status "=========================================" "INFO"
    Write-Host ""
}

# ============================================================================
# MAIN FLOW
# ============================================================================

# Get current branch first for header
$branch = git rev-parse --abbrev-ref HEAD 2>&1

Write-Status "=========================================" "INFO"
Write-Status "  PPC Ad Editor Website Ship (v4.0)    " "INFO"
Write-Status "     Claude Code Auto-Fix Enabled       " "INFO"
Write-Status "=========================================" "INFO"
Write-Host ""
Write-Status ">>> BRANCH: $branch <<<" "STEP"

# Ensure Git Bash path for Claude on Windows (self-healing for CLI requirement)
Ensure-ClaudeGitBashPath

# Check if Claude Code is available
$claudeAvailable = Test-ClaudeCodeAvailable
if ($claudeAvailable -and -not $NoAutoFix) {
    Write-Status ">>> CLAUDE CODE: Available (auto-fix enabled) <<<" "AI"
} elseif ($NoAutoFix) {
    Write-Status ">>> CLAUDE CODE: Disabled via -NoAutoFix <<<" "WARN"
} else {
    Write-Status ">>> CLAUDE CODE: Not installed (manual fix required) <<<" "WARN"
}
Write-Status ">>> MAX RETRIES: $MaxRetries <<<" "INFO"
if ($CheckOnly) {
    Write-Status ">>> MODE: Check Only (no git operations) <<<" "WARN"
}
Write-Host ""

# Initialize results tracking
$allResults = @{}
$aiFixesApplied = $false  # Track if Claude Code made any fixes

# Check for changes (but don't exit - always run validation)
$changes = git status --porcelain 2>&1
$hasChanges = $null -ne $changes -and $changes.Count -gt 0

if ($hasChanges) {
    Write-Status "[INFO] Found $(($changes | Measure-Object).Count) changed files" "INFO"
} else {
    Write-Status "[INFO] No uncommitted changes - running validation only" "INFO"
}
Write-Host ""

# ============================================================================
# MAIN BRANCH GUARDRAIL (prompt BEFORE validation)
# ============================================================================

if ($branch -eq "main" -and $hasChanges -and -not $AllowMain -and -not $CheckOnly) {
    Write-Host ""
    Write-Status "[WARN] You are on 'main' with uncommitted changes." "WARN"
    Write-Status "[WARN] Recommended: create a feature/fix branch first (Preview-first workflow)." "WARN"
    Write-Host ""
    Write-Host "  Choose an option:" -ForegroundColor Yellow
    Write-Host "    [1] Create feature/* branch and continue (recommended)" -ForegroundColor Gray
    Write-Host "    [2] Create fix/* branch and continue" -ForegroundColor Gray
    Write-Host "    [3] Continue on main (NOT recommended)" -ForegroundColor Gray
    Write-Host "    [4] Abort" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Enter choice (1/2/3/4): " -ForegroundColor Cyan -NoNewline
    $branchChoice = Read-Host

    if ($branchChoice -eq "4") {
        Write-Status "[ABORT] Exiting without changes." "WARN"
        exit 0
    }

    if ($branchChoice -eq "3") {
        Write-Host ""
        Write-Status "[WARN] Continuing on main can push directly to 'main'." "WARN"
        Write-Host "  Type 'main' to confirm: " -ForegroundColor Yellow -NoNewline
        $confirmMain = Read-Host
        if ($confirmMain -ne "main") {
            Write-Status "[ABORT] Did not confirm. Exiting." "WARN"
            exit 0
        }
    }
    elseif ($branchChoice -eq "1" -or $branchChoice -eq "2") {
        $prefix = if ($branchChoice -eq "2") { "fix" } else { "feature" }
        
        # Try AI-generated slug first, then fallback
        $aiSlug = Get-AiBranchSlug
        $suggested = if ($FeatureName) { ConvertTo-BranchSlug $FeatureName } elseif ($aiSlug) { $aiSlug } else { "ship-update" }

        Write-Host ""
        if ($aiSlug) {
            Write-Status "[AI] Suggested branch name: $aiSlug" "AI"
        }
        Write-Host "  Press Enter to use: $suggested" -ForegroundColor Gray
        Write-Host "  Or type a different slug: " -ForegroundColor Cyan -NoNewline
        $slugInput = Read-Host
        if (-not $slugInput) { $slugInput = $suggested }
        $slug = ConvertTo-BranchSlug $slugInput

        $baseBranch = "$prefix/$slug"
        $newBranch = Get-UniqueBranchName $baseBranch

        Write-Host ""
        Write-Status "[Git] Creating branch '$newBranch' from main..." "STEP"
        git checkout -b $newBranch 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Status "[FAIL] Could not create branch '$newBranch'." "ERROR"
            Write-Status "       Fix and retry: git checkout -b $newBranch" "INFO"
            exit 1
        }

        $branch = $newBranch
        Write-Status "[OK] Switched to branch: $branch" "OK"
        Write-Host ""
    }
    else {
        Write-Status "[ABORT] Invalid choice. Exiting." "WARN"
        exit 0
    }
}

# ============================================================================
# STEP 0: Smart Sync with remote (auto-merge/rebase before push)
# ============================================================================
# For feature/fix branches: merges origin/main with -X ours (your changes win)
# For main branch: rebases local commits on top of origin/main
# This prevents push failures when remote has new commits (e.g., merged PRs)

$isFeatureBranch = $branch -match "^(feature|fix)/"
$isMainBranch = $branch -eq "main"

if (-not $CheckOnly) {
    Write-Host ""
    
    if ($isFeatureBranch) {
        # Feature branch: sync with origin/main
        Write-Status "[Git] Syncing feature branch with main..." "STEP"
        
        git fetch origin main 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Status "[WARN] Could not fetch origin/main - continuing anyway" "WARN"
        } else {
            $behindCount = git rev-list --count "HEAD..origin/main" 2>&1
            $behindCountInt = 0
            if ($behindCount -match '^\d+$') {
                $behindCountInt = [int]$behindCount
            }
            
            if ($behindCountInt -gt 0) {
                Write-Status "[Git] Branch is $behindCountInt commit(s) behind main - merging..." "INFO"
                
                # -X ours means "on conflict, prefer OUR (current branch) version"
                $mergeOutput = git merge origin/main -X ours --no-edit 2>&1
                $mergeExitCode = $LASTEXITCODE
                $mergeOutputStr = $mergeOutput -join "`n"
                
                if ($mergeExitCode -eq 0) {
                    if ($mergeOutputStr -match "Auto-merging|CONFLICT") {
                        Write-Status "[Git] Conflicts auto-resolved (your changes kept)" "WARN"
                        Write-Host "  Files merged:" -ForegroundColor Yellow
                        $mergeOutput | Where-Object { $_.ToString() -match "Auto-merging" } | ForEach-Object {
                            Write-Host "    $_" -ForegroundColor Gray
                        }
                    }
                    
                    if ($mergeOutputStr -match "package\.json") {
                        Write-Status "[Git] package.json changed - regenerating pnpm-lock.yaml..." "INFO"
                        $pnpmOutput = pnpm install 2>&1
                        if ($LASTEXITCODE -eq 0) {
                            git add pnpm-lock.yaml 2>&1 | Out-Null
                            git commit --amend --no-edit 2>&1 | Out-Null
                            Write-Status "[OK] Lock file regenerated and included in merge" "OK"
                        } else {
                            Write-Status "[WARN] pnpm install had issues - check manually" "WARN"
                        }
                    }
                    
                    Write-Status "[OK] Merged with main successfully" "OK"
                } else {
                    Write-Status "[FAIL] Merge failed - manual resolution needed" "ERROR"
                    Write-Host ""
                    Write-Host "  The merge could not complete. This is unusual with -X ours strategy." -ForegroundColor Red
                    Write-Host "  To abort and retry manually:" -ForegroundColor Yellow
                    Write-Host "    git merge --abort" -ForegroundColor Gray
                    Write-Host ""
                    git merge --abort 2>&1 | Out-Null
                    exit 1
                }
            } else {
                Write-Status "[OK] Already up to date with main" "OK"
            }
        }
    }
    elseif ($isMainBranch) {
        # Main branch: fetch and rebase to incorporate any remote changes (e.g., merged PRs)
        Write-Status "[Git] Syncing main with origin/main..." "STEP"
        
        git fetch origin main 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Status "[WARN] Could not fetch origin/main - continuing anyway" "WARN"
        } else {
            $behindCount = git rev-list --count "HEAD..origin/main" 2>&1
            $behindCountInt = 0
            if ($behindCount -match '^\d+$') {
                $behindCountInt = [int]$behindCount
            }
            
            if ($behindCountInt -gt 0) {
                Write-Status "[Git] Local main is $behindCountInt commit(s) behind origin - pulling..." "INFO"
                
                # Stash any uncommitted changes first
                $hasUncommitted = git status --porcelain 2>&1
                $didStash = $false
                if ($hasUncommitted) {
                    Write-Status "[Git] Stashing uncommitted changes..." "INFO"
                    git stash push -m "ship-auto-stash" --include-untracked 2>&1 | Out-Null
                    if ($LASTEXITCODE -eq 0) {
                        $didStash = $true
                    }
                }
                
                # Pull with rebase to keep history clean
                $pullOutput = git pull --rebase origin main 2>&1
                $pullExitCode = $LASTEXITCODE
                
                if ($pullExitCode -eq 0) {
                    Write-Status "[OK] Synced with origin/main" "OK"
                    
                    # Restore stashed changes
                    if ($didStash) {
                        Write-Status "[Git] Restoring stashed changes..." "INFO"
                        $stashPopOutput = git stash pop 2>&1
                        if ($LASTEXITCODE -ne 0) {
                            # Stash pop had conflicts
                            Write-Status "[WARN] Stash restore had conflicts - resolving with your changes..." "WARN"
                            # Get list of conflicted files and keep ours
                            $conflictFiles = git diff --name-only --diff-filter=U 2>&1
                            if ($conflictFiles) {
                                $conflictFiles | ForEach-Object {
                                    git checkout --theirs $_ 2>&1 | Out-Null
                                    git add $_ 2>&1 | Out-Null
                                }
                            }
                            git stash drop 2>&1 | Out-Null
                            Write-Status "[OK] Conflicts resolved (your changes kept)" "OK"
                        }
                    }
                } else {
                    # Rebase failed - abort and warn
                    Write-Status "[FAIL] Could not sync with origin/main" "ERROR"
                    git rebase --abort 2>&1 | Out-Null
                    
                    if ($didStash) {
                        git stash pop 2>&1 | Out-Null
                    }
                    
                    Write-Host ""
                    Write-Host "  Remote main has changes that conflict with your local commits." -ForegroundColor Red
                    Write-Host "  Manual resolution needed:" -ForegroundColor Yellow
                    Write-Host "    1. git pull --rebase origin main" -ForegroundColor Gray
                    Write-Host "    2. Resolve conflicts" -ForegroundColor Gray
                    Write-Host "    3. git rebase --continue" -ForegroundColor Gray
                    Write-Host "    4. pnpm ship" -ForegroundColor Gray
                    Write-Host ""
                    exit 1
                }
            } else {
                Write-Status "[OK] Already up to date with origin/main" "OK"
            }
        }
    }
    
    Write-Host ""
}

# ============================================================================
# STEP 0.5: Environment Parity Check (match CI environment)
# ============================================================================

Write-Status "[Environment] Checking pnpm/Node version parity with CI..." "STEP"

# Check pnpm version matches packageManager in package.json
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$expectedPnpm = if ($packageJson.packageManager -match "pnpm@([\d.]+)") { $Matches[1] } else { $null }
$actualPnpm = (pnpm --version 2>&1).ToString().Trim()

if ($expectedPnpm -and $actualPnpm -ne $expectedPnpm) {
    Write-Status "[WARN] pnpm version mismatch: local=$actualPnpm, expected=$expectedPnpm" "WARN"
    Write-Host "  CI uses pnpm@$expectedPnpm. Consider: corepack enable && corepack prepare pnpm@$expectedPnpm --activate" -ForegroundColor Yellow
} else {
    Write-Status "[OK] pnpm version: $actualPnpm" "OK"
}

# Check Node version (CI uses v20)
$nodeVersion = (node --version 2>&1).ToString().Trim()
$nodeMajor = if ($nodeVersion -match "v(\d+)") { [int]$Matches[1] } else { 0 }
$ciNodeMajor = 22

if ($nodeMajor -ne $ciNodeMajor) {
    Write-Status "[WARN] Node version mismatch: local=$nodeVersion, CI=v$ciNodeMajor" "WARN"
} else {
    Write-Status "[OK] Node version: $nodeVersion" "OK"
}
Write-Host ""

# ============================================================================
# STEP 0.6: Lockfile Validation (catch config mismatches before CI fails)
# ============================================================================

Write-Status "[Lockfile] Validating pnpm lockfile (simulating CI --frozen-lockfile)..." "STEP"
$lockfileOutput = pnpm install --frozen-lockfile 2>&1
$lockfileExitCode = $LASTEXITCODE

if ($lockfileExitCode -ne 0) {
    $lockfileOutputStr = $lockfileOutput -join "`n"
    
    if ($lockfileOutputStr -match "LOCKFILE_CONFIG_MISMATCH|ERR_PNPM_LOCKFILE|OUTDATED_LOCKFILE") {
        Write-Status "[FAIL] Lockfile out of sync with package.json" "ERROR"
        Write-Host ""
        Write-Host "  CI will fail with --frozen-lockfile. Auto-fixing..." -ForegroundColor Yellow
        Write-Host ""
        
        # Auto-fix: regenerate lockfile
        Write-Status "[Lockfile] Regenerating lockfile..." "INFO"
        $regenerateOutput = pnpm install 2>&1
        $regenerateExitCode = $LASTEXITCODE
        
        if ($regenerateExitCode -eq 0) {
            Write-Status "[OK] Lockfile regenerated successfully" "OK"
            
            # Check if lockfile actually changed
            $lockfileChanged = git diff --name-only pnpm-lock.yaml 2>&1
            if ($lockfileChanged) {
                git add pnpm-lock.yaml 2>&1 | Out-Null
                Write-Status "[OK] pnpm-lock.yaml staged for commit" "OK"
                
                # Also check if package.json changed (dependency added/removed)
                $packageJsonChanged = git diff --name-only package.json 2>&1
                if ($packageJsonChanged) {
                    git add package.json 2>&1 | Out-Null
                    Write-Status "[OK] package.json also staged" "OK"
                }
            } else {
                Write-Status "[INFO] Lockfile unchanged after regeneration" "INFO"
            }
        } else {
            Write-Status "[FAIL] Could not regenerate lockfile" "ERROR"
            Write-Host ""
            $regenerateOutput | ForEach-Object {
                $line = $_.ToString()
                if ($line -match "ERR|error|Error|WARN") {
                    Write-Host "  $line" -ForegroundColor Red
                }
            }
            Write-Host ""
            Write-Status "Manual fix: pnpm install" "INFO"
            exit 1
        }
    } elseif ($lockfileOutputStr -match "ERR_PNPM_NO_LOCKFILE") {
        Write-Status "[WARN] No lockfile found - generating..." "WARN"
        pnpm install 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            git add pnpm-lock.yaml 2>&1 | Out-Null
            Write-Status "[OK] Lockfile generated and staged" "OK"
        }
    } else {
        # Other pnpm install error - network, missing packages, etc.
        Write-Status "[WARN] pnpm install had issues" "WARN"
        $lockfileOutput | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "ERR|error|Error") {
                Write-Status "   $line" "WARN"
            }
        }
        # Don't exit - let other checks run and potentially fail more clearly
    }
} else {
    Write-Status "[OK] Lockfile in sync with package.json" "OK"
}
Write-Host ""

# ============================================================================
# STEP 1: TypeScript Check (with auto-fix loop)
# ============================================================================

$tsAttempt = 0
$tsPassed = $false

while (-not $tsPassed -and $tsAttempt -lt $MaxRetries) {
    $tsAttempt++
    
    if ($tsAttempt -gt 1) {
        Write-Status "[TypeScript] Retry attempt $tsAttempt of $MaxRetries..." "RETRY"
    } else {
        Write-Status "[TypeScript] Checking types..." "STEP"
    }
    
    $tsStart = Get-Date
    $tsEstimate = 30
    $tsJob = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        $output = pnpm tsc --noEmit 2>&1
        @{
            Output = $output
            ExitCode = $LASTEXITCODE
        }
    }
    
    $lastUpdate = -10
    while ($tsJob.State -eq 'Running') {
        $elapsed = [int]((Get-Date) - $tsStart).TotalSeconds
        # Print progress every 10 seconds
        if ($elapsed -ge ($lastUpdate + 10)) {
            $lastUpdate = $elapsed
            $remaining = [math]::Max(0, $tsEstimate - $elapsed)
            Write-Host "  Checking types... ${remaining}s remaining" -ForegroundColor Gray
        }
        Start-Sleep -Milliseconds 500
    }
    
    $tsResult = Receive-Job -Job $tsJob
    Remove-Job -Job $tsJob
    $tsOutput = $tsResult.Output
    $tsExitCode = $tsResult.ExitCode
    
    # Analyze output
    $tsIssues = @()
    $tsOutputStr = $tsOutput -join "`n"
    $tsOutput | ForEach-Object {
        $line = $_.ToString()
        if ($line -match "error TS") {
            $tsIssues += $line
        }
    }
    
    if ($tsExitCode -eq 0 -and $tsIssues.Count -eq 0) {
        $tsPassed = $true
        Write-Status "[OK] TypeScript: All types correct" "OK"
    }
    else {
        Write-Status "[FAIL] TypeScript: $($tsIssues.Count) errors found" "ERROR"
        
        # Try auto-fix with Claude Code
        if ($claudeAvailable -and -not $NoAutoFix -and $tsAttempt -lt $MaxRetries) {
            $fixed = Invoke-ClaudeCodeFix -ErrorType "TypeScript" -ErrorOutput $tsOutputStr -Attempt $tsAttempt
            if ($fixed) {
                $aiFixesApplied = $true
            } else {
                Write-Status "[AI] Auto-fix unsuccessful, will retry..." "WARN"
            }
        }
        elseif ($tsAttempt -ge $MaxRetries) {
            Write-Status "[FAIL] Max retries reached for TypeScript" "ERROR"
            $tsIssues | ForEach-Object { Write-Status "   $_" "ERROR" }
        }
    }
}

$allResults["TypeScript"] = @{
    Success = $tsPassed
    HasWarnings = $false
    HasErrors = -not $tsPassed
    Issues = $tsIssues
}

if (-not $tsPassed -and -not $Force) {
    Write-Status "Cannot continue - TypeScript errors remain after $MaxRetries attempts" "ERROR"
    Show-Summary $allResults
    exit 1
}

# ============================================================================
# STEP 2: ESLint Check (with auto-fix loop)
# ============================================================================

$lintAttempt = 0
$lintPassed = $false

while (-not $lintPassed -and $lintAttempt -lt $MaxRetries) {
    $lintAttempt++
    
    if ($lintAttempt -gt 1) {
        Write-Status "[ESLint] Retry attempt $lintAttempt of $MaxRetries..." "RETRY"
    } else {
        Write-Status "[ESLint] Running lint --fix..." "STEP"
    }
    
    $lintStart = Get-Date
    $lintEstimate = 20
    $lintJob = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        $output = pnpm lint --fix 2>&1
        @{
            Output = $output
            ExitCode = $LASTEXITCODE
        }
    }
    
    $lastUpdate = -10
    while ($lintJob.State -eq 'Running') {
        $elapsed = [int]((Get-Date) - $lintStart).TotalSeconds
        # Print progress every 10 seconds
        if ($elapsed -ge ($lastUpdate + 10)) {
            $lastUpdate = $elapsed
            $remaining = [math]::Max(0, $lintEstimate - $elapsed)
            Write-Host "  Linting... ${remaining}s remaining" -ForegroundColor Gray
        }
        Start-Sleep -Milliseconds 500
    }
    
    $lintResult = Receive-Job -Job $lintJob
    Remove-Job -Job $lintJob
    $lintOutput = $lintResult.Output
    $lintExitCode = $lintResult.ExitCode
    $lintOutputStr = $lintOutput -join "`n"
    
    # Collect errors (not warnings)
    $lintErrors = @()
    $lintOutput | ForEach-Object {
        $line = $_.ToString()
        if ($line -match "\d+:\d+\s+error") {
            $lintErrors += $line
        }
    }
    
    if ($lintExitCode -eq 0 -and $lintErrors.Count -eq 0) {
        $lintPassed = $true
        Write-Status "[OK] ESLint: Clean" "OK"
    }
    elseif ($lintErrors.Count -eq 0) {
        # Warnings only (exit code 1 but no errors in output)
        $lintPassed = $true
        Write-Status "[WARN] ESLint: Warnings remain (continuing)" "WARN"
    }
    else {
        Write-Status "[FAIL] ESLint: $($lintErrors.Count) errors found" "ERROR"
        
        # Try auto-fix with Claude Code
        if ($claudeAvailable -and -not $NoAutoFix -and $lintAttempt -lt $MaxRetries) {
            $fixed = Invoke-ClaudeCodeFix -ErrorType "ESLint" -ErrorOutput $lintOutputStr -Attempt $lintAttempt
            if ($fixed) {
                $aiFixesApplied = $true
            } else {
                Write-Status "[AI] Auto-fix unsuccessful, will retry..." "WARN"
            }
        }
        elseif ($lintAttempt -ge $MaxRetries) {
            Write-Status "[FAIL] Max retries reached for ESLint" "ERROR"
        }
    }
}

$allResults["ESLint"] = @{
    Success = $lintPassed
    HasWarnings = ($lintExitCode -eq 1)
    HasErrors = -not $lintPassed
    Issues = $lintErrors
}

if (-not $lintPassed -and -not $Force) {
    Write-Status "Cannot continue - ESLint errors remain after $MaxRetries attempts" "ERROR"
    Show-Summary $allResults
    exit 1
}

# ============================================================================
# STEP 3: Build Check (with auto-fix loop)
# ============================================================================

$buildAttempt = 0
$buildPassed = $false

while (-not $buildPassed -and $buildAttempt -lt $MaxRetries) {
    $buildAttempt++
    
    if ($buildAttempt -gt 1) {
        Write-Status "[Build] Retry attempt $buildAttempt of $MaxRetries..." "RETRY"
    } else {
        Write-Status "[Build] Starting Next.js build..." "STEP"
    }
    
    $buildStart = Get-Date
    $buildEstimate = 180
    $spinner = @('|', '/', '-', '\')
    $spinIdx = 0
    
    $job = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        $output = pnpm build 2>&1
        @{
            Output = $output
            ExitCode = $LASTEXITCODE
        }
    }
    
    $lastUpdate = 0
    while ($job.State -eq 'Running') {
        $elapsed = [int]((Get-Date) - $buildStart).TotalSeconds
        $remaining = [math]::Max(0, $buildEstimate - $elapsed)
        $remMins = [int]($remaining / 60)
        $remSecs = $remaining % 60
        
        # Print progress every 30 seconds instead of in-place updates
        if ($elapsed -ge ($lastUpdate + 30)) {
            $lastUpdate = $elapsed
            $progress = [math]::Min(100, [int]($elapsed / $buildEstimate * 100))
            Write-Host "  Building... ${remMins}m ${remSecs}s remaining ($progress%)" -ForegroundColor Gray
        }
        Start-Sleep -Milliseconds 500
    }
    
    $buildResult = Receive-Job -Job $job
    Remove-Job -Job $job
    $buildOutput = $buildResult.Output
    $buildExitCode = $buildResult.ExitCode
    $buildOutputStr = $buildOutput -join "`n"
    
    # Show key output lines
    $buildOutput | ForEach-Object {
        $line = $_.ToString()
        if ($line -match "Compiled|error|ERR!|failed|Route \(app\)|Creating|Generating") {
            Write-Status "  $line" "INFO"
        }
    }
    
    # Check for build errors
    $buildErrors = @()
    $buildOutput | ForEach-Object {
        $line = $_.ToString()
        if ($line -match "error|Error:|ERR!|Type error") {
            $buildErrors += $line
        }
    }
    
    $buildSuccess = ($buildExitCode -eq 0) -or ($buildErrors.Count -eq 0 -and $buildOutputStr -match "Compiled successfully")
    
    if ($buildSuccess) {
        $buildPassed = $true
        $buildTime = ((Get-Date) - $buildStart).TotalSeconds
        Write-Status "[OK] Build successful in $([int]$buildTime)s" "OK"
    }
    else {
        Write-Status "[FAIL] Build failed with $($buildErrors.Count) errors" "ERROR"
        
        # Try auto-fix with Claude Code
        if ($claudeAvailable -and -not $NoAutoFix -and $buildAttempt -lt $MaxRetries) {
            $fixed = Invoke-ClaudeCodeFix -ErrorType "Build" -ErrorOutput $buildOutputStr -Attempt $buildAttempt
            if ($fixed) {
                $aiFixesApplied = $true
            } else {
                Write-Status "[AI] Auto-fix unsuccessful, will retry..." "WARN"
            }
        }
        elseif ($buildAttempt -ge $MaxRetries) {
            Write-Status "[FAIL] Max retries reached for Build" "ERROR"
            $buildErrors | Select-Object -First 10 | ForEach-Object { Write-Status "   $_" "ERROR" }
        }
    }
}

$allResults["Build"] = @{
    Success = $buildPassed
    HasWarnings = $false
    HasErrors = -not $buildPassed
    Issues = $buildErrors
}

if (-not $buildPassed -and -not $Force) {
    Write-Status "Cannot continue - Build errors remain after $MaxRetries attempts" "ERROR"
    Show-Summary $allResults
    exit 1
}

# ============================================================================
# STEP 4: Tests (display failures only, no AI auto-fix)
# ============================================================================

$testsPassed = $false
$testIssues = @()

# Marketing website: tests are optional (Playwright E2E available but not blocking)
if ($true) {
    Write-Status "[SKIP] Tests: Skipped (marketing site)" "INFO"
    $testsPassed = $true
    $allResults["Tests"] = @{
        Success = $true
        HasWarnings = $false
        HasErrors = $false
        Issues = @()
    }
} elseif ($SkipTests) {
    Write-Status "[SKIP] Tests: Skipped" "WARN"
    $testsPassed = $true
    $allResults["Tests"] = @{
        Success = $true
        HasWarnings = $false
        HasErrors = $false
        Issues = @()
    }
} else {
    Write-Status "[Tests] Running Playwright E2E..." "STEP"

    $testStart = Get-Date
    $testEstimate = 120
    $testJob = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        $output = pnpm test:e2e 2>&1
        @{
            Output = $output
            ExitCode = $LASTEXITCODE
        }
    }

    $lastUpdate = -10
    while ($testJob.State -eq 'Running') {
        $elapsed = [int]((Get-Date) - $testStart).TotalSeconds
        if ($elapsed -ge ($lastUpdate + 10)) {
            $lastUpdate = $elapsed
            $remaining = [math]::Max(0, $testEstimate - $elapsed)
            Write-Host "  Testing... ${remaining}s remaining" -ForegroundColor Gray
        }
        Start-Sleep -Milliseconds 500
    }

    $testResult = Receive-Job -Job $testJob
    Remove-Job -Job $testJob

    $testOutput = $testResult.Output
    $testExitCode = $testResult.ExitCode
    $testTime = [int]((Get-Date) - $testStart).TotalSeconds

    # Collect and display failures clearly
    $testFailed = $testExitCode -ne 0
    
    if (-not $testFailed) {
        $testsPassed = $true
        Write-Status "[OK] Tests: All passing (${testTime}s)" "OK"
    }
    else {
        Write-Status "[FAIL] Tests: Failures detected (${testTime}s)" "ERROR"
        Write-Host ""
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Red
        Write-Host "  |  TEST FAILURES - Review Required                          |" -ForegroundColor Red
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Red
        Write-Host ""
        
        # Extract failed test files
        $failedFiles = @()
        $testOutput | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "FAIL\s+(.+\.tsx?)\s") {
                $failedFiles += $Matches[1]
            }
        }
        
        if ($failedFiles.Count -gt 0) {
            Write-Host "  Failed test files:" -ForegroundColor Yellow
            $failedFiles | ForEach-Object { Write-Host "    - $_" -ForegroundColor Red }
            Write-Host ""
            
            # Extract VERIFY: comments from failed test files
            $verifyInstructions = @()
            $failedFiles | ForEach-Object {
                $testFile = $_
                if (Test-Path $testFile) {
                    $content = Get-Content $testFile -Raw -ErrorAction SilentlyContinue
                    if ($content -match "VERIFY:\s*([^\n\r]+(?:\n\r?\s*\*\s*[^\n\r]+)*)") {
                        # Extract multi-line VERIFY comment
                        $verifyBlock = $Matches[0]
                        $verifyLines = $verifyBlock -split '\r?\n' | ForEach-Object {
                            $_ -replace '^\s*\*\s*', '' -replace 'VERIFY:\s*', ''
                        } | Where-Object { $_.Trim() }
                        $verifyInstructions += @{
                            File = $testFile
                            Instructions = $verifyLines
                        }
                    }
                }
            }
            
            if ($verifyInstructions.Count -gt 0) {
                Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
                Write-Host "  |  MANUAL VERIFICATION STEPS                                |" -ForegroundColor Yellow
                Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
                Write-Host ""
                $verifyInstructions | ForEach-Object {
                    Write-Host "  $($_.File):" -ForegroundColor Cyan
                    $_.Instructions | ForEach-Object {
                        Write-Host "    → $_" -ForegroundColor White
                    }
                    Write-Host ""
                }
            }
        }
        
        # Extract assertion errors / failure descriptions
        $failureDetails = @()
        $testOutput | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "FAIL\s+" -or $line -match "AssertionError" -or $line -match "Expected:" -or $line -match "Received:" -or $line -match "Error:") {
                $failureDetails += $line
            }
        }
        
        if ($failureDetails.Count -gt 0) {
            Write-Host "  Failure details:" -ForegroundColor Yellow
            $failureDetails | Select-Object -First 20 | ForEach-Object { 
                Write-Host "    $_" -ForegroundColor Gray 
            }
            if ($failureDetails.Count -gt 20) {
                Write-Host "    ... ($($failureDetails.Count - 20) more lines)" -ForegroundColor DarkGray
            }
            Write-Host ""
        }
        
        # Show summary line from vitest
        $testOutput | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "Test Files|Tests\s+\d") {
                Write-Host "  $line" -ForegroundColor Cyan
            }
        }
        
        Write-Host ""
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Red
        Write-Host ""
        
        $testIssues = $failedFiles
    }

    $allResults["Tests"] = @{
        Success = $testsPassed
        HasWarnings = -not $testsPassed  # Treat as warning on feature branches
        HasErrors = -not $testsPassed -and $branch -eq "main"
        Issues = $testIssues
    }

    if (-not $testsPassed -and -not $Force) {
        # On main: block. On feature/fix branches: warn and continue (Preview-first workflow)
        if ($branch -eq "main") {
            Write-Status "Cannot continue - tests must pass on main branch" "ERROR"
            Show-Summary $allResults
            exit 1
        } else {
            Write-Host ""
            Write-Status "[WARN] Continuing with test failures (feature branch → Preview workflow)" "WARN"
            Write-Status "[WARN] Fix tests before merging to main" "WARN"
            Write-Host ""
        }
    }
}

# ============================================================================
# STEP 5: Git Operations (retry with rebase, no AI fix)
# ============================================================================

# Re-check for changes (validation may have created new changes via auto-fix)
$changes = git status --porcelain 2>&1
$hasChanges = $null -ne $changes -and $changes.Count -gt 0

# Handle -CheckOnly or no changes
if ($CheckOnly) {
    Write-Status "[OK] All validation passed (check-only mode)" "OK"
    $allResults["Git"] = @{
        Success = $true
        HasWarnings = $false
        HasErrors = $false
        Issues = @()
    }
    Show-Summary $allResults
    Write-Status "=========================================" "SUCCESS"
    Write-Status "    VALIDATION PASSED - CHECK ONLY      " "SUCCESS"
    Write-Status "=========================================" "SUCCESS"
    Write-Host ""
    Write-Status "To commit and push, run: pnpm ship" "INFO"
    Write-Host ""
    exit 0
}

if (-not $hasChanges) {
    Write-Status "[OK] All validation passed - no changes to commit" "OK"
    $allResults["Git"] = @{
        Success = $true
        HasWarnings = $false
        HasErrors = $false
        Issues = @()
    }
    Show-Summary $allResults
    Write-Status "=========================================" "SUCCESS"
    Write-Status "    VALIDATION PASSED - NO NEW COMMITS  " "SUCCESS"
    Write-Status "=========================================" "SUCCESS"
    Write-Host ""
    exit 0
}

Write-Status "[Git] Committing and pushing..." "STEP"

# Stage changes
Write-Status "  -> Staging files..." "INFO"
git add . 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Status "[FAIL] git add failed" "ERROR"
    exit 1
}

# ============================================================================
# Pre-commit check (same as Husky would run) with auto-fix
# Skip if ESLint already passed without needing AI fixes
# ============================================================================

$preCommitPassed = $false

if (-not $aiFixesApplied) {
    # ESLint passed on first try - skip redundant pre-commit check
    Write-Status "[Pre-commit] Skipped (ESLint already passed)" "OK"
    $preCommitPassed = $true
    $allResults["Pre-commit"] = @{
        Success = $true
        HasWarnings = $false
        HasErrors = $false
        Issues = @()
    }
} else {
    # AI made fixes - verify with lint-staged
    $preCommitAttempt = 0
    
    while (-not $preCommitPassed -and $preCommitAttempt -lt $MaxRetries) {
        $preCommitAttempt++
        
        if ($preCommitAttempt -gt 1) {
            Write-Status "[Pre-commit] Retry attempt $preCommitAttempt of $MaxRetries..." "RETRY"
            # Re-stage after fixes
            git add . 2>&1 | Out-Null
        } else {
            Write-Status "[Pre-commit] Verifying AI fixes on staged files..." "STEP"
        }
    
    # Run lint-staged in background with progress indicator
    $preCommitStart = Get-Date
    $preCommitEstimate = 15  # seconds
    
    $preCommitJob = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        $output = npx lint-staged --allow-empty 2>&1
        @{
            Output = $output
            ExitCode = $LASTEXITCODE
        }
    }
    
    $lastUpdate = -10
    while ($preCommitJob.State -eq 'Running') {
        $elapsed = [int]((Get-Date) - $preCommitStart).TotalSeconds
        # Print progress every 10 seconds
        if ($elapsed -ge ($lastUpdate + 10)) {
            $lastUpdate = $elapsed
            $remaining = [math]::Max(0, $preCommitEstimate - $elapsed)
            Write-Host "  Linting staged files... ${remaining}s remaining" -ForegroundColor Gray
        }
        Start-Sleep -Milliseconds 500
    }
    
    $preCommitResult = Receive-Job -Job $preCommitJob
    Remove-Job -Job $preCommitJob
    $lintStagedOutput = $preCommitResult.Output
    $lintStagedExitCode = $preCommitResult.ExitCode
    $lintStagedOutputStr = $lintStagedOutput -join "`n"
    
    if ($lintStagedExitCode -eq 0) {
        $preCommitPassed = $true
        $preCommitTime = [int]((Get-Date) - $preCommitStart).TotalSeconds
        Write-Status "[OK] Pre-commit: Staged files clean (${preCommitTime}s)" "OK"
    }
    else {
        Write-Status "[FAIL] Pre-commit check failed" "ERROR"
        
        # Show the errors
        $lintStagedOutput | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "error|Error|ERR") {
                Write-Status "   $line" "ERROR"
            }
        }
        
        # Try auto-fix with Claude Code
        if ($claudeAvailable -and -not $NoAutoFix -and $preCommitAttempt -lt $MaxRetries) {
            $fixed = Invoke-ClaudeCodeFix -ErrorType "Pre-commit (lint-staged)" -ErrorOutput $lintStagedOutputStr -Attempt $preCommitAttempt
            if (-not $fixed) {
                Write-Status "[AI] Auto-fix unsuccessful, will retry..." "WARN"
            }
        }
        elseif ($preCommitAttempt -ge $MaxRetries) {
            Write-Status "[FAIL] Max retries reached for pre-commit checks" "ERROR"
        }
    }
    }  # End while loop
    
    if (-not $preCommitPassed -and -not $Force) {
        Write-Status "Cannot continue - pre-commit check failed after $MaxRetries attempts" "ERROR"
        Write-Status "Run 'npx lint-staged' to see details" "INFO"
        $allResults["Pre-commit"] = @{
            Success = $false
            HasWarnings = $false
            HasErrors = $true
            Issues = @("lint-staged failed")
        }
        Show-Summary $allResults
        exit 1
    }
    
    $allResults["Pre-commit"] = @{
        Success = $preCommitPassed
        HasWarnings = $false
        HasErrors = -not $preCommitPassed
        Issues = @()
    }
}  # End of else block (AI fixes applied)

# Create commit message
if (-not $Message) {
    if ($branch -match "feature/(.+)") {
        $featurePart = $Matches[1] -replace '-', ' '
        $Message = "feat: $featurePart"
    }
    elseif ($branch -match "fix/(.+)") {
        $fixPart = $Matches[1] -replace '-', ' '
        $Message = "fix: $fixPart"
    }
    else {
        $fileCount = ($changes | Measure-Object).Count
        $Message = "chore: updates to $fileCount files"
    }
}

# Commit with --no-verify since we already ran the checks
Write-Status "  -> Committing: $Message" "INFO"
$commitOutput = git commit --no-verify -m $Message 2>&1
$commitExitCode = $LASTEXITCODE

if ($commitExitCode -ne 0) {
    # Check if it's just "nothing to commit"
    $commitStatus = git status --porcelain 2>&1
    if (-not $commitStatus) {
        Write-Status "  -> No new changes to commit" "INFO"
    } else {
        Write-Status "[FAIL] git commit failed" "ERROR"
        Write-Status "       Error: $commitOutput" "ERROR"
        exit 1
    }
}

# Push with retry (NO AI auto-fix - just git operations)
Write-Status "  -> Pushing to $branch..." "INFO"
$pushResult = git push origin $branch --set-upstream 2>&1
$pushExitCode = $LASTEXITCODE

if ($pushExitCode -ne 0) {
    Write-Status "[WARN] Push failed, attempting pull --rebase..." "WARN"
    
    # Try pull --rebase and push again
    git pull --rebase origin $branch 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Status "[WARN] Rebase failed, trying regular pull..." "WARN"
        git pull origin $branch 2>&1 | Out-Null
    }
    
    # Retry push
    $pushResult = git push origin $branch 2>&1
    $pushExitCode = $LASTEXITCODE
    
    if ($pushExitCode -ne 0) {
        Write-Status "[FAIL] git push failed after retry" "ERROR"
        Write-Status "       Manual steps needed:" "INFO"
        Write-Status "         1. git pull --rebase origin $branch" "INFO"
        Write-Status "         2. Resolve any conflicts" "INFO"
        Write-Status "         3. git push origin $branch" "INFO"
        
        $allResults["Git"] = @{
            Success = $false
            HasWarnings = $false
            HasErrors = $true
            Issues = @("Push failed - may need manual intervention")
        }
        
        Show-Summary $allResults
        exit 1
    }
}

$allResults["Git"] = @{
    Success = $true
    HasWarnings = $false
    HasErrors = $false
}

Write-Status "[OK] Git: Committed and pushed" "OK"

# ============================================================================
# PR / PREVIEW URL PROMPT (for feature/fix branches)
# ============================================================================

$isFeatureBranch = $branch -match "^(feature|fix)/"
if ($isFeatureBranch) {
    $repoSlug = Get-GitHubRepoSlug
    $ghAvailable = Test-GitHubCliAvailable
    
    Write-Host ""
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
    Write-Host "  |  PR / PREVIEW DEPLOY                                      |" -ForegroundColor Green
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
    Write-Host ""
    
    if ($ghAvailable) {
        # Check if PR already exists for this branch
        Write-Status "  -> Checking for existing PR..." "INFO"
        $existingPr = Get-ExistingPrForBranch -BranchName $branch
        
        if ($existingPr) {
            # PR already exists - just show the URL
            Write-Status "[OK] PR already exists for this branch" "OK"
            Write-Host ""
            Write-Host "    $($existingPr.url)" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "  Open in browser? (y/n): " -ForegroundColor Yellow -NoNewline
            $openChoice = Read-Host
            
            if ($openChoice -eq 'y' -or $openChoice -eq 'Y') {
                Start-Process $existingPr.url
                Write-Status "[OK] Opened existing PR in browser" "OK"
            }
        }
        else {
            # No PR exists - create one automatically
            Write-Status "  -> Creating PR automatically..." "INFO"
            
            # Generate PR title from branch name
            $prTitle = $Message
            if (-not $prTitle) {
                if ($branch -match "feature/(.+)") {
                    $featurePart = $Matches[1] -replace '-', ' '
                    $prTitle = "feat: $featurePart"
                }
                elseif ($branch -match "fix/(.+)") {
                    $fixPart = $Matches[1] -replace '-', ' '
                    $prTitle = "fix: $fixPart"
                }
                else {
                    $prTitle = "Update: $branch"
                }
            }
            
            $newPrUrl = New-PullRequest -BranchName $branch -Title $prTitle
            
            if ($newPrUrl) {
                Write-Status "[OK] PR created successfully!" "OK"
                Write-Host ""
                Write-Host "    $newPrUrl" -ForegroundColor Cyan
                Write-Host ""
                Write-Host "  Open in browser? (y/n): " -ForegroundColor Yellow -NoNewline
                $openChoice = Read-Host
                
                if ($openChoice -eq 'y' -or $openChoice -eq 'Y') {
                    Start-Process $newPrUrl
                    Write-Status "[OK] Opened new PR in browser" "OK"
                }
            }
            else {
                # Fallback to manual URL if gh create failed
                Write-Status "[WARN] Could not auto-create PR (check 'gh auth status')" "WARN"
                if ($repoSlug) {
                    $manualPrUrl = "https://github.com/$repoSlug/compare/main...$($branch)?expand=1"
                    Write-Host ""
                    Write-Host "  Create PR manually:" -ForegroundColor Yellow
                    Write-Host "    $manualPrUrl" -ForegroundColor Cyan
                    Write-Host ""
                }
            }
        }
    }
    elseif ($repoSlug) {
        # GitHub CLI not available - show manual URL
        Write-Status "[INFO] GitHub CLI (gh) not installed - showing manual PR link" "INFO"
        Write-Status "[TIP] Install 'gh' CLI for auto-PR creation: https://cli.github.com/" "INFO"
        $prUrl = "https://github.com/$repoSlug/compare/main...$($branch)?expand=1"
        Write-Host ""
        Write-Host "  Create a PR to trigger Vercel Preview deployment:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "    $prUrl" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  Open in browser? (y/n): " -ForegroundColor Yellow -NoNewline
        $openChoice = Read-Host
        
        if ($openChoice -eq 'y' -or $openChoice -eq 'Y') {
            Start-Process $prUrl
            Write-Status "[OK] Opened PR creation page in browser" "OK"
        }
    }
    Write-Host ""
}

# ============================================================================
# SUCCESS
# ============================================================================

Show-Summary $allResults

Write-Status "=========================================" "SUCCESS"
Write-Status "    SHIP COMPLETED SUCCESSFULLY!        " "SUCCESS"
Write-Status "=========================================" "SUCCESS"
Write-Host ""
Write-Status "Recent commits:" "INFO"
git log --oneline -3 2>&1
Write-Host ""

# ============================================================================
# MERGE FOLLOW-UP (for feature/fix branches - requires explicit confirmation)
# ============================================================================

# $isFeatureBranch already set above
$featureBranchName = $branch

if ($isFeatureBranch) {
    Write-Host ""
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host "  |  LOCAL MERGE OPTION                                       |" -ForegroundColor Cyan
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  RECOMMENDED: Use the PR link above for Preview deploy first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  To merge locally (skips Preview workflow), type 'merge': " -ForegroundColor Gray -NoNewline
    $mergeChoice = Read-Host
    
    if ($mergeChoice -eq 'merge') {
        Write-Host ""
        Write-Status "[Merge] Starting merge to main..." "STEP"
        
        # Switch to main
        Write-Status "  -> Switching to main..." "INFO"
        git checkout main 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            Write-Status "[FAIL] Could not switch to main" "ERROR"
            Write-Status "  -> Switching back to $featureBranchName" "INFO"
            git checkout $featureBranchName 2>&1 | Out-Null
        } else {
            # Pull latest main
            Write-Status "  -> Pulling latest main..." "INFO"
            git pull origin main 2>&1 | Out-Null
            
            # Merge feature branch
            Write-Status "  -> Merging $featureBranchName into main..." "INFO"
            $mergeOutput = git merge $featureBranchName --no-ff -m "Merge branch '$featureBranchName' into main" 2>&1
            
            if ($LASTEXITCODE -ne 0) {
                Write-Status "[FAIL] Merge failed - conflicts detected" "ERROR"
                Write-Host ""
                Write-Host $mergeOutput -ForegroundColor Red
                Write-Host ""
                Write-Status "  -> Aborting merge and switching back..." "WARN"
                git merge --abort 2>&1 | Out-Null
                git checkout $featureBranchName 2>&1 | Out-Null
                Write-Status "  -> Back on $featureBranchName - resolve conflicts manually" "INFO"
            } else {
                # Push main
                Write-Status "  -> Pushing main..." "INFO"
                git push origin main 2>&1 | Out-Null
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Status "[OK] Merge complete! Main branch updated." "OK"
                    
                    # Ask about cleanup
                    Write-Host ""
                    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
                    Write-Host "  |  Cleanup Options                                          |" -ForegroundColor Cyan
                    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
                    Write-Host ""
                    Write-Host "  Delete the feature branch '$featureBranchName'?" -ForegroundColor Yellow
                    Write-Host ""
                    Write-Host "    [1] Yes - delete local and remote" -ForegroundColor Gray
                    Write-Host "    [2] Yes - delete local only" -ForegroundColor Gray
                    Write-Host "    [3] No - keep the branch" -ForegroundColor Gray
                    Write-Host ""
                    Write-Host "  Enter choice (1/2/3): " -ForegroundColor Cyan -NoNewline
                    $cleanupChoice = Read-Host
                    
                    switch ($cleanupChoice) {
                        "1" {
                            Write-Status "  -> Deleting local branch..." "INFO"
                            git branch -d $featureBranchName 2>&1 | Out-Null
                            if ($LASTEXITCODE -eq 0) {
                                Write-Status "[OK] Local branch deleted" "OK"
                            } else {
                                Write-Status "[WARN] Could not delete local branch (may have unmerged commits)" "WARN"
                            }
                            
                            Write-Status "  -> Deleting remote branch..." "INFO"
                            git push origin --delete $featureBranchName 2>&1 | Out-Null
                            if ($LASTEXITCODE -eq 0) {
                                Write-Status "[OK] Remote branch deleted" "OK"
                            } else {
                                Write-Status "[WARN] Could not delete remote branch" "WARN"
                            }
                        }
                        "2" {
                            Write-Status "  -> Deleting local branch..." "INFO"
                            git branch -d $featureBranchName 2>&1 | Out-Null
                            if ($LASTEXITCODE -eq 0) {
                                Write-Status "[OK] Local branch deleted" "OK"
                            } else {
                                Write-Status "[WARN] Could not delete local branch" "WARN"
                            }
                        }
                        default {
                            Write-Status "  -> Keeping branch: $featureBranchName" "INFO"
                        }
                    }
                    
                    Write-Host ""
                    Write-Status "You are now on: main" "INFO"
                } else {
                    Write-Status "[FAIL] Could not push main" "ERROR"
                    Write-Status "  -> Run 'git push origin main' manually" "INFO"
                }
            }
        }
    } else {
        Write-Status "Skipping local merge - use PR workflow for Preview deploy" "INFO"
    }
}

Write-Host ""
Write-Status "=========================================" "INFO"
Write-Status "    All done! Check Vercel deployment   " "INFO"
Write-Status "=========================================" "INFO"
Write-Host ""
