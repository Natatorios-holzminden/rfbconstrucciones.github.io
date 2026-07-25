'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Minus, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface JoinGroupFormProps {
  grupoId: string
  productoId: string
  precioUnitario: number
  unidad: string
}

export function JoinGroupForm({ 
  grupoId, 
  productoId, 
  precioUnitario, 
  unidad 
}: JoinGroupFormProps) {
  const router = useRouter()
  const [cantidad, setCantidad] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const total = cantidad * precioUnitario

  function incrementar() {
    setCantidad(prev => Math.min(prev + 1, 100))
  }

  function decrementar() {
    setCantidad(prev => Math.max(prev - 1, 1))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login?next=/producto/' + productoId)
      return
    }

    // Create order
    const { error: orderError } = await supabase
      .from('pedidos')
      .insert({
        grupo_id: grupoId,
        usuario_id: user.id,
        cantidad,
        precio_unitario: precioUnitario,
        total,
        estado: 'pendiente'
      })

    if (orderError) {
      if (orderError.code === '23505') {
        setError('Ya te uniste a este grupo. Podes ver tu pedido en "Mis Pedidos".')
      } else {
        setError('Error al unirte al grupo. Intenta de nuevo.')
        console.error('[Conlat] Error creating order:', orderError)
      }
      setLoading(false)
      return
    }

    // Redirect to payment or confirmation
    router.push('/mis-pedidos')
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="cantidad">Cantidad ({unidad}s)</Label>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={decrementar}
            disabled={cantidad <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="cantidad"
            type="number"
            min={1}
            max={100}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-8 w-16 text-center"
          />
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={incrementar}
            disabled={cantidad >= 100}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-muted p-3">
        <span className="text-muted-foreground">Total a pagar</span>
        <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button 
        className="w-full" 
        size="lg"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Spinner className="mr-2" /> : null}
        Unirme al grupo
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        El pago se procesa cuando el grupo alcanza el minimo
      </p>
    </div>
  )
}
