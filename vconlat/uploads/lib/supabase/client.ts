import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!url || url.includes('placeholder') || !key || key.includes('placeholder')) {
    throw new Error('PREVIEW_MODE: no real Supabase credentials')
  }

  return createBrowserClient(url, key)
}
