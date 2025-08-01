'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Music, Ticket, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const AppleLogo = ({ className = "w-3 h-3" }) => (
  <svg 
    className={className}
    viewBox="0 0 16 16" 
    fill="currentColor"
  >
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
  </svg>
)

// Données des artistes organisées par sections
const artistsData = {
  'all': {
    title: 'TOUTE LA PROGRAMMATION',
    sections: [
      {
        title: 'CONCERTS AVEC BILLETTERIE',
        subtitle: '🎫 Réservation recommandée',
        color: '#722f37',
        locations: [
          {
            title: '27-28 JUILLET 2025',
            subtitle: 'Cloître Saint-Génis-des-Fontaines',
            dateKeys: ['27', '28'],
            artists: [
              {
                name: 'MANU LE PRINCE',
                subtitle: '🎤 Quartet « Bossa Jazz for Ever »',
                date: 'DIMANCHE 27 JUILLET • 21H00',
                image: '/images/manu-le-prince.jpeg',
                badge: 'BOSSA NOVA',
                badgeColor: '#d4af37',
                slug: 'manu-le-prince',
                ticketType: 'payant',
                dateKey: '27'
              },
              {
                name: 'FLORIN GUGULICA',
                subtitle: '🎷 Sextet « It\'s a long Way »',
                date: 'LUNDI 28 JUILLET • 21H00',
                image: '/images/florin-gugulica.jpeg',
                badge: 'JAZZ MANOUCHE',
                badgeColor: '#b87333',
                slug: 'florin-gugulica',
                ticketType: 'payant',
                dateKey: '28'
              }
            ]
          },
          {
            title: '7-8-9 AOÛT 2025',
            subtitle: 'Place de la République, Céret',
            dateKeys: ['7', '8', '9'],
            artists: [
              {
                name: 'STEFANO DI BATTISTA',
                subtitle: '🎷 « La Dolce Vita »',
                date: 'JEUDI 7 AOÛT • 21H00',
                image: '/images/stefano-di-battista.jpg',
                badge: 'JAZZ ITALIEN',
                badgeColor: '#722f37',
                slug: 'stefano-di-battista',
                ticketType: 'payant',
                dateKey: '7'
              },
              {
                name: 'JACKY TERRASSON',
                subtitle: '🎹 Trio « Moving On »',
                date: 'VENDREDI 8 AOÛT • 21H00',
                image: '/images/jacky-terrasson.jpeg',
                badge: 'PIANO JAZZ',
                badgeColor: '#b87333',
                slug: 'jacky-terrasson',
                ticketType: 'payant',
                dateKey: '8'
              },
              {
                name: 'CAMILLE BERTAULT',
                subtitle: '🎤 Invitée de Jacky Terrasson',
                date: 'VENDREDI 8 AOÛT • 21H00',
                image: '/images/camille-bertault.jpg',
                badge: 'JAZZ VOCAL',
                badgeColor: '#722f37',
                slug: 'camille-bertault',
                ticketType: 'payant',
                dateKey: '8'
              },
              {
                name: 'CHARLOTTE PLANCHOU',
                subtitle: '🎤 Quartet',
                date: 'SAMEDI 9 AOÛT • 21H00',
                image: '/images/charlotte-planchou.jpg',
                badge: 'JAZZ VOCAL',
                badgeColor: '#722f37',
                slug: 'charlotte-planchou',
                ticketType: 'payant',
                dateKey: '9'
              }
            ]
          }
        ]
      },
      {
        title: 'CONCERTS GRATUITS',
        subtitle: '🎵 Centre-ville de Céret - Accès libre',
        color: '#d4af37',
        locations: [
          {
            title: 'PROGRAMME DÉTAILLÉ DES CONCERTS GRATUITS',
            subtitle: 'Du 6 au 9 août sur les deux podiums de Céret',
            dateKeys: ['6', '7', '8', '9'],
            gratuitSchedule: [
              {
                date: 'MERCREDI 6 AOÛT',
                dateKey: '6',
                concerts: [
                  {
                    time: '18H00',
                    artists: 'Triton 66',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Place Picasso'
                  }
                ]
              },
              {
                date: 'JEUDI 7 AOÛT',
                dateKey: '7',
                concerts: [
                  {
                    time: '11H00',
                    artists: 'Triton 66',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '11H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Place Picasso'
                  },
                  {
                    time: '17H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'Triton 66',
                    location: 'Place Picasso'
                  }
                ]
              },
              {
                date: 'VENDREDI 8 AOÛT',
                dateKey: '8',
                concerts: [
                  {
                    time: '11H00',
                    artists: 'David Vilayleck trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '11H00',
                    artists: 'Cavale trio',
                    location: 'Place Picasso'
                  },
                  {
                    time: '17H00',
                    artists: 'Cavale trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'David Vilayleck trio',
                    location: 'Place Picasso'
                  }
                ]
              },
              {
                date: 'SAMEDI 9 AOÛT',
                dateKey: '9',
                concerts: [
                  {
                    time: '17H00',
                    artists: 'Cavale trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Place Picasso'
                  }
                ]
              }
            ],
            artists: [
              {
                name: 'CAVALE',
                subtitle: '',
                date: 'VENDREDI 8 & SAMEDI 9 AOÛT • 17H00-18H00',
                image: '/images/cavale-trio.jpg',
                badge: 'JAZZ CONTEMPORAIN',
                badgeColor: '#d4af37',
                slug: 'cavale-trio',
                ticketType: 'gratuit',
                dateKey: '8,9'
              },
              {
                name: 'DAVID VILAYLECK',
                subtitle: '',
                date: 'VENDREDI 8 AOÛT • 11H00-18H00',
                image: '/images/david-vilayleck.jpg',
                badge: 'JAZZ FUSION',
                badgeColor: '#b87333',
                slug: 'david-vilayleck',
                ticketType: 'gratuit',
                dateKey: '8'
              },
              {
                name: 'TRITON 66',
                subtitle: '',
                date: 'MERCREDI 6 & JEUDI 7 AOÛT',
                image: '/images/triton-66.jpg',
                badge: 'STANDARDS',
                badgeColor: '#722f37',
                slug: 'triton-66',
                ticketType: 'gratuit',
                dateKey: '6,7'
              },
              {
                name: 'FLORIN GUGULICA',
                subtitle: '',
                date: 'MERCREDI 6, JEUDI 7 & SAMEDI 9 AOÛT',
                image: '/images/florin-gugulica-trio.jpg',
                badge: 'JAZZ TRANSFRONTALIER',
                badgeColor: '#b87333',
                slug: 'florin-gugulica',
                ticketType: 'gratuit',
                dateKey: '6,7,9'
              }
            ]
          }
        ]
      }
    ]
  },
  'payants': {
    title: 'CONCERTS AVEC BILLETTERIE',
    sections: [
      {
        title: 'CONCERTS AVEC BILLETTERIE',
        subtitle: '🎫 Réservation obligatoire',
        color: '#722f37',
        locations: [
          {
            title: '27-28 JUILLET 2025',
            subtitle: 'Cloître Saint-Génis-des-Fontaines',
            dateKeys: ['27', '28'],
            artists: [
              {
                name: 'MANU LE PRINCE',
                subtitle: '🎤 Quartet « Bossa Jazz for Ever »',
                date: 'DIMANCHE 27 JUILLET • 21H00',
                image: '/images/manu-le-prince.jpeg',
                badge: 'BOSSA NOVA',
                badgeColor: '#d4af37',
                slug: 'manu-le-prince',
                ticketType: 'payant',
                dateKey: '27'
              },
              {
                name: 'FLORIN GUGULICA',
                subtitle: '🎷 Sextet « It\'s a long Way »',
                date: 'LUNDI 28 JUILLET • 21H00',
                image: '/images/florin-gugulica.jpeg',
                badge: 'JAZZ MANOUCHE',
                badgeColor: '#b87333',
                slug: 'florin-gugulica',
                ticketType: 'payant',
                dateKey: '28'
              }
            ]
          },
          {
            title: '7-8-9 AOÛT 2025',
            subtitle: 'Place de la République, Céret',
            dateKeys: ['7', '8', '9'],
            artists: [
              {
                name: 'STEFANO DI BATTISTA',
                subtitle: '🎷 « La Dolce Vita »',
                date: 'JEUDI 7 AOÛT • 21H00',
                image: '/images/stefano-di-battista.jpg',
                badge: 'JAZZ ITALIEN',
                badgeColor: '#722f37',
                slug: 'stefano-di-battista',
                ticketType: 'payant',
                dateKey: '7'
              },
              {
                name: 'JACKY TERRASSON',
                subtitle: '🎹 + Camille Bertault',
                date: 'VENDREDI 8 AOÛT • 21H00',
                image: '/images/jacky-terrasson.jpeg',
                badge: 'PIANO JAZZ',
                badgeColor: '#b87333',
                slug: 'jacky-terrasson',
                ticketType: 'payant',
                dateKey: '8'
              },
              {
                name: 'CHARLOTTE PLANCHOU',
                subtitle: '🎤 Quartet',
                date: 'SAMEDI 9 AOÛT • 21H00',
                image: '/images/charlotte-planchou.jpg',
                badge: 'JAZZ VOCAL',
                badgeColor: '#722f37',
                slug: 'charlotte-planchou',
                ticketType: 'payant',
                dateKey: '9'
              }
            ]
          }
        ]
      }
    ]
  },
  'gratuits': {
    title: 'CONCERTS GRATUITS',
    sections: [
      {
        title: 'CONCERTS GRATUITS',
        subtitle: '🎵 Centre-ville de Céret - Accès libre',
        color: '#d4af37',
        locations: [
          {
            title: 'PROGRAMME DÉTAILLÉ DES CONCERTS GRATUITS',
            subtitle: 'Du 6 au 9 août sur les deux podiums de Céret',
            dateKeys: ['6', '7', '8', '9'],
            gratuitSchedule: [
              {
                date: 'MERCREDI 6 AOÛT',
                dateKey: '6',
                concerts: [
                  {
                    time: '18H00',
                    artists: 'Triton 66',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Place Picasso'
                  }
                ]
              },
              {
                date: 'JEUDI 7 AOÛT',
                dateKey: '7',
                concerts: [
                  {
                    time: '11H00',
                    artists: 'Triton 66',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '11H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Place Picasso'
                  },
                  {
                    time: '17H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'Triton 66',
                    location: 'Place Picasso'
                  }
                ]
              },
              {
                date: 'VENDREDI 8 AOÛT',
                dateKey: '8',
                concerts: [
                  {
                    time: '11H00',
                    artists: 'David Vilayleck trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '11H00',
                    artists: 'Cavale trio',
                    location: 'Place Picasso'
                  },
                  {
                    time: '17H00',
                    artists: 'Cavale trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'David Vilayleck trio',
                    location: 'Place Picasso'
                  }
                ]
              },
              {
                date: 'SAMEDI 9 AOÛT',
                dateKey: '9',
                concerts: [
                  {
                    time: '17H00',
                    artists: 'Cavale trio',
                    location: 'Bd Maréchal Joffre'
                  },
                  {
                    time: '18H00',
                    artists: 'Florin Gugulica trio',
                    location: 'Place Picasso'
                  }
                ]
              }
            ],
            artists: [
              {
                name: 'CAVALE',
                subtitle: '',
                date: 'VENDREDI 8 & SAMEDI 9 AOÛT • 17H00-18H00',
                image: '/images/cavale-trio.jpg',
                badge: 'JAZZ CONTEMPORAIN',
                badgeColor: '#d4af37',
                slug: 'cavale-trio',
                ticketType: 'gratuit',
                dateKey: '8,9'
              },
              {
                name: 'DAVID VILAYLECK',
                subtitle: '',
                date: 'VENDREDI 8 AOÛT • 11H00-18H00',
                image: '/images/david-vilayleck.jpg',
                badge: 'JAZZ FUSION',
                badgeColor: '#b87333',
                slug: 'david-vilayleck',
                ticketType: 'gratuit',
                dateKey: '8'
              },
              {
                name: 'TRITON 66',
                subtitle: '',
                date: 'MERCREDI 6 & JEUDI 7 AOÛT',
                image: '/images/triton-66.jpg',
                badge: 'STANDARDS',
                badgeColor: '#722f37',
                slug: 'triton-66',
                ticketType: 'gratuit',
                dateKey: '6,7'
              },
              {
                name: 'FLORIN GUGULICA',
                subtitle: '',
                date: 'MERCREDI 6, JEUDI 7 & SAMEDI 9 AOÛT',
                image: '/images/florin-gugulica-trio.jpg',
                badge: 'JAZZ TRANSFRONTALIER',
                badgeColor: '#b87333',
                slug: 'florin-gugulica',
                ticketType: 'gratuit',
                dateKey: '6,7,9'
              }
            ]
          }
        ]
      }
    ]
  }
}

// Composant compte à rebours
function CountdownTimer() {
  // Le festival a commencé ! 🎉
  const festivalStarted = true

  if (festivalStarted) {
    return (
      <div className="relative overflow-hidden">
        {/* Background subtil avec notes de musique */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-6 left-12 animate-bounce text-xl">🎵</div>
          <div className="absolute top-16 right-16 animate-pulse text-lg delay-500">🎶</div>
          <div className="absolute bottom-12 left-20 animate-bounce text-base delay-1000">🎼</div>
          <div className="absolute bottom-8 right-8 animate-pulse text-xl delay-700">🎷</div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center space-y-8 py-8">
          {/* Titre principal épuré */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#722f37' }}>
              🎊 LE FESTIVAL EST LÀ ! 🎊
            </h3>
            <p className="text-xl md:text-2xl font-semibold mb-6" style={{ color: '#d4af37' }}>
              Jazz en Tech 2025 • 10ème édition
            </p>
          </div>
          
          {/* Timeline originale et élégante */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative">
              {/* Ligne de temps */}
              <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2" 
                   style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}></div>
              
              {/* Points sur la timeline */}
              <div className="relative flex justify-between items-center">
                {/* Point Saint-Génis (en cours) */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg animate-pulse"
                       style={{ 
                         backgroundColor: '#722f37', 
                         borderColor: '#d4af37'
                       }}>
                    <span className="text-white font-bold text-sm">LIVE</span>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-bold text-sm" style={{ color: '#722f37' }}>Saint-Génis</div>
                    <div className="text-xs" style={{ color: '#d4af37' }}>27-28 juillet</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs font-bold mt-1"
                         style={{ backgroundColor: '#d4af37', color: '#722f37' }}>
                      EN COURS
                    </div>
                  </div>
                </div>
                
                {/* Point Céret (à venir) */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg"
                       style={{ 
                         backgroundColor: '#d4af37', 
                         borderColor: '#722f37'
                       }}>
                    <span className="font-bold text-sm" style={{ color: '#722f37' }}>SOON</span>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-bold text-sm" style={{ color: '#722f37' }}>Céret</div>
                    <div className="text-xs" style={{ color: '#d4af37' }}>6-9 août</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs font-bold mt-1"
                         style={{ backgroundColor: '#b87333', color: '#f7f3e9' }}>
                      BIENTÔT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cards avec infos en temps réel */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
            <div className="text-center p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow"
                 style={{ 
                   backgroundColor: '#f7f3e9',
                   borderColor: '#d4af37'
                 }}>
              <div className="text-2xl mb-2">🎭</div>
              <div className="font-bold text-sm" style={{ color: '#722f37' }}>ACTUELLEMENT</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#b87333' }}>Concerts Saint-Génis</div>
            </div>
            
            <div className="text-center p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow"
                 style={{ 
                   backgroundColor: '#f7f3e9',
                   borderColor: '#722f37'
                 }}>
              <div className="text-2xl mb-2">🎪</div>
              <div className="font-bold text-sm" style={{ color: '#722f37' }}>PROCHAINEMENT</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#b87333' }}>Céret 6-9 août</div>
            </div>
            
            <div className="text-center p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow"
                 style={{ 
                   backgroundColor: '#f7f3e9',
                   borderColor: '#b87333'
                 }}>
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-bold text-sm" style={{ color: '#722f37' }}>GRATUITS</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#b87333' }}>2 podiums</div>
            </div>
          </div>
          
          {/* Message principal - Simple et classe */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-base mb-4 transition-all duration-200 hover:shadow-md"
                 style={{ 
                   backgroundColor: '#f7f3e9', 
                   border: '2px solid #d4af37',
                   color: '#722f37'
                 }}>
              🎵 Le jazz résonne dans les Pyrénées-Orientales ! 🎵
            </div>
            <p className="text-sm text-gray-600">
              Suivez-nous sur nos réseaux sociaux pour vivre le festival en direct
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function Programmation() {
  const [selectedView, setSelectedView] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')

  const handleScroll = () => {
    const programmeSection = document.getElementById('programme-section')
    if (programmeSection) {
      programmeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Fonction pour filtrer les données selon les critères
  const getFilteredData = () => {
    let data = artistsData[selectedView as keyof typeof artistsData]
    
    if (selectedDate === 'all') {
      return data
    }

    // Filtrer par date
    const filteredSections = data.sections.map(section => ({
      ...section,
      locations: section.locations.map(location => {
        // Filtrer le planning gratuit
        const filteredGratuitSchedule = location.gratuitSchedule 
          ? location.gratuitSchedule.filter(day => day.dateKey === selectedDate)
          : undefined

        // Filtrer les artistes
        const filteredArtists = location.artists 
          ? location.artists.filter(artist => artist.dateKey.includes(selectedDate))
          : undefined

        // Ne montrer la location que si elle a du contenu pour cette date
        const hasContent = (filteredArtists && filteredArtists.length > 0) || 
                          (filteredGratuitSchedule && filteredGratuitSchedule.length > 0)

        return hasContent ? {
          ...location,
          gratuitSchedule: filteredGratuitSchedule,
          artists: filteredArtists
        } : null
      }).filter(Boolean)
    })).filter(section => section.locations.length > 0)

    return {
      ...data,
      sections: filteredSections
    }
  }

  const currentData = getFilteredData()

  return (
    <div className="min-h-screen bg-white">
      <title>Programmation - Jazz en Tech 2025</title>
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Programmation 2025
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Découvrez notre programmation exceptionnelle pour la 10ème édition
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Ticket className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>5 concerts payants</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Music className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>2 podiums gratuits</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          
          {/* SECTION Programme complet */}
          <section id="programme-section">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-center" style={{ color: '#722f37' }}>
              <Music className="w-6 h-6 inline mr-3" />
              Programme complet - 10ème édition
            </h2>
            
            {/* Filtres améliorés */}
            <div className="mb-8 space-y-6">
              {/* Ligne 1: Filtres par TYPE */}
              <div className="text-center">
                <div className="flex justify-center gap-3">
                  <button 
                    onClick={() => { setSelectedView('all'); handleScroll(); }}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedView === 'all' ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                    style={{ 
                      backgroundColor: selectedView === 'all' ? '#d4af37' : '#f3f4f6', 
                      color: selectedView === 'all' ? '#722f37' : '#6b7280' 
                    }}
                  >
                    TOUT VOIR
                  </button>
                  <button 
                    onClick={() => { setSelectedView('payants'); handleScroll(); }}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedView === 'payants' ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                    style={{ 
                      backgroundColor: selectedView === 'payants' ? '#722f37' : '#f3f4f6', 
                      color: selectedView === 'payants' ? '#f7f3e9' : '#6b7280' 
                    }}
                  >
                    🎫 PAYANTS
                  </button>
                  <button 
                    onClick={() => { setSelectedView('gratuits'); handleScroll(); }}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedView === 'gratuits' ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                    style={{ 
                      backgroundColor: selectedView === 'gratuits' ? '#d4af37' : '#f3f4f6', 
                      color: selectedView === 'gratuits' ? '#722f37' : '#6b7280' 
                    }}
                  >
                    🎵 GRATUITS
                  </button>
                </div>
              </div>

              {/* FILTRES PAR DATE - STYLE BADGES SIMPLES */}
              <div className="mb-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#722f37' }}>
                    Filtrer par date
                  </h3>
                  
                  <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    {[
                      { key: 'all', label: 'Toutes les dates' },
                      { key: '27', label: '27 Juillet' },
                      { key: '28', label: '28 Juillet' },
                      { key: '6', label: '6 Août' },
                      { key: '7', label: '7 Août' },
                      { key: '8', label: '8 Août' },
                      { key: '9', label: '9 Août' }
                    ].map((date) => (
                      <button 
                        key={date.key}
                        onClick={() => { setSelectedDate(date.key); handleScroll(); }}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 border ${
                          selectedDate === date.key 
                            ? 'shadow-md transform scale-105' 
                            : 'hover:shadow-sm hover:scale-102'
                        }`}
                        style={{ 
                          backgroundColor: selectedDate === date.key ? '#722f37' : '#f8f9fa',
                          color: selectedDate === date.key ? '#f7f3e9' : '#495057',
                          borderColor: selectedDate === date.key ? '#722f37' : '#dee2e6'
                        }}
                      >
                        {date.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Affichage des sections filtrées */}
            <div className="space-y-16">
              {currentData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-12">
                  {/* Titre de section */}
                  <div className="text-center mb-12 p-6 rounded-xl" style={{ 
                    background: `linear-gradient(135deg, ${section.color === '#722f37' ? 'rgba(114, 47, 55, 0.1)' : 'rgba(212, 175, 55, 0.1)'}, rgba(247, 243, 233, 0.5))`
                  }}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: section.color }}>
                      {section.title}
                    </h3>
                    <p className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>
                      {section.subtitle}
                    </p>
                  </div>

                  {section.locations.map((location, locationIndex) => (
                    <div key={locationIndex} className="mb-12">
                      
                      {/* Planning détaillé pour les concerts gratuits */}
                      {location.gratuitSchedule && (
                        <div className="mb-12">
                          <div className="text-center mb-8 p-6 rounded-xl" style={{ 
                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(247, 243, 233, 0.5))',
                            border: '2px solid rgba(212, 175, 55, 0.3)'
                          }}>
                            <h4 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#d4af37' }}>
                              📅 {location.title}
                            </h4>
                            <p className="text-base font-medium" style={{ color: '#722f37' }}>
                              {location.subtitle}
                            </p>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {location.gratuitSchedule.map((day, dayIndex) => (
                              <div key={dayIndex} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <h5 className="text-lg font-bold mb-4" style={{ color: '#722f37' }}>
                                  {day.date}
                                </h5>
                                <div className="space-y-3">
                                  {day.concerts.map((concert, concertIndex) => (
                                    <div key={concertIndex} className="p-3 rounded-lg border" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="font-bold text-sm" style={{ color: '#722f37' }}>
                                          {concert.time}
                                        </div>
                                        {/* Boutons GPS - 3 options */}
                                        <div className="flex gap-1">
                                          <a 
                                            href={`https://maps.google.com/?q=${encodeURIComponent(concert.location + ', Céret')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium hover:opacity-80 transition-opacity"
                                            style={{ backgroundColor: '#4285f4', color: 'white' }}
                                            title="Ouvrir dans Google Maps"
                                          >
                                            <MapPin className="w-3 h-3 mr-1" />
                                            Maps
                                          </a>
                                          <a 
                                            href={`https://waze.com/ul?q=${encodeURIComponent(concert.location + ', Céret')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium hover:opacity-80 transition-opacity"
                                            style={{ backgroundColor: '#00d4ff', color: 'white' }}
                                            title="Ouvrir dans Waze"
                                          >
                                            🚗
                                            Waze
                                          </a>
                                          <a 
  href={`https://maps.apple.com/?q=${encodeURIComponent(concert.location + ', Céret')}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center px-2 py-1 rounded text-xs font-medium hover:opacity-80 transition-opacity"
  style={{ backgroundColor: '#000000', color: 'white' }}
  title="Ouvrir dans Plans (Apple)"
>
  <AppleLogo className="w-3 h-3 mr-1" />
  Plans
</a>
                                        </div>
                                      </div>
                                      <div className="text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>
                                        {concert.artists}
                                      </div>
                                      <div className="text-xs" style={{ color: '#b87333' }}>
                                        📍 {concert.location}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Location normale pour concerts payants */}
                      {!location.gratuitSchedule && (
                        <div className="text-center mb-8 p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(114, 47, 55, 0.1), rgba(212, 175, 55, 0.05))' }}>
                          <h4 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#722f37' }}>
                            {location.title}
                          </h4>
                          <p className="text-lg font-semibold flex items-center justify-center" style={{ color: '#1a1a1a' }}>
                            <MapPin className="w-5 h-5 mr-2" style={{ color: '#d4af37' }} />
                            {location.subtitle}
                          </p>
                        </div>
                      )}
                      
                      {/* Grille d'artistes */}
                      {location.artists && location.artists.length > 0 && (
                        <div className={`grid gap-6 ${
                          location.artists.length === 2 ? 'md:grid-cols-2' : 
                          location.artists.length === 3 ? 'md:grid-cols-3' : 
                          location.artists.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
                          location.artists.length === 6 ? 'md:grid-cols-2 lg:grid-cols-3' :
                          'grid-cols-1 max-w-md mx-auto'
                        }`}>
                          {location.artists.map((artist, artistIndex) => (
                            <Link 
                              key={artistIndex}
                              href={`/artistes/${artist.slug}`}
                              className="group relative cursor-pointer"
                            >
                              <div className={`relative ${
                                location.artists.length >= 4 ? 'aspect-[3/4]' : 'aspect-[4/3]'
                              } rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl transform group-hover:-translate-y-2`}>
                                <Image 
                                  src={artist.image}
                                  alt={artist.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                  <h5 className={`font-bold mb-1 ${
                                    location.artists.length >= 4 ? 'text-lg' : 'text-xl'
                                  }`}>
                                    {artist.name}
                                  </h5>
                                  
                                  {/* Affichage conditionnel du subtitle SEULEMENT pour les concerts payants */}
                                  {artist.subtitle && (
                                    <p className={`opacity-90 mb-2 ${
                                      location.artists.length >= 4 ? 'text-xs' : 'text-sm'
                                    }`}>
                                      {artist.subtitle}
                                    </p>
                                  )}
                                  
                                  {/* Affichage de la date avec calendrier pour TOUS les artistes */}
                                  <div className={`flex items-center ${
                                    location.artists.length >= 4 ? 'text-xs' : 'text-sm'
                                  }`}>
                                    <Calendar className={`mr-2 ${
                                      location.artists.length >= 4 ? 'w-3 h-3' : 'w-4 h-4'
                                    }`} style={{ color: '#d4af37' }} />
                                    <span className="font-semibold">{artist.date}</span>
                                  </div>
                                </div>
                                
                                {/* Badge spécifique artiste */}
                                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full font-bold ${
                                  location.artists.length >= 4 ? 'text-xs' : 'text-xs'
                                }`} style={{ backgroundColor: artist.badgeColor, color: artist.badgeColor === '#d4af37' ? '#722f37' : '#f7f3e9' }}>
                                  {artist.badge}
                                </div>
                                
                                {/* Overlay hover */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <div className="bg-white/90 rounded-full px-4 py-2 text-sm font-semibold" style={{ color: '#722f37' }}>
                                    Voir l'artiste →
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Message si aucun résultat */}
            {currentData.sections.length === 0 && (
              <div className="text-center py-12">
                <Music className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#722f37' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#722f37' }}>
                  Aucun concert trouvé
                </h3>
                <p className="text-gray-600">
                  Aucun concert ne correspond à votre sélection pour cette date
                </p>
              </div>
            )}
          </section>

          {/* Message pour concerts gratuits uniquement */}
          {selectedView === 'gratuits' && (
            <section className="text-center">
              <div 
                className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
                style={{ 
                  backgroundColor: '#d4af37', 
                  color: '#722f37'
                }}
              >
                🎵 Concerts gratuits - 2 podiums dans Céret
              </div>
            </section>
          )}

          {/* Bouton vers billetterie - SEULEMENT si des concerts payants sont visibles */}
          {currentData.sections.some(section => 
            section.locations.some(location => 
              location.artists && location.artists.some(artist => artist.ticketType === 'payant')
            )
          ) && (
            <section className="text-center">
              <Link 
                href="/billetterie"
                className="inline-block px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: '#722f37', 
                  color: '#f7f3e9'
                }}
              >
                🎫 Réserver mes places
              </Link>
            </section>
          )}

          {/* Compte à rebours */}
          <section 
            className="rounded-2xl p-4 md:p-6 border"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)', 
              borderColor: 'rgba(212, 175, 55, 0.3)' 
            }}
          >
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#722f37' }}>
                ⏰ Le festival approche !
              </h3>
              
              <CountdownTimer />
              
              <p className="text-xs md:text-sm text-gray-600 mt-4">
                🎊 La 10ème édition est en cours ! Vivez la magie en direct 🎊
              </p>
            </div>
          </section>

          {/* Informations pratiques */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center" style={{ color: '#722f37' }}>
              <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Informations pratiques
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Concerts payants</h4>
                <p className="text-xs md:text-sm text-gray-600">Concerts à 21h précises</p>
                <p className="text-xs md:text-sm text-gray-600">Ouverture des portes : 20h</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Concerts gratuits</h4>
                <p className="text-xs md:text-sm text-gray-600">11h, 17h et 18h</p>
                <p className="text-xs md:text-sm text-gray-600">2 podiums simultanés</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Lieux</h4>
                <p className="text-xs md:text-sm text-gray-600">Bd Maréchal Joffre</p>
                <p className="text-xs md:text-sm text-gray-600">Place Picasso</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}