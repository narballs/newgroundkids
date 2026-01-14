# scripts/merge.ps1
# Post-Preview merge workflow - merge feature branch to main after testing
# Usage: pnpm merge [-SkipTests] [-NoWait] [-DeployTimeout 300]

param(
    [switch]$SkipTests = $false,
    [switch]$NoWait = $false,
    [int]$DeployTimeout = 300  # 5 minutes default
)

$ErrorActionPreference = "Continue"
$ProductionUrl = "https://studio.ppcadeditor.com"
$HealthEndpoint = "$ProductionUrl/api/health"

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
        "HEALTH"  = "Magenta"
    }
    $color = if ($colors.ContainsKey($Status)) { $colors[$Status] } else { "White" }
    Write-Host $Text -ForegroundColor $color
}

function Get-GitHubRepoSlug {
    $remoteUrl = git remote get-url origin 2>&1
    if ($LASTEXITCODE -ne 0) { return $null }
    
    if ($remoteUrl -match "git@github\.com:([^/]+)/(.+?)(\.git)?$") {
        return "$($Matches[1])/$($Matches[2])"
    }
    if ($remoteUrl -match "github\.com/([^/]+)/(.+?)(\.git)?$") {
        return "$($Matches[1])/$($Matches[2])"
    }
    return $null
}

function Test-GitHubCliAvailable {
    $ghCmd = Get-Command gh -ErrorAction SilentlyContinue
    return $null -ne $ghCmd
}

function Get-PrForBranch {
    param([string]$BranchName)
    
    if (-not (Test-GitHubCliAvailable)) { return $null }
    
    $prJson = gh pr view $BranchName --json number,url,state,statusCheckRollup,title,mergeCommit 2>&1
    if ($LASTEXITCODE -ne 0) { return $null }
    
    try {
        return $prJson | ConvertFrom-Json
    }
    catch {
        return $null
    }
}

function Test-CiPassed {
    param($PrData)
    
    if (-not $PrData -or -not $PrData.statusCheckRollup) { return $false }
    
    $checks = $PrData.statusCheckRollup
    foreach ($check in $checks) {
        if ($check.conclusion -eq "FAILURE") {
            return $false
        }
    }
    return $true
}

function Test-HealthEndpoint {
    param([int]$TimeoutSeconds = 10)
    
    try {
        $response = Invoke-WebRequest -Uri $HealthEndpoint -TimeoutSec $TimeoutSeconds -UseBasicParsing -ErrorAction Stop
        $statusCode = $response.StatusCode
        $body = $response.Content | ConvertFrom-Json
        
        return @{
            Success = ($statusCode -eq 200 -and $body.status -eq "healthy")
            StatusCode = $statusCode
            Status = $body.status
            ResponseTime = $null  # PowerShell doesn't easily give this
            DbConnected = $body.checks.database.connected
        }
    }
    catch {
        return @{
            Success = $false
            StatusCode = 0
            Status = "unreachable"
            Error = $_.Exception.Message
        }
    }
}

function Wait-ForDeployment {
    param([int]$TimeoutSeconds, [string]$MergeCommit)
    
    $startTime = Get-Date
    $checkInterval = 15  # Check every 15 seconds
    $attempt = 0
    
    Write-Host ""
    Write-Status "[Deploy] Waiting for production deployment..." "STEP"
    Write-Status "         Timeout: $([int]($TimeoutSeconds / 60)) minutes" "INFO"
    Write-Host ""
    
    # Initial delay to let Vercel pick up the merge
    Write-Host "  Waiting 30s for Vercel to detect merge..." -ForegroundColor Gray
    Start-Sleep -Seconds 30
    
    while ($true) {
        $elapsed = [int]((Get-Date) - $startTime).TotalSeconds
        $remaining = $TimeoutSeconds - $elapsed
        
        if ($elapsed -ge $TimeoutSeconds) {
            Write-Status "[WARN] Deployment timeout reached ($TimeoutSeconds seconds)" "WARN"
            return @{ Success = $false; TimedOut = $true }
        }
        
        $attempt++
        $health = Test-HealthEndpoint -TimeoutSeconds 10
        
        if ($health.Success) {
            Write-Host ""
            Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
            Write-Host "  |  PRODUCTION HEALTH CHECK                                  |" -ForegroundColor Green
            Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
            Write-Host ""
            Write-Host "    URL:        $HealthEndpoint" -ForegroundColor Cyan
            Write-Host "    Status:     $($health.Status)" -ForegroundColor Green
            Write-Host "    HTTP:       $($health.StatusCode)" -ForegroundColor Green
            Write-Host "    Database:   $(if ($health.DbConnected) { 'Connected' } else { 'Disconnected' })" -ForegroundColor $(if ($health.DbConnected) { 'Green' } else { 'Yellow' })
            Write-Host ""
            Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
            Write-Host ""
            
            return @{ Success = $true; Health = $health }
        }
        else {
            $remMins = [int]($remaining / 60)
            $remSecs = $remaining % 60
            Write-Host "  [$attempt] Health check: $($health.Status) - retrying in ${checkInterval}s (${remMins}m ${remSecs}s remaining)" -ForegroundColor Yellow
        }
        
        Start-Sleep -Seconds $checkInterval
    }
}

# ============================================================================
# MAIN FLOW
# ============================================================================

Write-Status "=========================================" "INFO"
Write-Status "    PCADE2 Merge Script (v1.2)          " "INFO"
Write-Status "    Post-Preview Merge Workflow         " "INFO"
Write-Status "=========================================" "INFO"
Write-Host ""

# ============================================================================
# STEP 1: Verify on feature/fix branch
# ============================================================================

$branch = git rev-parse --abbrev-ref HEAD 2>&1
Write-Status ">>> BRANCH: $branch <<<" "STEP"
Write-Host ""

$isFeatureBranch = $branch -match "^(feature|fix|hotfix|chore)/"
if (-not $isFeatureBranch) {
    Write-Status "[ERROR] Must be on a feature/fix/hotfix/chore branch to merge" "ERROR"
    Write-Status "        Current branch: $branch" "INFO"
    Write-Status "        Expected: feature/*, fix/*, hotfix/*, or chore/*" "INFO"
    exit 1
}

Write-Status "[OK] On valid feature branch" "OK"
Write-Host ""

# ============================================================================
# STEP 2: Check for uncommitted changes
# ============================================================================

Write-Status "[Git] Checking for uncommitted changes..." "STEP"

$changes = git status --porcelain 2>&1
$changeCount = ($changes | Measure-Object).Count
$hasChanges = $changeCount -gt 0

if ($hasChanges) {
    Write-Status "[ERROR] Uncommitted changes detected" "ERROR"
    Write-Host ""
    Write-Host "  Changed files:" -ForegroundColor Yellow
    $changes | Select-Object -First 10 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
    if (($changes | Measure-Object).Count -gt 10) {
        Write-Host "    ... and $(($changes | Measure-Object).Count - 10) more" -ForegroundColor DarkGray
    }
    Write-Host ""
    Write-Status "  Commit or stash changes before merging:" "INFO"
    Write-Status "    pnpm ship  (to commit and push)" "INFO"
    Write-Status "    git stash  (to temporarily save)" "INFO"
    exit 1
}

Write-Status "[OK] Working directory clean" "OK"
Write-Host ""

# ============================================================================
# STEP 3: Check for stashes (warning per memory of orphaned stash issues)
# ============================================================================

Write-Status "[Git] Checking for stashes..." "STEP"

$stashList = git stash list 2>&1
$hasStashes = $null -ne $stashList -and $stashList.ToString().Trim() -ne ""

if ($hasStashes) {
    Write-Host ""
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
    Write-Host "  |  WARNING: Stashes Detected                                |" -ForegroundColor Yellow
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  You have stashed changes that might be orphaned:" -ForegroundColor Yellow
    Write-Host ""
    $stashList -split "`n" | Select-Object -First 5 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
    Write-Host ""
    Write-Host "  Review stashes with: git stash list" -ForegroundColor Cyan
    Write-Host "  Apply stash with:    git stash pop" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Continue anyway? (y/n): " -ForegroundColor Yellow -NoNewline
    $stashChoice = Read-Host
    
    if ($stashChoice -ne 'y' -and $stashChoice -ne 'Y') {
        Write-Status "[ABORT] Review stashes before continuing" "WARN"
        exit 0
    }
    Write-Host ""
}
else {
    Write-Status "[OK] No stashes found" "OK"
}
Write-Host ""

# ============================================================================
# STEP 4: Run tests (block if fail)
# ============================================================================

if ($SkipTests) {
    Write-Status "[SKIP] Tests skipped via -SkipTests flag" "WARN"
}
else {
    Write-Status "[Tests] Running test suite..." "STEP"
    
    $testStart = Get-Date
    $testOutput = pnpm vitest --run --passWithNoTests 2>&1
    $testExitCode = $LASTEXITCODE
    $testTime = [int]((Get-Date) - $testStart).TotalSeconds
    
    if ($testExitCode -ne 0) {
        Write-Status "[FAIL] Tests failed - cannot merge" "ERROR"
        Write-Host ""
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Red
        Write-Host "  |  TEST FAILURES - Merge Blocked                            |" -ForegroundColor Red
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Red
        Write-Host ""
        
        # Show failure summary
        $testOutput | ForEach-Object {
            $line = $_.ToString()
            if ($line -match "FAIL\s+" -or $line -match "Error:" -or $line -match "Test Files") {
                Write-Host "  $line" -ForegroundColor Gray
            }
        }
        
        Write-Host ""
        Write-Status "  Fix tests before merging to main" "INFO"
        exit 1
    }
    
    Write-Status "[OK] All tests passing (${testTime}s)" "OK"
}
Write-Host ""

# ============================================================================
# STEP 5: Verify PR exists and CI passed
# ============================================================================

Write-Status "[GitHub] Checking PR status..." "STEP"

if (-not (Test-GitHubCliAvailable)) {
    Write-Status "[ERROR] GitHub CLI (gh) not installed" "ERROR"
    Write-Status "        Install from: https://cli.github.com/" "INFO"
    Write-Status "        Then run: gh auth login" "INFO"
    exit 1
}

$pr = Get-PrForBranch -BranchName $branch

if (-not $pr) {
    Write-Status "[ERROR] No PR found for branch: $branch" "ERROR"
    Write-Status "        Create a PR first: pnpm ship" "INFO"
    exit 1
}

Write-Status "  PR #$($pr.number): $($pr.title)" "INFO"
Write-Status "  URL: $($pr.url)" "INFO"

if ($pr.state -eq "MERGED") {
    Write-Status "[INFO] PR already merged!" "OK"
    Write-Host ""
    Write-Host "  The PR has already been merged to main." -ForegroundColor Green
    Write-Host "  Switching to main and pulling latest..." -ForegroundColor Cyan
    
    git checkout main 2>&1 | Out-Null
    git pull origin main 2>&1 | Out-Null
    
    Write-Host ""
    Write-Host "  Delete local branch '$branch'? (y/n): " -ForegroundColor Yellow -NoNewline
    $deleteChoice = Read-Host
    
    if ($deleteChoice -eq 'y' -or $deleteChoice -eq 'Y') {
        git branch -d $branch 2>&1 | Out-Null
        Write-Status "[OK] Local branch deleted" "OK"
    }
    
    exit 0
}

if ($pr.state -ne "OPEN") {
    Write-Status "[ERROR] PR is not open (state: $($pr.state))" "ERROR"
    exit 1
}

# Check CI status
$ciPassed = Test-CiPassed -PrData $pr
if (-not $ciPassed) {
    Write-Status "[WARN] CI checks have not all passed" "WARN"
    Write-Host ""
    Write-Host "  Some CI checks may have failed or are pending." -ForegroundColor Yellow
    Write-Host "  View PR: $($pr.url)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Continue anyway? (y/n): " -ForegroundColor Yellow -NoNewline
    $ciChoice = Read-Host
    
    if ($ciChoice -ne 'y' -and $ciChoice -ne 'Y') {
        Write-Status "[ABORT] Wait for CI to pass" "WARN"
        exit 0
    }
}
else {
    Write-Status "[OK] CI checks passed" "OK"
}
Write-Host ""

# ============================================================================
# STEP 6: Ensure branch is up to date with main
# ============================================================================

Write-Status "[Git] Checking if branch is up to date with main..." "STEP"

git fetch origin main 2>&1 | Out-Null

# Check how many commits behind main we are
$behindCountRaw = git rev-list --count "HEAD..origin/main" 2>&1
$behindCount = 0
if ($LASTEXITCODE -eq 0 -and $behindCountRaw -match '^\d+$') {
    $behindCount = [int]$behindCountRaw
}

if ($behindCount -gt 0) {
    Write-Host ""
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
    Write-Host "  |  WARNING: Branch is $behindCount commit(s) behind main" -ForegroundColor Yellow
    Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Recommended: Rebase before merging to catch conflicts early" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Options:" -ForegroundColor Cyan
    Write-Host "    r = Rebase on main (recommended)" -ForegroundColor Gray
    Write-Host "    c = Continue without rebasing (GitHub will merge)" -ForegroundColor Gray
    Write-Host "    q = Quit and rebase manually" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Choice (r/c/q): " -ForegroundColor Yellow -NoNewline
    $rebaseChoice = Read-Host
    
    if ($rebaseChoice -eq 'q' -or $rebaseChoice -eq 'Q') {
        Write-Status "[ABORT] Rebase manually with: git rebase origin/main" "INFO"
        exit 0
    }
    elseif ($rebaseChoice -eq 'r' -or $rebaseChoice -eq 'R') {
        Write-Status "[Git] Rebasing on origin/main..." "STEP"
        $rebaseOutput = git rebase origin/main 2>&1
        $rebaseExitCode = $LASTEXITCODE
        
        if ($rebaseExitCode -ne 0) {
            Write-Status "[ERROR] Rebase failed - resolve conflicts manually" "ERROR"
            Write-Host ""
            Write-Host "  $rebaseOutput" -ForegroundColor Gray
            Write-Host ""
            Write-Status "  After resolving: git rebase --continue" "INFO"
            Write-Status "  To abort: git rebase --abort" "INFO"
            exit 1
        }
        
        Write-Status "[OK] Rebase successful" "OK"
        Write-Status "[Git] Force pushing rebased branch..." "STEP"
        git push --force-with-lease 2>&1 | Out-Null
        
        if ($LASTEXITCODE -ne 0) {
            Write-Status "[ERROR] Push failed" "ERROR"
            exit 1
        }
        Write-Status "[OK] Branch pushed" "OK"
        Write-Host ""
    }
    else {
        Write-Status "[INFO] Continuing without rebase - GitHub will handle merge" "INFO"
    }
    Write-Host ""
}
else {
    Write-Status "[OK] Branch is up to date with main" "OK"
}
Write-Host ""

# ============================================================================
# STEP 7: Squash merge via GitHub CLI
# ============================================================================

Write-Status "[Merge] Initiating squash merge..." "STEP"

# Store branch name before merge (for cleanup later)
$featureBranch = $branch

# Perform the merge (without auto-deleting branch)
$mergeOutput = gh pr merge $branch --squash 2>&1
$mergeExitCode = $LASTEXITCODE

if ($mergeExitCode -ne 0) {
    # Check if it's a branch protection issue
    $isBranchProtection = $mergeOutput -match "base branch policy prohibits|not mergeable"
    
    if ($isBranchProtection) {
        Write-Host ""
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
        Write-Host "  |  Branch Protection Active                                  |" -ForegroundColor Yellow
        Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  The merge is blocked by branch protection rules." -ForegroundColor Yellow
        Write-Host "  You can use admin privileges to bypass this." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  Merge with admin override? (y/n): " -ForegroundColor Yellow -NoNewline
        $adminChoice = Read-Host
        
        if ($adminChoice -eq 'y' -or $adminChoice -eq 'Y') {
            Write-Status "[Merge] Retrying with admin privileges..." "STEP"
            $mergeOutput = gh pr merge $branch --squash --admin 2>&1
            $mergeExitCode = $LASTEXITCODE
            
            if ($mergeExitCode -ne 0) {
                Write-Status "[ERROR] Admin merge failed" "ERROR"
                Write-Host "  $mergeOutput" -ForegroundColor Gray
                exit 1
            }
        }
        else {
            Write-Status "[ABORT] Merge cancelled" "WARN"
            exit 0
        }
    }
    else {
        Write-Status "[ERROR] Merge failed" "ERROR"
        Write-Host ""
        Write-Host "  Error output:" -ForegroundColor Red
        Write-Host "  $mergeOutput" -ForegroundColor Gray
        Write-Host ""
        Write-Status "  Check PR status: $($pr.url)" "INFO"
        exit 1
    }
}

Write-Status "[OK] PR merged successfully!" "OK"
Write-Host ""

# ============================================================================
# STEP 8: Switch to main and pull
# ============================================================================

Write-Status "[Git] Switching to main..." "STEP"

git checkout main 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Status "[WARN] Could not switch to main automatically" "WARN"
    Write-Status "       Run manually: git checkout main && git pull" "INFO"
    $mergeCommit = "unknown"
}
else {
    git pull origin main 2>&1 | Out-Null
    Write-Status "[OK] Now on main with latest changes" "OK"
    # Get the merge commit SHA for reference (after pull so we have the latest)
    $mergeCommit = git rev-parse HEAD 2>&1
}
Write-Host ""

# ============================================================================
# STEP 9: Verify deployment (health check)
# ============================================================================

if ($NoWait) {
    Write-Status "[SKIP] Deployment verification skipped via -NoWait" "WARN"
    Write-Host ""
    Write-Host "  Check production manually: $ProductionUrl" -ForegroundColor Cyan
}
else {
    $deployResult = Wait-ForDeployment -TimeoutSeconds $DeployTimeout -MergeCommit $mergeCommit
    
    if (-not $deployResult.Success) {
        if ($deployResult.TimedOut) {
            Write-Host ""
            Write-Status "[WARN] Deployment verification timed out" "WARN"
            Write-Host "  The merge completed, but we couldn't verify deployment." -ForegroundColor Yellow
            Write-Host "  Check production manually: $ProductionUrl" -ForegroundColor Cyan
            Write-Host ""
        }
    }
}

# ============================================================================
# STEP 10: Show rollback command and PR URL
# ============================================================================

Write-Host ""
Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
Write-Host "  |  MERGE COMPLETE                                           |" -ForegroundColor Cyan
Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
Write-Host ""
Write-Host "  PR:          $($pr.url)" -ForegroundColor Cyan
Write-Host "  Production:  $ProductionUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "  If you need to rollback:" -ForegroundColor Yellow
Write-Host "    git revert $mergeCommit" -ForegroundColor Gray
Write-Host "    git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# STEP 11: Branch cleanup (interactive)
# ============================================================================

# Check if remote branch still exists
$remoteBranchExists = git ls-remote --heads origin $featureBranch 2>&1
$remoteBranchExists = $null -ne $remoteBranchExists -and $remoteBranchExists.ToString().Trim() -ne ""

if ($remoteBranchExists) {
    Write-Host "  Remote branch 'origin/$featureBranch' still exists." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Delete remote branch? (y/n): " -ForegroundColor Yellow -NoNewline
    $remoteCleanupChoice = Read-Host
    
    if ($remoteCleanupChoice -eq 'y' -or $remoteCleanupChoice -eq 'Y') {
        git push origin --delete $featureBranch 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "[OK] Remote branch deleted: origin/$featureBranch" "OK"
        }
        else {
            Write-Status "[WARN] Could not delete remote branch" "WARN"
        }
    }
    else {
        Write-Status "[INFO] Keeping remote branch: origin/$featureBranch" "INFO"
    }
    Write-Host ""
}

# Check if local branch still exists
$localBranchExists = git show-ref --verify --quiet "refs/heads/$featureBranch" 2>&1
$localBranchExists = $LASTEXITCODE -eq 0

if ($localBranchExists) {
    Write-Host "  Local branch '$featureBranch' still exists." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Delete local branch? (y/n): " -ForegroundColor Yellow -NoNewline
    $cleanupChoice = Read-Host
    
    if ($cleanupChoice -eq 'y' -or $cleanupChoice -eq 'Y') {
        git branch -d $featureBranch 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "[OK] Local branch deleted: $featureBranch" "OK"
        }
        else {
            Write-Status "[WARN] Could not delete local branch (may have unmerged commits)" "WARN"
            Write-Status "       Use 'git branch -D $featureBranch' to force delete" "INFO"
        }
    }
    else {
        Write-Status "[INFO] Keeping local branch: $featureBranch" "INFO"
    }
}
else {
    Write-Status "[OK] Local branch already cleaned up" "OK"
}

# Prune stale remote refs
Write-Status "[Git] Pruning stale remote refs..." "INFO"
git fetch --prune 2>&1 | Out-Null
Write-Status "[OK] Remote refs pruned" "OK"
Write-Host ""

# ============================================================================
# STEP 12: Update PROJECT_KNOWLEDGE (optional)
# ============================================================================

Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
Write-Host "  |  DOCUMENTATION                                            |" -ForegroundColor Cyan
Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Update PROJECT_KNOWLEDGE.md with this change? (y/n): " -ForegroundColor Yellow -NoNewline
$docsChoice = Read-Host

if ($docsChoice -eq 'y' -or $docsChoice -eq 'Y') {
    Write-Host ""
    Write-Host "  Opening PROJECT_KNOWLEDGE.md in your editor..." -ForegroundColor Cyan
    Write-Host "  Add a note about what was merged." -ForegroundColor Gray
    Write-Host ""
    
    # Try to open in VS Code / Cursor
    $editorPath = "docs/PROJECT_KNOWLEDGE.md"
    if (Get-Command code -ErrorAction SilentlyContinue) {
        code $editorPath
    }
    elseif (Get-Command cursor -ErrorAction SilentlyContinue) {
        cursor $editorPath
    }
    else {
        Write-Status "  Edit manually: $editorPath" "INFO"
    }
}
Write-Host ""

# ============================================================================
# SUCCESS
# ============================================================================

Write-Status "=========================================" "SUCCESS"
Write-Status "    MERGE WORKFLOW COMPLETE!            " "SUCCESS"
Write-Status "=========================================" "SUCCESS"
Write-Host ""
Write-Status "You are now on: main" "INFO"
Write-Status "Production URL: $ProductionUrl" "INFO"
Write-Host ""

