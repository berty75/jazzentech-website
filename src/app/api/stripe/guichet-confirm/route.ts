// PATH: src/app/api/stripe/guichet-confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { verifySession } from '@/lib/auth'
import { createBilletwebMultiOrder, CartLine } from '@/lib/billetweb'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Anti-doublon en mémoire process : une session déjà traitée ne recrée pas de billets.
const processed = new Set<string>()

// POST /api/stripe/guichet-confirm  { session_id }
// Appelée par la page guichet au retour du paiement (?paid=1&session_id=...).
// 1) Vérifie auprès de Stripe que la session est PAYÉE.
// 2) Crée les billets Billetweb (panier) avec payment_type card, envoi email.
export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) }
  const sessionId = String(body.session_id || '').trim()
  if (!sessionId) return NextResponse.json({ error: 'session_id manquant' }, { status: 400 })

  if (processed.has(sessionId)) {
    return NextResponse.json({ ok: true, alreadyDone: true })
  }

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Session Stripe introuvable' }, { status: 404 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Paiement non confirmé', status: session.payment_status }, { status: 402 })
  }
  if (session.metadata?.type !== 'guichet') {
    return NextResponse.json({ error: 'Session non-guichet' }, { status: 400 })
  }

  // Verrou partagé (Stripe) : si le webhook a déjà créé les billets, on s'arrête.
  // Le Set en mémoire ne suffit pas — webhook et confirm sont deux process distincts.
  if (session.metadata?.tickets_created === '1') {
    processed.add(sessionId)
  // Verrou : empêche le webhook de recréer les mêmes billets
  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...(session.metadata || {}), tickets_created: '1' },
    })
  } catch { /* le Set local protège déjà ce process */ }
    return NextResponse.json({ ok: true, alreadyDone: true })
  }

  const m = session.metadata
  const buyerEmail = m.buyerEmail || session.customer_details?.email || session.customer_email || ''

  // Reconstituer les lignes du panier depuis les metadata
  let compact: { t: string; f: string; n: string; p?: number }[] = []
  try { compact = JSON.parse(m.lines || '[]') } catch { compact = [] }
  const lines: CartLine[] = compact
    .map((c) => ({
      ticketId: String(c.t || ''),
      firstname: String(c.f || ''),
      name: String(c.n || ''),
      ...(c.p !== undefined ? { price: Number(c.p) } : {}),
    }))
    .filter((l) => l.ticketId && l.firstname && l.name)

  if (lines.length === 0) {
    return NextResponse.json({ error: 'Aucune ligne de billet dans la session' }, { status: 400 })
  }

  const result = await createBilletwebMultiOrder({
    eventId: m.eventId,
    paymentType: 'card',
    lines,
    email: buyerEmail || undefined,
    phone: m.phone || undefined,
    instagram: m.instagram || undefined,
    ship: true,
  })

  if (!result.ok) {
    console.error('[guichet-confirm] Billets non créés après paiement:', result.error)
    return NextResponse.json({ error: result.error, billetweb_raw: result.raw }, { status: 502 })
  }

  processed.add(sessionId)
  // Verrou : empêche le webhook de recréer les mêmes billets
  try {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...(session.metadata || {}), tickets_created: '1' },
    })
  } catch { /* le Set local protège déjà ce process */ }
  return NextResponse.json({ ok: true, count: lines.length, email: buyerEmail })
}
