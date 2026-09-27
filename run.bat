@echo off
title TaskMind - Student Productivity App
cd /d "%~dp0"
color 0B

:menu
cls
echo.
echo  =============================================================
echo     TaskMind - AI Student Productivity Suite
echo     React Native + Expo SDK 52  ^|  Cross-Platform Web ^& Mobile
echo  =============================================================
echo.
echo  Please select an action:
echo.
echo    [1] Start Web App              (Expo Web at http://localhost:8081)
echo    [2] Start Mobile (Expo Go)     (Scan QR code with Expo Go app)
echo    [3] Start with Tunnel          (For mobile devices across networks)
echo    [4] Start with Clean Cache     (Clears Metro bundler cache)
echo    [5] Build Web Export           (Export static bundle to /dist)
echo    [6] Serve Production Build     (Preview static /dist locally)
echo    [7] Install / Update Packages  (Run npm install)
echo    [8] Exit
echo.
set "choice="
set /p choice="  Enter choice [1-8]: "
if not defined choice goto menu
set "choice=%choice: =%"

if "%choice%"=="1" goto web
if "%choice%"=="2" goto mobile
if "%choice%"=="3" goto tunnel
if "%choice%"=="4" goto clean
if "%choice%"=="5" goto build
if "%choice%"=="6" goto serve
if "%choice%"=="7" goto install
if "%choice%"=="8" goto exit
if /i "%choice%"=="q" goto exit

echo.
echo  [WARN] Invalid selection. Please choose a valid number (1-8).
echo.
pause
goto menu

:check_node
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js was not found in your PATH!
    echo  Please install Node.js (v18+) from https://nodejs.org/
    echo.
    pause
    goto menu
)
if not exist "node_modules\" (
    echo.
    echo  [NOTE] node_modules folder is missing.
    echo  Installing dependencies first...
    echo.
    call npm install
)
exit /b 0

:web
cls
call :check_node
echo.
echo  -------------------------------------------------------------
echo   [*] Starting TaskMind Web App...
echo   [*] URL: http://localhost:8081
echo   [*] Press Ctrl+C in this terminal to stop the server
echo  -------------------------------------------------------------
echo.
call npx expo start --web
echo.
pause
goto menu

:mobile
cls
call :check_node
echo.
echo  -------------------------------------------------------------
echo   [*] Starting Expo Go for Mobile...
echo   [*] Scan the QR code below with the Expo Go app (iOS / Android)
echo   [*] Press Ctrl+C in this terminal to stop the server
echo  -------------------------------------------------------------
echo.
call npx expo start
echo.
pause
goto menu

:tunnel
cls
call :check_node
echo.
echo  -------------------------------------------------------------
echo   [*] Starting Expo with Tunnel...
echo   [*] Helpful when your phone and PC are on different Wi-Fi networks
echo  -------------------------------------------------------------
echo.
call npx expo start --tunnel
echo.
pause
goto menu

:clean
cls
call :check_node
echo.
echo  -------------------------------------------------------------
echo   [*] Resetting Metro cache and launching Web...
echo  -------------------------------------------------------------
echo.
call npx expo start -c --web
echo.
pause
goto menu

:build
cls
call :check_node
echo.
echo  -------------------------------------------------------------
echo   [*] Exporting production Web bundle to /dist ...
echo  -------------------------------------------------------------
echo.
call npx expo export -p web
if %errorlevel% equ 0 (
    echo.
    echo  [SUCCESS] Production bundle created in the /dist folder!
) else (
    echo.
    echo  [ERROR] Web export encountered an error.
)
echo.
pause
goto menu

:serve
cls
echo.
if not exist "dist\" (
    echo  [WARN] The /dist folder was not found!
    echo  Please run option [5] (Build Web Export) first.
    echo.
    pause
    goto menu
)
echo  -------------------------------------------------------------
echo   [*] Serving static production build from /dist ...
echo   [*] Press Ctrl+C to stop the static web server
echo  -------------------------------------------------------------
echo.
call npx serve dist
echo.
pause
goto menu

:install
cls
echo.
echo  -------------------------------------------------------------
echo   [*] Running npm install...
echo  -------------------------------------------------------------
echo.
call npm install
echo.
echo  [SUCCESS] Package installation finished.
echo.
pause
goto menu

:exit
cls
echo.
echo  Thank you for using TaskMind. Happy studying!
echo.
exit /b 0
