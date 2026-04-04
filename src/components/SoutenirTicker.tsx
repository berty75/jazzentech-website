'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, X } from 'lucide-react'

const MESSAGES = [
  '🎺 Soutenez Jazz en Tech 2026',
  '♪ 11ème édition — 5, 6, 7 & 8 août à Céret',
  '🎷 Hommage Miles Davis & John Coltrane — centenaire',
  '❤️ Don déductible à 66 % de vos impôts',
  '🎵 Association loi 1901 — 100 % bénévoles',
  '🌟 Aidez-nous à financer cette édition anniversaire',
]

const TRACK = [...MESSAGES, ...MESSAGES]

interface SoutenirTickerProps {
  inline?: boolean // true = intégré dans la page, false = fixed bottom
}

export default function SoutenirTicker({ inline = false }: SoutenirTickerProps) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!inline) {
      const val = sessionStorage.getItem('ticker-dismissed')
      if (val) setDismissed(true)
    }
  }, [inline])

  const dismiss = () => {
    if (!inline) sessionStorage.setItem('ticker-dismissed', '1')
    setDismissed(true)
  }

  if (dismissed) return null

  const wrapperClass = inline
    ? 'relative w-full overflow-hidden rounded-xl mt-6'
    : 'fixed bottom-0 left-0 right-0 z-40 overflow-hidden'

  return (
    <div
      className={`${wrapperClass}`}
      style={{
        background: 'linear-gradient(90deg, rgba(26,26,26,0.85) 0%, rgba(45,26,30,0.9) 50%, rgba(26,26,26,0.85) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.4)',
        height: '4rem',
      }}
    >
      {/* Fondu gauche */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(26,26,26,0.9), transparent)' }}
      />

      {/* Bouton CTA gauche */}
      <Link
        href="/soutenir"
        className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-2 px-4 font-bold text-sm transition-opacity hover:opacity-80 whitespace-nowrap"
        style={{ background: '#d4af37', color: '#1a1a1a' }}
      >
        <Heart className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">Nous soutenir</span>
        <span className="sm:hidden">Don</span>
      </Link>

      {/* Piste défilante */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{ left: '8rem', right: '3rem' }}
      >
        <div className="ticker-track">
          {TRACK.map((msg, i) => (
            <span
              key={i}
              className="inline-flex items-center text-sm font-medium px-8 whitespace-nowrap"
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
        style={{ background: 'linear-gradient(to left, rgba(26,26,26,0.9), transparent)' }}
      />

      {/* Fermer */}
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center hover:bg-white/10 transition-colors"
        style={{ borderLeft: '1px solid rgba(212,175,55,0.2)' }}
      >
        <X className="w-4 h-4" style={{ color: '#d4af37' }} />
      </button>
    </div>
  )
}