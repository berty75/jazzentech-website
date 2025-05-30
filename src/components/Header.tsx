'use client'
import Link from 'next/link'
import Navigation from './Navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-jazz-red shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo avec image */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src="/images/logo-jazz-en-tech.png" 
              alt="Jazz en Tech Festival"
              className="h-10 w-auto" 
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