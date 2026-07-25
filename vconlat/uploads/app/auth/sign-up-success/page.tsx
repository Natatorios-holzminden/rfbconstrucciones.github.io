import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
            <Mail className="h-8 w-8 text-success" />
          </div>
          <CardTitle className="text-2xl">Revisa tu email</CardTitle>
          <CardDescription className="text-base">
            Te enviamos un link de confirmacion a tu casilla de correo.
            Hace click en el link para activar tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Si no ves el email, revisa tu carpeta de spam.
          </p>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              Volver a Ingresar
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full">
              Ir al inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
