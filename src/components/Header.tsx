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

  return (
<header 
  className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}
  style={{
    background: isScrolled 
      ? '#050526' 
      : 'linear-gradient(45deg, #050526 0%, #262671 50%, #3c3ca3 100%)',
    boxShadow: isScrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
  }}
>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-90 transition-all duration-300">
            <img
              src="/images/logo-jazz-en-tech.png"
              alt="Jazz en Tech Festival"
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-12' : 'h-20 md:h-24'
              }`}
            />
          </Link>

          <div className="hidden md:block">
            <Navigation />
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}