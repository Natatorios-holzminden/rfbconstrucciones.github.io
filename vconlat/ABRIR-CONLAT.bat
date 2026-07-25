@echo off
cd /d "%~dp0"
echo.
echo  CONLAT ACTUALIZADO + Comparador de precios
echo  http://localhost:8878/Conlat%%20Mobile%%20Preview.html
echo  Comparador: http://localhost:8878/comparador-unificado.html
echo.
start "" "http://localhost:8878/Conlat%20Mobile%20Preview.html"
py -m http.server 8878
