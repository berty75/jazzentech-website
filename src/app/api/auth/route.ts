import { NextRequest, NextResponse } from 'next/server'
import { createSession, destroySession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ error: 'Admin credentials not configured' }, { status: 500 })
  }

  if (email === adminEmail && password === adminPassword) {
    await createSession()
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
}

export async function DELETE() {
  await destroySession()
  return NextResponse.json({ ok: true })
}