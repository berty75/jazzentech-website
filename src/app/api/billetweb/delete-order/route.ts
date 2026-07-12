// PATH: src/app/api/billetweb/delete-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { sendEmail, emailTemplate, ADMIN_EMAIL } from '@/lib/mailer'

const BASE = 'https://www.billetweb.fr/api'

// Relit Billetweb pour VÉRIFIER que la commande a bien disparu.
async function verifyDeleted(user: string, key: string, orderId: string) {
  try {
    const res = await fetch(`${BASE}/attendees?user=${user}&key=${key}&version=1`, {
      headers: { Accept: 'application/json' }, cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    if (!Array.isArray(data)) return { verified: false }
    const stillThere = data.some((a: any) => String(a.order_id || '') === String(orderId))
    return { verified: !stillThere }
  } catch {
    return { verified: false }
  }
}

// POST /api/billetweb/delete-order  { eventId, orderIds: [...], buyer?, concert? }
// Structure Billetweb confirmée : { "data": [123, 124] }
// 1) delete_order  2) VÉRIFIE la disparition  3) alerte admin (traçabilité)
// ⚠️ Destructif → admins connectés uniquement.
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
  const buyer = String(body.buyer || '').trim()
  const concert = String(body.concert || '').trim()
  const notifyClient = body.notifyClient === true      // case cochée dans le modal
  const clientEmail = String(body.clientEmail || '').trim()
  const orderIds = (Array.isArray(body.orderIds) ? body.orderIds : [])
    .map((x: any) => parseInt(String(x), 10))
    .filter((n: number) => !isNaN(n) && n > 0)

  if (!eventId) return NextResponse.json({ error: 'eventId manquant' }, { status: 400 })
  if (orderIds.length === 0) return NextResponse.json({ error: 'Aucune commande à supprimer' }, { status: 400 })

  const url = `${BASE}/event/${encodeURIComponent(eventId)}/delete_order?user=${user}&key=${key}&version=1`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ data: orderIds }),
      cache: 'no-store',
    })
    const raw = await res.text()
    let data: any = null
    try { data = JSON.parse(raw) } catch { /* non-JSON */ }

    if (!res.ok || (data && data.error)) {
      return NextResponse.json(
        { error: `Billetweb a refusé la suppression : ${data?.description || data?.error || raw?.slice(0, 200) || res.status}` },
        { status: 502 }
      )
    }

    // --- VÉRIFICATION : la commande a-t-elle vraiment disparu ? ---
    const check = await verifyDeleted(user, key, String(orderIds[0]))
    if (!check.verified) {
      return NextResponse.json({
        error: 'Billetweb a répondu OK mais la commande est toujours présente. Vérifie dans Billetweb (les ventes en ligne ne sont pas supprimables via l’API).',
        verified: false,
      }, { status: 502 })
    }

    // --- Email au CLIENT (uniquement si demandé dans le modal) ---
    let clientNotified = false
    if (notifyClient && clientEmail && clientEmail.includes('@')) {
      await sendEmail(
        clientEmail,
        `Annulation de votre billet — Jazz en Tech`,
        emailTemplate(`
          <h2 style="color:#722f37;margin:0 0 16px;">Votre billet a été annulé</h2>
          <p>Bonjour${buyer ? ' ' + buyer : ''},</p>
          <p>Nous vous informons que votre billet${concert ? ` pour <strong>${concert}</strong>` : ''} a été annulé.
          Il n'est plus valable à l'entrée du concert.</p>
          <p>Si vous pensez qu'il s'agit d'une erreur, ou pour toute question concernant un éventuel remboursement,
          répondez simplement à ce message : nous reviendrons vers vous rapidement.</p>
          <p style="margin-top:24px;">Musicalement,<br/><strong>L'équipe Jazz en Tech</strong></p>
        `)
      )
      clientNotified = true
    }

    // --- Alerte ADMIN : traçabilité de la suppression ---
    await sendEmail(
      ADMIN_EMAIL,
      '🗑️ Commande supprimée dans Billetweb',
      emailTemplate(`
        <h2 style="color:#991b1b;margin:0 0 16px;">Commande supprimée</h2>
        <p>Une commande a été supprimée depuis le dashboard Jazz en Tech.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#999;font-size:13px;width:130px;">Commande(s)</td><td style="padding:6px 0;font-weight:600;">${orderIds.join(', ')}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Participant</td><td style="padding:6px 0;">${buyer || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Concert</td><td style="padding:6px 0;">${concert || '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#999;font-size:13px;">Client prévenu</td><td style="padding:6px 0;font-weight:600;color:${clientNotified ? '#166534' : '#8a8478'};">${clientNotified ? `Oui — ${clientEmail}` : 'Non'}</td></tr>
        </table>
        <p style="margin-top:20px;color:#991b1b;font-size:13px;"><strong>Action irréversible.</strong> Si c'était une erreur, le billet doit être réémis manuellement.</p>
      `)
    )

    return NextResponse.json({ ok: true, verified: true, deleted: orderIds.length, clientNotified })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
