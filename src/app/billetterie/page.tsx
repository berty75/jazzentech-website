'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Ticket, Music, CheckCircle, Shield, Mail, X } from 'lucide-react'
import Image from 'next/image'

// Composant compte à rebours
function PreventeCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  const endDate = new Date('2026-03-01T23:59:59')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {[
        { value: timeLeft.days, label: 'j' },
        { value: timeLeft.hours, label: 'h' },
        { value: timeLeft.minutes, label: 'm' },
        { value: timeLeft.seconds, label: 's' }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold"
            style={{ 
              backgroundColor: '#722f37', 
              color: '#d4af37'
            }}
          >
            {item.value}
          </div>
          <span className="text-xs mt-1 block text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// Composant Widget Billetweb
function BilletwebWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.billetweb.fr/js/export.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://www.billetweb.fr/js/export.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <a 
      title="Vente de billets en ligne" 
      href="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
      className="shop_frame"
      target="_blank"
      data-src="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
      data-max-width="100%"
      data-initial-height="550"
      data-scrolling="yes"
      data-id="jazz-en-tech"
      data-resize="1"
    >
      Vente de billets en ligne
    </a>
  )
}

// Super Modal Billetweb - Optimisé Mobile
function SuperModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay avec blur */}
      <div 
        className="fixed inset-0 z-[100] transition-opacity duration-300"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(114, 47, 55, 0.85) 0%, rgba(26, 26, 26, 0.95) 100%)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      {/* Modal centré - responsive */}
      <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div 
          className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-[modalIn_0.3s_ease-out]"
          style={{ maxHeight: '90vh' }}
        >
          {/* Header avec gradient */}
          <div 
            className="relative p-3 sm:p-4 text-center"
            style={{ 
              background: 'linear-gradient(135deg, #722f37 0%, #1a1a1a 100%)'
            }}
          >
            {/* Barre de swipe mobile */}
            <div className="sm:hidden w-12 h-1 bg-white/30 rounded-full mx-auto mb-2"></div>
            
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
              aria-label="Fermer"
            >
              <X className="w-5 h-5" style={{ color: '#d4af37' }} />
            </button>
            
            {/* Titre */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#d4af37' }} />
              <span className="font-bold text-white text-sm sm:text-base">Réservation</span>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: '#d4af37' }}>
              Erik Truffaz & Antonio Lizana
            </p>
            <p className="text-xs mt-1 hidden sm:block" style={{ color: 'rgba(247, 243, 233, 0.7)' }}>
              Mer. 5 août 2026 • 21h • Céret
            </p>
          </div>
          
          {/* Widget Billetweb */}
          <div 
            className="p-2 sm:p-4 overflow-y-auto"
            style={{ height: 'calc(90vh - 120px)', maxHeight: '500px' }}
          >
            <BilletwebWidget />
          </div>
          
          {/* Footer */}
          <div 
            className="p-2 sm:p-3 border-t flex items-center justify-center gap-4 sm:gap-6 text-xs"
            style={{ 
              backgroundColor: 'rgba(247, 243, 233, 0.8)', 
              borderColor: 'rgba(212, 175, 55, 0.3)' 
            }}
          >
            <div className="flex items-center gap-1" style={{ color: '#722f37' }}>
              <Shield className="w-3 h-3" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: '#722f37' }}>
              <Mail className="w-3 h-3" />
              <span>E-billet immédiat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default function Billetterie() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Ouvrir le modal automatiquement si ?reserve=true dans l'URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('reserve') === 'true') {
        setIsModalOpen(true)
      }
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f3e9' }}>
      <title>Billetterie Prévente - Jazz en Tech 2026</title>
      
      {/* Super Modal */}
      <SuperModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Hero compact */}
      <header className="hero-gradient text-white pt-32 pb-6 sm:pt-36 sm:pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', border: '1px solid #d4af37', color: '#d4af37' }}>
            <Ticket className="w-3 h-3" />
            PRÉVENTE OUVERTE
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Billetterie <span style={{ color: '#d4af37' }}>2026</span>
          </h1>
          <p className="text-sm sm:text-base" style={{ color: '#f7f3e9' }}>11ème édition • Été 2026</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Card principale - Concert en prévente */}
          <section className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid lg:grid-cols-5">
              {/* Image - 2 colonnes */}
              <div className="lg:col-span-2 relative">
                <Image
                  src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_600/erik_truffaz_antonio_lizana_jazz.jpg"
                  alt="Erik Truffaz et Antonio Lizana"
                  width={400}
                  height={500}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                    PRÉVENTE -20%
                  </span>
                </div>
              </div>

              {/* Contenu - 3 colonnes */}
              <div className="lg:col-span-3 p-6 lg:p-8">
                {/* Badge Miles Davis */}
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-4 h-4" style={{ color: '#722f37' }} />
                  <span className="text-xs font-semibold" style={{ color: '#722f37' }}>HOMMAGE MILES DAVIS • 100 ANS</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                  Erik Truffaz & Antonio Lizana
                </h2>
                <p className="text-base sm:text-lg mb-4" style={{ color: '#b87333' }}>
                  "New Sketches of Spain"
                </p>

                {/* Infos concert */}
                <div className="flex flex-wrap gap-2 mb-6 text-sm">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                    <Calendar className="w-4 h-4" style={{ color: '#722f37' }} />
                    <span>Mer. 5 août 2026</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                    <Clock className="w-4 h-4" style={{ color: '#722f37' }} />
                    <span>21h00</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                    <MapPin className="w-4 h-4" style={{ color: '#722f37' }} />
                    <span>Céret</span>
                  </div>
                </div>

                {/* Tarification */}
                <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '2px solid rgba(212, 175, 55, 0.3)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tarif prévente (jusqu'au 1er mars)</p>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold" style={{ color: '#722f37' }}>20€</span>
                        <span className="text-lg line-through text-gray-400">25€</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <PreventeCountdown />
                    </div>
                  </div>
                </div>

                {/* Bouton ouvre la modal */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-center px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                >
                  <Ticket className="w-5 h-5" />
                  Réserver mes places
                </button>

                {/* Garanties */}
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Paiement sécurisé
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    E-billet par email
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Confirmation immédiate
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section prochains concerts */}
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#722f37' }}>
              <Calendar className="w-5 h-5" />
              Programmation à venir
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Saint-Génis */}
              <div className="bg-white rounded-xl p-5 shadow-md border-l-4" style={{ borderColor: '#d4af37' }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold" style={{ color: '#1a1a1a' }}>Saint-Génis-des-Fontaines</h4>
                    <p className="text-sm" style={{ color: '#b87333' }}>26-27 juillet 2026</p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#b87333' }}>
                    Bientôt
                  </span>
                </div>
                <p className="text-sm text-gray-500">Programme annoncé prochainement</p>
              </div>

              {/* Céret */}
              <div className="bg-white rounded-xl p-5 shadow-md border-l-4" style={{ borderColor: '#722f37' }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold" style={{ color: '#1a1a1a' }}>Céret</h4>
                    <p className="text-sm" style={{ color: '#b87333' }}>5-6-7-8 août 2026</p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#722f37' }}>
                    1 concert
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>5 août :</strong> Erik Truffaz & Antonio Lizana
                </p>
                <p className="text-sm text-gray-500 mt-1">+ concerts à venir</p>
              </div>
            </div>
          </section>

          {/* Avantages prévente */}
          <section className="bg-white rounded-2xl p-6 shadow-md mb-8">
            <h3 className="text-lg font-bold mb-6 text-center" style={{ color: '#722f37' }}>
              Pourquoi réserver en prévente ?
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}>
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Économisez 5€</h4>
                <p className="text-sm text-gray-500">20€ au lieu de 25€ par billet</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(114, 47, 55, 0.15)' }}>
                  <span className="text-2xl">🎫</span>
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>Places garanties</h4>
                <p className="text-sm text-gray-500">Sécurisez vos places à l'avance</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(184, 115, 51, 0.15)' }}>
                  <span className="text-2xl">📧</span>
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#1a1a1a' }}>E-billet instantané</h4>
                <p className="text-sm text-gray-500">Reçu par email immédiatement</p>
              </div>
            </div>
          </section>

          {/* Contact Billetterie */}
          <section className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold mb-4 text-center" style={{ color: '#722f37' }}>
              Une question sur votre réservation ?
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Contact Billetterie */}
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d4af37' }}>
                  <Ticket className="w-6 h-6" style={{ color: '#1a1a1a' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>Contact billetterie</h4>
                  <a 
                    href="tel:+33601864672" 
                    className="text-lg font-bold hover:underline" 
                    style={{ color: '#722f37' }}
                  >
                    06 01 86 46 72
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">Réservations, remboursements</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#722f37' }}>
                  <Mail className="w-6 h-6" style={{ color: '#f7f3e9' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>Par email</h4>
                  <a 
                    href="mailto:contactjazzentech@gmail.com" 
                    className="text-sm hover:underline" 
                    style={{ color: '#722f37' }}
                  >
                    contactjazzentech@gmail.com
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">Réponse sous 24h</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}