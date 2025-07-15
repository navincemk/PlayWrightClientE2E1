@echo off
echo ========================================
echo   Automated GitHub Project Setup
echo ========================================
echo.

REM Get user inputs
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (default: PlayWrightClientE2E): "
set /p COMMIT_MESSAGE="Enter commit message (default: Initial commit: Playwright E2E test project): "
set /p REPO_VISIBILITY="Make repository public? (y/n, default: y): "

REM Set defaults if empty
if "%REPO_NAME%"=="" set REPO_NAME=PlayWrightClientE2E
if "%COMMIT_MESSAGE%"=="" set COMMIT_MESSAGE=Initial commit: Playwright E2E test project
if "%REPO_VISIBILITY%"=="" set REPO_VISIBILITY=y

echo.
echo ========================================
echo   Step 1: Initializing Git Repository
echo ========================================
git init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Git repository
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Step 2: Creating .gitignore file
echo ========================================
(
echo # Dependencies
echo node_modules/
echo.
echo # Test results
echo test-results/
echo playwright-report/
echo allure-results/
echo allure-report/
echo.
echo # Environment variables
echo .env
echo .env.local
echo.
echo # OS generated files
echo .DS_Store
echo Thumbs.db
echo.
echo # IDE files
echo .vscode/
echo .idea/
echo.
echo # Logs
echo *.log
echo npm-debug.log*
echo.
echo # Runtime data
echo pids
echo *.pid
echo *.seed
echo *.pid.lock
echo.
echo # Coverage directory
echo coverage/
echo.
echo # Playwright specific
echo /test-results/
echo /playwright-report/
echo /blob-report/
echo /playwright/.cache/
) > .gitignore

echo .gitignore file created successfully!

echo.
echo ========================================
echo   Step 3: Adding files to staging
echo ========================================
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files to staging
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Step 4: Creating initial commit
echo ========================================
git commit -m "%COMMIT_MESSAGE%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Step 5: Setting up GitHub repository
echo ========================================
echo Please follow these steps:
echo 1. Go to https://github.com/new
echo 2. Repository name: %REPO_NAME%
if "%REPO_VISIBILITY%"=="y" (
    echo 3. Set as: Public
) else (
    echo 3. Set as: Private
)
echo 4. DO NOT initialize with README
echo 5. Click "Create repository"
echo.
echo Press any key when you have created the repository...
pause

echo.
echo ========================================
echo   Step 6: Adding remote origin
echo ========================================
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote origin
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Step 7: Pushing to GitHub
echo ========================================
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    echo This might be due to authentication issues.
    echo Please check your GitHub credentials.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Project pushed to GitHub
echo ========================================
echo Repository URL: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo You can now:
echo - View your repository online
echo - Clone it to other machines
echo - Collaborate with others
echo.
pause