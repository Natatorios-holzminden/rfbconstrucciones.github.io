'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Users, Clock, TrendingDown, Truck, Shield, Star, MapPin } from 'lucide-react'
import type { ProductoConGrupo } from '@/lib/types'
import { formatPrice, calcularAhorro, formatTimeRemaining } from '@/lib/utils'
import { EMOJIS_POR_ID } from '@/lib/mock-data'

interface ProductCardProps {
  producto: ProductoConGrupo
}

export function ProductCard({ producto }: ProductCardProps) {
  const [open, setOpen] = useState(false)
  const ahorro = calcularAhorro(producto.precio_unitario, producto.precio_super)
  const grupo = producto.grupo_activo ?? null
  const progreso = grupo
    ? Math.min((grupo.cantidad_actual / grupo.cantidad_objetivo) * 100, 100)
    : 0
  const emoji = EMOJIS_POR_ID[producto.id] ?? '🛒'

  return (
    <>
      {/* Card */}
      <Card
        className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-accent/40 to-muted flex items-center justify-center">
          <span className="text-6xl select-none transition-transform group-hover:scale-110">
            {emoji}
          </span>

          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {producto.destacado && (
              <Badge className="bg-secondary text-secondary-foreground text-[10px]">
                Destacado
              </Badge>
            )}
            {ahorro > 0 && (
              <Badge className="bg-success text-success-foreground text-[10px]">
                <TrendingDown className="mr-1 h-3 w-3" />
                {ahorro}% menos
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-1">
            {producto.nombre}
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(producto.precio_unitario)}
            </span>
            <span className="text-sm text-muted-foreground">/{producto.unidad}</span>
          </div>

          {producto.precio_super && (
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="line-through">{formatPrice(producto.precio_super)}</span>
              <span className="ml-1 text-success">en super</span>
            </p>
          )}

          {grupo ? (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {grupo.cantidad_actual}/{grupo.cantidad_objetivo}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTimeRemaining(grupo.fecha_limite)}
                </span>
              </div>
              <Progress value={progreso} className="h-1.5" />
              <Button className="w-full" size="sm" onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
                Unirme al grupo
              </Button>
            </div>
          ) : (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">
                Mín. {producto.minimo_grupal} {producto.unidad}s para grupo
              </p>
              <Button variant="outline" className="mt-2 w-full" size="sm" onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
                Crear grupo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sheet de detalle */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4">
            <div className="flex items-center justify-center h-48 rounded-xl bg-gradient-to-br from-accent/40 to-muted text-8xl select-none mb-2">
              {emoji}
            </div>
            <SheetTitle className="text-2xl font-bold text-left">
              {producto.nombre}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5">
            {/* Precio */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(producto.precio_unitario)}
                </span>
                <span className="text-muted-foreground">/{producto.unidad}</span>
              </div>
              {producto.precio_super && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Super: <span className="line-through">{formatPrice(producto.precio_super)}</span>
                  {ahorro > 0 && (
                    <span className="ml-2 font-semibold text-success">
                      Ahorrás {ahorro}% comprando en grupo
                    </span>
                  )}
                </p>
              )}
            </div>

            {producto.descripcion && (
              <p className="text-muted-foreground">{producto.descripcion}</p>
            )}

            <Separator />

            {/* Grupo activo */}
            {grupo ? (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Grupo activo
                </h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{grupo.cantidad_actual}/{grupo.cantidad_objetivo} {producto.unidad}s</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeRemaining(grupo.fecha_limite)}
                  </span>
                </div>
                <Progress value={progreso} className="h-2" />
                {grupo.punto_entrega && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {grupo.punto_entrega}
                  </p>
                )}
                <Button className="w-full" size="lg">
                  Unirme al grupo
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border p-4 space-y-3 text-center">
                <p className="text-muted-foreground text-sm">
                  No hay grupos activos. Se necesitan mínimo{' '}
                  <strong>{producto.minimo_grupal} {producto.unidad}s</strong> para crear uno.
                </p>
                <Button className="w-full" size="lg">
                  Crear grupo de compra
                </Button>
              </div>
            )}

            <Separator />

            {/* Beneficios */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Entrega rápida' },
                { icon: Shield, label: 'Pago seguro' },
                { icon: Star, label: 'Calidad garantizada' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-lg bg-muted/50 p-3 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
