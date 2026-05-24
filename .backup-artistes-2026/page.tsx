import React from 'react'
import Link from 'next/link'
import { Music, Calendar, MapPin, Ticket } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Artistes - Jazz en Tech 2026',
  description: 'Découvrez tous les artistes de la 11ème édition du festival Jazz en Tech 2026.'
}

export default function ArtistesIndex() {
  const artists = [
    {
      name: 'Erik Truffaz & Antonio Lizana',
      slug: 'erik-truffaz',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/erik_truffaz_antonio_lizana_jazz.jpg',
      date: '5 août 2026',
      venue: 'Céret',
      type: 'Jazz / Flamenco',
      price: '25€',
      subtitle: '"New Sketches of Spain"'
    },
    {
      name: 'Ladyva & Barcelona Big Blues Band',
      slug: 'ladyva',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Ladyva.jpg',
      date: '7 août 2026',
      venue: 'Céret',
      type: 'Boogie-Woogie',
      price: '22€',
      promo: '17€',
      subtitle: 'Une association explosive !'
    }
  ]

  // Vérifier si la promo Ladyva est active
  const now = new Date()
  const promoEnd = new Date('2026-04-15T23:59:59')
  const isPromoActive = now <= promoEnd

  return (
    <div className="min-h-screen">
      <title>Artistes - Jazz en Tech 2026</title>
      
      {/* Hero Section */}
      <section className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <Music className="w-4 h-4" style={{ color: '#d4af37' }} />
            <span className="text-sm font-semibold text-white">11ème ÉDITION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Nos Artistes 2026
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Découvrez les têtes d'affiche de cette 11ème édition exceptionnelle
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Grille d'artistes */}
          <div className="grid md:grid-cols-2 gap-8">
            {artists.map((artist) => (
              <article 
                key={artist.slug}
                className="rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{ border: '1px solid rgba(212, 175, 55, 0.2)' }}
              >
                <Link 
                  href={`/artistes/${artist.slug}`}
                  className="block"
                  aria-label={`Découvrir ${artist.name}, ${artist.type}`}
                >
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src={artist.image}
                      alt={`${artist.name}, artiste ${artist.type}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span 
                        className="text-xs px-3 py-1.5 rounded-full font-bold"
                        style={{ 
                          backgroundColor: artist.type === 'Boogie-Woogie' ? '#d4af37' : '#722f37', 
                          color: artist.type === 'Boogie-Woogie' ? '#1a1a1a' : '#f7f3e9'
                        }}
                      >
                        {artist.type.toUpperCase()}
                      </span>
                      {artist.promo && isPromoActive && (
                        <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-green-500 text-white animate-pulse">
                          PROMO
                        </span>
                      )}
                    </div>

                    {/* Titre sur l'image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-xl md:text-2xl font-bold mb-1">
                        {artist.name}
                      </h2>
                      <p className="text-sm text-white">{artist.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="p-6" style={{ background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(114, 47, 55, 0.9) 100%)' }}>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-white">
                        <Calendar className="w-3 h-3" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <span>{artist.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-white">
                        <MapPin className="w-3 h-3" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <span>{artist.venue}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5" style={{ color: '#d4af37' }} />
                        {artist.promo && isPromoActive ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">{artist.promo}</span>
                            <span className="text-sm line-through text-white/50">{artist.price}</span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-white">{artist.price}</span>
                        )}
                      </div>
                      <span 
                        className="text-sm font-semibold px-4 py-2 rounded-full transition-all"
                        style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                      >
                        Découvrir →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA Billetterie */}
          <div className="text-center mt-12">
            <Link 
              href="/billetterie"
              className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
            >
              <Ticket className="w-6 h-6 mr-3" />
              Réserver mes places
            </Link>
          </div>

          {/* Navigation vers programmation */}
          <div className="text-center mt-6">
            <Link 
              href="/programmation"
              className="inline-flex items-center text-lg font-semibold transition-all hover:opacity-80"
              style={{ color: '#d4af37' }}
            >
              <Music className="w-5 h-5 mr-2" />
              Voir la programmation complète →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}