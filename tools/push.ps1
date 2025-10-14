#Requires -Version 5.1

param(
    [string]$Message = "chore: deploy from Cursor",
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# Define variables
$remoteUrl = "https://github.com/rentopropapp/rento-harmony.git"
$branch = "main"  # or whatever branch you are using

# Function to execute a command and handle errors
function Invoke-CommandWithFeedback {
    param (
        [string]$CommandLine
    )
    Write-Host "Executing: $CommandLine" -ForegroundColor Yellow
    try {
        Invoke-Expression $CommandLine
    }
    catch {
        Write-Error "Command failed: $($_.Exception.Message)"
        exit 1  # Exit the script with a non-zero exit code
    }
}

# Check if Git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed. Please install Git and try again."
    exit 1
}

# Stage all changes
Invoke-CommandWithFeedback "git add ."

# Commit changes
$commitMessage = Read-Host "Enter commit message"
Invoke-CommandWithFeedback "git commit -m `"$commitMessage`""

# Push changes
Write-Host "Pushing to $remoteUrl on branch $branch..." -ForegroundColor Yellow
try {
    Invoke-CommandWithFeedback "git push origin $branch"
    Write-Host "✔ Deployed to $remoteUrl on branch $branch" -ForegroundColor Green
} catch {
    Write-Error "Push failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "Script completed." -ForegroundColor Green


