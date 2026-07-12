// PATH: src/app/api/billetweb/resend-ticket/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { sendEmail, emailTemplate, ADMIN_EMAIL } from '@/lib/mailer'

// POST /api/billetweb/resend-ticket
// { email, buyer, concert, ticket, downloadLink, orderId }
//
// L'API Billetweb ne permet PAS de modifier l'email d'un client (testé sur update_order
// ET update_product : les deux ignorent le champ). Quand un client se trompe d'adresse,
// on lui renvoie donc son billet NOUS-MÊMES, via Brevo, à la bonne adresse.
// Le PDF reste hébergé chez Billetweb (product_download) : le lien est valable et
// contient le QR code d'entrée.
export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) }

  const email = String(body.email || '').trim()
  const buyer = String(body.buyer || '').trim()
  const concert = String(body.concert || '').trim()
  const ticket = String(body.ticket || '').trim()
  const downloadLink = String(body.downloadLink || '').trim()
  const orderId = String(body.orderId || '').trim()

  // Validation d'email simple mais réelle
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 })
  if (!downloadLink) return NextResponse.json({ error: 'Lien de téléchargement du billet introuvable' }, { status: 400 })

  try {
    // --- Envoi du billet au CLIENT ---
    await sendEmail(
      email,
      `Votre billet — ${concert || 'Jazz en Tech'}`,
      emailTemplate(`
        <h2 style="color:#722f37;margin:0 0 16px;">Votre billet Jazz en Tech</h2>
        <p>Bonjour${buyer ? ' ' + buyer : ''},</p>
        <p>Voici votre billet${concert ? ` pour <strong>${concert}</strong>` : ''}${ticket ? ` (${ticket})` : ''}.</p>
        <p style="text-align:center;margin:28px 0;">
          <a href="${downloadLink}" style="display:inline-block;background:#722f37;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;">
            Télécharger mon billet
          </a>
        </p>
        <p style="font-size:13px;color:#666;">Présentez ce billet (imprimé ou sur votre téléphone) à l'entrée du concert.
        Le QR code sera scanné à votre arrivée.</p>
        <p style="margin-top:24px;">Musicalement,<br/><strong>L'équipe Jazz en Tech</strong></p>
      `)
    )

    // --- Trace admin ---
    await sendEmail(
      ADMIN_EMAIL,
      '📧 Billet renvoyé à un participant',
      emailTemplate(`
        <h2 style="color:#722f37;margin:0 0 16px;">Billet renvoyé</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#999;font-size:13px;width:130px;">Participant</td><td style="padding:6px 0;font-weight:600;">${buyer || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Concert</td><td style="padding:6px 0;">${concert || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Envoyé à</td><td style="padding:6px 0;font-weight:600;">${email}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Commande</td><td style="padding:6px 0;">${orderId || '—'}</td></tr>
        </table>
        <p style="margin-top:18px;font-size:13px;color:#666;">
          Rappel : l'adresse enregistrée dans Billetweb n'a pas été modifiée (l'API ne le permet pas).
          Pour la corriger dans la base, passe par le back-office Billetweb.
        </p>
      `)
    )

    return NextResponse.json({ ok: true, email })
  } catch (e: any) {
    return NextResponse.json({ error: 'Échec de l\u2019envoi : ' + e.message }, { status: 500 })
  }
}
