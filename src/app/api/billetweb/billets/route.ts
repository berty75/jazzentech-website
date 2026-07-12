// PATH: src/app/api/billetweb/billets/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const BASE = 'https://www.billetweb.fr/api'

// GET /api/billetweb/billets?edition=...&editionsOnly=1
// Liste les billets avec leur statut d'envoi DÉDUIT.
//
// ⚠️ Billetweb n'expose AUCUN champ "email envoyé" dans /api/attendees.
// On ne peut donc pas savoir si un mail est réellement parti. En revanche :
//   - billet SANS email  → il n'a PAS PU être envoyé (certain)
//   - billet AVEC email  → il a normalement été envoyé (non vérifiable à 100 %)
export async function GET(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return NextResponse.json({ error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const edition = (searchParams.get('edition') || '').trim()
  const editionsOnly = searchParams.get('editionsOnly') === '1'

  try {
    const res = await fetch(`${BASE}/attendees?user=${user}&key=${key}&version=1`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || (data && data.error)) {
      return NextResponse.json({ error: `Billetweb: ${data?.description || res.status}` }, { status: 502 })
    }
    const attendees: any[] = Array.isArray(data) ? data : []

    const editions = [...new Set(attendees.map((a) => (a.event_name || '').trim()).filter(Boolean))].sort().reverse()
    if (editionsOnly) return NextResponse.json({ editions })

    const rows = attendees
      .filter((a) => String(a.order_paid) === '1')
      .filter((a) => !edition || (a.event_name || '').trim() === edition)
      .map((a) => {
        const email = (a.order_email || a.email || '').trim()
        return {
          id: String(a.id || ''),
          date: (a.order_date || '').slice(0, 16),
          eventName: (a.event_name || '').trim(),
          concert: (a.category || '').trim(),
          ticket: (a.ticket || '').trim(),
          buyer: `${a.firstname || a.order_firstname || ''} ${a.name || a.order_name || ''}`.trim(),
          email,
          hasEmail: email.length > 0,
          channel: (a.order_payment_type || '').toLowerCase(),
          price: parseFloat(a.price ?? '0') || 0,
          used: String(a.used) === '1',              // billet scanné à l'entrée
          eventId: String(a.event || ''),            // nécessaire pour update/delete order
          orderId: String(a.order_id || ''),
          orderLink: a.order_management || '',       // lien Billetweb pour corriger / renvoyer
          downloadLink: a.product_download || '',    // PDF du billet
        }
      })
      .sort((x, y) => (x.date < y.date ? 1 : -1))

    const withoutEmail = rows.filter((r) => !r.hasEmail)

    return NextResponse.json({
      editions,
      edition,
      rows,
      stats: {
        total: rows.length,
        withEmail: rows.length - withoutEmail.length,
        withoutEmail: withoutEmail.length,
        used: rows.filter((r) => r.used).length,
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
