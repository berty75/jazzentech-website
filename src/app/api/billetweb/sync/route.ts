// PATH: src/app/api/billetweb/sync/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

// Édition courante du festival (sert d'étiquette dans clients.editions)
const CURRENT_EDITION = '2026'
const SYNC_KEY = 'billetweb_attendees'

// ---- Mapping d'un participant Billetweb vers le format importClients ----
// Les noms de champs Billetweb peuvent varier : on essaie plusieurs variantes,
// et la mutation importClients dédoublonne de toute façon par email.
function mapAttendee(a: any) {
  // Billetweb : `email` est celui du PARTICIPANT (souvent vide),
  // `order_email` celui de l'ACHETEUR — c'est lui qui sert aux envois.
  const email = (a.order_email || a.email || a.mail || '').trim().toLowerCase()
  if (!email) return null

  // ⚠️ Chez Billetweb, le nom de famille est dans `name` (et non `lastname`).
  let firstName = (a.firstname || a.order_firstname || a.first_name || a.prenom || '').trim()
  let lastName = (a.name || a.order_name || a.lastname || a.last_name || a.nom || '').trim()

  // Cas où un seul champ contient « Prénom Nom » : on le découpe
  if (firstName && !lastName && firstName.includes(' ')) {
    const parts = firstName.split(/\s+/)
    firstName = parts.shift() || ''
    lastName = parts.join(' ')
  }
  if (!firstName && lastName && lastName.includes(' ')) {
    const parts = lastName.split(/\s+/)
    firstName = parts.shift() || ''
    lastName = parts.join(' ')
  }

  const phone = (a.phone || a.tel || a.telephone || '').trim() || undefined

  // Édition : on tente de déduire l'année d'une date, sinon édition courante
  let edition = CURRENT_EDITION
  const rawDate = a.order_date || a.date || a.event_date
  if (rawDate) {
    const y = new Date(rawDate).getFullYear()
    if (!isNaN(y) && y > 2000) edition = String(y)
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    editions: [edition],
    ticketCount: 1,
  }
}

async function runSync() {
  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return { ok: false, status: 500, error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }
  }

  // Dernière synchro (pour ne récupérer que les nouveaux, en secondes Unix)
  const lastSyncMs: number = await convex.query(api.sync.getLastSync, { key: SYNC_KEY })
  const lastUpdateSec = lastSyncMs ? Math.floor(lastSyncMs / 1000) : 0

  // Appel API Billetweb : participants tous événements confondus
  // NB: 'last_update' = récupération incrémentale (à confirmer dans la spec ;
  // si le nom du paramètre diffère, la synchro reste correcte car importClients
  // dédoublonne par email — on récupère juste un peu plus de données).
  const url = new URL('https://www.billetweb.fr/api/attendees')
  url.searchParams.set('user', user)
  url.searchParams.set('key', key)
  url.searchParams.set('version', '1')
  if (lastUpdateSec > 0) url.searchParams.set('last_update', String(lastUpdateSec))

  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    return { ok: false, status: 502, error: `Billetweb API ${res.status}: ${text.slice(0, 200)}` }
  }

  const data = await res.json().catch(() => null)
  const attendees: any[] = Array.isArray(data) ? data : (data?.attendees || data?.data || [])

  // Mapping + filtrage (email obligatoire)
  const rows = attendees.map(mapAttendee).filter(Boolean) as Array<{
    firstName: string; lastName: string; email: string
    phone?: string; editions: string[]; ticketCount?: number
  }>

  // Agrégation par email : un client qui a acheté 4 billets ne doit pas être
  // envoyé 4 fois avec ticketCount:1, mais UNE fois avec ticketCount:4.
  const byEmail = new Map<string, {
    firstName: string; lastName: string; email: string
    phone?: string; editions: string[]; ticketCount: number
  }>()

  for (const r of rows) {
    const prev = byEmail.get(r.email)
    if (!prev) {
      byEmail.set(r.email, { ...r, ticketCount: 1 })
    } else {
      prev.ticketCount += 1
      // On garde les infos les plus complètes rencontrées
      if (!prev.firstName && r.firstName) prev.firstName = r.firstName
      if (!prev.lastName && r.lastName) prev.lastName = r.lastName
      if (!prev.phone && r.phone) prev.phone = r.phone
      prev.editions = [...new Set([...prev.editions, ...r.editions])]
    }
  }

  const mapped = [...byEmail.values()]

  // Import par lots de 50 (réutilise ta mutation existante qui dédoublonne)
  let imported = 0
  let updated = 0
  for (let i = 0; i < mapped.length; i += 50) {
    const batch = mapped.slice(i, i + 50)
    const r = await convex.mutation(api.clients.importClients, { clients: batch })
    imported += r.imported
    updated += r.updated
  }

  // On mémorise l'heure de cette synchro
  await convex.mutation(api.sync.setLastSync, { key: SYNC_KEY, lastSync: Date.now() })

  return { ok: true, status: 200, fetched: attendees.length, imported, updated }
}

// Déclenchement manuel (bouton dashboard)
export async function POST() {
  try {
    const result = await runSync()
    return NextResponse.json(result, { status: result.status })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}

// Déclenchement automatique (cron Vercel). Protégé par CRON_SECRET si défini.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }
  }
  try {
    const result = await runSync()
    return NextResponse.json(result, { status: result.status })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
