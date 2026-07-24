'use client'

import OfficeTourismeSaintGenis from '@/components/OfficeTourismeSaintGenis'
import PlacesRestantes from '@/components/PlacesRestantes'

import React, { useState, useEffect } from 'react'
import { MapPin, Ticket, Music, Headphones, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import BilletwebPopupButton from '@/components/BilletwebPopupButton'

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

  const isPromoActive = (concert: { promoPrice?: string | null; promoStart?: string; promoEnd?: string }) =>
    !!concert.promoPrice &&
    !!concert.promoStart &&
    !!concert.promoEnd &&
    now >= new Date(concert.promoStart) &&
    now <= new Date(concert.promoEnd)

  const concerts = [
    {
      name: 'Erik Truffaz & Antonio Lizana',
      subtitle: '"New Sketches of Spain"',
      date: 'Mercredi 5 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_600,h_450,f_auto,q_auto/erik_truffaz_antonio_lizana_jazz.jpg',
      badge: 'JAZZ / FLAMENCO',
      badgeColor: '#722f37',
      slug: 'erik-truffaz', ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=6796635',
      price: '25€',
      promoPrice: null as string | null,
      promoStart: undefined as string | undefined,
      promoEnd: undefined as string | undefined
    },
    {
      name: 'Dal Sasso Big Band',
      subtitle: 'Africa Brass Revisited',
      date: 'Jeudi 6 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_600,h_450,f_auto,q_auto/Dal-Sasso-groupe.jpg',
      badge: 'BIG BAND',
      badgeColor: '#722f37',
      slug: 'dal-sasso', ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024291',
      price: '22€',
      promoPrice: '18€' as string | null,
      promoStart: '2026-01-01T00:00:00' as string | undefined,
      promoEnd: '2026-06-30T23:59:59' as string | undefined
    },
    {
      name: 'Ladyva & Barcelona Big Blues Band',
      subtitle: 'Une association explosive !',
      date: 'Vendredi 7 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_600,h_450,f_auto,q_auto/Ladyva.jpg',
      badge: 'BOOGIE-WOOGIE',
      badgeColor: '#d4af37',
      slug: 'ladyva', ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=6876952',
      price: '22€',
      promoPrice: null as string | null,
      promoStart: undefined as string | undefined,
      promoEnd: undefined as string | undefined
    },
    {
      name: 'Akpé Motion featuring Karla Harris',
      subtitle: '« Électric Miles »',
      date: 'Samedi 8 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_600,h_450,f_auto,q_auto/Alain-Brunet.jpg',
      badge: 'JAZZ ROCK',
      badgeColor: '#722f37',
      slug: 'akpe-motion', ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024288',
      price: '22€',
      promoPrice: '18€' as string | null,
      promoStart: '2026-01-01T00:00:00' as string | undefined,
      promoEnd: '2026-06-30T23:59:59' as string | undefined
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
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* COLONNE GAUCHE — concerts par lieu */}
          <div className="lg:col-span-7 space-y-10">

            {/* Céret */}
            <section>
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                <h2 className="text-xl md:text-2xl font-bold text-white">Concerts de Céret</h2>
              </div>
              <p className="text-sm mb-5" style={{ color: '#b87333' }}>5, 6, 7 & 8 août 2026 • Place de la République</p>

              <div className="space-y-3">
                {concerts.map((concert, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-3 rounded-xl items-center"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0">
                      <Image src={concert.image} alt={concert.name} fill sizes="112px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#d4af37' }}>{concert.date} • {concert.time}</p>
                      <Link href={`/artistes/${concert.slug}`} className="font-bold text-white hover:underline block truncate">{concert.name}</Link>
                      <p className="text-sm truncate mb-2" style={{ color: '#f7f3e9' }}>{concert.subtitle}</p>
                      <div className="mb-2 empty:hidden">
                        <PlacesRestantes slug={concert.slug} />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          {isPromoActive(concert) ? (
                            <span>
                              <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{concert.promoPrice}</span>{' '}
                              <span className="text-xs line-through" style={{ color: '#f7f3e9', opacity: 0.6 }}>{concert.price}</span>
                            </span>
                          ) : (
                            <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{concert.price}</span>
                          )}
                        </div>
                        <Link
                          href={`/artistes/${concert.slug}`}
                          className="flex items-center gap-1 text-sm font-medium shrink-0 hover:underline"
                          style={{ color: '#d4af37' }}
                        >
                          Détails <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pass */}
              <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                <p className="font-bold text-white mb-3">🎫 Pass Céret <span className="text-xs font-normal" style={{ color: '#b87333' }}>(concerts de Céret uniquement)</span></p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '2 concerts', price: '40€', url: 'https://www.billetweb.fr/jazz-en-tech&quick=7024309' },
                    { label: '3 concerts', price: '55€', url: 'https://www.billetweb.fr/jazz-en-tech&quick=7024311' },
                    { label: '4 concerts', price: '65€', url: 'https://www.billetweb.fr/jazz-en-tech&quick=7024314' }
                  ].map((pass, i) => (
                    <BilletwebPopupButton
                      key={i}
                      ticketUrl={pass.url}
                      className="text-sm font-semibold px-3 py-2 rounded-lg transition-all hover:scale-105"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.4)' }}
                    >
                      {pass.label} · {pass.price}
                    </BilletwebPopupButton>
                  ))}
                </div>
              </div>
            </section>

            {/* Saint-Génis */}
            <section>
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                <h2 className="text-xl md:text-2xl font-bold text-white">Saint-Génis-des-Fontaines</h2>
              </div>
              <p className="text-sm mb-5" style={{ color: '#b87333' }}>26 & 27 juillet 2026 • Cloître</p>

              <div className="space-y-3">
                {[
                  { name: 'Cecil L. Recchia Quintet', subtitle: 'sings Django Reinhardt', date: 'Dim. 26 juillet', time: '21h', price: '15€', slug: 'cecile-recchia', image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_400,h_400,f_auto,q_auto/Cecil-L-Recchia.jpg', ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024303' },
                  { name: 'Knobil Trio', subtitle: 'Chanson et Jazz pailleté', date: 'Lun. 27 juillet', time: '21h', price: '15€', slug: 'knobil-trio', image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_400,h_400,f_auto,q_auto/Pierre-Daendliker-Louise.jpg', ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024307' }
                ].map((concert, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-3 rounded-xl items-center"
                    style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.25)' }}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0">
                      <Image src={concert.image} alt={concert.name} fill sizes="112px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#d4af37' }}>{concert.date} • {concert.time}</p>
                      <Link href={`/artistes/${concert.slug}`} className="font-bold text-white hover:underline block truncate">{concert.name}</Link>
                      <p className="text-sm truncate mb-2" style={{ color: '#f7f3e9' }}>{concert.subtitle}</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{concert.price}</span>
                        <Link
                          href={`/artistes/${concert.slug}`}
                          className="flex items-center gap-1 text-sm font-medium shrink-0 hover:underline"
                          style={{ color: '#d4af37' }}
                        >
                          Détails <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: '#b87333' }}>Concerts à 15 € — pas de pass pour Saint-Génis.</p>
            </section>

            {/* Billetterie Office de Tourisme — Saint-Génis */}
            <OfficeTourismeSaintGenis />

          </div>

          {/* COLONNE DROITE — widget Billetweb */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border-2 overflow-hidden shadow-xl" style={{ borderColor: 'rgba(212, 175, 55, 0.4)' }}>
                <div className="p-4 text-center" style={{ backgroundColor: 'rgba(114, 47, 55, 0.7)' }}>
                  <h3 className="font-bold text-white text-lg">🎟️ Réserver mes billets</h3>
                  <p className="text-xs mt-1" style={{ color: '#f7f3e9' }}>Paiement sécurisé • Billets par email</p>
                </div>
                <div className="bg-white p-3">
                  <BilletwebWidget />
                </div>
                <div className="p-3 text-center text-xs border-t" style={{ backgroundColor: 'rgba(26, 26, 26, 0.6)', color: '#f7f3e9', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                  🔒 CB • PayPal • Virement
                </div>
              </div>
              <div className="text-center mt-3">
                <a href="https://www.billetweb.fr/shop.php?event=jazz-en-tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm hover:underline" style={{ color: '#d4af37' }}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Ouvrir dans un nouvel onglet
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Compte à rebours + service client */}
      <div className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <section className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <h3 className="text-center text-xl font-bold mb-6 text-white">⏰ Le festival approche !</h3>
            <CountdownTimer />
          </section>

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
                <p className="text-sm font-bold" style={{ color: '#d4af37' }}>+33 6 01 86 46 72</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .billetweb-container { min-height: 500px; width: 100%; }
        .billetweb-container iframe { border: none !important; width: 100% !important; min-height: 500px; }
        .shop_frame.hidden { display: none; }
      `}</style>
    </div>
  )
}