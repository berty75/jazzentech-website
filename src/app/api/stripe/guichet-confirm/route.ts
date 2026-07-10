// PATH: src/app/api/stripe/guichet-confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { verifySession } from '@/lib/auth'
import { createBilletwebOrder } from '@/lib/billetweb'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Anti-doublon en mémoire process : une session déjà traitée ne recrée pas de billet.
// (Suffisant pour un guichet ; en cas de reboot serveur, Stripe garantit qu'on peut
//  au pire recréer une fois — on protège aussi via le statut de session.)
const processed = new Set<string>()

// POST /api/stripe/guichet-confirm  { session_id }
// Appelée par la page guichet au retour du paiement (?paid=1&session_id=...).
// 1) Vérifie auprès de Stripe que la session est PAYÉE (on ne fait pas confiance à l'URL).
// 2) Crée le billet Billetweb (payment_type card, envoi email).
// Idempotent : rejoue = pas de doublon.
export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) }
  const sessionId = String(body.session_id || '').trim()
  if (!sessionId) return NextResponse.json({ error: 'session_id manquant' }, { status: 400 })

  // Déjà traité ? → succès sans recréer
  if (processed.has(sessionId)) {
    return NextResponse.json({ ok: true, alreadyDone: true })
  }

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (e: any) {
    return NextResponse.json({ error: 'Session Stripe introuvable' }, { status: 404 })
  }

  // Sécurité : on ne crée le billet que si Stripe confirme le paiement
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Paiement non confirmé', status: session.payment_status }, { status: 402 })
  }
  if (session.metadata?.type !== 'guichet') {
    return NextResponse.json({ error: 'Session non-guichet' }, { status: 400 })
  }

  const m = session.metadata
  const buyerEmail = m.buyerEmail || session.customer_details?.email || session.customer_email || ''

  const result = await createBilletwebOrder({
    eventId: m.eventId,
    ticketId: m.ticketId,
    paymentType: 'card',
    quantity: parseInt(m.quantity, 10) || 1,
    firstname: m.firstname || '',
    name: m.name || '',
    email: buyerEmail || undefined,
    phone: m.phone || undefined,
    instagram: m.instagram || undefined,
    ship: true,
  })

  if (!result.ok) {
    console.error('[guichet-confirm] Billet NON créé après paiement:', result.error)
    return NextResponse.json({ error: result.error, billetweb_raw: result.raw }, { status: 502 })
  }

  processed.add(sessionId) // marque comme traité
  return NextResponse.json({ ok: true, buyer: `${m.firstname} ${m.name}`.trim(), email: buyerEmail })
}
