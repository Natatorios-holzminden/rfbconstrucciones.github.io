import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingDown, Truck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const floatingCards = [
  { emoji: '🥦', nombre: 'Brócoli orgánico', ahorro: '38%', usuarios: 12 },
  { emoji: '🥩', nombre: 'Asado de tira', ahorro: '31%', usuarios: 8 },
  { emoji: '🥛', nombre: 'Leche entera x6', ahorro: '27%', usuarios: 20 },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30 py-14 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">

          {/* Left — texto */}
          <div className="flex flex-col items-start">
            <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" />
              500+ vecinos activos ahora
            </Badge>

            <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]">
              Comprá con tus{' '}
              <span className="relative text-primary">
                vecinos
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C47 1.5 153 1.5 199 5.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              {' '}y ahorrá hasta{' '}
              <span className="text-primary">35%</span>
            </h1>

            <p className="mt-5 max-w-md text-lg text-muted-foreground leading-relaxed">
              Grupos de compra vecinales directo del productor. Sin intermediarios, más frescura, mejores precios para todos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2 rounded-full px-6 text-base font-semibold shadow-md shadow-primary/20">
                  Empezar a ahorrar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/como-funciona">
                <Button variant="outline" size="lg" className="rounded-full px-6 text-base">
                  Cómo funciona
                </Button>
              </Link>
            </div>

            {/* Stats inline */}
            <div className="mt-10 flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <TrendingDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">35%</p>
                  <p className="text-xs text-muted-foreground">Ahorro prom.</p>
                </div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">500+</p>
                  <p className="text-xs text-muted-foreground">Vecinos</p>
                </div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">24hs</p>
                  <p className="text-xs text-muted-foreground">Entrega</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — cards flotantes */}
          <div className="relative hidden md:flex flex-col gap-3 items-end">
            {/* Card grande central */}
            <div className="w-72 rounded-2xl bg-white shadow-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🛒</span>
                <div>
                  <p className="font-bold text-foreground text-sm">Grupo activo en tu zona</p>
                  <p className="text-xs text-muted-foreground">Palermo · cierra en 2 días</p>
                </div>
              </div>
              <div className="space-y-2">
                {floatingCards.map((item) => (
                  <div key={item.nombre} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-xs font-medium text-foreground">{item.nombre}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-green-600">-{item.ahorro}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <Users className="h-3 w-3" />{item.usuarios}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-3 rounded-xl" size="sm">
                Unirme al grupo
              </Button>
            </div>

            {/* Badge flotante arriba */}
            <div className="absolute -top-4 -left-4 bg-green-500 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-bold rotate-[-6deg]">
              ¡Nuevo grupo! 🎉
            </div>

            {/* Badge flotante abajo */}
            <div className="absolute -bottom-2 left-0 bg-white border border-border rounded-xl px-3 py-2 shadow-md flex items-center gap-2">
              <span className="text-lg">🏘️</span>
              <div>
                <p className="text-xs font-bold text-foreground">Vecinos ahorrando</p>
                <div className="flex -space-x-1 mt-0.5">
                  {['bg-primary', 'bg-green-400', 'bg-amber-400', 'bg-blue-400', 'bg-rose-400'].map((c, i) => (
                    <div key={i} className={`h-5 w-5 rounded-full border-2 border-white ${c}`} />
                  ))}
                  <div className="h-5 w-5 rounded-full border-2 border-white bg-muted flex items-center justify-center">
                    <span className="text-[8px] font-bold text-muted-foreground">+8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-1/4 -top-1/2 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
    </section>
  )
}
