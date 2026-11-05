# Publishes this folder to GitHub Pages (repo agromonitor-twin). Safe to run again: it overwrites the site.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$gh = 'C:\Program Files\GitHub CLI\gh.exe'
$owner = & $gh api user -q .login
if (Test-Path .git) { Remove-Item -Recurse -Force .git }
git init -q -b main
git config core.autocrlf false
git add -A
git commit -q -m 'Agromonitor twin: build'
$exists = $true
& $gh api "repos/$owner/agromonitor-twin" --silent 2>$null
if ($LASTEXITCODE -ne 0) { $exists = $false }
$ErrorActionPreference = 'Continue'
if (-not $exists) {
    & $gh repo create agromonitor-twin --public --description 'Agromonitor digital twin (demo build)'
    & $gh api -X POST "repos/$owner/agromonitor-twin/pages" -f 'source[branch]=main' -f 'source[path]=/'
}
git remote add origin "https://github.com/$owner/agromonitor-twin.git"
git push --force -u origin main
Write-Host "Site in 1-2 minutes: https://$owner.github.io/agromonitor-twin/"
