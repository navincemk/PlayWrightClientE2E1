@echo off
echo ========================================
echo   Fully Automated GitHub Setup (with GitHub CLI)
echo ========================================
echo.

REM Configure Git to handle SSL certificates
echo Configuring Git for SSL certificate handling...
git config --global http.sslverify false
git config --global http.sslBackend schannel
echo Git SSL configuration updated!
echo.

REM Check if GitHub CLI is installed
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo GitHub CLI is not installed.
    echo Please install it from: https://cli.github.com/
    echo Or use the manual script: push-to-github.bat
    pause
    exit /b 1
)

REM Check if user is authenticated with GitHub CLI
echo Checking GitHub CLI authentication...
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo You are not logged in to GitHub CLI.
    echo Please authenticate first by running: gh auth login
    echo Then run this script again.
    pause
    exit /b 1
)

REM Show current authenticated user
echo Current GitHub user:
gh api user --jq .login
echo.

REM Get user inputs
set /p REPO_NAME="Enter repository name (default: PlayWrightClientE2E): "
set /p COMMIT_MESSAGE="Enter commit message (default: Initial commit: Playwright E2E test project): "
set /p REPO_VISIBILITY="Make repository public? (y/n, default: y): "

REM Set defaults
if "%REPO_NAME%"=="" set REPO_NAME=PlayWrightClientE2E
if "%COMMIT_MESSAGE%"=="" set COMMIT_MESSAGE=Initial commit: Playwright E2E test project
if "%REPO_VISIBILITY%"=="" set REPO_VISIBILITY=y

if "%REPO_VISIBILITY%"=="y" (
    set VISIBILITY_FLAG=--public
) else (
    set VISIBILITY_FLAG=--private
)

echo.
echo ========================================
echo   Initializing and pushing to GitHub...
echo ========================================

REM Initialize git if not already done
if not exist .git (
    git init
)

REM Create .gitignore if not exists
if not exist .gitignore (
    echo Creating .gitignore...
    echo # Dependencies > .gitignore
    echo node_modules/ >> .gitignore
    echo. >> .gitignore
    echo # Test results >> .gitignore
    echo test-results/ >> .gitignore
    echo playwright-report/ >> .gitignore
    echo allure-results/ >> .gitignore
    echo allure-report/ >> .gitignore
    echo. >> .gitignore
    echo # Environment variables >> .gitignore
    echo .env >> .gitignore
    echo .env.local >> .gitignore
    echo. >> .gitignore
    echo # OS generated files >> .gitignore
    echo .DS_Store >> .gitignore
    echo Thumbs.db >> .gitignore
    echo. >> .gitignore
    echo # IDE files >> .gitignore
    echo .vscode/ >> .gitignore
    echo .idea/ >> .gitignore
    echo. >> .gitignore
    echo # Logs >> .gitignore
    echo *.log >> .gitignore
    echo npm-debug.log* >> .gitignore
    echo. >> .gitignore
    echo # Playwright specific >> .gitignore
    echo /test-results/ >> .gitignore
    echo /playwright-report/ >> .gitignore
    echo /blob-report/ >> .gitignore
    echo /playwright/.cache/ >> .gitignore
)

REM Add and commit files
git add .
git commit -m "%COMMIT_MESSAGE%"

REM Create repository and push using GitHub CLI
gh repo create %REPO_NAME% %VISIBILITY_FLAG% --source=. --remote=origin --push

echo.
echo ========================================
echo   SUCCESS! Repository created and code pushed!
echo ========================================
echo Repository URL: https://github.com/$(gh api user --jq .login)/%REPO_NAME%
echo.
pause