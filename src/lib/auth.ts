import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'jazz-en-tech-secret-change-me')
const COOKIE = 'jet-admin-token'

export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET)
  ;(await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function verifySession(): Promise<boolean> {
  try {
    const token = (await cookies()).get(COOKIE)?.value
    if (!token) return false
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function destroySession() {
  ;(await cookies()).delete(COOKIE)
}