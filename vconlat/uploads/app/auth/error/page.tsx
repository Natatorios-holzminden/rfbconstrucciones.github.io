import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Error de autenticacion</CardTitle>
          <CardDescription className="text-base">
            Hubo un problema al verificar tu cuenta. 
            El link puede haber expirado o ya fue utilizado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/auth/login">
            <Button className="w-full">
              Volver a intentar
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
