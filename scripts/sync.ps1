# scripts/sync.ps1 - Smart Git Sync for Team Collaboration
# Usage: pnpm sync
# Handles: uncommitted changes (with AI commit message), pulling updates, dependency changes

Write-Host ""
Write-Host "[SYNC]" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor DarkGray

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD 2>&1
Write-Host "Branch: $currentBranch" -ForegroundColor DarkGray

# Helper: Check if Claude CLI is available
function Test-ClaudeAvailable {
    $claudeCmd = Get-Command claude -ErrorAction SilentlyContinue
    return $null -ne $claudeCmd
}

# Helper: Generate AI commit message
function Get-AiCommitMessage {
    if (-not (Test-ClaudeAvailable)) {
        return $null
    }
    
    # Get file list and diff summary
    $fileList = git status --short 2>&1
    $diffStat = git diff --stat HEAD 2>&1
    
    # Get sample of actual changes (first 50 lines of diff)
    $diffContent = git diff HEAD 2>&1 | Select-Object -First 50
    
    $promptLines = @(
        "Analyze these git changes and write a DESCRIPTIVE commit message.",
        "",
        "Rules:",
        "- Use conventional commit format: type(scope): description",
        "- Types: feat, fix, chore, docs, style, refactor, content",
        "- Be SPECIFIC about what changed (e.g. 'feat(pricing): add calculator component')",
        "- Mention key files/features affected",
        "- Max 72 chars for first line",
        "- Reply with ONLY the commit message, no explanation",
        "",
        "Files changed:",
        ($fileList -join "`n"),
        "",
        "Diff summary:",
        ($diffStat -join "`n"),
        "",
        "Sample changes:",
        ($diffContent -join "`n")
    )
    $prompt = $promptLines -join "`n"
    
    $tempFile = Join-Path $env:TEMP "sync-commit-prompt.txt"
    [System.IO.File]::WriteAllText($tempFile, $prompt)
    
    try {
        $output = Get-Content $tempFile | claude --print 2>&1
        $message = ($output | Select-Object -First 1).ToString().Trim()
        # Clean up - remove quotes if wrapped
        $message = $message -replace '^["'']|["'']$', ''
        # Reject generic messages
        if ($message -match "updates to \d+ files|various changes|multiple files") {
            return $null
        }
        if ($message -and $message.Length -ge 10 -and $message.Length -le 100) {
            return $message
        }
    }
    catch {
        # AI failed
    }
    finally {
        if (Test-Path $tempFile) {
            Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
        }
    }
    
    return $null
}

# Helper: Generate fallback commit message from changed files
function Get-FallbackCommitMessage {
    $files = git status --short 2>&1
    $fileList = @($files)
    $count = $fileList.Count
    
    # Categorize changes by area
    $areas = @{
        "components" = @($fileList | Where-Object { $_ -match "components/" })
        "blog" = @($fileList | Where-Object { $_ -match "content/blog" })
        "pages" = @($fileList | Where-Object { $_ -match "src/app/" -and $_ -notmatch "components" })
        "scripts" = @($fileList | Where-Object { $_ -match "scripts/|\.ps1" })
        "config" = @($fileList | Where-Object { $_ -match "package\.json|config\.|tsconfig|tailwind" })
        "docs" = @($fileList | Where-Object { $_ -match "\.md$|docs/" })
        "styles" = @($fileList | Where-Object { $_ -match "\.css|styles/" })
        "images" = @($fileList | Where-Object { $_ -match "public/images|\.svg|\.png" })
    }
    
    # Find areas with changes, sorted by count
    $changedAreas = $areas.GetEnumerator() | 
        Where-Object { $_.Value.Count -gt 0 } | 
        Sort-Object { $_.Value.Count } -Descending
    
    if ($changedAreas.Count -eq 0) {
        return "chore: miscellaneous updates"
    }
    
    # Get top 2 areas
    $topAreas = @($changedAreas | Select-Object -First 2)
    $primaryArea = $topAreas[0].Key
    $primaryCount = $topAreas[0].Value.Count
    
    # Determine commit type based on primary area
    $type = switch ($primaryArea) {
        "blog" { "content" }
        "docs" { "docs" }
        "components" { "feat" }
        "pages" { "feat" }
        "scripts" { "chore" }
        "config" { "chore" }
        "styles" { "style" }
        "images" { "assets" }
        default { "chore" }
    }
    
    # Build descriptive message
    if ($topAreas.Count -ge 2 -and $topAreas[1].Value.Count -gt 2) {
        $secondArea = $topAreas[1].Key
        return "$type($primaryArea): update $primaryCount files, plus $secondArea changes"
    }
    else {
        # Try to extract specific file/component names
        $sampleFiles = $topAreas[0].Value | Select-Object -First 3
        $fileNames = $sampleFiles | ForEach-Object {
            if ($_ -match "([^/]+)\.(tsx?|mdx?|ps1)$") {
                $Matches[1]
            }
        } | Where-Object { $_ }
        
        if ($fileNames.Count -gt 0) {
            $names = ($fileNames | Select-Object -First 2) -join ", "
            return "$type($primaryArea): update $names"
        }
        else {
            return "$type($primaryArea): update $primaryCount files"
        }
    }
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    $changeCount = ($status | Measure-Object).Count
    Write-Host ""
    Write-Host "[!] You have $changeCount uncommitted change(s)" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    
    # Generate commit message
    Write-Host "Generating commit message..." -ForegroundColor DarkGray
    $aiMessage = Get-AiCommitMessage
    
    if ($aiMessage) {
        Write-Host "[AI] $aiMessage" -ForegroundColor Cyan
    }
    else {
        $aiMessage = Get-FallbackCommitMessage
        Write-Host "[>>] $aiMessage" -ForegroundColor Cyan
    }
    
    Write-Host ""
    Write-Host "  Press Enter to commit, or type a different message" -ForegroundColor Gray
    Write-Host "  (type 'skip' to skip committing)" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "  Message: " -ForegroundColor Cyan -NoNewline
    $userInput = Read-Host
    
    if ($userInput -eq "skip") {
        Write-Host ""
        Write-Host "[!] Skipping commit - you may have issues pulling" -ForegroundColor Yellow
    }
    else {
        # Use user input if provided, otherwise use AI message
        $finalMessage = if ($userInput) { $userInput } else { $aiMessage }
        
        Write-Host ""
        Write-Host "Committing..." -ForegroundColor DarkGray
        git add .
        git commit -m $finalMessage
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Committed: $finalMessage" -ForegroundColor Green
        }
        else {
            Write-Host "[!] Commit failed" -ForegroundColor Red
            exit 1
        }
    }
    Write-Host ""
}

# Fetch latest
Write-Host "Fetching from origin..." -ForegroundColor DarkGray
git fetch origin --quiet

# Get branch status
$local = git rev-parse HEAD 2>&1
$remote = git rev-parse origin/main 2>&1
$base = git merge-base HEAD origin/main 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Could not compare with origin/main" -ForegroundColor Yellow
    Write-Host "=======================================" -ForegroundColor DarkGray
    Write-Host ""
    exit 0
}

if ($local -eq $remote) {
    Write-Host "[OK] You are up to date with main" -ForegroundColor Green
}
elseif ($local -eq $base) {
    $behind = (git rev-list --count HEAD..origin/main)
    Write-Host ""
    Write-Host "[<<] $behind new commit(s) on main:" -ForegroundColor Yellow
    git log --oneline HEAD..origin/main
    Write-Host ""
    
    # Check for uncommitted changes again
    $currentStatus = git status --porcelain
    if ($currentStatus) {
        Write-Host "[!] Cannot pull - you still have uncommitted changes" -ForegroundColor Red
        Write-Host "    Run 'pnpm sync' again and commit first" -ForegroundColor Yellow
    }
    else {
        Write-Host "Pulling changes..." -ForegroundColor DarkGray
        git pull origin main --quiet
        
        if ($LASTEXITCODE -eq 0) {
            # Check if dependencies changed
            $changed = git diff --name-only "HEAD@{1}" HEAD 2>$null
            if ($changed -match "package.json|pnpm-lock.yaml") {
                Write-Host ""
                Write-Host "[*] Dependencies changed - running pnpm install..." -ForegroundColor Cyan
                pnpm install --frozen-lockfile
                if ($LASTEXITCODE -ne 0) {
                    Write-Host "[!] pnpm install failed - dependencies may be out of sync" -ForegroundColor Red
                    Write-Host "    Try running 'pnpm install' manually to see errors" -ForegroundColor Yellow
                    Write-Host "=======================================" -ForegroundColor DarkGray
                    Write-Host ""
                    exit 1
                }
            }
            Write-Host "[OK] Synced!" -ForegroundColor Green
        }
        else {
            Write-Host "[!] Pull failed - may need manual merge" -ForegroundColor Red
        }
    }
}
elseif ($remote -eq $base) {
    $ahead = (git rev-list --count origin/main..HEAD)
    Write-Host "[>>] You are $ahead commit(s) ahead of main" -ForegroundColor Cyan
    Write-Host "    Ready to push with 'pnpm ship'" -ForegroundColor DarkGray
}
else {
    $ahead = (git rev-list --count origin/main..HEAD)
    $behind = (git rev-list --count HEAD..origin/main)
    Write-Host ""
    Write-Host "[!!] Branches have diverged" -ForegroundColor Yellow
    Write-Host "     You are $ahead ahead and $behind behind" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host "Rebasing your commits on top of main..." -ForegroundColor DarkGray
    
    # Show what commits will be rebased
    Write-Host ""
    Write-Host "Your commits:" -ForegroundColor Cyan
    git log --oneline origin/main..HEAD
    Write-Host ""
    Write-Host "Incoming commits:" -ForegroundColor Yellow
    git log --oneline HEAD..origin/main
    Write-Host ""
    
    # Attempt rebase
    $rebaseOutput = git pull origin main --rebase 2>&1
    $rebaseExitCode = $LASTEXITCODE
    
    if ($rebaseExitCode -eq 0) {
        # Check if dependencies changed
        $changed = git diff --name-only "HEAD@{1}" HEAD 2>$null
        if ($changed -match "package.json|pnpm-lock.yaml") {
            Write-Host ""
            Write-Host "[*] Dependencies changed - running pnpm install..." -ForegroundColor Cyan
            pnpm install --frozen-lockfile
            if ($LASTEXITCODE -ne 0) {
                Write-Host "[!] pnpm install failed - dependencies may be out of sync" -ForegroundColor Red
                Write-Host "    Try running 'pnpm install' manually to see errors" -ForegroundColor Yellow
                Write-Host "=======================================" -ForegroundColor DarkGray
                Write-Host ""
                exit 1
            }
        }
        Write-Host "[OK] Rebased successfully! Your commits are now on top of main." -ForegroundColor Green
        Write-Host ""
        Write-Host "    Ready to push with 'pnpm ship'" -ForegroundColor DarkGray
    }
    else {
        # Rebase had conflicts
        Write-Host "[!] Rebase has conflicts" -ForegroundColor Red
        Write-Host ""
        
        # Check if there are actual conflicts
        $conflictFiles = git diff --name-only --diff-filter=U 2>&1
        if ($conflictFiles) {
            Write-Host "Conflicting files:" -ForegroundColor Yellow
            $conflictFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
            Write-Host ""
            Write-Host "Options:" -ForegroundColor Cyan
            Write-Host "  1. Fix conflicts manually, then:" -ForegroundColor Gray
            Write-Host "     git add ." -ForegroundColor DarkGray
            Write-Host "     git rebase --continue" -ForegroundColor DarkGray
            Write-Host ""
            Write-Host "  2. Abort and keep your original state:" -ForegroundColor Gray
            Write-Host "     git rebase --abort" -ForegroundColor DarkGray
        }
        else {
            Write-Host "Rebase failed for unknown reason. Output:" -ForegroundColor Yellow
            Write-Host $rebaseOutput -ForegroundColor DarkGray
        }
    }
}

Write-Host "=======================================" -ForegroundColor DarkGray
Write-Host ""
