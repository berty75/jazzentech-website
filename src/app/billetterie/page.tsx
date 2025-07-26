'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Ticket, Star, Music, Users, Headphones, ExternalLink, Info } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Composant pour le widget Billetweb
function BilletwebWidget() {
  useEffect(() => {
    // Charger le script Billetweb dynamiquement
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.billetweb.fr/js/export.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Nettoyer le script quand le composant se démonte
      const existingScript = document.querySelector('script[src="https://www.billetweb.fr/js/export.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="billetweb-container">
      <a 
        title="Vente de billets en ligne" 
        href="https://www.billetweb.fr/shop.php?event=jazz-en-tech-2025"
        className="shop_frame hidden"
        target="_blank"
        data-src="https://www.billetweb.fr/shop.php?event=jazz-en-tech-2025"
        data-max-width="100%"
        data-initial-height="800"
        data-scrolling="no"
        data-id="jazz-en-tech-2025"
        data-resize="1"
      >
        Vente de billets en ligne
      </a>
    </div>
  )
}

// Composant compte à rebours jazz fun MODIFIÉ
function JazzCountdownTimer() {
  // Le festival a commencé ! 🎉
  const festivalStarted = true

  if (festivalStarted) {
    return (
      <div className="relative">
        {/* Background musical animé */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-8 animate-bounce-slow">🎵</div>
          <div className="absolute top-8 right-12 animate-float delay-500">🎶</div>
          <div className="absolute bottom-6 left-16 animate-pulse delay-1000">🎼</div>
          <div className="absolute bottom-4 right-6 animate-bounce delay-700">🎷</div>
          <div className="absolute top-1/2 left-1/4 animate-spin-slow delay-300">🎺</div>
          <div className="absolute top-1/3 right-1/4 animate-pulse delay-800">🥁</div>
        </div>
        
        <div className="relative z-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#722f37' }}>
            🎊 LE FESTIVAL A COMMENCÉ ! 🎊
          </h3>
          <p className="text-lg md:text-xl mb-6 font-bold" style={{ color: '#d4af37' }}>
            Jazz en Tech 2025 est LIVE !
          </p>
          
          <div className="flex justify-center items-center space-x-6 md:space-x-8 mb-6">
            {/* Animation de notes qui dansent */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center animate-bounce"
                   style={{ backgroundColor: '#722f37' }}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl">🎷</div>
                  <div className="text-xs text-white font-bold">LIVE</div>
                </div>
              </div>
            </div>
            
            <div className="text-3xl font-bold animate-pulse" style={{ color: '#d4af37' }}>♪</div>
            
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center animate-bounce delay-300"
                   style={{ backgroundColor: '#d4af37' }}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl">🎺</div>
                  <div className="text-xs font-bold" style={{ color: '#722f37' }}>ON AIR</div>
                </div>
              </div>
            </div>
            
            <div className="text-3xl font-bold animate-pulse delay-500" style={{ color: '#722f37' }}>♫</div>
            
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center animate-bounce delay-700"
                   style={{ backgroundColor: '#b87333' }}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl">🎹</div>
                  <div className="text-xs text-white font-bold">JAZZ</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-base md:text-lg font-semibold animate-pulse" style={{ color: '#722f37' }}>
              🔥 En ce moment : concerts à Saint-Génis-des-Fontaines
            </p>
            <p className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>
              Et bientôt à Céret du 6 au 9 août !
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full font-bold text-sm animate-pulse"
                 style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#722f37' }}>
              🎫 Billets encore disponibles pour les concerts de Céret
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function Billetterie() {
  return (
    <div className="min-h-screen bg-white">
      <title>Billetterie - Jazz en Tech 2025</title>
      
      {/* Hero Section avec photo festival */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 relative overflow-hidden">        {/* Image de fond */}
        <div className="absolute inset-0">
        <Image 
            src="/images/festival-scene.jpg"
                alt="Scène du festival Jazz en Tech"
                fill
                className="object-cover opacity-30"
                sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Billetterie Officielle
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Réservez vos places pour la 10ème édition de Jazz en Tech
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Ticket className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Billetterie sécurisée</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          
{/* Section réservation immédiate - Saint-Génis */}
<section>
  <div className="text-center mb-8">
    <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#722f37' }}>
      🎟️ Réservation immédiate
    </h2>
    <p className="text-gray-600 mb-2">Billets disponibles dès maintenant</p>
    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}>
      <Info className="w-4 h-4 mr-2" />
      Concerts de Saint-Génis-des-Fontaines
    </div>
  </div>
  
  <div className="grid gap-4 max-w-4xl mx-auto">
    {/* Manu Le Prince avec bouton */}
    <div className="block p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
         style={{ backgroundColor: '#f7f3e9' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Image 
            src="/images/manu-le-prince.jpeg"
            alt="Manu Le Prince"
            width={80}
        height={80}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
          <div>
            <h3 className="text-lg md:text-xl font-bold" style={{ color: '#722f37' }}>
              Manu Le Prince
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Quartet « Bossa Jazz for Ever »
            </p>
            <div className="flex items-center text-xs md:text-sm mt-1" style={{ color: '#d4af37' }}>
              <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span className="font-semibold">Dimanche 27 juillet • 21h</span>
            </div>
            <div className="flex items-center text-xs md:text-sm" style={{ color: '#b87333' }}>
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span>Saint-Génis-des-Fontaines</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
            DISPONIBLE
          </div>
          <a 
            href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/manu-le-prince-quartet-bossa-jazz-for-ever"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
          >
            <Ticket className="w-4 h-4 mr-2" />
            Réserver
          </a>
        </div>
      </div>
    </div>
    
    {/* Florin Gugulica avec bouton */}
    <div className="block p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
         style={{ backgroundColor: '#f7f3e9' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Image 
              src="/images/florin-gugulica.jpeg"
                alt="Florin Gugulica"
                width={80}
                height={80}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg md:text-xl font-bold" style={{ color: '#722f37' }}>
              Florin Gugulica
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Sextet « It's a long Way »
            </p>
            <div className="flex items-center text-xs md:text-sm mt-1" style={{ color: '#d4af37' }}>
              <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span className="font-semibold">Lundi 28 juillet • 21h</span>
            </div>
            <div className="flex items-center text-xs md:text-sm" style={{ color: '#b87333' }}>
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span>Saint-Génis-des-Fontaines</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
            DISPONIBLE
          </div>
          <a 
            href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
          >
            <Ticket className="w-4 h-4 mr-2" />
            Réserver
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Widget Billetweb pour les concerts de Céret */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#722f37' }}>
                🎭 Concerts de Céret
              </h2>
              <p className="text-gray-600 mb-4">Billetterie principale • 7, 8 et 9 août 2025</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
                <Music className="w-4 h-4 mr-2" />
                Place de la République, Céret
              </div>
            </div>
            
            {/* Conteneur stylisé pour le widget */}
            <div 
              className="rounded-2xl border-2 overflow-hidden shadow-2xl"
              style={{ 
                borderColor: '#d4af37',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(247, 243, 233, 0.5))'
              }}
            >
              {/* Header du widget */}
              <div 
                className="p-4 text-center border-b-2"
                style={{ 
                  backgroundColor: '#722f37',
                  borderColor: '#d4af37'
                }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Billetterie Jazz en Tech 2025
                </h3>
                <div className="flex items-center justify-center space-x-2 text-sm" style={{ color: '#f7f3e9' }}>
                  <Ticket className="w-4 h-4" />
                  <span>Paiement sécurisé • Billets par email</span>
                </div>
              </div>
              
              {/* Widget Billetweb */}
              <div className="p-6">
                <BilletwebWidget />
              </div>
              
              {/* Footer du widget */}
              <div 
                className="p-4 text-center border-t"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderColor: 'rgba(212, 175, 55, 0.3)'
                }}
              >
                <p className="text-sm text-gray-600 mb-2">
                  🔒 Paiement sécurisé via Billetweb
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>✓ Carte bancaire</span>
                  <span>✓ PayPal</span>
                  <span>✓ Virement</span>
                </div>
              </div>
            </div>
            
            {/* Lien d'ouverture externe si besoin */}
            <div className="text-center mt-6">
              <a 
                href="https://www.billetweb.fr/shop.php?event=jazz-en-tech-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: '#722f37' }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          </section>

          {/* Aperçu des artistes de Céret */}
          <section>
            <div className="text-center mb-6">
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#722f37' }}>
                🌟 Les artistes de Céret à découvrir
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'Stefano Di Battista',
                  subtitle: '« La Dolce Vita »',
                  date: '7 AOÛT',
                  image: '/images/stefano-di-battista.jpg'
                },
                {
                  name: 'Jacky Terrasson',
                  subtitle: 'Piano Solo & Invités',
                  date: '8 AOÛT',
                  image: '/images/jacky-terrasson.jpeg'
                },
                {
                  name: 'Camille Bertault',
                  subtitle: 'Voix Jazz Française',
                  date: '8 AOÛT',
                  image: '/images/camille-bertault.jpg',
                  special: 'INVITÉE'
                },
                {
                  name: 'Charlotte Planchou',
                  subtitle: 'Quartet - Prix Évidence 2025',
                  date: '9 AOÛT',
                  image: '/images/charlotte-planchou.jpg',
                  special: 'CLÔTURE'
                }
              ].map((artist, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow text-center">
                  <Image 
                        src={artist.image}
                        alt={artist.name}
                        width={80}
                       height={80}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-3"
                    />
                  <h4 className="text-sm font-bold mb-1" style={{ color: '#722f37' }}>
                    {artist.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">{artist.subtitle}</p>
                  <div className="flex items-center justify-center text-xs mb-2" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">{artist.date}</span>
                  </div>
                  {artist.special && (
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      artist.special === 'CLÔTURE' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {artist.special}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Note sur Camille Bertault */}
            <div className="mt-6 text-center">
              <div 
                className="inline-block p-4 rounded-xl border-2 border-dashed max-w-md mx-auto"
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  borderColor: '#d4af37'
                }}
              >
                <p className="text-sm" style={{ color: '#722f37' }}>
                  <strong>🎤 Camille Bertault</strong> rejoint Jacky Terrasson le 8 août pour une soirée exceptionnelle ! 
                  Chanteuse de jazz française récompensée aux Victoires du Jazz 2023, 
                  elle est reconnue pour sa virtuosité vocale et son interprétation unique de standards jazz.
                </p>
              </div>
            </div>
          </section>

          {/* Compte à rebours jazz fun */}
          <section 
            className="rounded-2xl p-6 md:p-8 border relative overflow-hidden"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)', 
              borderColor: 'rgba(212, 175, 55, 0.3)' 
            }}
          >
            <JazzCountdownTimer />
          </section>

          {/* Service client */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-6 text-center" style={{ color: '#722f37' }}>
              🎧 Besoin d'aide ?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Headphones className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
                <h4 className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>Assistance billetterie</h4>
                <p className="text-sm text-gray-600 mb-3">Problème avec votre commande ?</p>
                <a 
                  href="mailto:billetterie@jazzentech.com"
                  className="text-sm font-medium hover:opacity-80 transition-opacity px-4 py-2 rounded-lg inline-block"
                  style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                >
                  billetterie@jazzentech.com
                </a>
              </div>
              
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                <Music className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
                <h4 className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>Service client</h4>
                <p className="text-sm text-gray-600 mb-1">Du lundi au vendredi</p>
                <p className="font-bold text-sm" style={{ color: '#722f37' }}>
                  +33 6 37 58 18 86
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CSS pour personnaliser le widget Billetweb */}
      <style jsx>{`
        .billetweb-container {
          min-height: 600px;
          width: 100%;
        }
        
        .billetweb-container iframe {
          border: none !important;
          border-radius: 8px;
          width: 100% !important;
          min-height: 600px;
        }
        
        .shop_frame.hidden {
          display: none;
        }
        
        /* Styles pour le widget une fois chargé */
        .billetweb-container > div {
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}