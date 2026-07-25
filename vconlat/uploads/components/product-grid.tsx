'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { CategoryNav } from '@/components/category-nav'
import type { Categoria } from '@/lib/types'
import { MOCK_PRODUCTOS } from '@/lib/mock-data'

const MOCK_CATEGORIAS = [
  { id: 'frutas', nombre: 'Frutas y Verduras', icono: 'apple', descripcion: null, orden: 1, activa: true, created_at: '' },
  { id: 'lacteos', nombre: 'Lácteos', icono: 'milk', descripcion: null, orden: 2, activa: true, created_at: '' },
  { id: 'carnes', nombre: 'Carnes', icono: 'beef', descripcion: null, orden: 3, activa: true, created_at: '' },
  { id: 'panaderia', nombre: 'Panadería', icono: 'croissant', descripcion: null, orden: 4, activa: true, created_at: '' },
  { id: 'almacen', nombre: 'Almacén', icono: 'package', descripcion: null, orden: 5, activa: true, created_at: '' },
]

interface ProductGridProps {
  categorias: Categoria[]
  productosIniciales: never[]
}

export function ProductGrid({ categorias }: ProductGridProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)

  const cats = categorias.length > 0 ? categorias : MOCK_CATEGORIAS

  const productos = categoriaActiva
    ? MOCK_PRODUCTOS.filter(p => p.categoria_id === categoriaActiva)
    : MOCK_PRODUCTOS

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Productos disponibles
          </h2>
          <p className="mt-1 text-muted-foreground">
            Encontrá los mejores precios comprando en grupo
          </p>
        </div>

        <CategoryNav
          categorias={cats}
          categoriaActiva={categoriaActiva}
          onCategoriaChange={setCategoriaActiva}
        />

        {productos.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground">
              No hay productos disponibles en esta categoría
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
