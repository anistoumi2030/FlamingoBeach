@echo off
echo ==========================================
echo   Correction du fichier hosts pour localhost
echo ==========================================
echo.
echo Ce script va ouvrir votre fichier hosts en mode administrateur.
echo Supprimez les '#' devant ces lignes si elles sont commentees :
echo   127.0.0.1       localhost
echo   ::1             localhost
echo.
pause
powershell -Command "Start-Process notepad -ArgumentList 'C:\Windows\System32\drivers\etc\hosts' -Verb runAs"