// PATH: src/app/api/stripe/guichet-status/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { verifySession } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// GET /api/stripe/guichet-status?session_id=cs_...
// La tablette interroge cette route en boucle pour savoir si le client a payé.
// → { status: 'paid' | 'unpaid' | 'expired' }
export async function GET(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const sessionId = new URL(req.url).searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'session_id manquant' }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    // payment_status: 'paid' | 'unpaid' | 'no_payment_required'
    // status: 'open' | 'complete' | 'expired'
    let status: 'paid' | 'unpaid' | 'expired' = 'unpaid'
    if (session.status === 'expired') status = 'expired'
    else if (session.payment_status === 'paid') status = 'paid'
    return NextResponse.json({ status })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
