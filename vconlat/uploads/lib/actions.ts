'use server'

import { createClient } from '@/lib/supabase/server'
import type { Categoria, ProductoConGrupo, GrupoCompra } from '@/lib/types'
import { MOCK_PRODUCTOS } from '@/lib/mock-data'

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('activa', true)
      .order('orden', { ascending: true })
    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export async function getProductos(categoriaId?: string): Promise<ProductoConGrupo[]> {
  try {
    const supabase = await createClient()

    let query = supabase
      .from('productos')
      .select(`*, categoria:categorias(*)`)
      .eq('activo', true)
      .order('destacado', { ascending: false })
      .order('created_at', { ascending: false })

    if (categoriaId) query = query.eq('categoria_id', categoriaId)

    const { data: productos, error } = await query

    if (error || !productos || productos.length === 0) return []

    const productIds = productos.map(p => p.id)
    const { data: grupos } = await supabase
      .from('grupos_compra')
      .select('*')
      .in('producto_id', productIds)
      .eq('estado', 'activo')
      .gt('fecha_limite', new Date().toISOString())

    const gruposMap = new Map<string, GrupoCompra>()
    grupos?.forEach(g => {
      const existing = gruposMap.get(g.producto_id)
      if (!existing || new Date(g.created_at) > new Date(existing.created_at)) {
        gruposMap.set(g.producto_id, g)
      }
    })

    return productos.map(p => ({ ...p, grupo_activo: gruposMap.get(p.id) }))
  } catch {
    return []
  }
}

export async function getProductoById(id: string): Promise<ProductoConGrupo | null> {
  try {
    const supabase = await createClient()

    const { data: producto, error } = await supabase
      .from('productos')
      .select(`*, categoria:categorias(*)`)
      .eq('id', id)
      .single()

    if (error || !producto) {
      return MOCK_PRODUCTOS.find(p => p.id === id) ?? null
    }

    const { data: grupos } = await supabase
      .from('grupos_compra')
      .select('*')
      .eq('producto_id', id)
      .eq('estado', 'activo')
      .gt('fecha_limite', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)

    return { ...producto, grupo_activo: grupos?.[0] || undefined }
  } catch {
    return MOCK_PRODUCTOS.find(p => p.id === id) ?? null
  }
}

export async function getGruposActivos(): Promise<(GrupoCompra & { producto: ProductoConGrupo })[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('grupos_compra')
    .select(`
      *,
      producto:productos(
        *,
        categoria:categorias(*)
      )
    `)
    .eq('estado', 'activo')
    .gt('fecha_limite', new Date().toISOString())
    .order('fecha_limite', { ascending: true })
  
  if (error) {
    console.error('[Conlat] Error fetching grupos:', error)
    return []
  }
  
  return data || []
}
