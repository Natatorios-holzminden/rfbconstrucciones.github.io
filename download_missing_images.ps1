# Script para descargar las 2 imagenes faltantes
# Las guarda en la carpeta assets/img/external/

$outputDir = "assets\img\external"

Write-Host "Descargando las 2 imagenes faltantes..." -ForegroundColor Green
Write-Host ""

# Las 2 imagenes que faltaban
$images = @(
    @{url="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600"; name="gallery_3_iluminacion.jpg"; desc="Galeria 3 - Iluminacion LED"},
    @{url="https://images.pexels.com/photos/368754/pexels-photo-368754.jpeg?auto=compress&cs=tinysrgb&w=600"; name="gallery_4_pisos.jpg"; desc="Galeria 4 - Pisos"}
)

# Descargar cada imagen
$count = 0
foreach ($img in $images) {
    $count++
    $outputPath = Join-Path $outputDir $img.name
    
    Write-Host "[$count/$($images.Count)] Descargando: $($img.desc)" -ForegroundColor Cyan
    Write-Host "    Archivo: $($img.name)" -ForegroundColor Gray
    
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $outputPath -UseBasicParsing
        Write-Host "    OK Descargado exitosamente" -ForegroundColor Green
    } catch {
        Write-Host "    ERROR al descargar: $_" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Descarga completada!" -ForegroundColor Green
Write-Host "Ahora tienes 12 imagenes en total en: $outputDir" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
