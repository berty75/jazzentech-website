// PATH: src/app/api/billetweb/tickets/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const BASE = 'https://www.billetweb.fr/api'

// GET /api/billetweb/tickets?event={id} → liste des tarifs d'un événement
// Réponse Billetweb (confirmée via Swagger) : [{ id, name, full_name, price, category, ... }]
// IMPORTANT: add_order attend le CHAMP `name` du tarif (ex "Plein tarif"), pas l'id.
export async function GET(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return NextResponse.json({ error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }, { status: 500 })
  }

  const eventId = new URL(req.url).searchParams.get('event')
  if (!eventId) {
    return NextResponse.json({ error: 'Paramètre "event" manquant' }, { status: 400 })
  }

  const url = `${BASE}/event/${encodeURIComponent(eventId)}/tickets?user=${user}&key=${key}&version=1`

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    const data = await res.json().catch(() => null)
    if (!res.ok || (data && data.error)) {
      return NextResponse.json(
        { error: `Billetweb tickets: ${data?.description || res.status}` },
        { status: 502 }
      )
    }
    const list: any[] = Array.isArray(data) ? data : []

    const tickets = list.map((t) => ({
      id: String(t.id ?? ''),
      name: (t.name || '').trim(),           // <-- envoyé tel quel dans add_order.products[].ticket
      fullName: (t.full_name || '').trim(),
      category: (t.category || '').trim(),
      price: parseFloat(t.price ?? '0') || 0,
    }))

    return NextResponse.json({ tickets })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
