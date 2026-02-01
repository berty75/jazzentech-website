'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Ticket, Shield, Mail, Calendar, MapPin, Music, Phone } from 'lucide-react'

function BilletwebWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.billetweb.fr/js/export.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <a 
      title="Vente de billets en ligne" 
      href="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
      className="shop_frame"
      target="_blank"
      data-src="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
      data-max-width="100%"
      data-initial-height="800"
      data-scrolling="yes"
      data-id="jazz-en-tech"
      data-resize="1"
    >
      Vente de billets en ligne
    </a>
  )
}

export default function Billetterie() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const endDate = new Date('2026-03-01T23:59:59')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen pt-32" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #722f37 30%, #1a1a1a 100%)' }}>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Card principale unifiée */}
        <div 
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(114, 47, 55, 0.9) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        >
          {/* Header commun */}
          <div className="p-4 sm:p-6 text-center" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid #d4af37' }}>
              <Music className="w-4 h-4" style={{ color: '#d4af37' }} />
              <span className="text-sm font-semibold" style={{ color: '#d4af37' }}>HOMMAGE À MILES DAVIS • 100 ANS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Billetterie Jazz en Tech 2026</h1>
          </div>

          {/* Contenu 2 colonnes fluides */}
          <div className="grid lg:grid-cols-5 gap-0">
            
            {/* Colonne gauche - Infos (2/5) */}
            <div className="lg:col-span-2 p-5 sm:p-6 text-white" style={{ borderRight: '1px solid rgba(212, 175, 55, 0.1)' }}>
              
              {/* Photo */}
              <div className="relative rounded-xl overflow-hidden mb-5">
                <Image
                  src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_600/erik_truffaz_antonio_lizana_jazz.jpg"
                  alt="Erik Truffaz & Antonio Lizana"
                  width={400}
                  height={220}
                  className="w-full h-auto"
                />
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                  PRÉVENTE -20%
                </div>
              </div>

              {/* Artistes */}
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Erik Truffaz & Antonio Lizana</h2>
              <p className="text-base mb-4" style={{ color: '#d4af37' }}>"New Sketches of Spain"</p>

              {/* Date & Lieu */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <Calendar className="w-4 h-4" style={{ color: '#d4af37' }} />
                  <span>Mercredi 5 août 2026</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#d4af37' }} />
                  <span>Céret • 21h</span>
                </div>
              </div>

              {/* Tarif */}
              <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <p className="text-sm mb-2" style={{ color: '#f7f3e9' }}>🎟️ Tarif prévente jusqu'au 1er mars</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold" style={{ color: '#d4af37' }}>20€</span>
                  <span className="text-xl line-through" style={{ color: '#666' }}>25€</span>
                </div>
              </div>

              {/* Countdown */}
              <p className="text-xs mb-2" style={{ color: 'rgba(247, 243, 233, 0.6)' }}>Fin de l'offre dans :</p>
              <div className="flex gap-2 mb-4">
                {[
                  { value: timeLeft.days, label: 'jours' },
                  { value: timeLeft.hours, label: 'heures' },
                  { value: timeLeft.minutes, label: 'min' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                    >
                      {item.value}
                    </div>
                    <span className="text-xs mt-1 block" style={{ color: 'rgba(247, 243, 233, 0.6)' }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Garanties */}
              <div className="flex items-center gap-4 pt-4 text-xs" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', color: 'rgba(247, 243, 233, 0.5)' }}>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" style={{ color: '#d4af37' }} />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" style={{ color: '#d4af37' }} />
                  <span>E-billet immédiat</span>
                </div>
              </div>
            </div>

            {/* Colonne droite - Widget (3/5) */}
            <div className="lg:col-span-3 bg-white">
              <div className="p-3 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(90deg, #722f37 0%, #1a1a1a 100%)' }}>
                <Ticket className="w-5 h-5" style={{ color: '#d4af37' }} />
                <span className="font-semibold text-white">Réservation en ligne</span>
              </div>
              <div className="p-4">
                <BilletwebWidget />
              </div>
            </div>

          </div>
        </div>

        {/* Section programmation */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Programmation 2026</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <p className="font-bold text-white">26-27 Juillet</p>
              <p className="text-sm" style={{ color: '#d4af37' }}>Saint-Génis-des-Fontaines</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Programme à venir</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <p className="font-bold text-white">5-6-7-8 Août</p>
              <p className="text-sm" style={{ color: '#d4af37' }}>Céret</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Erik Truffaz + à venir</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center pb-8">
          <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Besoin d'aide ?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="tel:0601864672" className="flex items-center gap-2 hover:opacity-80" style={{ color: '#d4af37' }}>
              <Phone className="w-4 h-4" />
              06 01 86 46 72
            </a>
            <a href="mailto:contactjazzentech@gmail.com" className="flex items-center gap-2 hover:opacity-80" style={{ color: '#d4af37' }}>
              <Mail className="w-4 h-4" />
              contactjazzentech@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}