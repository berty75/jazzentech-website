'use client'
import Link from 'next/link'
import Navigation from './Navigation'
import { Menu, X, Ticket } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: '#722f37',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        height: isScrolled ? '4rem' : '6rem', // 64px scrolled, 96px normal
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
                height: isScrolled ? '3rem' : '4rem', // 48px scrolled, 64px normal
                maxHeight: isScrolled ? '3rem' : '4rem',
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

        {/* Menu mobile/tablet - affiché jusqu'à 1023px */}
        {isMenuOpen && (
          <div
            className="lg:hidden absolute top-full left-0 right-0 border-t border-white/20 shadow-lg"
            style={{ backgroundColor: '#722f37' }}
          >
            <div className="container mx-auto px-4 py-4">
              <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
              <div className="mt-4 pt-4 border-t border-white/20">
                <Link
                  href="/billetterie"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary flex items-center justify-center w-full px-6 py-3 rounded-xl font-bold transition-all duration-300 animate-pulse shadow-lg"
                  style={{
                    background: 'linear-gradient(45deg, #d4af37, #b87333)',
                    color: '#1a1a1a'
                  }}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  <span>Réserver mes billets</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}