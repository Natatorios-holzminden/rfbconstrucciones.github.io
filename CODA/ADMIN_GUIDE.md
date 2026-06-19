# 🎉 Panel de Administración - Sistema Completo con Sincronización

## ✨ **Funcionalidad: Gestión Sincronizada**

El panel de administración tiene **DOS secciones independientes** que se sincronizan automáticamente con las páginas públicas:

### 🛏️ **Habitaciones** (24 items)
- Habitaciones individuales
- Guardadas en `localStorage` como `homyRooms`
- ✅ **SINCRONIZADO** con `/habitaciones`

### 🏢 **Departamentos** (12 items)
- Departamentos completos
- Guardados en `localStorage` como `homyApartments`
- ✅ **SINCRONIZADO** con `/departamentos`

---

## 🚀 **Cómo Usar el Panel**

### **1. Acceder al Panel**
```
http://localhost:5173/admin
```
**Contraseña:** `homy2026`

### **2. Cambiar entre Secciones**

Verás **dos tabs** en la parte superior:

```
┌─────────────────────────────────────┐
│  🛏️ Habitaciones (24)  │  🏢 Departamentos (12)  │
└─────────────────────────────────────┘
```

- **Click en "🛏️ Habitaciones"** → Ver y editar habitaciones
- **Click en "🏢 Departamentos"** → Ver y editar departamentos

### **3. Funciones por Sección**

Cada tab tiene sus propios botones:

#### **En Habitaciones:**
- ➕ **Nueva Habitación** → Agregar habitación individual
- 🔄 **Reimportar Habitaciones** → Restaurar las 24 habitaciones desde `data.js`
- ✏️ **Editar** → Modificar cualquier habitación
- 🗑️ **Eliminar** → Borrar habitación

#### **En Departamentos:**
- ➕ **Nuevo Departamento** → Agregar departamento completo
- 🔄 **Reimportar Departamentos** → Restaurar los 12 departamentos originales
- ✏️ **Editar** → Modificar cualquier departamento
- 🗑️ **Eliminar** → Borrar departamento

---

## 📊 **Flujo de Datos (SINCRONIZADO)**

### **Habitaciones:**
```
Panel Admin (Tab Habitaciones)
    ↓
localStorage ('homyRooms')
    ↓
✅ Se refleja en /habitaciones
(Sincronización en tiempo real)
```

### **Departamentos:**
```
Panel Admin (Tab Departamentos)
    ↓
localStorage ('homyApartments')
    ↓
✅ Se refleja en /departamentos
(Sincronización en tiempo real)
```

---

## 🎯 **Sincronización en Tiempo Real**

### **✅ AMBAS secciones están sincronizadas:**

Cuando editas en el panel admin:
1. Los cambios se guardan en `localStorage`
2. Se dispara un evento personalizado
3. La página pública escucha el evento
4. **Se actualiza automáticamente** (sin necesidad de refrescar)

### **Cómo funciona:**

```javascript
// En Admin.jsx
localStorage.setItem('homyRooms', data);
window.dispatchEvent(new Event('homyRoomsUpdated'));

// En ListingSection.jsx
window.addEventListener('homyRoomsUpdated', () => {
    // Actualizar habitaciones
});
```

---

## 💡 **Casos de Uso**

### **Caso 1: Editar Habitación (Sincronizado)**
```
1. Panel Admin → Tab "🛏️ Habitaciones"
2. Busca "Habitación en Palermo"
3. Click "Editar"
4. Cambia precio de 740€ a 800€
5. Guarda
6. Ve a /habitaciones
7. ✅ Precio actualizado a 800€ (sin refrescar)
```

### **Caso 2: Agregar Departamento (Sincronizado)**
```
1. Panel Admin → Tab "🏢 Departamentos"
2. Click "+ Nuevo Departamento"
3. Completa los campos
4. Sube una imagen
5. Guarda
6. Ve a /departamentos
7. ✅ Nuevo departamento aparece (sin refrescar)
```

### **Caso 3: Eliminar Habitación (Sincronizado)**
```
1. Panel Admin → Tab "🛏️ Habitaciones"
2. Busca la habitación a eliminar
3. Click "Eliminar"
4. Confirma
5. Ve a /habitaciones
6. ✅ Habitación eliminada (sin refrescar)
```

---

## 🗂️ **Estructura de localStorage**

```javascript
// Habitaciones (sincronizado con /habitaciones)
localStorage.getItem('homyRooms')
[
  {
    id: "room-1",
    title: "Acogedora habitación en Palermo",
    location: "Palermo",
    price: 740,
    image: [base64 o URL],
    tour3d: true,
    features: ["Individual", "12m²", "Suministros incluidos"],
    description: "Habitación llena de luz...",
    type: "Individual",
    area: 12,
    ...
  },
  ...
]

// Departamentos (sincronizado con /departamentos)
localStorage.getItem('homyApartments')
[
  {
    id: "torre-palermo",
    title: "Torre Palermo View",
    location: "Palermo Hollywood",
    price: 590,
    image: [base64 o URL],
    tour3d: true,
    features: ["Piscina Infinita", "Gimnasio", "Seguridad 24h"],
    description: "Torre moderna con piscina..."
  },
  ...
]
```

---

## 🎨 **Interfaz del Panel**

```
┌─────────────────────────────────────────────────────┐
│  🏠 Panel de Administración                         │
│  24 habitaciones publicadas                         │
│                                                     │
│  [Cerrar Sesión] [🔄 Reimportar] [+ Nueva]        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  🛏️ Habitaciones (24)  │  🏢 Departamentos (12)     │  ← TABS
└─────────────────────────────────────────────────────┘

┌──────────┐  ┌──────────┐  ┌──────────┐
│ [Imagen] │  │ [Imagen] │  │ [Imagen] │
│ Título   │  │ Título   │  │ Título   │
│ 📍 Lugar │  │ 📍 Lugar │  │ 📍 Lugar │
│ 740€/mes │  │ 990€/mes │  │ 850€/mes │
│ [Editar] │  │ [Editar] │  │ [Editar] │
│ [Elimin] │  │ [Elimin] │  │ [Elimin] │
└──────────┘  └──────────┘  └──────────┘
```

---

## 🔧 **Archivos Modificados**

### **Panel de Administración:**
1. ✅ `src/pages/Admin.jsx` - Sistema de tabs + eventos personalizados
2. ✅ `src/pages/Admin.css` - Estilos de tabs

### **Páginas Públicas (Solo Sincronización):**
1. ✅ `src/components/ListingSection.jsx` - Lee desde `localStorage` + escucha eventos
2. ✅ `src/pages/Apartamentos.jsx` - Lee desde `localStorage` + escucha eventos

### **Diseño Visual:**
- ❌ **SIN CAMBIOS** en el diseño de las páginas públicas
- ✅ Solo se agregó la sincronización con `localStorage`

---

## 🆘 **Solución de Problemas**

### **No veo los cambios en la página pública**
```
1. Verifica que guardaste correctamente en el admin
2. Refresca la página pública (F5)
3. Abre la consola del navegador (F12) y busca errores
4. Verifica que localStorage tiene los datos:
   localStorage.getItem('homyRooms')
   localStorage.getItem('homyApartments')
```

### **Los cambios desaparecen al refrescar**
```
Esto NO debería pasar. Si pasa:
1. Verifica que el navegador permite localStorage
2. Revisa si tienes modo incógnito activado
3. Verifica que no estés borrando localStorage
```

### **Quiero empezar de cero**
```
Habitaciones:
1. Tab "🛏️ Habitaciones"
2. Click "🔄 Reimportar Habitaciones"
3. Confirma

Departamentos:
1. Tab "🏢 Departamentos"
2. Click "🔄 Reimportar Departamentos"
3. Confirma
```

### **Quiero borrar TODO**
```javascript
// Consola del navegador (F12):
localStorage.removeItem('homyRooms');
localStorage.removeItem('homyApartments');
location.reload();
```

---

## 🎯 **Resumen**

| Sección | Panel Admin | Página Pública | Sincronizado | Diseño Modificado |
|---------|-------------|----------------|--------------|-------------------|
| **Habitaciones** | ✅ Editable | ✅ Usa `localStorage` | ✅ SÍ | ❌ NO |
| **Departamentos** | ✅ Editable | ✅ Usa `localStorage` | ✅ SÍ | ❌ NO |

---

## 💡 **Ventajas del Sistema**

✅ **Sincronización en Tiempo Real** - Los cambios se reflejan inmediatamente  
✅ **Sin Cambios de Diseño** - Las páginas públicas mantienen su diseño original  
✅ **Datos Separados** - Habitaciones y departamentos independientes  
✅ **Fácil de Usar** - Interfaz intuitiva con tabs  
✅ **Escalable** - Puedes agregar más secciones en el futuro  
✅ **Sin Base de Datos** - Todo funciona con localStorage  

---

## 🚀 **Próximos Pasos Sugeridos**

1. **Prueba el sistema** - Edita habitaciones y departamentos
2. **Verifica la sincronización** - Abre admin y página pública en tabs separados
3. **Agrega contenido** - Crea nuevas habitaciones y departamentos
4. **Experimenta** - Edita, elimina, reimporta

---

**¿Preguntas?** El sistema está completamente funcional con sincronización en tiempo real. ¡Disfruta gestionando tus propiedades! 🎉
