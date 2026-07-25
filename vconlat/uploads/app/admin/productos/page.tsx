import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

async function getProductos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("productos")
    .select(`
      *,
      categoria:categorias(nombre)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching productos:", error)
    return []
  }

  return data || []
}

export default async function AdminProductosPage() {
  const productos = await getProductos()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Administra el catálogo de productos disponibles
          </p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>
            {productos.length} productos en total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Producto
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Categoría
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Precio Grupal
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Precio Super
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Mínimo
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Estado
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto: any) => (
                  <tr key={producto.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {producto.imagen_url && (
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                            <Image
                              src={producto.imagen_url}
                              alt={producto.nombre}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{producto.nombre}</p>
                          <p className="text-xs text-muted-foreground">
                            {producto.unidad}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">
                        {producto.categoria?.nombre || "-"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-primary">
                        {formatPrice(Number(producto.precio_unitario))}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground">
                        {producto.precio_super 
                          ? formatPrice(Number(producto.precio_super))
                          : "-"
                        }
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">
                        {producto.minimo_grupal} {producto.unidad}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        producto.activo 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {producto.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
