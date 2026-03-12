# GUÍA DE IMÁGENES DE LA PÁGINA WEB - COMPLETA
# ===============================================

Este documento te ayuda a identificar qué imagen corresponde a cada sección de la página web.

## 📍 UBICACIÓN DE LAS IMÁGENES
Todas las imágenes externas están en: `assets/img/external/`

## 📋 LISTADO COMPLETO DE LAS 12 IMÁGENES

### 1️⃣ SECCIÓN HEADER - Reviews/Testimonios (arriba de la página)
- **review_1.jpg** - Foto de mujer 1 (Mariana Fabbiani)
- **review_2.jpg** - Foto de mujer 2 (Nazarena Velez)  
- **review_3.jpg** - Foto de mujer 3 (Laura Ubfal)
📌 Estas son las 3 fotos circulares pequeñas que aparecen en el header junto a "94% Tasa de Satisfacción"

### 2️⃣ SECCIÓN "CÓMO FUNCIONA" - Video Background
- **video_background.jpg** - Imagen de fondo del video de construcción
📌 Esta es la imagen grande con el botón de play en el medio

### 3️⃣ SECCIÓN "SERVICIOS" - Excelencia Técnica
- **service_1_eficiencia.jpg** - Imagen de "Eficiencia Constructiva" (trabajadores con planos)
- **service_2_direccion.jpg** - Imagen de "Dirección de Obra Profesional" (planos/blueprints)
📌 Estas son las 2 imágenes grandes en la sección de servicios

### 4️⃣ SECCIÓN "NOSOTROS" - About
- **about_1.jpg** - Imagen vertical de arquitecto con casco
- **about_2_stats.jpg** - Imagen con estadísticas (15 años, 98%, 450+)
📌 La primera es vertical a la izquierda, la segunda es horizontal con números

### 5️⃣ SECCIÓN "GALERÍA" - Proyectos y Blog
- **gallery_1.jpg** - Proyecto principal (Renovación Total) - IMAGEN GRANDE IZQUIERDA
- **gallery_2.jpg** - "Pequeños cambios, grandes resultados" - PRIMERA IMAGEN DERECHA
- **gallery_3_iluminacion.jpg** - "La importancia de la iluminación LED" - SEGUNDA IMAGEN DERECHA
- **gallery_4_pisos.jpg** - "Pisos: ¿Madera natural, porcelanato o flotante?" - TERCERA IMAGEN DERECHA
📌 1 imagen grande a la izquierda + 3 imágenes pequeñas a la derecha

## 🔄 CÓMO REEMPLAZAR LAS IMÁGENES

### Opción 1: Reemplazar directamente (RECOMENDADO)
1. Ve a la carpeta: `assets/img/external/`
2. Reemplaza cualquier imagen con tu propia foto
3. **IMPORTANTE:** Mantén el mismo nombre de archivo
4. Recarga la página en el navegador (F5 o Ctrl+R)

### Opción 2: Cambiar las rutas en el HTML
Si quieres usar nombres diferentes, edita el archivo `index.html`:
- Líneas 122-129: Reviews (header)
- Línea 212: Video background
- Línea 232: Service 1 (Eficiencia)
- Línea 270: Service 2 (Dirección)
- Línea 297: About 1 (Arquitecto)
- Línea 310: About 2 (Stats)
- Línea 781: Gallery 1 (principal)
- Línea 797: Gallery 2 (decoración)
- Línea 812: Gallery 3 (iluminación)
- Línea 827: Gallery 4 (pisos)

## 📐 TAMAÑOS RECOMENDADOS

### Imágenes pequeñas:
- **review_1/2/3.jpg**: 400x400px (cuadradas)

### Imágenes medianas:
- **gallery_2/3/4.jpg**: 600x400px (horizontal)

### Imágenes grandes:
- **video_background.jpg**: 1290x800px (horizontal)
- **service_1/2.jpg**: 800x600px (horizontal)
- **about_2_stats.jpg**: 800x600px (horizontal)
- **gallery_1.jpg**: 800x600px (horizontal)

### Imágenes verticales:
- **about_1.jpg**: 410x600px (vertical)

## 💡 CONSEJOS

✅ Usa imágenes de alta calidad (mínimo 800px de ancho para las grandes)
✅ Mantén los nombres de archivo exactamente iguales
✅ Usa formato JPG para fotos (más liviano que PNG)
✅ Usa PNG solo si necesitas transparencia
✅ Optimiza las imágenes antes de subirlas (usa tinypng.com o compressor.io)
✅ Asegúrate de que las imágenes sean relevantes al contenido de arquitectura

## 📝 DESCRIPCIÓN DE CADA IMAGEN

1. **review_1/2/3.jpg**: Fotos de personas (clientes satisfechos)
2. **video_background.jpg**: Obra en construcción o planos
3. **service_1_eficiencia.jpg**: Trabajadores con planos o en obra
4. **service_2_direccion.jpg**: Planos técnicos o blueprints
5. **about_1.jpg**: Arquitecto profesional con casco
6. **about_2_stats.jpg**: Imagen de fondo para estadísticas
7. **gallery_1.jpg**: Proyecto de renovación completa (living/comedor)
8. **gallery_2.jpg**: Cocina moderna minimalista
9. **gallery_3_iluminacion.jpg**: Cocina con iluminación LED
10. **gallery_4_pisos.jpg**: Detalle de pisos de madera

## 🎨 SUGERENCIAS DE CONTENIDO

Para que tu página se vea profesional, te recomiendo usar imágenes que muestren:
- ✅ Proyectos reales de arquitectura argentina
- ✅ Espacios modernos y luminosos
- ✅ Antes y después de renovaciones
- ✅ Detalles constructivos de calidad
- ✅ Fotos de tu equipo de trabajo real

Evita:
- ❌ Imágenes genéricas de stock
- ❌ Fotos de baja calidad o pixeladas
- ❌ Imágenes que no representen tu trabajo
- ❌ Fotos con marcas de agua

## 🔧 SOLUCIÓN DE PROBLEMAS

**Problema:** La imagen no se ve después de reemplazarla
**Solución:** 
1. Verifica que el nombre sea exactamente igual
2. Limpia el caché del navegador (Ctrl+Shift+R)
3. Verifica que la imagen esté en formato JPG o PNG

**Problema:** La imagen se ve distorsionada
**Solución:** 
1. Verifica que tenga el tamaño recomendado
2. Usa proporciones similares a las originales
3. Asegúrate de que la imagen tenga buena resolución
