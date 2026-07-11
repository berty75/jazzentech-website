// PATH: src/lib/billetweb.ts
// Fonction partagée d'émission de billets Billetweb (add_order).
// Utilisée à la fois par la route guichet directe (invitation/espèces/chèque)
// et par le webhook Stripe (après paiement carte réussi).

const BASE = 'https://www.billetweb.fr/api'

export type BilletwebProduct = { firstname: string; name: string }

export type CreateOrderParams = {
  eventId: string
  ticketId: string          // id numérique du tarif (Billetweb identifie par id)
  paymentType: string       // "invitation" | "cash" | "card" | "check" | "other"
  quantity: number
  firstname: string
  name: string
  email?: string
  phone?: string
  instagram?: string
  ship?: boolean            // envoyer le billet par email
}

export type CreateOrderResult =
  | { ok: true; billetweb: any; requestId: string }
  | { ok: false; status: number; error: string; raw?: string }

// --- Panier multi-lignes : plusieurs billets (noms/tarifs différents) en UNE commande ---
export type CartLine = {
  ticketId: string   // id du tarif
  firstname: string
  name: string
  price?: number     // si défini, force le prix du billet (ex: 0 pour un concert inclus dans pass)
}
export type CreateMultiOrderParams = {
  eventId: string
  paymentType: string
  lines: CartLine[]
  email?: string
  phone?: string
  instagram?: string
  ship?: boolean
}

export async function createBilletwebMultiOrder(p: CreateMultiOrderParams): Promise<CreateOrderResult> {
  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return { ok: false, status: 500, error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }
  }
  if (!p.lines || p.lines.length === 0) {
    return { ok: false, status: 400, error: 'Panier vide' }
  }

  const stamp = Date.now()
  const requestId = `CMD-${stamp}`

  // Une commande, plusieurs produits (tous sur le même événement Billetweb)
  const products = p.lines.map((l, i) => {
    const prod: any = {
      ticket: l.ticketId,
      name: l.name,
      firstname: l.firstname,
      request_id: `BIL-${stamp}-${i + 1}`,
    }
    // Prix forcé (ex: concert inclus dans un pass → 0 €). Validé: add_order accepte "price".
    if (typeof l.price === 'number') prod.price = l.price
    return prod
  })

  const order: any = {
    payment_type: p.paymentType,
    request_id: requestId,
    ship: p.ship ? 1 : 0,
    products,
  }
  if (p.email) order.email = p.email
  if (p.phone) order.phone = p.phone
  if (p.instagram) order.instagram = p.instagram

  const payload = { data: [order] }
  const url = `${BASE}/event/${encodeURIComponent(p.eventId)}/add_order?user=${user}&key=${key}&version=1`

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
      return {
        ok: false,
        status: 502,
        error: `Billetweb add_order: ${data?.description || data?.error || raw?.slice(0, 300) || res.status}`,
        raw: raw?.slice(0, 800),
      }
    }
    return { ok: true, billetweb: data ?? raw, requestId }
  } catch (e: any) {
    return { ok: false, status: 500, error: e.message }
  }
}

export async function createBilletwebOrder(p: CreateOrderParams): Promise<CreateOrderResult> {
  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return { ok: false, status: 500, error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }
  }

  const qty = Math.max(1, Math.min(50, p.quantity || 1))
  const stamp = Date.now()
  const requestId = `CMD-${stamp}`

  const products = Array.from({ length: qty }, (_, i) => ({
    ticket: p.ticketId,
    name: p.name,
    firstname: p.firstname,
    request_id: `BIL-${stamp}-${i + 1}`,
  }))

  const order: any = {
    payment_type: p.paymentType,
    request_id: requestId,
    ship: p.ship ? 1 : 0,
    products,
  }
  if (p.email) order.email = p.email
  if (p.phone) order.phone = p.phone
  if (p.instagram) order.instagram = p.instagram

  const payload = { data: [order] }
  const url = `${BASE}/event/${encodeURIComponent(p.eventId)}/add_order?user=${user}&key=${key}&version=1`

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
      return {
        ok: false,
        status: 502,
        error: `Billetweb add_order: ${data?.description || data?.error || raw?.slice(0, 300) || res.status}`,
        raw: raw?.slice(0, 800),
      }
    }
    return { ok: true, billetweb: data ?? raw, requestId }
  } catch (e: any) {
    return { ok: false, status: 500, error: e.message }
  }
}
