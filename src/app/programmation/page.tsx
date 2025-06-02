'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Ticket, Star, Music } from 'lucide-react'
import Link from 'next/link'

// Données des artistes avec leurs dates et slugs
const artistsData = {
  'all': {
    title: 'TOUTES LES DATES',
    locations: [
      {
        title: '27-28 JUILLET 2025',
        subtitle: 'Cloître Saint-Génis-des-Fontaines',
        artists: [
          {
            name: 'MANU LE PRINCE',
            subtitle: '🎤 Quartet « Bossa Jazz for Ever »',
            date: 'DIMANCHE 27 JUILLET • 21H00',
            image: '/images/manu-le-prince.jpeg',
            badge: 'BOSSA NOVA',
            badgeColor: '#d4af37',
            slug: 'manu-le-prince'
          },
          {
            name: 'FLORIN GUGULICA',
            subtitle: '🎷 Sextet « It\'s a long Way »',
            date: 'LUNDI 28 JUILLET • 21H00',
            image: '/images/florin-gugulica.jpeg',
            badge: 'JAZZ MANOUCHE',
            badgeColor: '#b87333',
            slug: 'florin-gugulica'
          }
        ]
      },
      {
        title: '7-8-9 AOÛT 2025',
        subtitle: 'Place de la République, Céret',
        artists: [
          {
            name: 'STEFANO DI BATTISTA',
            subtitle: '🎷 « La Dolce Vita »',
            date: 'JEU 7 AOÛT • 21H',
            image: '/images/stefano-di-battista.jpg',
            badge: 'JAZZ ITALIEN',
            badgeColor: '#722f37',
            slug: 'stefano-di-battista'
          },
          {
            name: 'JACKY TERRASSON',
            subtitle: '🎹 + Camille Bertault',
            date: 'VEN 8 AOÛT • 21H',
            image: '/images/jacky-terrasson.jpeg',
            badge: 'PIANO JAZZ',
            badgeColor: '#b87333',
            slug: 'jacky-terrasson'
          },
          {
            name: 'CHARLOTTE PLANCHOU',
            subtitle: '🎤 Quartet',
            date: 'SAM 9 AOÛT • 21H',
            image: '/images/charlotte-planchou.jpg',
            badge: '🏆 PRIX ÉVIDENCE',
            badgeColor: '#d4af37',
            extraBadge: 'CLÔTURE',
            slug: 'charlotte-planchou'
          }
        ]
      }
    ]
  },
  '27': {
    title: '27 JUILLET 2025',
    locations: [
      {
        title: '27 JUILLET 2025',
        subtitle: 'Cloître Saint-Génis-des-Fontaines',
        artists: [
          {
            name: 'MANU LE PRINCE',
            subtitle: '🎤 Quartet « Bossa Jazz for Ever »',
            date: 'DIMANCHE 27 JUILLET • 21H00',
            image: '/images/manu-le-prince.jpeg',
            badge: 'BOSSA NOVA',
            badgeColor: '#d4af37',
            slug: 'manu-le-prince'
          }
        ]
      }
    ]
  },
  '28': {
    title: '28 JUILLET 2025',
    locations: [
      {
        title: '28 JUILLET 2025',
        subtitle: 'Cloître Saint-Génis-des-Fontaines',
        artists: [
          {
            name: 'FLORIN GUGULICA',
            subtitle: '🎷 Sextet « It\'s a long Way »',
            date: 'LUNDI 28 JUILLET • 21H00',
            image: '/images/florin-gugulica.jpeg',
            badge: 'JAZZ MANOUCHE',
            badgeColor: '#b87333',
            slug: 'florin-gugulica'
          }
        ]
      }
    ]
  },
  '7': {
    title: '7 AOÛT 2025',
    locations: [
      {
        title: '7 AOÛT 2025',
        subtitle: 'Place de la République, Céret',
        artists: [
          {
            name: 'STEFANO DI BATTISTA',
            subtitle: '🎷 « La Dolce Vita »',
            date: 'JEUDI 7 AOÛT • 21H00',
            image: '/images/stefano-di-battista.jpg',
            badge: 'JAZZ ITALIEN',
            badgeColor: '#722f37',
            slug: 'stefano-di-battista'
          }
        ]
      }
    ]
  },
  '8': {
    title: '8 AOÛT 2025',
    locations: [
      {
        title: '8 AOÛT 2025',
        subtitle: 'Place de la République, Céret',
        artists: [
          {
            name: 'JACKY TERRASSON',
            subtitle: '🎹 + Camille Bertault',
            date: 'VENDREDI 8 AOÛT • 21H00',
            image: '/images/jacky-terrasson.jpeg',
            badge: 'PIANO JAZZ',
            badgeColor: '#b87333',
            slug: 'jacky-terrasson'
          }
        ]
      }
    ]
  },
  '9': {
    title: '9 AOÛT 2025',
    locations: [
      {
        title: '9 AOÛT 2025',
        subtitle: 'Place de la République, Céret',
        artists: [
          {
            name: 'CHARLOTTE PLANCHOU',
            subtitle: '🎤 Quartet',
            date: 'SAMEDI 9 AOÛT • 21H00',
            image: '/images/charlotte-planchou.jpg',
            badge: '🏆 PRIX ÉVIDENCE',
            badgeColor: '#d4af37',
            extraBadge: 'CLÔTURE',
            slug: 'charlotte-planchou'
          }
        ]
      }
    ]
  }
}

// Composant compte à rebours
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-07-25T23:59:59').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4">
      <div 
        className="text-white rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.days}</div>
        <div className="text-xs uppercase tracking-wide">Jours</div>
      </div>
      
      <div className="text-lg sm:text-xl font-bold" style={{ color: '#722f37' }}>:</div>
      
      <div 
        className="text-white rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Heures</div>
      </div>
      
      <div className="text-lg sm:text-xl font-bold" style={{ color: '#722f37' }}>:</div>
      
      <div 
        className="rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#d4af37', color: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Min</div>
      </div>
      
      <div className="text-lg sm:text-xl font-bold" style={{ color: '#722f37' }}>:</div>
      
      <div 
        className="rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#d4af37', color: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Sec</div>
      </div>
    </div>
  )
}

export default function Programmation() {
  const [selectedDate, setSelectedDate] = useState('all')

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    // Scroll vers la section programme
    const programmeSection = document.getElementById('programme-section')
    if (programmeSection) {
      programmeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentData = artistsData[selectedDate as keyof typeof artistsData]

  return (
    <div className="min-h-screen bg-white">
      <title>Programmation & Billetterie - Jazz en Tech 2025</title>
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Programmation & Billetterie
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Découvrez notre programmation exceptionnelle et réservez vos places pour la 10ème édition
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Ticket className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Billetterie officielle</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          
          {/* Boutons de billetterie principaux - GARDÉS */}
          <section className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: '#722f37' }}>
              🎟️ Réservez dès maintenant
            </h2>
            
            <div className="grid gap-4 max-w-4xl mx-auto">
              <a 
                href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/manu-le-prince-quartet-bossa-jazz-for-ever"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:opacity-90 shadow-lg text-center"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm md:text-lg">Manu Le Prince - 27 juillet 2025</span>
                </div>
                <div className="text-xs md:text-sm opacity-90 mt-1">Saint-Génis-des-Fontaines</div>
              </a>
              
              <a 
                href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:opacity-90 shadow-lg text-center"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm md:text-lg">Florin Gugulica - 28 juillet 2025</span>
                </div>
                <div className="text-xs md:text-sm opacity-90 mt-1">Saint-Génis-des-Fontaines</div>
              </a>
            </div>
          </section>

          {/* SECTION Programme complet - INTERACTIVE */}
          <section id="programme-section">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-center" style={{ color: '#722f37' }}>
              <Music className="w-6 h-6 inline mr-3" />
              Programme complet - 10ème édition
            </h2>
            
            {/* Bannière des dates cliquables - INTERACTIVE */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 min-w-max">
                <button 
                  onClick={() => handleDateClick('all')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDate === 'all' ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedDate === 'all' ? '#d4af37' : '#f3f4f6', 
                    color: selectedDate === 'all' ? '#722f37' : '#6b7280' 
                  }}
                >
                  TOUTES LES DATES
                </button>
                <button 
                  onClick={() => handleDateClick('27')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDate === '27' ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedDate === '27' ? '#722f37' : '#f3f4f6', 
                    color: selectedDate === '27' ? '#f7f3e9' : '#6b7280' 
                  }}
                >
                  27 JUILLET
                </button>
                <button 
                  onClick={() => handleDateClick('28')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDate === '28' ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedDate === '28' ? '#b87333' : '#f3f4f6', 
                    color: selectedDate === '28' ? '#f7f3e9' : '#6b7280' 
                  }}
                >
                  28 JUILLET
                </button>
                <button 
                  onClick={() => handleDateClick('7')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDate === '7' ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedDate === '7' ? '#722f37' : '#f3f4f6', 
                    color: selectedDate === '7' ? '#f7f3e9' : '#6b7280' 
                  }}
                >
                  7 AOÛT
                </button>
                <button 
                  onClick={() => handleDateClick('8')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDate === '8' ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedDate === '8' ? '#b87333' : '#f3f4f6', 
                    color: selectedDate === '8' ? '#f7f3e9' : '#6b7280' 
                  }}
                >
                  8 AOÛT
                </button>
                <button 
                  onClick={() => handleDateClick('9')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedDate === '9' ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedDate === '9' ? '#722f37' : '#f3f4f6', 
                    color: selectedDate === '9' ? '#f7f3e9' : '#6b7280' 
                  }}
                >
                  9 AOÛT
                </button>
              </div>
            </div>

            {/* Affichage dynamique des artistes selon la date sélectionnée */}
            <div className="space-y-12">
              {currentData.locations.map((location, locationIndex) => (
                <div key={locationIndex} className="mb-12">
                  <div className="text-center mb-8 p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(114, 47, 55, 0.05))' }}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#722f37' }}>
                      {location.title}
                    </h3>
                    <p className="text-lg font-semibold flex items-center justify-center" style={{ color: '#1a1a1a' }}>
                      <MapPin className="w-5 h-5 mr-2" style={{ color: '#d4af37' }} />
                      {location.subtitle}
                    </p>
                  </div>
                  
                  <div className={`grid gap-6 ${
                    location.artists.length === 2 ? 'md:grid-cols-2' : 
                    location.artists.length === 3 ? 'md:grid-cols-3' : 
                    'grid-cols-1 max-w-md mx-auto'
                  }`}>
                    {location.artists.map((artist, artistIndex) => (
                      <Link 
                        key={artistIndex}
                        href={`/artiste/${artist.slug}`}
                        className="group relative cursor-pointer"
                      >
                        <div className={`relative ${
                          location.artists.length === 3 ? 'aspect-[4/5]' : 'aspect-[4/3]'
                        } rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl transform group-hover:-translate-y-2`}>
                          <img 
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className={`font-bold mb-1 ${
                              location.artists.length === 3 ? 'text-xl' : 'text-2xl'
                            }`}>
                              {artist.name}
                            </h4>
                            <p className={`opacity-90 mb-2 ${
                              location.artists.length === 3 ? 'text-xs' : 'text-sm'
                            }`}>
                              {artist.subtitle}
                            </p>
                            <div className={`flex items-center ${
                              location.artists.length === 3 ? 'text-xs' : 'text-sm'
                            }`}>
                              <Calendar className={`mr-2 ${
                                location.artists.length === 3 ? 'w-3 h-3' : 'w-4 h-4'
                              }`} style={{ color: '#d4af37' }} />
                              <span className="font-semibold">{artist.date}</span>
                            </div>
                          </div>
                          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full font-bold ${
                            location.artists.length === 3 ? 'text-xs' : 'text-xs'
                          }`} style={{ backgroundColor: artist.badgeColor, color: artist.badgeColor === '#d4af37' ? '#722f37' : '#f7f3e9' }}>
                            {artist.badge}
                          </div>
                          {artist.extraBadge && (
                            <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}>
                              {artist.extraBadge}
                            </div>
                          )}
                          
                          {/* Overlay hover pour indiquer que c'est cliquable */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full px-4 py-2 text-sm font-semibold" style={{ color: '#722f37' }}>
                              Voir l'artiste →
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pass 2 et 3 soirées - GARDÉS */}
          <section>
            <h3 className="text-lg md:text-xl font-bold mb-6 text-center" style={{ color: '#722f37' }}>
              🎫 Formules avantageuses
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Pass 2 soirées */}
              <div 
                className="border-2 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                  borderColor: 'rgba(212, 175, 55, 0.3)' 
                }}
              >
                <div className="text-center">
                  <h4 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#722f37' }}>
                    Pass 2 soirées à Céret
                  </h4>
                  <p className="text-sm md:text-base mb-4" style={{ color: '#1a1a1a' }}>2 soirées parmi celles du 7 au 9 août 2025</p>
                  <div className="flex items-center justify-center text-xs md:text-sm text-gray-600 mb-4">
                    <span 
                      className="text-white px-2 py-1 rounded text-xs font-bold mr-2"
                      style={{ backgroundColor: '#722f37' }}
                    >
                      ÉCONOMIE
                    </span>
                    Jusqu'à 15% de réduction
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#722f37' }}>30€</p>
                  <button 
                    className="w-full px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                  >
                    <Ticket className="w-4 h-4 inline mr-2" />
                    Réserver
                  </button>
                </div>
              </div>

              {/* Pass 3 soirées */}
              <div 
                className="border-2 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                  borderColor: '#d4af37' 
                }}
              >
                <div className="text-center">
                  <h4 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#722f37' }}>
                    Pass 3 soirées à Céret
                  </h4>
                  <p className="text-sm md:text-base mb-4" style={{ color: '#1a1a1a' }}>Les 3 soirées du 7 au 9 août 2025</p>
                  <div className="flex items-center justify-center text-xs md:text-sm text-gray-600 mb-4">
                    <span 
                      className="text-white px-2 py-1 rounded text-xs font-bold mr-2"
                      style={{ backgroundColor: '#722f37' }}
                    >
                      MEILLEUR PRIX
                    </span>
                    Jusqu'à 25% de réduction
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#722f37' }}>42€</p>
                  <button 
                    className="w-full px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                  >
                    <Ticket className="w-4 h-4 inline mr-2" />
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Compte à rebours - GARDÉ */}
          <section 
            className="rounded-2xl p-4 md:p-6 border"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)', 
              borderColor: 'rgba(212, 175, 55, 0.3)' 
            }}
          >
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#722f37' }}>
                ⏰ Attention : Vente limitée dans le temps
              </h3>
              
              <CountdownTimer />
              
              <p className="text-xs md:text-sm text-gray-600 mt-4 mb-6">
                Ventes jusqu'au <strong>25 juillet 2025 à 23h59</strong>
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-lg p-3 md:p-4 text-center">
                  <p className="text-xs md:text-sm font-semibold mb-1" style={{ color: '#1a1a1a' }}>Billet non reçu ?</p>
                  <button 
                    className="text-xs md:text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: '#722f37' }}
                  >
                    Cliquez ici pour assistance
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-3 md:p-4 text-center">
                  <p className="text-xs md:text-sm font-semibold mb-1" style={{ color: '#1a1a1a' }}>Service client</p>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#722f37' }}>
                    06 08 75 87 67
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Informations pratiques - GARDÉES */}
          <section className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center" style={{ color: '#722f37' }}>
              <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Informations pratiques
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Horaires</h4>
                <p className="text-xs md:text-sm text-gray-600">Concerts à 21h précises</p>
                <p className="text-xs md:text-sm text-gray-600">Ouverture des portes : 20h</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Accès</h4>
                <p className="text-xs md:text-sm text-gray-600">Parking gratuit à proximité</p>
                <p className="text-xs md:text-sm text-gray-600">Transport en commun recommandé</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-sm md:text-base" style={{ color: '#1a1a1a' }}>Restauration</h4>
                <p className="text-xs md:text-sm text-gray-600">Buvette sur place</p>
                <p className="text-xs md:text-sm text-gray-600">Restaurants partenaires</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}