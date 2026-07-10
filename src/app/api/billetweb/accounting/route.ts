// PATH: src/app/api/billetweb/accounting/route.ts
import { NextRequest, NextResponse } from 'next/server'

const BASE = 'https://www.billetweb.fr/api'

function creds() {
  return { user: process.env.BILLETWEB_USER, key: process.env.BILLETWEB_KEY }
}

// GET /api/billetweb/accounting?start=YYYY-MM-DD&end=YYYY-MM-DD&edition=...&editionsOnly=1
// Source: /api/attendees (historique complet, total calé sur Billetweb)
//
// Règles de filtrage :
//  - Si "edition" est fourni  → on filtre UNIQUEMENT par édition (les dates sont ignorées).
//    Une édition = un event Billetweb ; découper une édition par dates n'a pas de sens comptable.
//  - Si "edition" est vide     → on filtre par période (start/end) sur toutes les éditions.
//  - editionsOnly=1            → on renvoie seulement la liste des éditions (chargement initial rapide).
export async function GET(req: NextRequest) {
  const { user, key } = creds()
  if (!user || !key) {
    return NextResponse.json({ error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const startStr = searchParams.get('start') || ''
  const endStr = searchParams.get('end') || ''
  const edition = (searchParams.get('edition') || '').trim() // filtre par event_name
  const editionsOnly = searchParams.get('editionsOnly') === '1'
  const auth = `user=${user}&key=${key}&version=1`

  try {
    // Participants (toutes éditions, tout l'historique)
    const res = await fetch(`${BASE}/attendees?${auth}`, { headers: { Accept: 'application/json' } })
    const data = await res.json().catch(() => null)
    if (!res.ok || (data && data.error)) {
      return NextResponse.json(
        { error: `Billetweb attendees: ${data?.description || res.status}` },
        { status: 502 }
      )
    }
    const attendees: any[] = Array.isArray(data) ? data : []

    // Liste des éditions disponibles (pour le filtre) — triée, plus récente en premier
    const editions = [...new Set(attendees.map((a) => (a.event_name || '').trim()).filter(Boolean))].sort().reverse()

    // Chargement initial : on ne renvoie que la liste des éditions
    if (editionsOnly) {
      return NextResponse.json({ editions })
    }

    // Si on filtre par édition, on ignore la période (cohérence comptable).
    const useDateFilter = !edition && (startStr || endStr)
    const startD = startStr || '0000-00-00'
    const endD = endStr || '9999-12-31'

    const rows: any[] = []
    const totals = { brut: 0, count: 0, saleCount: 0, passCount: 0, includedCount: 0, freeCount: 0 }

    // Totaux par canal de vente (nombre de billets + montant encaissé)
    const channels = {
      online: { count: 0, amount: 0 },      // vente en ligne (web)
      card: { count: 0, amount: 0 },        // carte TPE (guichet)
      cash: { count: 0, amount: 0 },        // espèces (guichet)
      check: { count: 0, amount: 0 },       // chèque (guichet)
      invitation: { count: 0, amount: 0 },  // invitation
      other: { count: 0, amount: 0 },       // autre
    }

    // Total encaissé TOUT l'historique, toutes éditions, sans aucun filtre.
    // Sert uniquement à comparer au total des virements Billetweb (même périmètre).
    // NB: c'est le prix payé par le client, AVANT commissions Billetweb → estimation haute.
    let grandTotalBrut = 0
    let grandTotalCount = 0

    // Détecte si un billet est un CONCERT INCLUS dans un pass.
    // Découvert via la structure Billetweb réelle :
    //  - champ `pass` = ID du billet-pass parent (non vide et ≠ "0") sur les concerts consommés via pass
    //  - `reduction_code` contient le libellé du pass (ex: "Pass Céret - ... > Tarif Standard - Céret 4 concerts")
    const isIncludedInPass = (a: any) => {
      const passRef = String(a.pass || '').trim()
      const hasPassParent = passRef !== '' && passRef !== '0'
      const rc = String(a.reduction_code || '').toLowerCase()
      const rcIsPass = rc.includes('pass')
      return hasPassParent || rcIsPass
    }

    // Détecte la LIGNE MÈRE d'un pass (celle qui porte le prix, ex: "Pass Céret ... 55 €")
    const isPassParent = (a: any) => {
      const price = parseFloat(a.price ?? '0') || 0
      const label = `${a.ticket || ''} ${a.category || ''}`.toLowerCase()
      return price > 0 && label.includes('pass')
    }

    for (const a of attendees) {
      // On ne compte que les commandes payées
      if (String(a.order_paid) !== '1') continue

      // Cumul global (avant tout filtre édition/date) — hors invitations (0 € encaissé)
      const gPay = String(a.order_payment_type || '').toLowerCase()
      const gPrice = gPay === 'invitation' ? 0 : (parseFloat(a.price ?? '0') || 0)
      grandTotalBrut += gPrice
      grandTotalCount += 1

      const eventName = (a.event_name || '').trim()
      if (edition && eventName !== edition) continue

      // Filtre période (uniquement si aucune édition sélectionnée)
      if (useDateFilter) {
        const orderDate = (a.order_date || a.last_update || '').slice(0, 10)
        if (orderDate && (orderDate < startD || orderDate > endD)) continue
      }

      const price = parseFloat(a.price ?? '0') || 0

      // Canal de vente, d'après order_payment_type + order_origin
      //  web / origin=web → vente en ligne ; sinon guichet (card/cash/check/invitation)
      const rawPay = String(a.order_payment_type || '').toLowerCase()
      const origin = String(a.order_origin || '').toLowerCase()
      let channel: 'online' | 'card' | 'cash' | 'check' | 'invitation' | 'other' = 'other'
      if (rawPay === 'web' || origin === 'web') channel = 'online'
      else if (rawPay === 'card') channel = 'card'
      else if (rawPay === 'cash') channel = 'cash'
      else if (rawPay === 'check') channel = 'check'
      else if (rawPay === 'invitation') channel = 'invitation'
      else if (origin === '' && rawPay === '') channel = 'online' // anciens billets sans info → online par défaut

      const isInvitation = channel === 'invitation'

      // 4 natures :
      //  - included : concert à 0 € consommé via un pass (ni recette, ni gratuit)
      //  - pass     : ligne mère du pass, porte la recette
      //  - free     : vrai gratuit / invitation (0 € de recette)
      //  - sale     : billet payé simple
      let kind: 'pass' | 'sale' | 'free' | 'included' = 'sale'
      if (isInvitation) kind = 'free'                       // invitation = place offerte, 0 € de recette
      else if (price === 0 && isIncludedInPass(a)) kind = 'included'
      else if (isPassParent(a)) kind = 'pass'
      else if (price === 0) kind = 'free'

      // Recette réellement encaissée : 0 pour une invitation (même si le billet vaut 15 €)
      const revenue = isInvitation ? 0 : price

      rows.push({
        date: (a.order_date || '').slice(0, 16),
        eventName,
        concert: (a.category || '').trim(),
        ticket: (a.ticket || '').trim(),
        buyer: `${a.order_firstname || ''} ${a.order_name || ''}`.trim(),
        email: a.order_email || a.email || '',
        channel,
        rawPay: a.order_payment_type || '',
        kind,
        price,            // prix nominal du billet (ce que vaut le tarif)
        revenue,          // recette réellement comptée (0 si invitation)
      })

      totals.brut += revenue   // le total Recettes ne compte PAS les invitations
      totals.count += 1
      if (kind === 'pass') totals.passCount += 1
      else if (kind === 'included') totals.includedCount += 1
      else if (kind === 'free') totals.freeCount += 1
      else totals.saleCount += 1

      // Totaux par canal (nombre + montant réellement encaissé) — utile pour la caisse du soir
      channels[channel].count += 1
      channels[channel].amount += revenue
    }

    // tri par date décroissante
    rows.sort((x, y) => (x.date < y.date ? 1 : -1))

    // Virements reçus (payouts) — globaux, non ventilables par édition côté Billetweb
    const payRes = await fetch(`${BASE}/payouts?${auth}`, { headers: { Accept: 'application/json' } })
    const payData = await payRes.json().catch(() => null)
    const payoutsRaw: any[] = Array.isArray(payData) ? payData : []
    const payoutRows = payoutsRaw.map((p) => ({
      date: p.date || '',
      amount: parseFloat(p.amount ?? '0') || 0,
      account: p.account || '',
      iban: p.iban || '',
      swift: p.swift || '',
    }))
    const payoutTotal = payoutRows.reduce((s, p) => s + p.amount, 0)

    return NextResponse.json({
      period: { start: startStr, end: endStr },
      edition,                 // édition active (ou '' pour toutes)
      dateFilterApplied: useDateFilter,
      editions,
      rows,
      totals,
      channels,
      payouts: payoutRows,
      payoutTotal,
      grandTotalBrut,   // total encaissé tout l'historique (avant commissions Billetweb)
      grandTotalCount,  // nb de billets payés tout l'historique
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
