// src/components/CookieBanner.tsx (version avec palette jazz)
'use client'
import { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasConsent = document.cookie.includes('jazzentech-consent=')
      if (!hasConsent) {
        setShowBanner(true)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Accept clicked') // Debug
    document.cookie = 'jazzentech-consent=accepted; path=/; max-age=31536000; SameSite=Lax'
    setShowBanner(false)
  }

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Reject clicked') // Debug
    document.cookie = 'jazzentech-consent=rejected; path=/; max-age=31536000; SameSite=Lax'
    setShowBanner(false)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 shadow-2xl p-4 sm:p-6 animate-fade-in-up"
      style={{ 
        background: 'linear-gradient(135deg, rgba(114, 47, 55, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
        zIndex: 10000,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          
          {/* Contenu principal */}
          <div className="flex items-start lg:items-center flex-1 min-w-0">
            <div 
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
            >
              <Cookie className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#d4af37' }} />
            </div>
            
            <div className="flex-1">
              <p className="text-sm md:text-base leading-relaxed mb-2" style={{ color: '#f7f3e9' }}>
                <span className="font-semibold">🍪 Cookies & confidentialité</span>
                <br />
                Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic.
              </p>
              <a 
                href="/politique-cookies" 
                className="text-xs md:text-sm font-medium hover:underline transition-colors inline-flex items-center"
                style={{ color: '#d4af37' }}
              >
                📖 Consulter notre politique de cookies →
              </a>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
            
            {/* Bouton Refuser */}
            <button
              onClick={handleReject}
              className="flex-1 lg:flex-none px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 border-2 text-sm md:text-base"
              style={{ 
                borderColor: 'rgba(212, 175, 55, 0.3)',
                backgroundColor: 'transparent',
                color: '#f7f3e9'
              }}
            >
              Refuser
            </button>
            
            {/* Bouton Accepter */}
            <button
              onClick={handleAccept}
              className="flex-1 lg:flex-none px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 transform hover:scale-105 shadow-lg text-sm md:text-base"
              style={{ 
                backgroundColor: '#d4af37', 
                color: '#722f37'
              }}
            >
              ✓ Accepter
            </button>
            
            {/* Bouton fermer */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80"
              style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                color: '#d4af37'
              }}
              aria-label="Fermer"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        
        {/* Indicateur de conformité RGPD */}
        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white border-opacity-20">
          <p className="text-xs text-center opacity-80" style={{ color: '#f7f3e9' }}>
            🔒 Conforme RGPD • Vos données sont protégées • 
            <a 
              href="/politique-confidentialite" 
              className="hover:underline ml-1"
              style={{ color: '#d4af37' }}
            >
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}