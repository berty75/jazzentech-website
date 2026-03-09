'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Music, Ticket, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
          <span className="text-xs mt-1 block" style={{ color: '#b87333' }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Programmation() {
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
      description: 'Hommage à Miles Davis pour les 100 ans de sa naissance',
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
      description: 'Rythme et envie de danser garantis !',
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
      <title>Programmation - Jazz en Tech 2026</title>
      
      {/* Hero */}
      <section className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid #d4af37' }}>
            <Music className="w-4 h-4" style={{ color: '#d4af37' }} />
            <span className="text-sm font-semibold text-white">11ème ÉDITION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Programmation <span className="text-white">2026</span>
          </h1>
          <p className="text-base sm:text-lg max-w-3xl mx-auto" style={{ color: '#f7f3e9' }}>
            Découvrez les artistes de cette 11ème édition
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Titre Céret */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Céret</h2>
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
                  <p className="text-sm mb-2" style={{ color: '#d4af37' }}>{concert.subtitle}</p>
                  <p className="text-sm mb-4" style={{ color: '#f7f3e9' }}>{concert.description}</p>
                  
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
                    <div className="flex gap-2">
                      <Link 
                        href="/billetterie" 
                        className="px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                      >
                        Réserver
                      </Link>
                      <Link 
                        href={`/artistes/${concert.slug}`}
                        className="px-3 py-2 rounded-lg text-sm font-medium border transition-all hover:scale-105"
                        style={{ borderColor: '#d4af37', color: '#d4af37' }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA central */}
          <div className="text-center">
            <Link href="/billetterie" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all hover:scale-105" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
              <Ticket className="w-6 h-6" />
              Réserver mes places
            </Link>
          </div>

          {/* Saint-Génis */}
          <section>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Saint-Génis-des-Fontaines</h2>
              </div>
              <p className="text-base" style={{ color: '#f7f3e9' }}>Juillet 2026 • Cloître</p>
            </div>
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '2px dashed rgba(212, 175, 55, 0.3)' }}>
              <Music className="w-12 h-12 mx-auto mb-3" style={{ color: '#d4af37' }} />
              <p className="font-bold text-lg text-white">Programme à venir</p>
              <p className="text-sm mt-2" style={{ color: '#b87333' }}>Les artistes seront annoncés prochainement</p>
            </div>
          </section>

          {/* Countdown */}
          <section className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <h3 className="text-center text-xl font-bold mb-6 text-white">⏰ Le festival approche !</h3>
            <CountdownTimer />
          </section>

          {/* Infos pratiques */}
          <section className="rounded-2xl p-6" style={{ border: '1px solid rgba(212, 175, 55, 0.2)', backgroundColor: 'rgba(247, 243, 233, 0.05)' }}>
            <h3 className="font-bold mb-4 flex items-center text-white">
              <Clock className="w-5 h-5 mr-2" />
              Infos pratiques
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm" style={{ color: '#f7f3e9' }}>
              <p><strong style={{ color: '#d4af37' }}>Horaires :</strong> 21h (portes 20h)</p>
              <p><strong style={{ color: '#d4af37' }}>Lieu :</strong> Place de la République, Céret</p>
              <p><strong style={{ color: '#d4af37' }}>Billetterie :</strong> En ligne sécurisée</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}