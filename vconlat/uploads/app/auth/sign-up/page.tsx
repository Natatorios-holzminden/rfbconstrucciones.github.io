'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeft, Check } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    barrio: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function updateField(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
        data: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          barrio: formData.barrio,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/auth/sign-up-success')
  }

  const benefits = [
    'Ahorra hasta 35% en tus compras',
    'Productos frescos del productor',
    'Entrega en tu barrio',
    'Sin costo de membresia',
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Benefits */}
      <div className="hidden w-1/2 bg-primary/5 p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="mx-auto max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Conlat</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-foreground">
            Unite a la comunidad de ahorro vecinal
          </h1>
          
          <p className="mt-4 text-lg text-muted-foreground">
            Miles de vecinos ya estan ahorrando comprando juntos. 
            Registrate gratis y empeza a disfrutar los beneficios.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center p-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link 
            href="/" 
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Crear cuenta</CardTitle>
              <CardDescription>
                Completa tus datos para empezar a ahorrar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) => updateField('nombre', e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      placeholder="Tu apellido"
                      value={formData.apellido}
                      onChange={(e) => updateField('apellido', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Telefono</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      placeholder="11 1234-5678"
                      value={formData.telefono}
                      onChange={(e) => updateField('telefono', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barrio">Barrio</Label>
                    <Input
                      id="barrio"
                      placeholder="Ej: Palermo"
                      value={formData.barrio}
                      onChange={(e) => updateField('barrio', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    required
                    minLength={6}
                    disabled={loading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Spinner className="mr-2" /> : null}
                  Crear cuenta
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Al registrarte, aceptas nuestros{' '}
                  <Link href="/terminos" className="text-primary hover:underline">
                    Terminos y Condiciones
                  </Link>
                </p>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Ya tenes cuenta?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Ingresar
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
