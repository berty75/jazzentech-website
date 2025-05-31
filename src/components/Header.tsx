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
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`${isScrolled ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 backdrop-blur-md' : 'py-6'
      }`}
      style={{
        background: '#722f37', // TOUJOURS deep-burgundy, même au scroll
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.3)' : 'none'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-90 transition-all duration-300">
            <img
              src="/images/logo-jazz-en-tech.png"
              alt="Jazz en Tech Festival"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? 'h-14' : 'h-20 md:h-24'
              }`}
            />
          </Link>

          <div className="hidden md:block">
            <Navigation />
          </div>

          <button
            className="md:hidden text-white hover:text-yellow-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 mt-4 border-t border-white/20">
            <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}