import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // MODO PREVIEW: Supabase desactivado para visualización local sin credenciales reales
  return NextResponse.next({ request })
}
