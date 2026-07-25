import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">Conlat</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Comprando juntos, ahorramos todos. La plataforma de compras grupales 
              vecinales de Argentina.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Comprar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Productos</Link></li>
              <li><Link href="/grupos" className="hover:text-foreground">Grupos Activos</Link></li>
              <li><Link href="/categorias" className="hover:text-foreground">Categorias</Link></li>
              <li><Link href="/ofertas" className="hover:text-foreground">Ofertas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/como-funciona" className="hover:text-foreground">Como Funciona</Link></li>
              <li><Link href="/faq" className="hover:text-foreground">Preguntas Frecuentes</Link></li>
              <li><Link href="/contacto" className="hover:text-foreground">Contacto</Link></li>
              <li><Link href="/terminos" className="hover:text-foreground">Terminos y Condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Cuenta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/auth/login" className="hover:text-foreground">Ingresar</Link></li>
              <li><Link href="/auth/sign-up" className="hover:text-foreground">Registrarme</Link></li>
              <li><Link href="/mis-pedidos" className="hover:text-foreground">Mis Pedidos</Link></li>
              <li><Link href="/perfil" className="hover:text-foreground">Mi Perfil</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 Conlat. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Hecho con amor en Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
