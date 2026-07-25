'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Apple,
  Beef,
  Milk,
  Croissant,
  Package,
  CupSoda,
  LayoutGrid
} from 'lucide-react'
import type { Categoria } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  apple: Apple,
  beef: Beef,
  milk: Milk,
  croissant: Croissant,
  package: Package,
  'cup-soda': CupSoda,
}

interface CategoryNavProps {
  categorias: Categoria[]
  categoriaActiva: string | null
  onCategoriaChange: (id: string | null) => void
}

export function CategoryNav({
  categorias,
  categoriaActiva,
  onCategoriaChange
}: CategoryNavProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        <Button
          variant={categoriaActiva === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoriaChange(null)}
          className="flex items-center gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
          <span>Todos</span>
        </Button>

        {categorias.map((categoria) => {
          const IconComponent = iconMap[categoria.icono || ''] || Package
          const isActive = categoriaActiva === categoria.id

          return (
            <Button
              key={categoria.id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoriaChange(categoria.id)}
              className={cn(
                "flex items-center gap-2",
                isActive && "bg-primary text-primary-foreground"
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span>{categoria.nombre}</span>
            </Button>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
