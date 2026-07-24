// PATH: src/app/api/places-restantes/route.ts
import { NextResponse } from 'next/server'

const BASE = 'https://www.billetweb.fr/api'

// ---- Jauges ----
//
// La clé est un fragment du nom de la CATÉGORIE Billetweb (le concert), en
// minuscules et sans accent. On compte au niveau de la catégorie, pas du tarif :
// c'est ce que fait Billetweb lui-même (195 Prévente + 222 Standard = 417/450),
// et c'est ce qui garantit que le site et le widget affichent le même chiffre.
//
// ⚠️ La jauge saisie ici doit être celle DISPONIBLE À LA VENTE EN LIGNE, pas la
// capacité de la salle. Pour Truffaz : 550 places au total, moins 60 vendues par
// l'office de tourisme et 40 réservées aux invités = 450. C'est la même valeur
// que le quota posé dans Billetweb, et les deux doivent rester alignées.
const JAUGES: { match: string; capacity: number }[] = [
  { match: 'truffaz', capacity: 450 },
  { match: 'dal sasso', capacity: 450 },
  { match: 'ladyva', capacity: 450 },
  { match: 'akpe', capacity: 450 },
]

// Au-dessus de ce seuil, on n'affiche rien : « 191 places restantes » n'a aucun
// pouvoir d'entraînement et souligne surtout que la salle est vide.
const SEUIL_AFFICHAGE = 60

type Cache = { at: number; data: unknown }
let cache: Cache | null = null
const TTL = 60_000

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// GET /api/places-restantes
//
// Route PUBLIQUE : elle ne renvoie que des nombres, jamais un nom, un email ou
// quoi que ce soit d'identifiant.
export async function GET() {
  if (cache && Date.now() - cache.at < TTL) {
    return NextResponse.json(cache.data, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    })
  }

  const user = process.env.BILLETWEB_USER
  const key = process.env.BILLETWEB_KEY
  if (!user || !key) {
    // Sans identifiants, on ne bloque pas la page : on renvoie une liste vide et
    // le composant ne s'affiche simplement pas.
    return NextResponse.json({ concerts: [] })
  }

  try {
    const res = await fetch(`${BASE}/attendees?user=${user}&key=${key}&version=1`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    const data = await res.json().catch(() => null)
    if (!res.ok || !Array.isArray(data)) {
      return NextResponse.json({ concerts: [], erreur: 'billetweb' }, { status: 200 })
    }

    // On ne garde que les billets payés et les concerts à venir : cela isole
    // l'édition courante sans avoir à la nommer, et sans casser l'an prochain.
    const horizon = Date.now() - 86_400_000
    const vendus = new Map<string, number>()

    for (const a of data) {
      if (String(a.order_paid) !== '1') continue

      const debut = new Date(String(a.event_start || '').replace(' ', 'T')).getTime()
      if (isNaN(debut) || debut < horizon) continue

      const categorie = normalise(String(a.category || ''))
      if (!categorie) continue

      const jauge = JAUGES.find((j) => categorie.includes(j.match))
      if (!jauge) continue

      vendus.set(jauge.match, (vendus.get(jauge.match) || 0) + 1)
    }

    const concerts = JAUGES.map((j) => {
      const sold = vendus.get(j.match) || 0
      const remaining = Math.max(0, j.capacity - sold)
      return {
        match: j.match,
        capacity: j.capacity,
        sold, // à comparer avec le compteur Billetweb pour valider la mesure
        remaining,
        soldOut: remaining === 0,
        // Le composant n'affiche le badge que si ce drapeau est vrai.
        show: remaining === 0 || remaining <= SEUIL_AFFICHAGE,
      }
    })

    const payload = { concerts, at: Date.now() }
    cache = { at: Date.now(), data: payload }

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    })
  } catch (e) {
    console.error('[places-restantes]', e)
    return NextResponse.json({ concerts: [] }, { status: 200 })
  }
}
