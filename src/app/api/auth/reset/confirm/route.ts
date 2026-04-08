import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET || 'jazz-en-tech-secret-change-me')

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()

  if (!password || password.length < 8) {
    return NextResponse.json({ error: 'Le mot de passe doit faire au moins 8 caractères' }, { status: 400 })
  }

  try {
    const { payload } = await jwtVerify(token, SECRET)
    if (payload.type !== 'reset') throw new Error('Invalid token type')

    const envPath = resolve(process.cwd(), '.env.local')
    let envContent = await readFile(envPath, 'utf-8')
    envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD=${password}`)
    await writeFile(envPath, envContent, 'utf-8')

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Lien expiré ou invalide' }, { status: 401 })
  }
}