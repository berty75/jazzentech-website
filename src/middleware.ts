import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Plus de chemins bloqués pour 2026
const BLOCKED_PATHS: string[] = []

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si le chemin commence par un des chemins bloqués
  const isBlocked = BLOCKED_PATHS.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  if (isBlocked) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: []
}