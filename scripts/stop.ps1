#!/usr/bin/env pwsh
# Stop/cleanup script for NGK Website
# Usage: pnpm stop

# Navigate to project root (relative to script location)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Join-Path $scriptDir ".."
Set-Location $projectRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PPC Ad Editor Website - Cleanup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Cleaning build cache..." -ForegroundColor Yellow
$cleaned = $false

if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  [OK] .next cache removed" -ForegroundColor Green
    $cleaned = $true
}

if (Test-Path ".turbo") {
    Remove-Item -Path ".turbo" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  [OK] .turbo cache removed" -ForegroundColor Green
    $cleaned = $true
}

if (-not $cleaned) {
    Write-Host "  [INFO] Already clean" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "[OK] Done!" -ForegroundColor Green
Write-Host ""




























