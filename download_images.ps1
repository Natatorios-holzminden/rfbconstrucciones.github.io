# Script para descargar todas las imagenes externas de la pagina web
# Las guarda en la carpeta assets/img/external/

# Crear carpeta para imagenes externas si no existe
$outputDir = "assets\img\external"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Descargando imagenes externas..." -ForegroundColor Green
Write-Host ""

# Lista de todas las URLs de imagenes externas encontradas en index.html
$images = @(
    # Review images (header section)
    @{url="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"; name="review_1.jpg"; desc="Review 1 - Mariana Fabbiani"},
    @{url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400"; name="review_2.jpg"; desc="Review 2 - Nazarena Velez"},
    @{url="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"; name="review_3.jpg"; desc="Review 3 - Laura Ubfal"},
    
    # Video section
    @{url="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1290&auto=format&fit=crop"; name="video_background.jpg"; desc="Video Background - Construccion"},
    
    # Services section
    @{url="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800"; name="service_1_eficiencia.jpg"; desc="Eficiencia Constructiva"},
    @{url="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800"; name="service_2_direccion.jpg"; desc="Direccion de Obra"},
    
    # About section
    @{url="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"; name="about_1.jpg"; desc="About - Arquitecto"},
    @{url="https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=800"; name="about_2_stats.jpg"; desc="About - Estadisticas"},
    
    # Gallery/Blog section
    @{url="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"; name="gallery_1.jpg"; desc="Galeria - Proyecto 1"},
    @{url="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800"; name="gallery_2.jpg"; desc="Galeria - Proyecto 2"}
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
Write-Host "Las imagenes estan en: $outputDir" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCCIONES PARA REEMPLAZAR:" -ForegroundColor Magenta
Write-Host "1. Revisa las imagenes en la carpeta: $outputDir" -ForegroundColor White
Write-Host "2. Reemplaza las que no te gusten con tus propias imagenes" -ForegroundColor White
Write-Host "3. Manten los mismos nombres de archivo" -ForegroundColor White
Write-Host "4. Ejecuta el script 'update_html.ps1' para actualizar el HTML" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Yellow
