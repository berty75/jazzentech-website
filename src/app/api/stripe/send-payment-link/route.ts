// PATH: src/app/api/stripe/send-payment-link/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { sendEmail, emailTemplate } from '@/lib/mailer'

// POST /api/stripe/send-payment-link
// { email, url, buyer?, summary?, total? }
//
// Envoie au client le lien de paiement Stripe généré par le guichet.
// Les billets seront créés automatiquement par le WEBHOOK dès qu'il aura payé
// (metadata.remote = '1'), même si l'admin a fermé son navigateur.
export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) }

  const email = String(body.email || '').trim()
  const url = String(body.url || '').trim()
  const buyer = String(body.buyer || '').trim()
  const summary = String(body.summary || '').trim()
  const total = String(body.total || '').trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 })
  }
  if (!url.startsWith('https://checkout.stripe.com') && !url.startsWith('https://')) {
    return NextResponse.json({ error: 'Lien de paiement invalide' }, { status: 400 })
  }

  try {
    await sendEmail(
      email,
      'Votre réservation Jazz en Tech — lien de paiement',
      emailTemplate(`
        <h2 style="color:#722f37;margin:0 0 16px;">Votre réservation est prête</h2>
        <p>Bonjour${buyer ? ' ' + buyer : ''},</p>
        <p>Voici le lien pour régler votre réservation au festival Jazz en Tech.</p>

        ${summary ? `
        <div style="background:#faf8f3;border:1px solid #ece7dd;border-radius:10px;padding:14px 16px;margin:18px 0;">
          <p style="margin:0 0 6px;font-size:12px;color:#8a8478;text-transform:uppercase;letter-spacing:0.04em;font-weight:600;">Votre réservation</p>
          <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.6;">${summary}</p>
          ${total ? `<p style="margin:10px 0 0;font-size:18px;font-weight:700;color:#722f37;">${total}</p>` : ''}
        </div>` : ''}

        <p style="text-align:center;margin:28px 0;">
          <a href="${url}" style="display:inline-block;background:#722f37;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
            Payer mes billets
          </a>
        </p>

        <p style="font-size:13px;color:#666;line-height:1.6;">
          Le paiement est sécurisé (Stripe). Dès votre règlement, vos billets vous seront
          envoyés automatiquement par email, avec le QR code à présenter à l'entrée.
        </p>
        <p style="font-size:12px;color:#999;">Ce lien est valable 24 heures.</p>
        <p style="margin-top:24px;">Musicalement,<br/><strong>L'équipe Jazz en Tech</strong></p>
      `)
    )
    return NextResponse.json({ ok: true, email })
  } catch (e: any) {
    return NextResponse.json({ error: 'Échec de l\u2019envoi : ' + e.message }, { status: 500 })
  }
}
