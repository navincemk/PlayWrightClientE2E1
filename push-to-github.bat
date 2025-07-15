@echo off
echo ========================================
echo   Automated GitHub Project Setup
echo ========================================
echo.

REM Configure Git to handle SSL certificates
echo Configuring Git for SSL certificate handling...
git config --global http.sslverify false
git config --global http.sslBackend schannel
echo Git SSL configuration updated!
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
if exist .git (
    echo Git repository already exists, skipping initialization...
) else (
    git init
    if %errorlevel% neq 0 (
        echo ERROR: Failed to initialize Git repository
        pause
        exit /b 1
    )
    echo Git repository initialized successfully!
)

echo.
echo ========================================
echo   Step 2: Creating .gitignore file
echo ========================================
if exist .gitignore (
    echo .gitignore file already exists, skipping creation...
) else (
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
)

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
echo Files added to staging successfully!

echo.
echo ========================================
echo   Step 4: Creating initial commit
echo ========================================
git commit -m "%COMMIT_MESSAGE%"
if %errorlevel% neq 0 (
    echo Note: No changes to commit (might already be committed)
) else (
    echo Commit created successfully!
)

echo.
echo ========================================
echo   Step 5: MANUAL ACTION REQUIRED
echo ========================================
echo.
echo *** IMPORTANT: You need to create the GitHub repository manually ***
echo.
echo Please follow these steps EXACTLY:
echo.
echo 1. Open your web browser
echo 2. Go to: https://github.com/new
echo 3. Repository name: %REPO_NAME%
if "%REPO_VISIBILITY%"=="y" (
    echo 4. Select: Public repository
) else (
    echo 4. Select: Private repository
)
echo 5. IMPORTANT: DO NOT check "Add a README file"
echo 6. IMPORTANT: DO NOT add .gitignore
echo 7. IMPORTANT: DO NOT choose a license
echo 8. Click "Create repository"
echo.
echo After creating the repository, you'll see a page with setup instructions.
echo IGNORE those instructions and come back here.
echo.
echo *** Press ANY KEY after you have successfully created the repository ***
pause

echo.
echo ========================================
echo   Step 6: Adding remote origin
echo ========================================
REM Remove existing remote if it exists
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote origin
    echo Please check your username and repository name are correct.
    pause
    exit /b 1
)
echo Remote origin added successfully!

echo.
echo ========================================
echo   Step 7: Pushing to GitHub
echo ========================================
echo Pushing your code to GitHub...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    echo.
    echo Possible reasons:
    echo 1. Repository name is incorrect
    echo 2. Authentication issues (you may need to set up a Personal Access Token)
    echo 3. Repository was not created properly on GitHub
    echo.
    echo Please check and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Project pushed to GitHub
echo ========================================
echo Repository URL: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo Your project is now available on GitHub!
echo You can:
echo - View your repository at the URL above
echo - Clone it to other machines
echo - Collaborate with others
echo - Use it as a backup of your work
echo.
echo *** Open your web browser and visit the repository URL to verify ***
echo.
pause