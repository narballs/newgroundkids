#!/usr/bin/env pwsh
# Start script for NGK Website
# Usage: pnpm dev-start

$ErrorActionPreference = "Continue"

# Navigate to project root (relative to script location)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Join-Path $scriptDir ".."
Set-Location $projectRoot

Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║              PPC Ad Editor Website - Dev Server              ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Clean build cache (prevents stale code issues)
Write-Host "`n[1/3] Cleaning build cache..." -ForegroundColor Yellow
$cleaned = $false

if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   [OK] .next cache removed" -ForegroundColor Green
    $cleaned = $true
}

if (-not $cleaned) {
    Write-Host "   [INFO] No cache to clean" -ForegroundColor Cyan
}

# Check dependencies
Write-Host "`n[2/3] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "   Installing dependencies..." -ForegroundColor Gray
    pnpm install
    Write-Host "   [OK] Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   [OK] Dependencies ready" -ForegroundColor Green
}

# Start dev server
Write-Host "`n[3/3] Starting Next.js..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  http://localhost:4100" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host ""

pnpm dev --port 4100




























