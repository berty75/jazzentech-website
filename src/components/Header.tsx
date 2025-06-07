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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-responsive"
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
              className="w-auto transition-all duration-300 logo-responsive"
              style={{
                height: isScrolled ? '3rem' : '4rem', // 48px scrolled, 64px normal
                maxHeight: isScrolled ? '3rem' : '4rem',
              }}
            />
          </Link>

          {/* Navigation desktop SEULEMENT (à partir de 1024px) */}
          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6 nav-responsive">
            <div className="nav-items-responsive">
              <Navigation />
            </div>
            <Link
              href="/billetterie"
              className="btn-primary flex items-center px-4 py-2 2xl:px-6 2xl:py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse btn-responsive"
              style={{
                background: 'linear-gradient(45deg, #d4af37, #b87333)',
                color: '#1a1a1a',
                border: '2px solid #d4af37'
              }}
            >
              <Ticket className="w-4 h-4 2xl:w-5 2xl:h-5 mr-1 2xl:mr-2 ticket-responsive" />
              <span className="hidden 2xl:inline text-responsive-lg">Billetterie</span>
              <span className="2xl:hidden text-responsive-sm">Billets</span>
            </Link>
          </div>

          {/* Menu burger pour mobile, tablet ET iPad (jusqu'à 1279px) */}
          <button
            className="focus-minimal xl:hidden text-white hover:text-yellow-300 transition-colors p-2 rounded-lg burger-responsive"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu mobile/tablet/iPad */}
        {isMenuOpen && (
          <div
            className="xl:hidden absolute top-full left-0 right-0 border-t border-white/20 shadow-lg mobile-menu-responsive"
            style={{ backgroundColor: '#722f37' }}
          >
            <div className="container mx-auto px-4 py-3">
              <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
              <div className="mt-4 pt-3 border-t border-white/20">
                <Link
                  href="/billetterie"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary flex items-center justify-center w-full px-6 py-3 rounded-xl font-bold transition-all duration-300 animate-pulse shadow-lg mobile-btn-responsive"
                  style={{
                    background: 'linear-gradient(45deg, #d4af37, #b87333)',
                    color: '#1a1a1a'
                  }}
                >
                  <Ticket className="w-5 h-5 mr-2 mobile-ticket-responsive" />
                  <span className="mobile-text-responsive">Réserver mes billets</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}