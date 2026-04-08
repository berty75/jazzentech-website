import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'jazz-en-tech-secret-change-me')

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ne pas protéger les pages login et ses sous-pages
  if (!pathname.startsWith('/dashboard') || pathname.startsWith('/dashboard/login')) {
    return NextResponse.next()
  }

  const token = req.cookies.get('jet-admin-token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/dashboard/login', req.url))
  }

  try {
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/dashboard/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}