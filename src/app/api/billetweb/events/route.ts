// PATH: src/app/api/billetweb/events/route.ts
import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const BASE = 'https://www.billetweb.fr/api'

// GET /api/billetweb/events → liste des événements (concerts) du compte Billetweb
// Lecture seule, mais réservée aux admins connectés (les routes /api/* ne passent
// pas par le middleware qui ne protège que /dashboard/*).
export async function GET() {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return NextResponse.json({ error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }, { status: 500 })
  }

  const url = `${BASE}/events?user=${user}&key=${key}&version=1`

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    const data = await res.json().catch(() => null)
    if (!res.ok || (data && data.error)) {
      return NextResponse.json(
        { error: `Billetweb events: ${data?.description || res.status}` },
        { status: 502 }
      )
    }
    const list: any[] = Array.isArray(data) ? data : []

    // On ne garde que l'essentiel pour le menu déroulant, tri par date de début décroissante
    const events = list
      .map((e) => ({
        id: String(e.id ?? e.event ?? ''),
        name: (e.name || e.event_name || '').trim(),
        start: e.start || e.event_start || '',
        multiple: String(e.multiple ?? '0'), // 1 = événement à séances/dates multiples
      }))
      .filter((e) => e.id && e.name)
      .sort((a, b) => (a.start < b.start ? 1 : -1))

    return NextResponse.json({ events })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
