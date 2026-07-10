// PATH: src/app/api/billetweb/add-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { createBilletwebOrder } from '@/lib/billetweb'

// POST /api/billetweb/add-order
// Émission DIRECTE (sans paiement en ligne) : invitation, espèces, chèque.
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
  const ticketId = String(body.ticketId || '').trim()
  const type = String(body.type || 'invitation').trim()
  const quantity = Math.max(1, Math.min(50, parseInt(body.quantity, 10) || 1))
  const firstname = String(body.firstname || '').trim()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const instagram = String(body.instagram || '').trim()
  const ship = !!body.ship

  // Cette route ne gère PAS la carte (qui passe par Stripe)
  const allowedTypes = ['invitation', 'cash', 'check', 'other']
  if (!eventId) return NextResponse.json({ error: 'Concert manquant' }, { status: 400 })
  if (!ticketId) return NextResponse.json({ error: 'Tarif manquant' }, { status: 400 })
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ error: 'Type invalide pour cette route (la carte passe par Stripe)' }, { status: 400 })
  }
  if (!firstname || !name) return NextResponse.json({ error: 'Nom et prénom obligatoires' }, { status: 400 })
  if (ship && !email) return NextResponse.json({ error: 'Email requis pour envoyer le billet par email' }, { status: 400 })

  const result = await createBilletwebOrder({
    eventId, ticketId, paymentType: type, quantity, firstname, name, email, phone, instagram, ship,
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error, billetweb_raw: result.raw }, { status: result.status })
  }

  return NextResponse.json({ ok: true, quantity, type, shipped: ship, billetweb: result.billetweb })
}
