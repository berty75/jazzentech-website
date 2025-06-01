'use client'
import Link from 'next/link'
import Navigation from './Navigation'
import { Menu, X } from 'lucide-react'
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
              src="/images/logo-jazz-en-tech.png"
              alt="Jazz en Tech Festival"
              className={`w-auto transition-all duration-300 ${
                isScrolled 
                  ? 'h-14 sm:h-16 md:h-18 lg:h-20'
                  : 'h-16 sm:h-18 md:h-22 lg:h-24'
              }`}
            />
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <Navigation />
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
            </div>
          </div>
        )}
      </div>
    </header>
  )
}