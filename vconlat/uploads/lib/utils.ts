import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price in Argentine Pesos
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Calculate savings percentage
 */
export function calcularAhorro(precioGrupal: number, precioSuper: number | null): number {
  if (!precioSuper || precioSuper <= precioGrupal) return 0
  return Math.round(((precioSuper - precioGrupal) / precioSuper) * 100)
}

/**
 * Format time remaining until deadline
 */
export function formatTimeRemaining(fechaLimite: string): string {
  const now = new Date()
  const deadline = new Date(fechaLimite)
  const diffMs = deadline.getTime() - now.getTime()
  
  if (diffMs <= 0) return 'Finalizado'
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffDays > 0) {
    return `${diffDays}d ${diffHours % 24}h`
  }
  
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`
  }
  
  return `${diffMinutes}m`
}
