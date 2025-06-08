'use client'
import Link from 'next/link'
import Navigation from './Navigation'
import { Menu, X, Ticket } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    const handleResize = () => {
      // Détecte le mode paysage sur mobile/tablette
      setIsLandscape(window.innerHeight < window.innerWidth && window.innerHeight < 600)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Hauteur adaptative selon l'orientation ET la taille d'écran
  const getHeaderHeight = () => {
    if (isLandscape) return '3rem' // Mode paysage mobile
    if (isScrolled) return '5.5rem'  // Scrollé desktop (88px)
    return '8rem' // Normal desktop (128px)
  }

  const getLogoHeight = () => {
    if (isLandscape) return '2rem' // Mode paysage mobile
    if (isScrolled) return '4.5rem'  // Scrollé desktop (72px)
    return '6.5rem' // Normal desktop (104px)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: '#722f37',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        height: getHeaderHeight(),
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link
            href="/"
            className="nav-link flex items-center hover:opacity-90 transition-all duration-300 rounded-lg p-1 flex-shrink-0"
          >
            <img
              src="/images/jazz-en-tech-logo.png"
              alt="Jazz en Tech Festival"
              className="w-auto transition-all duration-300"
              style={{
                height: getLogoHeight(),
                maxHeight: getLogoHeight(),
              }}
            />
          </Link>

          {/* Navigation desktop - visible seulement à partir de 1024px (lg) */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <div>
              <Navigation />
            </div>
            <Link
              href="/billetterie"
              className="btn-primary flex items-center px-4 py-2 xl:px-6 xl:py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
              style={{
                background: 'linear-gradient(45deg, #d4af37, #b87333)',
                color: '#1a1a1a',
                border: '2px solid #d4af37'
              }}
            >
              <Ticket className="w-4 h-4 xl:w-5 xl:h-5 mr-1 xl:mr-2" />
              <span className="hidden xl:inline">Billetterie</span>
              <span className="xl:hidden">Billets</span>
            </Link>
          </div>

          {/* Menu burger - visible jusqu'à 1023px */}
          <button
            className="lg:hidden text-white hover:text-yellow-300 transition-colors p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile/tablet - ADAPTATIF selon orientation */}
        {isMenuOpen && (
          <div
            className={`lg:hidden absolute left-0 right-0 border-t border-white/20 shadow-lg ${
              isLandscape 
                ? 'top-full max-h-[calc(100vh-3rem)] overflow-y-auto' 
                : 'top-full'
            }`}
            style={{ 
              backgroundColor: '#722f37',
              zIndex: 1000
            }}
          >
            <div className={`container mx-auto px-4 ${isLandscape ? 'py-2' : 'py-4'}`}>
              <Navigation 
                mobile 
                onItemClick={() => setIsMenuOpen(false)} 
                compact={isLandscape}
              />
              <div className={`border-t border-white/20 ${isLandscape ? 'mt-2 pt-2' : 'mt-4 pt-4'}`}>
                <Link
                  href="/billetterie"
                  onClick={() => setIsMenuOpen(false)}
                  className={`btn-primary flex items-center justify-center w-full rounded-xl font-bold transition-all duration-300 animate-pulse shadow-lg ${
                    isLandscape ? 'px-4 py-2 text-sm' : 'px-6 py-3'
                  }`}
                  style={{
                    background: 'linear-gradient(45deg, #d4af37, #b87333)',
                    color: '#1a1a1a'
                  }}
                >
                  <Ticket className={`mr-2 ${isLandscape ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  <span>{isLandscape ? 'Billets' : 'Réserver mes billets'}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}