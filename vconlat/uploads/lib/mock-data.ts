import type { ProductoConGrupo } from '@/lib/types'

const base = {
  descripcion: null, activo: true, stock_disponible: 100,
  proveedor_id: null, created_at: '', updated_at: '',
}
const grupoBase = {
  producto_id: '', creador_id: '', estado: 'activo' as const,
  fecha_inicio: '', fecha_entrega: null, punto_entrega: null,
  notas: null, created_at: '', updated_at: '',
}

export const MOCK_PRODUCTOS: ProductoConGrupo[] = [
  { ...base, id: '1', nombre: 'Tomates cherry orgánicos', descripcion: 'Tomates cherry frescos de producción orgánica, directos del productor.', precio_unitario: 1200, precio_super: 1900, unidad: 'kg', imagen_url: null, destacado: true, minimo_grupal: 10, categoria_id: 'frutas', grupo_activo: { ...grupoBase, id: 'g1', cantidad_actual: 7, cantidad_objetivo: 10, fecha_limite: new Date(Date.now() + 86400000 * 2).toISOString() } },
  { ...base, id: '2', nombre: 'Leche entera x 1L', descripcion: 'Leche entera de tambo, sin aditivos. Entrega en 24hs.', precio_unitario: 850, precio_super: 1250, unidad: 'unidad', imagen_url: null, destacado: false, minimo_grupal: 20, categoria_id: 'lacteos', grupo_activo: { ...grupoBase, id: 'g2', cantidad_actual: 14, cantidad_objetivo: 20, fecha_limite: new Date(Date.now() + 86400000 * 1).toISOString() } },
  { ...base, id: '3', nombre: 'Asado de tira premium', descripcion: 'Asado de tira de primera calidad, directo del frigorífico. Precio mayorista.', precio_unitario: 4500, precio_super: 6800, unidad: 'kg', imagen_url: null, destacado: true, minimo_grupal: 5, categoria_id: 'carnes' },
  { ...base, id: '4', nombre: 'Manzanas Granny Smith x 1kg', descripcion: 'Manzanas verdes frescas, ideales para comer o cocinar.', precio_unitario: 900, precio_super: 1400, unidad: 'kg', imagen_url: null, destacado: false, minimo_grupal: 15, categoria_id: 'frutas', grupo_activo: { ...grupoBase, id: 'g3', cantidad_actual: 15, cantidad_objetivo: 15, fecha_limite: new Date(Date.now() + 86400000 * 3).toISOString() } },
  { ...base, id: '5', nombre: 'Queso cremoso artesanal', descripcion: 'Queso cremoso elaborado artesanalmente. Sin conservantes.', precio_unitario: 2800, precio_super: 3900, unidad: 'kg', imagen_url: null, destacado: true, minimo_grupal: 8, categoria_id: 'lacteos', grupo_activo: { ...grupoBase, id: 'g4', cantidad_actual: 3, cantidad_objetivo: 8, fecha_limite: new Date(Date.now() + 86400000 * 4).toISOString() } },
  { ...base, id: '6', nombre: 'Aceite de girasol x 1.5L', descripcion: 'Aceite de girasol de primera prensada. Ideal para cocinar.', precio_unitario: 1650, precio_super: 2200, unidad: 'unidad', imagen_url: null, destacado: false, minimo_grupal: 12, categoria_id: 'almacen' },
  { ...base, id: '7', nombre: 'Pan de campo artesanal', descripcion: 'Pan de campo horneado a leña, estilo casero.', precio_unitario: 600, precio_super: 900, unidad: 'unidad', imagen_url: null, destacado: false, minimo_grupal: 10, categoria_id: 'panaderia', grupo_activo: { ...grupoBase, id: 'g5', cantidad_actual: 6, cantidad_objetivo: 10, fecha_limite: new Date(Date.now() + 86400000 * 1).toISOString() } },
  { ...base, id: '8', nombre: 'Pollo entero de granja', descripcion: 'Pollo entero criado en granja, sin jaula. Peso aprox. 2.5kg.', precio_unitario: 3200, precio_super: 4500, unidad: 'kg', imagen_url: null, destacado: true, minimo_grupal: 6, categoria_id: 'carnes', grupo_activo: { ...grupoBase, id: 'g6', cantidad_actual: 4, cantidad_objetivo: 6, fecha_limite: new Date(Date.now() + 86400000 * 2).toISOString() } },
]

export const EMOJIS_POR_ID: Record<string, string> = {
  '1': '🍅', '2': '🥛', '3': '🥩', '4': '🍎',
  '5': '🧀', '6': '🫙', '7': '🥐', '8': '🐔',
}
