'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Music, Ticket, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Programmation() {
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
      description: 'Hommage à Miles Davis pour les 100 ans de sa naissance',
      date: 'Mercredi 5 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/erik_truffaz_antonio_lizana_jazz.jpg',
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
      description: 'Hommage à John Coltrane pour les 100 ans de sa naissance',
      date: 'Jeudi 6 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/Dal-Sasso-groupe.jpg',
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
      description: 'Rythme et envie de danser garantis !',
      date: 'Vendredi 7 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/Ladyva.jpg',
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
      description: 'Hommage à Miles Davis pour les 100 ans de sa naissance',
      date: 'Samedi 8 août',
      time: '21h',
      image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/Alain-Brunet.jpg',
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
            <p className="text-base" style={{ color: '#f7f3e9' }}>5, 6, 7 & 8 Août 2026 • Place de la République</p>
          </div>

          {/* Grid des cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {concerts.map((concert, index) => (
              <Link
                key={index}
                href={`/artistes/${concert.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid rgba(212, 175, 55, 0.35)', backgroundColor: '#722f37' }}
              >
                <div className="relative aspect-square">
                  <Image src={concert.image} alt={concert.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: concert.badgeColor, color: concert.badgeColor === '#d4af37' ? '#1a1a1a' : '#f7f3e9' }}>
                      {concert.badge}
                    </span>
                  </div>
                  {isPromoActive(concert) && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: '#22c55e', color: '#fff' }}>PROMO</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-white leading-tight min-h-[2.5rem] line-clamp-2">{concert.name}</h3>
                  <p className="text-xs mb-2" style={{ color: '#d4af37' }}>{concert.subtitle}</p>
                  <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: '#f7f3e9' }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color: '#d4af37' }} />
                    {concert.date} · {concert.time}
                  </p>
                  <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.35)' }}>
                    <div className="flex items-baseline gap-1.5">
                      {isPromoActive(concert) ? (
                        <>
                          <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{concert.promoPrice}</span>
                          <span className="text-xs line-through" style={{ color: '#f7f3e9', opacity: 0.6 }}>{concert.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{concert.price}</span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2" style={{ color: '#d4af37' }}>
                      Détails <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
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
              <p className="text-base" style={{ color: '#f7f3e9' }}>26 & 27 Juillet 2026 • Cloître</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
              {[
                {
                  name: 'Cecil L. Recchia Quintet',
                  subtitle: 'sings Django Reinhardt',
                  date: 'Dimanche 26 juillet',
                  time: '21h',
                  image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/Cecil-L-Recchia.jpg',
                  badge: 'JAZZ VOCAL',
                  slug: 'cecile-recchia',
                  price: '15€'
                },
                {
                  name: 'Knobil Trio',
                  subtitle: 'Chanson et Jazz pailleté',
                  date: 'Lundi 27 juillet',
                  time: '21h',
                  image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_1200,h_900,f_auto,q_auto/Pierre-Daendliker-Louise.jpg',
                  badge: 'JAZZ / CHANSON',
                  slug: 'knobil-trio',
                  price: '15€'
                }
              ].map((concert, index) => (
                <Link
                  key={index}
                  href={`/artistes/${concert.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ border: '1px solid rgba(212, 175, 55, 0.35)', backgroundColor: '#722f37' }}
                >
                  <div className="relative aspect-square">
                    <Image src={concert.image} alt={concert.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}>{concert.badge}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white leading-tight min-h-[2.5rem] line-clamp-2">{concert.name}</h3>
                    <p className="text-xs mb-2" style={{ color: '#d4af37' }}>{concert.subtitle}</p>
                    <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: '#f7f3e9' }}>
                      <Calendar className="w-3.5 h-3.5" style={{ color: '#d4af37' }} />
                      {concert.date} · {concert.time}
                    </p>
                    <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.35)' }}>
                      <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{concert.price}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2" style={{ color: '#d4af37' }}>Détails <ArrowRight className="w-4 h-4" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="text-center text-sm mt-4" style={{ color: '#b87333' }}>
              Concerts à 15&nbsp;€ — pas de pass pour Saint-Génis-des-Fontaines
            </p>
          </section>


          {/* Concert d'ouverture — Harmonie de Céret (gratuit) */}
          <section
            className="rounded-2xl p-6 md:p-8 mb-6"
            style={{ border: '1px solid rgba(212, 175, 55, 0.3)', backgroundColor: 'rgba(114, 47, 55, 0.4)' }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  OUVERTURE • ENTRÉE LIBRE
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Harmonie de Céret
                </h3>
                <p className="text-sm mb-3" style={{ color: '#d4af37' }}>
                  Harmonie • Fanfare • Jazz
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm" style={{ color: '#f7f3e9' }}>
                  <span><strong style={{ color: '#d4af37' }}>Mardi 4 août</strong> • 19h</span>
                  <span>Place de la République, Céret</span>
                </div>
              </div>
              <Link
                href="/artistes/harmonie-ceret"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shrink-0"
                style={{ backgroundColor: 'transparent', color: '#d4af37', border: '2px solid #d4af37' }}
              >
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Concerts gratuits dans les rues */}
          <section
            className="rounded-2xl p-6 md:p-8 text-center"
            style={{ border: '1px solid rgba(212, 175, 55, 0.3)', backgroundColor: 'rgba(114, 47, 55, 0.4)' }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Et aussi : des concerts gratuits dans les rues de Céret
            </h3>
            <p className="text-sm md:text-base mb-5 max-w-2xl mx-auto" style={{ color: '#f7f3e9', opacity: 0.9 }}>
              Du 5 au 8 août, deux podiums en accès libre chaque jour : boulevard Joffre à 17h
              et place Picasso à 18h. André Mallau Quartet, Karla Harris
              Quartet, Lisa Jazz Trio, Florin Gugulica Quartet, Gavin Hackett Quintet, Triton 66 Quintet.
            </p>
            <Link
              href="/concerts-gratuits"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold shadow-xl transition-all hover:scale-105"
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
            >
              Voir les concerts gratuits
              <ArrowRight className="w-5 h-5" />
            </Link>
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