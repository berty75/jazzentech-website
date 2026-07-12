// PATH: src/app/api/billetweb/update-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { sendEmail, emailTemplate, ADMIN_EMAIL } from '@/lib/mailer'

const BASE = 'https://www.billetweb.fr/api'

// Relit la commande dans Billetweb pour VÉRIFIER que l'email a bien été enregistré.
// (update_order ne documente pas le champ "email" → on ne fait pas confiance au 200.)
async function verifyEmailSaved(user: string, key: string, orderId: string, expectedEmail: string) {
  try {
    const res = await fetch(`${BASE}/attendees?user=${user}&key=${key}&version=1`, {
      headers: { Accept: 'application/json' }, cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    if (!Array.isArray(data)) return { verified: false, found: false, actual: '' }
    const match = data.find((a: any) => String(a.order_id || '') === String(orderId))
    if (!match) return { verified: false, found: false, actual: '' }
    const actual = String(match.order_email || match.email || '').trim().toLowerCase()
    return { verified: actual === expectedEmail.trim().toLowerCase(), found: true, actual }
  } catch {
    return { verified: false, found: false, actual: '' }
  }
}

// POST /api/billetweb/update-order  { eventId, orderId, email, buyer?, concert? }
// 1) update_order (email + notification)
// 2) RELIT Billetweb pour confirmer que l'email est bien enregistré
// 3) Prévient le client + alerte l'admin (traçabilité)
export async function POST(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return NextResponse.json({ error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }, { status: 500 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'JSON invalide' }, { status: 400 }) }

  const eventId = String(body.eventId || '').trim()
  const orderId = String(body.orderId || '').trim()
  const email = String(body.email || '').trim()
  const buyer = String(body.buyer || '').trim()
  const concert = String(body.concert || '').trim()

  if (!eventId) return NextResponse.json({ error: 'eventId manquant' }, { status: 400 })
  if (!orderId || isNaN(parseInt(orderId, 10))) return NextResponse.json({ error: 'orderId invalide' }, { status: 400 })
  if (!email || !email.includes('@')) return NextResponse.json({ error: 'Email invalide' }, { status: 400 })

  const payload = { data: [{ id: parseInt(orderId, 10), email, notification: 1 }] }
  const url = `${BASE}/event/${encodeURIComponent(eventId)}/update_order?user=${user}&key=${key}&version=1`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
    const raw = await res.text()
    let data: any = null
    try { data = JSON.parse(raw) } catch { /* non-JSON */ }

    if (!res.ok || (data && data.error)) {
      return NextResponse.json(
        { error: `Billetweb a refusé la modification : ${data?.description || data?.error || raw?.slice(0, 200) || res.status}` },
        { status: 502 }
      )
    }

    // --- VÉRIFICATION RÉELLE : l'email est-il bien enregistré côté Billetweb ? ---
    const check = await verifyEmailSaved(user, key, orderId, email)

    if (!check.verified) {
      // Billetweb a répondu OK mais n'a PAS enregistré l'email → on le dit franchement.
      return NextResponse.json({
        error: check.found
          ? `Billetweb a accepté la requête mais l'email n'est PAS enregistré (valeur actuelle : ${check.actual || 'vide'}). Utilise le lien « Corriger » pour le faire directement dans Billetweb.`
          : `Impossible de vérifier la commande dans Billetweb. Vérifie manuellement via le lien « Corriger ».`,
        verified: false,
      }, { status: 502 })
    }

    // --- Email au CLIENT : confirmation + accès au billet ---
    await sendEmail(
      email,
      'Votre billet — Jazz en Tech',
      emailTemplate(`
        <h2 style="color:#722f37;margin:0 0 16px;">Votre billet Jazz en Tech</h2>
        <p>Bonjour${buyer ? ' ' + buyer : ''},</p>
        <p>Votre adresse email vient d'être associée à votre billet${concert ? ` pour <strong>${concert}</strong>` : ''}.</p>
        <p>Vous devriez recevoir votre billet de la part de Billetweb. Si ce n'est pas le cas d'ici quelques minutes,
        pensez à vérifier vos spams, ou répondez à ce message et nous vous le renverrons.</p>
        <p style="margin-top:24px;">Musicalement,<br/><strong>L'équipe Jazz en Tech</strong></p>
      `)
    )

    // --- Alerte ADMIN : traçabilité ---
    await sendEmail(
      ADMIN_EMAIL,
      '✏️ Email ajouté sur une commande Billetweb',
      emailTemplate(`
        <h2 style="color:#722f37;margin:0 0 16px;">Email ajouté sur une commande</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#999;font-size:13px;width:130px;">Commande</td><td style="padding:6px 0;font-weight:600;">${orderId}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Participant</td><td style="padding:6px 0;">${buyer || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Concert</td><td style="padding:6px 0;">${concert || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Email ajouté</td><td style="padding:6px 0;font-weight:600;">${email}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Vérifié</td><td style="padding:6px 0;color:#166534;font-weight:600;">Oui (relu dans Billetweb)</td></tr>
        </table>
      `)
    )

    return NextResponse.json({ ok: true, verified: true, orderId, email })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
