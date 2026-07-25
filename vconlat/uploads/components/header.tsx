'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

interface HeaderProps {
  barrio?: string
}

export function Header({ barrio = 'Palermo' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="flex flex-col gap-4 pt-8">
              <Link href="/" className="text-lg font-semibold">
                Inicio
              </Link>
              <Link href="/grupos" className="text-lg">
                Grupos Activos
              </Link>
              <Link href="/mis-pedidos" className="text-lg">
                Mis Pedidos
              </Link>
              <Link href="/como-funciona" className="text-lg">
                Como Funciona
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          <span className="hidden text-xl font-bold text-foreground sm:inline-block">
            Conlat
          </span>
        </Link>

        {/* Location */}
        <Button variant="ghost" size="sm" className="hidden gap-2 md:flex">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm">{barrio}</span>
        </Button>

        {/* Search */}
        <div className="flex flex-1 items-center gap-2 px-2 md:px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              className="w-full pl-9"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                0
              </Badge>
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Mi cuenta</span>
            </Button>
          </Link>

          <Link href="/auth/login" className="hidden md:block">
            <Button size="sm">
              Ingresar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
