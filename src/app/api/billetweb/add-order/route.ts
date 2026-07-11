// PATH: src/app/api/billetweb/add-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { createBilletwebMultiOrder, CartLine } from '@/lib/billetweb'

// POST /api/billetweb/add-order
// Émission DIRECTE (sans paiement en ligne) d'un PANIER : invitation, espèces, chèque.
// Body: { eventId, type, lines: [{ ticketId, firstname, name }], email?, phone?, instagram?, ship? }
// Pour le paiement CARTE, on passe par Stripe (voir /api/stripe/guichet-checkout).
// ⚠️ Écriture réelle → réservée aux admins connectés.
export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 })
  }

  const eventId = String(body.eventId || '').trim()
  const type = String(body.type || 'invitation').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const instagram = String(body.instagram || '').trim()
  const ship = !!body.ship

  // Panier de lignes
  const rawLines = Array.isArray(body.lines) ? body.lines : []
  const lines: CartLine[] = rawLines
    .map((l: any) => ({
      ticketId: String(l.ticketId || '').trim(),
      firstname: String(l.firstname || '').trim(),
      name: String(l.name || '').trim(),
      ...(l.price !== undefined && l.price !== null ? { price: Math.max(0, parseFloat(l.price) || 0) } : {}),
    }))
    .filter((l: CartLine) => l.ticketId && l.firstname && l.name)

  // Cette route ne gère PAS la carte (qui passe par Stripe)
  const allowedTypes = ['invitation', 'cash', 'check', 'other']
  if (!eventId) return NextResponse.json({ error: 'Concert manquant' }, { status: 400 })
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ error: 'Type invalide pour cette route (la carte passe par Stripe)' }, { status: 400 })
  }
  if (lines.length === 0) {
    return NextResponse.json({ error: 'Ajoute au moins une personne (nom, prénom, tarif) au panier' }, { status: 400 })
  }
  if (ship && !email) return NextResponse.json({ error: 'Email requis pour envoyer les billets par email' }, { status: 400 })

  const result = await createBilletwebMultiOrder({
    eventId, paymentType: type, lines, email, phone, instagram, ship,
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error, billetweb_raw: result.raw }, { status: result.status })
  }

  return NextResponse.json({ ok: true, count: lines.length, type, shipped: ship, billetweb: result.billetweb })
}
