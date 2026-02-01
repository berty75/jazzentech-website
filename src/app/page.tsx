'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Ticket, Music, Users, Star } from 'lucide-react'
import { useModal } from '@/components/ModalContext'

export default function Home() {
  const { openModal } = useModal()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-24 relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#d4af37' }}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#b87333' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
                Jazz en Tech <span style={{ color: '#d4af37' }}>2026</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl" style={{ color: '#f7f3e9' }}>
                Le festival qui fait swinguer les Pyrénées Orientales 
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={() => openModal()}
                  className="inline-block px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  Réserver
                </button>
                <Link
                  href="#evenement"
                  className="inline-block border-2 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
                  style={{ borderColor: '#d4af37', color: '#d4af37' }}
                >
                  Concert événement
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center items-start">
              <div className="relative group w-full max-w-sm lg:max-w-md">
                <Image
                  src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/jazz_en_tech_ceret.jpg"
                  alt="Affiche Jazz en Tech 2026"
                  className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority={true}
                  width={400}
                  height={600}
                />
                
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold shadow-xl" style={{ background: 'linear-gradient(45deg, #d4af37, #b87333)', color: '#1a1a1a' }}>
                  <div className="text-center">
                    <div className="text-xs sm:text-xs md:text-sm">11ème</div>
                    <div className="text-xs sm:text-xs md:text-sm">édition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Section Concert Événement */}
        <section id="evenement" className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #722f37 100%)' }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '2px solid #d4af37' }}>
                <Music className="w-5 h-5" style={{ color: '#d4af37' }} />
                <span className="text-sm font-semibold" style={{ color: '#d4af37' }}>HOMMAGE À MILES DAVIS • 100 ANS</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative">
                <Image
                  src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/erik_truffaz_antonio_lizana_jazz.jpg"
                  alt="Erik Truffaz et Antonio Lizana en concert"
                  className="w-full rounded-2xl shadow-2xl"
                  width={600}
                  height={400}
                />
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg shadow-lg" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                  <span className="text-sm font-bold">© Antonio Barce</span>
                </div>
              </div>

              <div className="text-white">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                  Erik Truffaz & Antonio Lizana
                </h2>
                <p className="text-xl sm:text-2xl mb-2" style={{ color: '#d4af37' }}>
                  "New Sketches of Spain"
                </p>
                <p className="text-base mb-6" style={{ color: '#f7f3e9' }}>
                  Inspiré du chef-d'œuvre de Miles Davis
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}>
                    <Calendar className="w-5 h-5" style={{ color: '#d4af37' }} />
                    <span>Mercredi 5 août 2026</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}>
                    <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                    <span>Céret • 21h</span>
                  </div>
                </div>

                <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <p className="text-sm mb-2" style={{ color: '#f7f3e9' }}>🎟️ Tarif prévente du 1er février au 1er mars</p>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold" style={{ color: '#d4af37' }}>20€</span>
                    <span className="text-xl line-through" style={{ color: '#888' }}>25€</span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>-20%</span>
                  </div>
                </div>

                <button
                  onClick={() => openModal()}
                  className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  Réserver ma place
                </button>
              </div>
            </div>

            {/* Citation */}
            <div className="max-w-4xl mx-auto mt-16">
              <blockquote className="relative p-8 rounded-2xl" style={{ backgroundColor: 'rgba(247, 243, 233, 0.05)', borderLeft: '4px solid #d4af37' }}>
                <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: '#f7f3e9' }}>
                  « Fasciné par la découverte de musiques liées à la tradition populaire espagnole [...] et par certaines expressions du patrimoine culturel de ce pays [...], le trompettiste Miles Davis en a donné sa vision intense et poétisée dans "Sketches of Spain", chef-d'œuvre marquant l'ouverture du jazz aux musiques du monde. »
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-12 h-0.5" style={{ backgroundColor: '#d4af37' }}></div>
                  <cite className="not-italic font-semibold" style={{ color: '#d4af37' }}>François Lacharme</cite>
                </footer>
              </blockquote>
            </div>

            {/* Distribution */}
            <div className="max-w-4xl mx-auto mt-12">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#d4af37' }}>Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Erik Truffaz', role: 'Trompette' },
                  { name: 'Antonio Lizana', role: 'Chant, saxophone alto, flûte' },
                  { name: 'Renaud Gabriel Pion', role: 'Clarinette basse, cor anglais' },
                  { name: 'Ana Perez', role: 'Danse flamenco' },
                  { name: 'Pau Figueres', role: 'Guitare flamenco' },
                  { name: 'Arin Keshishi', role: 'Basse électrique' },
                  { name: 'Manuel de la Torre', role: 'Batterie' },
                  { name: 'Vincent Thomas', role: 'Percussions' },
                ].map((artist, index) => (
                  <div key={index} className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <p className="font-semibold text-white text-sm">{artist.name}</p>
                    <p className="text-xs mt-1" style={{ color: '#b87333' }}>{artist.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section dates */}
        <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, rgba(212, 175, 55, 0.1) 50%, #f7f3e9 100%)' }}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
                Les rendez-vous de l'été 2026
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <article className="rounded-2xl p-6 md:p-8 shadow-2xl text-center" style={{ 
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(184, 115, 51, 0.05))', 
                border: '2px solid rgba(212, 175, 55, 0.3)'
              }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#d4af37' }}>
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: '#1a1a1a' }} />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#722f37' }}>26-27 Juillet</h3>
                <p className="mb-3 md:mb-4 font-semibold text-sm sm:text-base" style={{ color: '#1a1a1a' }}>Saint-Génis-des-Fontaines</p>
                <div className="text-xs sm:text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#722f37' }}>
                  <strong>Programmation à venir</strong>
                </div>
              </article>
              
              <article className="rounded-2xl p-6 md:p-8 shadow-2xl text-center" style={{ 
                background: 'linear-gradient(135deg, rgba(114, 47, 55, 0.1), rgba(212, 175, 55, 0.05))', 
                border: '2px solid rgba(114, 47, 55, 0.3)'
              }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#722f37' }}>
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#722f37' }}>5-6-7-8 Août</h3>
                <p className="mb-3 md:mb-4 font-semibold text-sm sm:text-base" style={{ color: '#1a1a1a' }}>Céret</p>
                <div className="text-xs sm:text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}>
                  <p className="font-bold" style={{ color: '#722f37' }}>Mercredi 5 août • 21h</p>
                  <p style={{ color: '#d4af37' }}>Erik Truffaz & Antonio Lizana</p>
                </div>
              </article>
            </div>
            
            <div className="text-center mt-8 md:mt-12">
              <button 
                onClick={() => openModal()}
                className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                Réserver mes places
              </button>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-12 md:py-16 text-white relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #d4af37 0%, #b87333 50%, #722f37 100%)' }}>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Prêt pour cette 11ème édition ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
              Réservez vos places dès maintenant pour le concert événement Erik Truffaz & Antonio Lizana
            </p>
            <button 
              onClick={() => openModal()}
              className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base"
              style={{ backgroundColor: '#1a1a1a', color: '#d4af37' }}
            >
              Réserver mes billets
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}