// PATH: src/app/api/signature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const KEY = 'president_signature'

// GET  → récupère la signature enregistrée (dataURL PNG) ou null
// POST → enregistre une nouvelle signature  { dataUrl }
// DELETE → supprime la signature

export async function GET() {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    const value = await convex.query(api.settings.get, { key: KEY })
    return NextResponse.json({ signature: value })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) }

  const dataUrl = String(body.dataUrl || '')
  if (!dataUrl.startsWith('data:image/png;base64,')) {
    return NextResponse.json({ error: 'Format de signature invalide (PNG attendu)' }, { status: 400 })
  }
  // Garde-fou : une signature ne devrait pas peser lourd (~50-200 Ko)
  if (dataUrl.length > 900_000) {
    return NextResponse.json({ error: 'Signature trop volumineuse' }, { status: 400 })
  }

  try {
    await convex.mutation(api.settings.set, { key: KEY, value: dataUrl })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE() {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    await convex.mutation(api.settings.remove, { key: KEY })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
