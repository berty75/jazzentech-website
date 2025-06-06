import React from 'react'
import Link from 'next/link'
import { Music, Calendar, MapPin } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artistes - Jazz en Tech 2025',
  description: 'Découvrez tous les artistes de la 10ème édition du festival Jazz en Tech 2025.'
}

export default function ArtistesIndex() {
  const artists = [
    {
      name: 'Manu Le Prince',
      slug: 'manu-le-prince',
      image: '/images/manu-le-prince.jpeg',
      date: '27 juillet 2025',
      venue: 'Saint-Génis-des-Fontaines',
      type: 'Bossa Nova'
    },
    {
      name: 'Florin Gugulica',
      slug: 'florin-gugulica', 
      image: '/images/florin-gugulica.jpeg',
      date: '28 juillet 2025',
      venue: 'Saint-Génis-des-Fontaines',
      type: 'Jazz Manouche'
    },
    {
      name: 'Stefano Di Battista',
      slug: 'stefano-di-battista',
      image: '/images/stefano-di-battista.jpg',
      date: '7 août 2025',
      venue: 'Céret',
      type: 'Jazz Italien'
    },
    {
      name: 'Jacky Terrasson',
      slug: 'jacky-terrasson',
      image: '/images/jacky-terrasson.jpeg', 
      date: '8 août 2025',
      venue: 'Céret',
      type: 'Piano Jazz'
    },
    {
      name: 'Camille Bertault',
      slug: 'camille-bertault',
      image: '/images/camille-bertault.jpg',
      date: '8 août 2025',
      venue: 'Céret',
      type: 'Jazz Vocal'
    },
    {
      name: 'Charlotte Planchou',
      slug: 'charlotte-planchou',
      image: '/images/charlotte-planchou.jpg',
      date: '9 août 2025',
      venue: 'Céret',
      type: 'Jazz Vocal'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <title>Artistes - Jazz en Tech 2025</title>
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Nos Artistes 2025
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Découvrez tous les artistes de la 10ème édition exceptionnelle
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Grille d'artistes accessible */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <article 
                key={artist.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link 
                  href={`/artistes/${artist.slug}`}
                  className="block"
                  aria-label={`Découvrir ${artist.name}, ${artist.type}`}
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={artist.image}
                      alt={`${artist.name}, artiste ${artist.type}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: '#d4af37', color: '#722f37' }}>
                        {artist.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2" style={{ color: '#722f37' }}>
                      {artist.name}
                    </h2>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <span>{artist.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <span>{artist.venue}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-sm font-medium" style={{ color: '#722f37' }}>
                        Voir la biographie →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Navigation vers programmation */}
          <div className="text-center mt-12">
            <Link 
              href="/programmation"
              className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
            >
              <Music className="w-6 h-6 mr-3" />
              Voir la programmation complète
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}