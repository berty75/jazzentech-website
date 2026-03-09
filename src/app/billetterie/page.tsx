'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Ticket, Music, Headphones, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function BilletwebWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.billetweb.fr/js/export.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      const existingScript = document.querySelector('script[src="https://www.billetweb.fr/js/export.js"]')
      if (existingScript) document.head.removeChild(existingScript)
    }
  }, [])

  return (
    <div className="billetweb-container">
      <a 
        title="Vente de billets en ligne" 
        href="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
        className="shop_frame hidden"
        target="_blank"
        data-src="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
        data-max-width="100%"
        data-initial-height="800"
        data-scrolling="no"
        data-id="jazz-en-tech"
        data-resize="1"
      >
        Vente de billets en ligne
      </a>
    </div>
  )
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const festivalStart = new Date('2026-08-05T00:00:00')
    const timer = setInterval(() => {
      const now = new Date()
      const difference = festivalStart.getTime() - now.getTime()
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
    <div className="flex justify-center gap-2 md:gap-4">
      {[
        { value: timeLeft.days, label: 'jours' },
        { value: timeLeft.hours, label: 'heures' },
        { value: timeLeft.minutes, label: 'min' },
        { value: timeLeft.seconds, label: 'sec' }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-lg md:text-2xl font-bold shadow-lg" style={{ backgroundColor: 'rgba(114, 47, 55, 0.6)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            {item.value}
          </div>
          <span className="text-xs mt-1 block" style={{ color: '#d4af37' }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Billetterie() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const promoEnd = new Date('2026-04-15T23:59:59')
  const isPromoActive = now <= promoEnd

  const concerts = [
    {
      name: 'Erik Truffaz & Antonio Lizana',
      subtitle: '"New Sketches of Spain"',
      date: 'Mercredi 5 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto:subject,w_600,h_450,f_auto,q_auto/erik_truffaz_antonio_lizana_jazz.jpg',
      badge: 'JAZZ / FLAMENCO',
      badgeColor: '#722f37',
      slug: 'erik-truffaz',
      price: '25€',
      promoPrice: null
    },
    {
      name: 'Ladyva & Barcelona Big Blues Band',
      subtitle: 'Une association explosive !',
      date: 'Vendredi 7 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto:subject,w_600,h_450,f_auto,q_auto/Ladyva.jpg',
      badge: 'BOOGIE-WOOGIE',
      badgeColor: '#d4af37',
      slug: 'ladyva',
      price: '22€',
      promoPrice: '17€'
    }
  ]

  return (
    <div className="min-h-screen">
      <title>Billetterie - Jazz en Tech 2026</title>
      
      {/* Hero */}
      <section className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid #d4af37' }}>
            <Ticket className="w-4 h-4" style={{ color: '#d4af37' }} />
            <span className="text-sm font-semibold text-white">11ème ÉDITION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Billetterie <span className="text-white">2026</span>
          </h1>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: '#f7f3e9' }}>
            Réservez vos places pour les concerts de l'été
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Titre Céret */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Concerts de Céret</h2>
            </div>
            <p className="text-base" style={{ color: '#f7f3e9' }}>5 & 7 Août 2026 • Place de la République</p>
          </div>

          {/* Grid des cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {concerts.map((concert, index) => (
              <article 
                key={index}
                className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ border: '2px solid rgba(212, 175, 55, 0.4)', backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
              >
                {/* Image en haut */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={concert.image}
                    alt={concert.name}
                    fill
                    className="object-cover"
                  />
                  {/* Badge genre */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                      style={{ 
                        backgroundColor: concert.badgeColor, 
                        color: concert.badgeColor === '#d4af37' ? '#1a1a1a' : '#f7f3e9' 
                      }}
                    >
                      {concert.badge}
                    </span>
                  </div>
                  {/* Badge promo */}
                  {concert.promoPrice && isPromoActive && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse" style={{ backgroundColor: '#22c55e', color: '#fff' }}>
                        -23%
                      </span>
                    </div>
                  )}
                </div>

                {/* Infos en bas */}
                <div className="p-6" style={{ backgroundColor: 'rgba(114, 47, 55, 0.85)', backdropFilter: 'blur(10px)' }}>
                  <h3 className="text-xl font-bold text-white mb-1">{concert.name}</h3>
                  <p className="text-sm mb-4" style={{ color: '#d4af37' }}>{concert.subtitle}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#f7f3e9' }}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" style={{ color: '#d4af37' }} />
                      {concert.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" style={{ color: '#d4af37' }} />
                      {concert.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.4)' }}>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-5 h-5" style={{ color: '#d4af37' }} />
                      {concert.promoPrice && isPromoActive ? (
                        <>
                          <span className="text-2xl font-bold" style={{ color: '#d4af37' }}>{concert.promoPrice}</span>
                          <span className="text-sm line-through" style={{ color: '#f7f3e9', opacity: 0.6 }}>{concert.price}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold" style={{ color: '#d4af37' }}>{concert.price}</span>
                      )}
                    </div>
                    <Link 
                      href={`/artistes/${concert.slug}`}
                      className="flex items-center gap-1 text-sm font-medium"
                      style={{ color: '#d4af37' }}
                    >
                      Détails <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Widget Billetweb */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">🎟️ Réserver mes billets</h2>
              <p style={{ color: '#f7f3e9' }}>Paiement sécurisé • Billets par email</p>
            </div>
            
            <div className="rounded-2xl border-2 overflow-hidden shadow-xl" style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}>
              <div className="p-4 text-center" style={{ backgroundColor: 'rgba(114, 47, 55, 0.7)' }}>
                <h3 className="font-bold text-white text-lg">Billetterie Jazz en Tech 2026</h3>
              </div>
              <div className="p-6" style={{ backgroundColor: 'rgba(26, 26, 26, 0.6)', maxHeight: '600px', overflowY: 'auto' }}>
                <BilletwebWidget />
              </div>
              <div className="p-4 text-center text-sm border-t" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', color: '#f7f3e9', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                🔒 Paiement sécurisé • CB • PayPal • Virement
              </div>
            </div>
            
            <div className="text-center mt-4">
              <a href="https://www.billetweb.fr/shop.php?event=jazz-en-tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm" style={{ color: '#d4af37' }}>
                <ExternalLink className="w-4 h-4 mr-1" />
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          </section>

          {/* Saint-Génis */}
          <section>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Saint-Génis-des-Fontaines</h2>
              </div>
              <p className="text-base" style={{ color: '#f7f3e9' }}>Juillet 2026 • Cloître</p>
            </div>
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '2px dashed rgba(212, 175, 55, 0.4)' }}>
              <Music className="w-12 h-12 mx-auto mb-3" style={{ color: '#d4af37' }} />
              <p className="font-bold text-lg text-white">Programme à venir</p>
            </div>
          </section>

          {/* Countdown */}
          <section className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <h3 className="text-center text-xl font-bold mb-6 text-white">⏰ Le festival approche !</h3>
            <CountdownTimer />
          </section>

          {/* Service client */}
          <section className="rounded-2xl p-6" style={{ border: '1px solid rgba(212, 175, 55, 0.2)', backgroundColor: 'rgba(26, 26, 26, 0.3)' }}>
            <h3 className="font-bold mb-6 text-center text-lg text-white">🎧 Besoin d'aide ?</h3>
            <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Headphones className="w-8 h-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
                <p className="font-semibold text-white">Assistance billetterie</p>
                <a href="mailto:billetterie@jazzentech.com" className="text-sm" style={{ color: '#d4af37' }}>billetterie@jazzentech.com</a>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.2)' }}>
                <Music className="w-8 h-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
                <p className="font-semibold text-white">Service client</p>
                <p className="text-sm font-bold" style={{ color: '#d4af37' }}>+33 6 37 58 18 86</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .billetweb-container { min-height: 500px; width: 100%; }
        .billetweb-container iframe { border: none !important; border-radius: 8px; width: 100% !important; min-height: 500px; }
        .shop_frame.hidden { display: none; }
      `}</style>
    </div>
  )
}