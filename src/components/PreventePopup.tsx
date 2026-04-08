'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Heart } from 'lucide-react'

const SoutenirPopup = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 1200)
    return () => clearTimeout(timeout)
  }, [])

  const handleClose = () => setIsVisible(false)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  if (!isVisible) return null

  return (
    <>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]" onClick={handleOverlayClick} />

      {/* Centrage */}
      <div className="fixed inset-0 flex items-center justify-center z-[80] p-4" onClick={handleOverlayClick}>

      {/* Wrapper simple sans animation */}
        <div
          className="relative w-full max-w-lg rounded-2xl"
          style={{ border: '2px solid rgba(212,175,55,0.5)' }}
        >
          <div
            className="relative w-full rounded-2xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col"
          >

            {/* Fond dégradé sombre sans image */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(160deg, #2d0a10 0%, #1a1a1a 55%, #2d1a00 100%)'
              }}
            />

            {/* Fermer */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-[90]"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Contenu scrollable */}
            <div className="relative z-10 overflow-y-auto flex-1 p-6 sm:p-8">

              {/* Badge */}
              <div className="flex justify-center mb-4">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.5)' }}
                >
                  <Heart className="w-3.5 h-3.5" />
                  Jazz en Tech 2026 — 11ème édition
                </div>
              </div>

              {/* Titre */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-5 leading-tight drop-shadow-lg">
                Le festival a besoin<br />
                <span style={{ color: '#d4af37' }}>de votre soutien</span>
              </h2>

              {/* Texte exact d'Alain Brunet */}
              <div className="space-y-3 text-sm sm:text-base leading-relaxed mb-5" style={{ color: '#f7f3e9' }}>
                <p className="font-semibold text-white text-sm sm:text-base drop-shadow">
                  Cher public, ce programme qui présente de nouvelles ambitions en
                  regard de l'an dernier, ne pourra être concrétisé sans votre concours.
                </p>
                <p className="drop-shadow">
                  A cette fin, nous mettons en œuvre une forme de financement participatif via
                  notre site web. La raison en est que notre premier et très important mécène
                  depuis des années n'est plus en mesure de nous soutenir.
                </p>
                <p className="drop-shadow">
                  Si vous nous l'accordez, votre soutien financier fera l'objet d'une
                  défiscalisation car le festival est juridiquement porté par une association loi
                  1901 reconnue d'intérêt général. Vous trouverez en cliquant sur le bouton
                  ci-dessous les explications sur la manière de procéder.
                </p>
              </div>

              {/* Encart déduction */}
              <div
                className="rounded-xl p-3 mb-5 flex items-center gap-4"
                style={{ backgroundColor: 'rgba(0,0,0,0.45)', border: '1px solid rgba(212,175,55,0.4)' }}
              >
                <div className="text-center flex-shrink-0">
                  <div className="text-2xl font-bold" style={{ color: '#d4af37' }}>66%</div>
                  <div className="text-xs text-stone-400">déduction fiscale</div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Un don de 50 € ne vous coûte que <strong className="text-white">17 €</strong> après déduction.
                  Un don de 100 € ne vous coûte que <strong className="text-white">34 €</strong>.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/soutenir#paliers"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 shadow-xl mb-3"
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              >
                <Heart className="w-5 h-5" />
                Choisir mon palier de soutien
              </Link>

              <button
                type="button"
                onClick={handleClose}
                className="block w-full text-center text-sm py-2 hover:underline"
                style={{ color: 'rgba(247, 243, 233, 0.6)' }}
              >
                Je verrai plus tard
              </button>

            </div>

            {/* Barre dorée */}
            <div className="relative z-10 h-1 flex-shrink-0" style={{ background: 'linear-gradient(90deg, #722f37, #d4af37, #722f37)' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SoutenirPopup