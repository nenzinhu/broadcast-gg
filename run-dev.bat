@echo off
cd /d "%~dp0"

title broadcast-gg - servidor de desenvolvimento
echo.
echo ============================================
echo  Iniciando broadcast-gg (modo desenvolvedor)
echo  http://localhost:3000
echo ============================================
echo.

npm run dev

echo.
echo ============================================
echo  Servidor encerrado. Pressione qualquer tecla para sair.
echo ============================================
pause >nul
