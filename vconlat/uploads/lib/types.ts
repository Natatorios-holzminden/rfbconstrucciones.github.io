export interface Categoria {
  id: string
  nombre: string
  descripcion: string | null
  icono: string | null
  orden: number
  activa: boolean
  created_at: string
}

export interface Producto {
  id: string
  nombre: string
  descripcion: string | null
  imagen_url: string | null
  categoria_id: string | null
  unidad: string
  precio_unitario: number
  precio_super: number | null
  minimo_grupal: number
  stock_disponible: number
  proveedor_id: string | null
  activo: boolean
  destacado: boolean
  created_at: string
  updated_at: string
  categoria?: Categoria
}

export interface GrupoCompra {
  id: string
  producto_id: string
  creador_id: string
  estado: 'activo' | 'completado' | 'cancelado' | 'entregado'
  cantidad_actual: number
  cantidad_objetivo: number
  fecha_inicio: string
  fecha_limite: string
  fecha_entrega: string | null
  punto_entrega: string | null
  notas: string | null
  created_at: string
  updated_at: string
  producto?: Producto
}

export interface Profile {
  id: string
  email: string
  nombre: string
  apellido: string | null
  telefono: string | null
  direccion: string | null
  barrio: string | null
  rol: 'vecino' | 'admin' | 'proveedor'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Pedido {
  id: string
  grupo_id: string
  usuario_id: string
  cantidad: number
  precio_unitario: number
  total: number
  estado: 'pendiente' | 'pagado' | 'entregado' | 'cancelado'
  notas: string | null
  created_at: string
  updated_at: string
  grupo?: GrupoCompra
}

export interface Pago {
  id: string
  pedido_id: string
  usuario_id: string
  monto: number
  metodo: 'mercadopago' | 'transferencia' | 'efectivo'
  estado: 'pendiente' | 'procesando' | 'completado' | 'fallido' | 'reembolsado'
  referencia_externa: string | null
  created_at: string
  updated_at: string
}

export interface Calificacion {
  id: string
  producto_id: string | null
  grupo_id: string | null
  usuario_id: string
  puntuacion: number
  comentario: string | null
  created_at: string
}

// Utility type for products with active groups
export interface ProductoConGrupo extends Producto {
  grupo_activo?: GrupoCompra
}
