// PATH: src/app/api/stripe/guichet-checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { verifySession } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// POST /api/stripe/guichet-checkout
// Crée une session de paiement carte pour un billet au guichet.
// Renvoie { url, sessionId } → l'URL est encodée en QR code que le client scanne.
// Le billet Billetweb sera créé par le WEBHOOK après paiement (metadata.type = 'guichet').
// ⚠️ Réservé aux admins connectés.
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
  const ticketName = String(body.ticketName || '').trim()
  const concertName = String(body.concertName || '').trim()
  const quantity = Math.max(1, Math.min(50, parseInt(body.quantity, 10) || 1))
  const unitPrice = Math.max(0, parseFloat(body.unitPrice) || 0) // en euros
  const firstname = String(body.firstname || '').trim()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const instagram = String(body.instagram || '').trim()

  if (!eventId || !ticketId) return NextResponse.json({ error: 'Concert ou tarif manquant' }, { status: 400 })
  if (!firstname || !name) return NextResponse.json({ error: 'Nom et prénom obligatoires' }, { status: 400 })
  if (unitPrice <= 0) return NextResponse.json({ error: 'Ce tarif est gratuit — utilise « Invitation »' }, { status: 400 })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(unitPrice * 100),
          product_data: {
            name: `${ticketName || 'Billet'} — Jazz en Tech`,
            description: concertName || undefined,
          },
        },
        quantity,
      }],
      // Métadonnées lues par le webhook pour créer le billet Billetweb
      metadata: {
        type: 'guichet',
        eventId,
        ticketId,
        ticketName,
        concertName,
        quantity: String(quantity),
        firstname,
        name,
        buyerEmail: email,
        phone,
        instagram,
      },
      // Pré-remplit l'email si fourni (pour le reçu Stripe)
      ...(email ? { customer_email: email } : {}),
      success_url: `${baseUrl}/dashboard/guichet?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard/guichet?canceled=1`,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err: any) {
    console.error('[guichet-checkout] Stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
