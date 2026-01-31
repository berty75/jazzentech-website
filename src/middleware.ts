import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Liste des chemins à bloquer (redirection vers accueil)
const BLOCKED_PATHS = [
  '/programmation',
  '/artistes',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si le chemin commence par un des chemins bloqués
  const isBlocked = BLOCKED_PATHS.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  if (isBlocked) {
    // Rediriger vers la page d'accueil
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configurer les chemins sur lesquels le middleware s'applique
export const config = {
  matcher: [
    '/programmation/:path*',
    '/artistes/:path*',
  ]
}