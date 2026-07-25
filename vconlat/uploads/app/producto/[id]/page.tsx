'use client'

import { use } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Clock,
  MapPin,
  TrendingDown,
  Users,
  Truck,
  Shield,
  Star
} from 'lucide-react'
import { formatPrice, calcularAhorro, formatTimeRemaining } from '@/lib/utils'
import { MOCK_PRODUCTOS, EMOJIS_POR_ID } from '@/lib/mock-data'

interface ProductoPageProps {
  params: Promise<{ id: string }>
}

export default function ProductoPage({ params }: ProductoPageProps) {
  const { id } = use(params)
  const producto = MOCK_PRODUCTOS.find(p => p.id === id) ?? null

  if (!producto) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-6xl">🔍</p>
            <h2 className="text-2xl font-bold">Producto no encontrado</h2>
            <Link href="/" className="text-primary underline">Volver al inicio</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const ahorro = calcularAhorro(producto.precio_unitario, producto.precio_super)
  const grupo = producto.grupo_activo ?? null
  const progreso = grupo
    ? Math.min((grupo.cantidad_actual / grupo.cantidad_objetivo) * 100, 100)
    : 0
  const emoji = EMOJIS_POR_ID[id] ?? '🛒'

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-accent/40 to-muted flex items-center justify-center">
              <span className="text-[10rem] select-none">{emoji}</span>
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {producto.destacado && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Destacado
                  </Badge>
                )}
                {ahorro > 0 && (
                  <Badge className="bg-success text-success-foreground text-base px-3 py-1">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    Ahorra {ahorro}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                {producto.nombre}
              </h1>

              {producto.descripcion && (
                <p className="text-lg text-muted-foreground">
                  {producto.descripcion}
                </p>
              )}

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(producto.precio_unitario)}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    /{producto.unidad}
                  </span>
                </div>
                {producto.precio_super && (
                  <p className="text-muted-foreground">
                    <span className="line-through">{formatPrice(producto.precio_super)}</span>
                    <span className="ml-2 font-medium text-success">
                      en supermercado — ahorrás {formatPrice(producto.precio_super - producto.precio_unitario)}
                    </span>
                  </p>
                )}
              </div>

              <Separator />

              {grupo ? (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-primary" />
                      Grupo de compra activo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">
                        {grupo.cantidad_actual} / {grupo.cantidad_objetivo} {producto.unidad}s
                      </span>
                    </div>
                    <Progress value={progreso} className="h-3" />
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Cierra en {formatTimeRemaining(grupo.fecha_limite)}</span>
                      </div>
                      {grupo.punto_entrega && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{grupo.punto_entrega}</span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full" size="lg">
                      Unirme al grupo
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-6">
                    <p className="mb-4 text-center text-muted-foreground">
                      No hay grupos activos para este producto.
                      <br />
                      Se necesitan mínimo <strong>{producto.minimo_grupal} {producto.unidad}s</strong> para crear un grupo.
                    </p>
                    <Button className="w-full" size="lg">
                      Crear grupo de compra
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 text-center">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Entrega rápida</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 text-center">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Pago seguro</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 text-center">
                  <Star className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Calidad garantizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
