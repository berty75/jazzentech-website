// PATH: src/app/api/billetweb/stats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

const BASE = 'https://www.billetweb.fr/api'
const DAY = 86400000

// GET /api/billetweb/stats?edition=Jazz en Tech
//
// Calcule, à partir des ventes Billetweb :
//  - courbe de vente cumulée par concert (axe = jours avant le concert)
//  - vitesse de vente (moyenne 7 jours glissants)
//  - comparaison de l'édition courante vs les précédentes, au même stade
//  - répartition par canal / jour de semaine / heure
//  - un score de priorité par concert (quel artiste pousser)
//
// ⚠️ Les artistes changent chaque année : on ne compare donc PAS un artiste à
// lui-même, mais chaque concert à la MOYENNE de son édition, et l'édition
// courante aux éditions passées au même nombre de jours du festival.
export async function GET(req: NextRequest) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    return NextResponse.json({ error: 'BILLETWEB_USER / BILLETWEB_KEY manquants' }, { status: 500 })
  }

  const edition = (new URL(req.url).searchParams.get('edition') || '').trim()

  try {
    const res = await fetch(`${BASE}/attendees?user=${user}&key=${key}&version=1`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !Array.isArray(data)) {
      return NextResponse.json({ error: 'Billetweb: réponse invalide' }, { status: 502 })
    }

    const paid = data.filter((a: any) => String(a.order_paid) === '1')
    const editions = [...new Set(paid.map((a: any) => (a.event_name || '').trim()).filter(Boolean))].sort().reverse()
    const current = edition || editions[0] || ''

    // ---- Regroupement par édition ----
    type Sale = { t: number; concert: string; price: number; channel: string; isPass: boolean }
    const byEdition = new Map<string, { sales: Sale[]; start: number }>()

    for (const a of paid) {
      const ed = (a.event_name || '').trim()
      if (!ed) continue
      const t = new Date((a.order_date || '').replace(' ', 'T')).getTime()
      if (isNaN(t)) continue
      const start = new Date((a.event_start || '').replace(' ', 'T')).getTime()

      if (!byEdition.has(ed)) byEdition.set(ed, { sales: [], start: isNaN(start) ? 0 : start })
      const label = `${a.ticket || ''} ${a.category || ''}`.toLowerCase()
      byEdition.get(ed)!.sales.push({
        t,
        concert: (a.category || '').trim() || 'Sans concert',
        price: parseFloat(a.price ?? '0') || 0,
        channel: String(a.order_payment_type || '').toLowerCase(),
        isPass: label.includes('pass'),
      })
    }

    const cur = byEdition.get(current)
    if (!cur || cur.sales.length === 0) {
      return NextResponse.json({ editions, edition: current, empty: true })
    }

    const festivalStart = cur.start || Math.max(...cur.sales.map((s) => s.t))
    const now = Date.now()
    const daysLeft = Math.max(0, Math.ceil((festivalStart - now) / DAY))

    // ---- Concerts de l'édition courante ----
    // On exclut les PASS : ce ne sont pas des concerts, ils fausseraient les courbes
    // et le score de priorité (un pass couvre plusieurs soirées).
    const concertSales = cur.sales.filter((s) => !s.isPass)
    const concerts = [...new Set(concertSales.map((s) => s.concert))]

    // Ventes par concert, triées dans le temps
    const perConcert = concerts.map((name) => {
      const sales = concertSales.filter((s) => s.concert === name).sort((a, b) => a.t - b.t)
      const revenue = sales.reduce((sum, s) => sum + s.price, 0)

      // courbe cumulée : (jours avant festival, total)
      const curve = sales.map((s, i) => ({
        d: Math.round((festivalStart - s.t) / DAY),  // jours avant le festival
        n: i + 1,
      }))

      // vitesse récente : billets vendus sur les 7 derniers jours
      const last7 = sales.filter((s) => s.t >= now - 7 * DAY).length
      const speed7 = last7 / 7

      // vitesse depuis le début des ventes
      const firstSale = sales[0]?.t ?? now
      const sellingDays = Math.max(1, (now - firstSale) / DAY)
      const speedAvg = sales.length / sellingDays

      return { name, count: sales.length, revenue, curve, speed7, speedAvg, sales }
    }).sort((a, b) => b.count - a.count)

    // ---- Score de priorité (quel concert pousser) ----
    // Principe : un concert est prioritaire s'il vend LENTEMENT par rapport
    // à la moyenne de son édition, et qu'il reste peu de temps.
    const avgSpeed7 = perConcert.reduce((s, c) => s + c.speed7, 0) / (perConcert.length || 1)
    const avgCount = perConcert.reduce((s, c) => s + c.count, 0) / (perConcert.length || 1)

    const priorities = perConcert.map((c) => {
      // Retard relatif : <1 = vend moins vite que la moyenne
      const speedRatio = avgSpeed7 > 0 ? c.speed7 / avgSpeed7 : 1
      const volumeRatio = avgCount > 0 ? c.count / avgCount : 1

      // Urgence temporelle : plus le festival approche, plus ça compte
      const timePressure = daysLeft <= 0 ? 0 : Math.min(1, 30 / Math.max(1, daysLeft))

      // Score 0-100 : lenteur × faible volume × pression du temps
      const lag = Math.max(0, 1 - speedRatio)         // 0 = à la moyenne, 1 = à l'arrêt
      const gap = Math.max(0, 1 - volumeRatio)        // retard en volume
      const score = Math.round(Math.min(100, (lag * 55 + gap * 45) * (0.5 + timePressure * 0.5) * 100) / 1)

      // Raison lisible
      const reasons: string[] = []
      if (speedRatio < 0.75) reasons.push(`vend ${(1 / Math.max(speedRatio, 0.01)).toFixed(1)}× moins vite que la moyenne`)
      if (volumeRatio < 0.75) reasons.push(`${Math.round((1 - volumeRatio) * 100)} % de billets en moins que la moyenne`)
      if (c.speed7 === 0 && c.count > 0) reasons.push('aucune vente cette semaine')
      if (reasons.length === 0) reasons.push('rythme conforme à la moyenne de l\u2019édition')

      return {
        name: c.name,
        count: c.count,
        revenue: c.revenue,
        speed7: Math.round(c.speed7 * 10) / 10,
        score: Math.max(0, Math.min(100, score)),
        reasons,
      }
    }).sort((a, b) => b.score - a.score)

    // ---- Comparaison inter-éditions au même stade ----
    // Combien de billets vendus à J-{daysLeft} lors de chaque édition ?
    const comparison = [...byEdition.entries()]
      .filter(([, v]) => v.start > 0 && v.sales.length > 0)
      .map(([name, v]) => {
        const atSameStage = v.sales.filter((s) => (v.start - s.t) / DAY >= daysLeft).length
        return { edition: name, atSameStage, total: v.sales.length, isCurrent: name === current }
      })
      .sort((a, b) => (a.edition < b.edition ? 1 : -1))

    // ---- Courbe globale de l'édition (cumulée, en J-x) ----
    const allSorted = [...cur.sales].sort((a, b) => a.t - b.t)
    const globalCurve = allSorted.map((s, i) => ({
      d: Math.round((festivalStart - s.t) / DAY),
      n: i + 1,
    }))

    // ---- Ventes par semaine (barres) : montre les pics, pas une courbe molle ----
    const MIN_SIGNIFICANT = 30   // en dessous, un concert n'est pas comparable
    const weeksMap = new Map<number, Map<string, number>>()  // semaine J-x → concert → n
    for (const s2 of concertSales) {
      const wk = Math.floor((festivalStart - s2.t) / DAY / 7)   // 0 = semaine du festival
      if (wk < 0 || wk > 26) continue                            // on garde 6 mois
      if (!weeksMap.has(wk)) weeksMap.set(wk, new Map())
      const m = weeksMap.get(wk)!
      m.set(s2.concert, (m.get(s2.concert) || 0) + 1)
    }
    const majorNames = perConcert.filter((c) => c.count >= MIN_SIGNIFICANT).map((c) => c.name)
    const weeks = [...weeksMap.keys()].sort((a, b) => b - a).map((wk) => {
      const m = weeksMap.get(wk)!
      const parts: Record<string, number> = {}
      let other = 0
      for (const [name, n] of m) {
        if (majorNames.includes(name)) parts[name] = n
        else other += n
      }
      const total = [...m.values()].reduce((a, b) => a + b, 0)
      return { week: wk, total, parts, other }
    })

    // ---- Quand les gens achètent (jour de semaine / heure) ----
    const WEEK = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    const byWeekday = Array.from({ length: 7 }, (_, i) => ({ day: WEEK[i], n: 0 }))
    const byHour = Array.from({ length: 24 }, (_, i) => ({ hour: i, n: 0 }))
    for (const s of cur.sales) {
      const d = new Date(s.t)
      byWeekday[d.getDay()].n += 1
      byHour[d.getHours()].n += 1
    }
    // remettre la semaine sur lundi→dimanche
    const weekdayOrdered = [...byWeekday.slice(1), byWeekday[0]]

    // ---- Canaux ----
    const chan = new Map<string, number>()
    for (const s of cur.sales) {
      const c = s.channel === 'web' || s.channel === '' ? 'En ligne'
        : s.channel === 'card' ? 'Carte (TPE)'
        : s.channel === 'cash' ? 'Espèces'
        : s.channel === 'check' ? 'Chèque'
        : s.channel === 'invitation' ? 'Invitation'
        : s.channel
      chan.set(c, (chan.get(c) || 0) + 1)
    }
    const channels = [...chan.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n)

    // ---- Pass vs billets simples ----
    const passCount = cur.sales.filter((s) => s.isPass).length

    return NextResponse.json({
      editions,
      edition: current,
      festivalStart,
      daysLeft,
      totals: {
        tickets: cur.sales.length,
        revenue: Math.round(cur.sales.reduce((s, x) => s + x.price, 0)),
        passCount,
      },
      minSignificant: MIN_SIGNIFICANT,
      weeks,
      majorNames,
      concerts: perConcert.map(({ name, count, revenue, curve, speed7 }) => ({
        name, count, revenue, curve, speed7: Math.round(speed7 * 10) / 10,
      })),
      globalCurve,
      priorities,
      comparison,
      weekday: weekdayOrdered,
      hours: byHour,
      channels,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
