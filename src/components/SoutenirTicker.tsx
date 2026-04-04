'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, X } from 'lucide-react'

const MESSAGES = [
  '🎺 Soutenez Jazz en Tech 2026',
  '♪ 11ème édition — 5, 6, 7 & 8 août à Céret',
  '🎷 Hommage Miles Davis & John Coltrane — centenaire',
  '❤️ Votre don est déductible à 66 % de vos impôts',
  '🎵 Association loi 1901 — 100 % bénévoles',
  '🌟 Aidez-nous à financer cette édition anniversaire',
]

// On duplique pour créer l'illusion d'un défilement infini
const TRACK = [...MESSAGES, ...MESSAGES]

export default function SoutenirTicker() {
  const [dismissed, setDismissed] = useState(true) // masqué par défaut côté SSR

  useEffect(() => {
    const val = sessionStorage.getItem('ticker-dismissed')
    if (!val) setDismissed(false)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('ticker-dismissed', '1')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #1a1a1a 0%, #2d1a1e 40%, #1a1a1a 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.5)',
        height: '2.5rem',
      }}
    >
      {/* Fondu gauche */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #1a1a1a, transparent)' }}
      />

      {/* Lien CTA à gauche */}
      <Link
        href="/soutenir"
        className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-1.5 px-3 font-bold text-xs transition-opacity hover:opacity-80 whitespace-nowrap"
        style={{
          background: '#d4af37',
          color: '#1a1a1a',
        }}
      >
        <Heart className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="hidden sm:inline">Nous soutenir</span>
        <span className="sm:hidden">Don</span>
      </Link>

      {/* Piste défilante */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{ left: '6rem', right: '2.5rem' }}
      >
        <div className="ticker-track">
          {TRACK.map((msg, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs font-medium px-6 whitespace-nowrap"
              style={{ color: i % 2 === 0 ? '#f7f3e9' : '#d4af37' }}
            >
              {msg}
              <span className="ml-6 opacity-40" style={{ color: '#d4af37' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Fondu droit */}
      <div
        className="absolute right-10 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #1a1a1a, transparent)' }}
      />

      {/* Fermer */}
      <button
        onClick={dismiss}
        aria-label="Fermer la banderole"
        className="absolute right-0 top-0 bottom-0 z-20 w-10 flex items-center justify-center hover:bg-white/10 transition-colors"
        style={{ borderLeft: '1px solid rgba(212,175,55,0.2)' }}
      >
        <X className="w-3.5 h-3.5" style={{ color: '#d4af37' }} />
      </button>
    </div>
  )
}