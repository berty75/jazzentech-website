// PATH: src/app/api/auth/password/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json()

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Le nouveau mot de passe doit faire au moins 8 caracteres' }, { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (currentPassword !== adminPassword) {
    return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 401 })
  }

  const envPath = resolve(process.cwd(), '.env.local')
  let envContent = await readFile(envPath, 'utf-8')
  envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD=${newPassword}`)
  await writeFile(envPath, envContent, 'utf-8')

  return NextResponse.json({ ok: true })
}