import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, ShoppingCart, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"

async function getStats() {
  const supabase = await createClient()
  
  const [
    { count: productosCount },
    { count: gruposActivosCount },
    { count: gruposCompletadosCount },
    { data: pedidosData },
    { data: gruposRecientes }
  ] = await Promise.all([
    supabase.from("productos").select("*", { count: "exact", head: true }).eq("activo", true),
    supabase.from("grupos_compra").select("*", { count: "exact", head: true }).eq("estado", "activo"),
    supabase.from("grupos_compra").select("*", { count: "exact", head: true }).eq("estado", "completado"),
    supabase.from("pedidos").select("total"),
    supabase.from("grupos_compra")
      .select(`
        *,
        producto:productos(nombre, precio_unitario)
      `)
      .order("created_at", { ascending: false })
      .limit(5)
  ])

  const totalVentas = pedidosData?.reduce((sum, p) => sum + Number(p.total), 0) || 0

  return {
    productosCount: productosCount || 0,
    gruposActivosCount: gruposActivosCount || 0,
    gruposCompletadosCount: gruposCompletadosCount || 0,
    totalVentas,
    gruposRecientes: gruposRecientes || []
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de Conlat
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productosCount}</div>
            <p className="text-xs text-muted-foreground">
              productos en catálogo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Activos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gruposActivosCount}</div>
            <p className="text-xs text-muted-foreground">
              grupos buscando participantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gruposCompletadosCount}</div>
            <p className="text-xs text-muted-foreground">
              compras grupales exitosas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalVentas)}</div>
            <p className="text-xs text-muted-foreground">
              en pedidos procesados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Grupos de Compra Recientes</CardTitle>
          <CardDescription>
            Últimos grupos creados en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.gruposRecientes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No hay grupos de compra aún
              </p>
            ) : (
              stats.gruposRecientes.map((grupo: any) => (
                <div
                  key={grupo.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{grupo.producto?.nombre || "Producto"}</p>
                    <p className="text-sm text-muted-foreground">
                      {grupo.cantidad_actual} / {grupo.cantidad_objetivo} unidades
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      grupo.estado === "activo" 
                        ? "bg-green-100 text-green-800" 
                        : grupo.estado === "completado"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {grupo.estado}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatPrice(Number(grupo.producto?.precio_unitario || 0))}/u
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
