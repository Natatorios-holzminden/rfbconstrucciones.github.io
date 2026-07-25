import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Empty } from '@/components/ui/empty'
import { ShoppingBag, Clock, Package, CheckCircle, XCircle } from 'lucide-react'
import { formatPrice, formatTimeRemaining } from '@/lib/utils'

const estadoConfig = {
  pendiente: { label: 'Pendiente', color: 'bg-yellow-500/20 text-yellow-700', icon: Clock },
  pagado: { label: 'Pagado', color: 'bg-blue-500/20 text-blue-700', icon: Package },
  entregado: { label: 'Entregado', color: 'bg-success/20 text-success', icon: CheckCircle },
  cancelado: { label: 'Cancelado', color: 'bg-destructive/20 text-destructive', icon: XCircle },
}

export default async function MisPedidosPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login?next=/mis-pedidos')
  }

  const { data: pedidos } = await supabase
    .from('pedidos')
    .select(`
      *,
      grupo:grupos_compra(
        *,
        producto:productos(*)
      )
    `)
    .eq('usuario_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Mis Pedidos</h1>

          {!pedidos || pedidos.length === 0 ? (
            <Empty
              icon={ShoppingBag}
              title="No tenes pedidos todavia"
              description="Cuando te unas a un grupo de compra, tus pedidos apareceran aca."
            >
              <Link href="/">
                <Button>Ver productos</Button>
              </Link>
            </Empty>
          ) : (
            <div className="space-y-4">
              {pedidos.map((pedido) => {
                const grupo = pedido.grupo
                const producto = grupo?.producto
                const config = estadoConfig[pedido.estado as keyof typeof estadoConfig]
                const Icon = config.icon
                const progreso = grupo 
                  ? Math.min((grupo.cantidad_actual / grupo.cantidad_objetivo) * 100, 100) 
                  : 0

                return (
                  <Card key={pedido.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product image */}
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          {producto?.imagen_url ? (
                            <Image
                              src={producto.imagen_url}
                              alt={producto.nombre}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                              <Package className="h-8 w-8" />
                            </div>
                          )}
                        </div>

                        {/* Order info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {producto?.nombre || 'Producto'}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {pedido.cantidad} {producto?.unidad}s x {formatPrice(pedido.precio_unitario)}
                                </p>
                              </div>
                              <Badge className={config.color}>
                                <Icon className="mr-1 h-3 w-3" />
                                {config.label}
                              </Badge>
                            </div>
                          </div>

                          {/* Group progress */}
                          {grupo && grupo.estado === 'activo' && (
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Progreso del grupo</span>
                                <span>{grupo.cantidad_actual}/{grupo.cantidad_objetivo} - Cierra en {formatTimeRemaining(grupo.fecha_limite)}</span>
                              </div>
                              <Progress value={progreso} className="h-1.5" />
                            </div>
                          )}

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(pedido.total)}
                            </span>
                            <Link href={`/producto/${producto?.id}`}>
                              <Button variant="ghost" size="sm">
                                Ver producto
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
