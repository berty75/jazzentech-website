// PATH: src/app/api/stripe/guichet-checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { verifySession } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// POST /api/stripe/guichet-checkout
// Crée une session de paiement carte pour un PANIER de billets au guichet.
// Body: { eventId, concertName?, email?, phone?, instagram?,
//         lines: [{ ticketId, ticketName, firstname, name, unitPrice }] }
// Renvoie { url, sessionId } → l'URL est encodée en QR code.
// Les billets Billetweb seront créés au retour (guichet-confirm) via les metadata.
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
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const instagram = String(body.instagram || '').trim()

  const rawLines = Array.isArray(body.lines) ? body.lines : []
  const lines = rawLines
    .map((l: any) => ({
      ticketId: String(l.ticketId || '').trim(),
      ticketName: String(l.ticketName || '').trim(),
      firstname: String(l.firstname || '').trim(),
      name: String(l.name || '').trim(),
      unitPrice: Math.max(0, parseFloat(l.unitPrice) || 0),
      // price forcé (concert inclus dans pass = 0 €). Si absent, unitPrice fait foi.
      forcedPrice: (l.price !== undefined && l.price !== null) ? Math.max(0, parseFloat(l.price) || 0) : undefined,
    }))
    .filter((l: any) => l.ticketId && l.firstname && l.name)

  const remote = body.remote === true    // paiement à distance (lien envoyé au client)

  if (!eventId) return NextResponse.json({ error: 'Concert manquant' }, { status: 400 })
  if (lines.length === 0) return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
  const total = lines.reduce((s: number, l: any) => s + l.unitPrice, 0)
  if (total <= 0) return NextResponse.json({ error: 'Le panier est gratuit — utilise « Invitation »' }, { status: 400 })

  // Lignes compactes pour les metadata (id + prénom + nom). Limite Stripe: 500 car./valeur.
  const compact = lines.map((l: any) => {
    const o: any = { t: l.ticketId, f: l.firstname, n: l.name }
    if (l.forcedPrice !== undefined) o.p = l.forcedPrice
    return o
  })
  const linesJson = JSON.stringify(compact)
  if (linesJson.length > 480) {
    return NextResponse.json({ error: 'Trop de billets dans un seul paiement (max ~10). Fais deux paiements.' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin

  // Un line_item Stripe par billet (affichage détaillé au paiement)
  const line_items = lines
    .filter((l: any) => l.unitPrice > 0)
    .map((l: any) => ({
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(l.unitPrice * 100),
        product_data: {
          name: `${l.ticketName || 'Billet'} — ${l.firstname} ${l.name}`,
        },
      },
      quantity: 1,
    }))

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      metadata: {
        type: 'guichet',
        remote: remote ? '1' : '0',   // '1' → le webhook crée les billets
        eventId,
        lines: linesJson,       // [{t,f,n}, ...]
        buyerEmail: email,
        phone,
        instagram,
        total: total.toFixed(2),
      },
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
