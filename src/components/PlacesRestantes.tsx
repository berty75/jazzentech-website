// PATH: src/components/PlacesRestantes.tsx
'use client'

import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

type Concert = {
  match: string
  remaining: number
  soldOut: boolean
  show: boolean
}

// Correspondance slug de page → clé de jauge de /api/places-restantes.
// Centralisée ici pour que les pages n'aient qu'à passer leur slug.
const JAUGE_PAR_SLUG: Record<string, string> = {
  'erik-truffaz': 'truffaz',
  'dal-sasso': 'dal sasso',
  ladyva: 'ladyva',
  'akpe-motion': 'akpe',
}

// Cache partagé entre toutes les instances du composant : la page billetterie en
// affiche un par concert, il serait absurde de lancer quatre requêtes.
let enCours: Promise<Concert[]> | null = null

function charger(): Promise<Concert[]> {
  if (!enCours) {
    enCours = fetch('/api/places-restantes')
      .then((r) => r.json())
      .then((d) => (Array.isArray(d?.concerts) ? d.concerts : []))
      .catch(() => [])
    // On relâche au bout d'une minute pour suivre le cache serveur.
    setTimeout(() => { enCours = null }, 60_000)
  }
  return enCours
}

/**
 * Affiche « Plus que N places » ou « Complet » pour un concert.
 *
 * Ne s'affiche que sous le seuil défini côté serveur, et reste totalement muet
 * en cas d'erreur : mieux vaut aucun compteur qu'un compteur faux sur une page
 * de vente.
 */
export default function PlacesRestantes({ slug, match }: { slug?: string; match?: string }) {
  const [concert, setConcert] = useState<Concert | null>(null)
  const cle = match || (slug ? JAUGE_PAR_SLUG[slug] : undefined)

  useEffect(() => {
    if (!cle) return
    let vivant = true
    charger().then((liste) => {
      if (!vivant) return
      setConcert(liste.find((c) => c.match === cle) || null)
    })
    return () => { vivant = false }
  }, [cle])

  if (!cle || !concert || !concert.show) return null

  if (concert.soldOut) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: 'rgba(114, 47, 55, 0.85)', color: '#f7f3e9' }}
      >
        Complet
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: 'rgba(212, 175, 55, 0.12)',
        border: '1px solid rgba(212, 175, 55, 0.4)',
        color: '#d4af37',
      }}
    >
      <AlertCircle className="w-3.5 h-3.5" />
      {concert.remaining <= 1
        ? 'Dernière place'
        : `Plus que ${concert.remaining} places`}
    </span>
  )
}
