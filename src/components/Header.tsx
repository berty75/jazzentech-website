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
      setIsScrolled(scrollTop > 50) // Change après 50px de scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`bg-jazz-red shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo qui change de taille */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-all duration-300">
            <img
              src="/images/logo-jazz-en-tech.png"
              alt="Jazz en Tech Festival"
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-12' : 'h-20 md:h-24'
              }`}
            />
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}