'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Ticket, Star, Music } from 'lucide-react'

// Composant compte à rebours
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Date de fin des ventes - 25 juillet 2025 à 23h59
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

    updateCountdown() // Mise à jour immédiate
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4">
      {/* Jours */}
      <div 
        className="text-white rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.days}</div>
        <div className="text-xs uppercase tracking-wide">Jours</div>
      </div>
      
      <div className="text-lg sm:text-xl font-bold" style={{ color: '#722f37' }}>:</div>
      
      {/* Heures */}
      <div 
        className="text-white rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Heures</div>
      </div>
      
      <div className="text-lg sm:text-xl font-bold" style={{ color: '#722f37' }}>:</div>
      
      {/* Minutes */}
      <div 
        className="rounded-lg p-2 sm:p-3 text-center min-w-[50px] sm:min-w-[60px] shadow-lg"
        style={{ backgroundColor: '#d4af37', color: '#722f37' }}
      >
        <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Min</div>
      </div>
      
      <div className="text-lg sm:text-xl font-bold" style={{ color: '#722f37' }}>:</div>
      
      {/* Secondes */}
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
  return (
    <div className="min-h-screen bg-white">
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
          
          {/* Boutons de billetterie principaux - COULEURS CORRIGÉES */}
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

          {/* Section programmation complète - COULEURS CORRIGÉES */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center" style={{ color: '#722f37' }}>
              <Music className="w-6 h-6 mr-3" />
              Programme complet - 10ème édition
            </h2>
            
            <div className="grid gap-4 md:gap-6">
              {/* Concert 1 - Stefano Di Battista */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:border-opacity-50" style={{ '&:hover': { borderColor: '#d4af37' } }}>
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
                      Stefano Di Battista
                    </h3>
                    <p className="text-sm md:text-base font-semibold mb-1" style={{ color: '#722f37' }}>« La Dolce Vita »</p>
                    <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      Jeudi 7 août 2025 - 21h
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      Place de la République, Céret
                    </div>
                  </div>
                  
                  <div className="md:text-center">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                      <Star className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                      <Star className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      "Le saxophoniste de génie italien"
                    </p>
                  </div>
                  
                  <div className="md:text-right">
                    <button 
                      className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                    >
                      <Ticket className="w-4 h-4 inline mr-2" />
                      Réserver
                    </button>
                  </div>
                </div>
              </div>

              {/* Concert 2 - Jacky Terrasson & Camille Bertault */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
                      Jacky Terrasson & Camille Bertault
                    </h3>
                    <p className="text-sm md:text-base font-semibold mb-1" style={{ color: '#722f37' }}>Trio « Moving On »</p>
                    <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      Vendredi 8 août 2025 - 21h
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      Place de la République, Céret
                    </div>
                  </div>
                  
                  <div className="md:text-center">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                      <Star className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                      <Star className="w-4 h-4 fill-current" style={{ color: '#d4af37' }} />
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      "Quartet d'exception"
                    </p>
                  </div>
                  
                  <div className="md:text-right">
                    <button 
                      className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                    >
                      <Ticket className="w-4 h-4 inline mr-2" />
                      Réserver
                    </button>
                  </div>
                </div>
              </div>

              {/* Concert 3 - Charlotte Planchou */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
                      Charlotte Planchou
                    </h3>
                    <p className="text-sm md:text-base font-semibold mb-1" style={{ color: '#722f37' }}>Quartet</p>
                    <div className="flex items-center text-xs md:text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      Samedi 9 août 2025 - 21h
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      Place de la République, Céret
                    </div>
                  </div>
                  
                  <div className="md:text-center">
                    <div 
                      className="inline-block text-white px-2 py-1 rounded text-xs font-bold mb-2"
                      style={{ backgroundColor: '#722f37' }}
                    >
                      🏆 Prix Évidence 2025
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      "Révélation de l'année"
                    </p>
                  </div>
                  
                  <div className="md:text-right">
                    <button 
                      className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                    >
                      <Ticket className="w-4 h-4 inline mr-2" />
                      Réserver
                    </button>
                  </div>
                </div>
              </div>

              {/* Pass 2 soirées */}
              <div 
                className="border-2 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                  borderColor: 'rgba(212, 175, 55, 0.3)' 
                }}
              >
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#722f37' }}>
                      Pass 2 soirées à Céret
                    </h3>
                    <p className="text-sm md:text-base mb-2" style={{ color: '#1a1a1a' }}>2 soirées parmi celles du 7 au 9 août 2025</p>
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <span 
                        className="text-white px-2 py-1 rounded text-xs font-bold mr-2"
                        style={{ backgroundColor: '#722f37' }}
                      >
                        ÉCONOMIE
                      </span>
                      Jusqu'à 15% de réduction
                    </div>
                  </div>
                  
                  <div className="md:text-center">
                    <p className="text-xl md:text-2xl font-bold" style={{ color: '#722f37' }}>30€</p>
                    <p className="text-xs md:text-sm text-gray-600">Tarif préférentiel</p>
                  </div>
                  
                  <div className="md:text-right">
                    <button 
                      className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                    >
                      <Ticket className="w-4 h-4 inline mr-2" />
                      Réserver
                    </button>
                  </div>
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
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#722f37' }}>
                      Pass 3 soirées à Céret
                    </h3>
                    <p className="text-sm md:text-base mb-2" style={{ color: '#1a1a1a' }}>Les 3 soirées du 7 au 9 août 2025</p>
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <span 
                        className="text-white px-2 py-1 rounded text-xs font-bold mr-2"
                        style={{ backgroundColor: '#722f37' }}
                      >
                        MEILLEUR PRIX
                      </span>
                      Jusqu'à 25% de réduction
                    </div>
                  </div>
                  
                  <div className="md:text-center">
                    <p className="text-xl md:text-2xl font-bold" style={{ color: '#722f37' }}>42€</p>
                    <p className="text-xs md:text-sm text-gray-600">Meilleur tarif</p>
                  </div>
                  
                  <div className="md:text-right">
                    <button 
                      className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                    >
                      <Ticket className="w-4 h-4 inline mr-2" />
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Information billetterie avec compte à rebours - COULEURS CORRIGÉES */}
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

          {/* Informations pratiques - COULEURS CORRIGÉES */}
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