// PATH: src/app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { amount } = await req.json()

  if (!amount || amount < 1) {
    return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(amount * 100),
          product_data: {
            name: 'Don Jazz en Tech 2026',
            description: `Don de ${amount} € — Festival Jazz en Tech, 11ème édition`,
          },
        },
        quantity: 1,
      }],
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: 'prenom',
          label: { type: 'custom', custom: 'Prénom' },
          type: 'text',
        },
        {
          key: 'nom',
          label: { type: 'custom', custom: 'Nom de famille' },
          type: 'text',
        },
      ],
      custom_text: {
        submit: { message: 'Votre don ouvre droit à une déduction fiscale de 66 %. Un reçu Cerfa vous sera envoyé.' },
      },
      metadata: {
        type: 'donation',
        amount: String(amount),
      },
      success_url: `${baseUrl}/soutenir/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/soutenir`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}