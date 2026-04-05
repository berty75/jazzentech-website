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

export default function SoutenirTicker() {
  const [dismissed, setDismissed] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const val = sessionStorage.getItem('ticker-dismissed')
    if (!val) setDismissed(false)

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('ticker-dismissed', '1')
    setDismissed(true)
  }

  if (dismissed) return null

  const topOffset = isScrolled ? '5.5rem' : '8rem'

  return (
    <div
      className="fixed left-0 right-0 z-40 overflow-hidden transition-all duration-500"
      style={{
        top: topOffset,
        background: 'linear-gradient(90deg, rgba(114,47,55,0.97) 0%, rgba(26,10,14,0.97) 50%, rgba(114,47,55,0.97) 100%)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.5)',
        height: '3.25rem',
      }}
    >
      {/* Fondu gauche */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(114,47,55,1), transparent)' }}
      />

      {/* Bouton CTA */}
      <Link
        href="/soutenir"
        className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-2 px-3 font-bold transition-all hover:opacity-90 whitespace-nowrap"
        style={{ background: '#d4af37', color: '#1a1a1a' }}
      >
        <Heart className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline text-sm">Nous soutenir</span>
        <span className="sm:hidden text-xs">Don</span>
      </Link>

      {/* Piste défilante */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{ left: '7rem', right: '3rem' }}
      >
        <div className="ticker-track">
          {TRACK.map((msg, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs sm:text-sm font-medium px-6 sm:px-10 whitespace-nowrap"
              style={{ color: i % 2 === 0 ? '#f7f3e9' : '#d4af37' }}
            >
              {msg}
              <span className="ml-4 sm:ml-8 opacity-50" style={{ color: '#d4af37' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Fondu droit */}
      <div
        className="absolute right-12 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(26,10,14,0.97), transparent)' }}
      />

      {/* Fermer */}
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="absolute right-0 top-0 bottom-0 z-20 w-12 flex items-center justify-center hover:bg-white/10 transition-colors"
        style={{ borderLeft: '1px solid rgba(212,175,55,0.25)' }}
      >
        <X className="w-4 h-4" style={{ color: '#d4af37' }} />
      </button>
    </div>
  )
}