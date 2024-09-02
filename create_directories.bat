@echo off
REM Создание структуры директорий для проекта

mkdir C:\jarwis03\my-avito-app
cd C:\jarwis03\my-avito-app

mkdir client
mkdir client\public
mkdir client\src
mkdir client\src\components
mkdir client\src\pages
mkdir client\src\services

mkdir server
mkdir server\controllers
mkdir server\models
mkdir server\routes
mkdir server\services
mkdir server\utils
mkdir server\middleware

mkdir database

echo Структура директорий создана успешно.
pause
