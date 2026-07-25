import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatPrice, formatTimeRemaining } from "@/lib/utils"
import { Clock, Users, MapPin } from "lucide-react"

async function getGrupos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("grupos_compra")
    .select(`
      *,
      producto:productos(nombre, precio_unitario, unidad, imagen_url)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching grupos:", error)
    return []
  }

  return data || []
}

export default async function AdminGruposPage() {
  const grupos = await getGrupos()

  const gruposActivos = grupos.filter((g: any) => g.estado === "activo")
  const gruposCompletados = grupos.filter((g: any) => g.estado === "completado")
  const gruposCancelados = grupos.filter((g: any) => g.estado === "cancelado")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Grupos de Compra</h1>
        <p className="text-muted-foreground">
          Gestiona los grupos de compra activos y completados
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{gruposActivos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{gruposCompletados.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{gruposCancelados.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Grupos Activos</CardTitle>
          <CardDescription>
            Grupos buscando participantes actualmente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gruposActivos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay grupos activos
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {gruposActivos.map((grupo: any) => {
                const progreso = Math.round((grupo.cantidad_actual / grupo.cantidad_objetivo) * 100)
                return (
                  <div
                    key={grupo.id}
                    className="rounded-lg border p-4 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{grupo.producto?.nombre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(Number(grupo.producto?.precio_unitario || 0))} / {grupo.producto?.unidad}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {grupo.cantidad_actual} / {grupo.cantidad_objetivo}
                        </span>
                        <span className="font-medium">{progreso}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div 
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${Math.min(progreso, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTimeRemaining(grupo.fecha_limite)}
                      </span>
                      {grupo.punto_entrega && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {grupo.punto_entrega}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Ver detalles
                      </Button>
                      {progreso >= 100 && (
                        <Button size="sm" className="flex-1">
                          Completar
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Groups */}
      {gruposCompletados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Grupos Completados</CardTitle>
            <CardDescription>
              Historial de compras grupales exitosas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gruposCompletados.map((grupo: any) => (
                <div
                  key={grupo.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{grupo.producto?.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {grupo.cantidad_objetivo} {grupo.producto?.unidad}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Completado
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
