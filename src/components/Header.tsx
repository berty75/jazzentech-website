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

  const headerHeight = isScrolled ? 'h-20 md:h-24' : 'h-22 md:h-28'

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerHeight}`}
      style={{
        background: '#722f37',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link 
            href="/" 
            className="nav-link flex items-center hover:opacity-90 transition-all duration-300 rounded-lg p-1"
          >
            <img
              src="/images/jazz-en-tech-logo.png"
              alt="Jazz en Tech Festival"
              className={`w-auto transition-all duration-300 ${
                isScrolled 
                  ? 'h-14 sm:h-16 md:h-18 lg:h-20'
                  : 'h-16 sm:h-18 md:h-22 lg:h-24'
              }`}
            />
          </Link>

          {/* Navigation desktop + CTA Billetterie */}
          <div className="hidden md:flex items-center space-x-6">
            <Navigation />
            
            {/* CTA Billetterie - Très visible */}
            <Link
              href="/billetterie"
              className="btn-primary flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
              style={{ 
                background: 'linear-gradient(45deg, #d4af37, #b87333)', 
                color: '#1a1a1a',
                border: '2px solid #d4af37'
              }}
            >
              <Ticket className="w-5 h-5 mr-2" />
              <span className="hidden lg:inline">Billetterie</span>
              <span className="lg:hidden">Billets</span>
            </Link>
          </div>

          {/* Menu burger mobile */}
          <button
            className="focus-minimal md:hidden text-white hover:text-yellow-300 transition-colors p-2 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div 
            className="md:hidden absolute top-full left-0 right-0 border-t border-white/20 shadow-lg"
            style={{ backgroundColor: '#722f37' }}
          >
            <div className="container mx-auto px-4 py-4">
              <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
              
              {/* CTA Billetterie mobile */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <Link
                  href="/billetterie"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary flex items-center justify-center w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 animate-pulse shadow-lg"
                  style={{ 
                    background: 'linear-gradient(45deg, #d4af37, #b87333)', 
                    color: '#1a1a1a' 
                  }}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Réserver mes billets
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}