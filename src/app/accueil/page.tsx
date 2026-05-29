// PATH: src/app/accueil/page.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Music, Users, Star } from 'lucide-react'
import CentenaireFan from '@/components/CentenaireFan'
import SonnyRollinsTribute from '@/components/SonnyRollinsTribute'

export default function Home() {
  const now = new Date()
  const promoActive = now.getTime() <= new Date('2026-06-30T23:59:59').getTime()

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-24 relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
          {/* Éléments artistiques de fond */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#d4af37' }}></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#b87333' }}></div>
          </div>
          
          {/* Formes géométriques animées */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-16 right-16 w-6 h-6 md:w-8 md:h-8 border border-yellow-300/30 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-16 left-16 w-4 h-4 md:w-6 md:h-6 border animate-bounce-slow" style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}></div>
            <div className="absolute top-1/2 right-8 w-3 h-3 md:w-4 md:h-4 transform rotate-45 animate-pulse" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 md:w-3 md:h-3 rotate-45 animate-float" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-4 h-4 md:w-5 md:h-5 border animate-spin-slow" style={{ borderColor: 'rgba(184, 115, 51, 0.4)' }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
                  <span className="text-shimmer">Jazz en Tech 2026</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl mb-3 max-w-2xl" style={{ color: '#f7f3e9' }}>
                  Le festival qui fait swinguer les Pyrénées Orientales 
                </p>
                
                <p className="text-sm sm:text-base mb-6 md:mb-8 font-medium" style={{ color: '#d4af37' }}>
                  11ème édition • Hommage à Miles Davis &amp; John Coltrane
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link
                    href="/billetterie"
                    className="inline-block px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
                    style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                  >
                    Billetterie
                  </Link>
                  <Link
                    href="#evenement"
                    className="inline-block border-2 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
                    style={{ borderColor: '#f7f3e9', color: '#f7f3e9' }}
                    aria-label="Découvrir l'édition centenaire"
                  >
                    L'édition centenaire
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center items-start opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
                <div className="relative group w-full max-w-sm lg:max-w-md">
                  <Image
                    src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/jazz_en_tech_ceret.jpg"
                    alt="Affiche Jazz en Tech 2026 - 11ème édition du festival de jazz"
                    className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority={true}
                    width={400}
                    height={600}
                  />
                  
                  {/* Badge édition */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold shadow-xl" style={{ background: 'linear-gradient(45deg, #d4af37, #b87333)', color: '#1a1a1a' }}>
                    <div className="text-center">
                      <div className="text-xs sm:text-xs md:text-sm">11ème</div>
                      <div className="text-xs sm:text-xs md:text-sm">édition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Section Centenaire 2026 */}
          <section id="evenement" className="py-16 md:py-24" aria-labelledby="evenement-heading">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#d4af37' }}>Édition 2026 · Double centenaire</p>
                <h2 id="evenement-heading" className="text-3xl md:text-5xl font-bold text-white mb-4">Ils auraient eu 100 ans cette année !</h2>
                <p className="text-lg" style={{ color: '#f7f3e9' }}>
                  JAZZ en TECH 2026 célèbre le centenaire de la naissance de{' '}
                  <span className="font-semibold" style={{ color: '#d4af37' }}>Miles Davis</span> et{' '}
                  <span className="font-semibold" style={{ color: '#d4af37' }}>John Coltrane</span>.
                </p>
              </div>

              <CentenaireFan />
            </div>
          </section>

          {/* Hommage Sonny Rollins */}
          <SonnyRollinsTribute />

          {/* Section programmation */}
          <section className="py-12 md:py-16" aria-labelledby="dates-heading">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 id="dates-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
                  La programmation 2026
                </h2>
                <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
                  Une 11ème édition en hommage au centenaire de la naissance de Miles Davis et de John Coltrane.
                </p>
              </div>

              {/* Céret */}
              <div className="max-w-4xl mx-auto mb-10">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                  <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-white">Céret</h3>
                  <span className="text-sm" style={{ color: '#b87333' }}>5 au 8 août • Place de la République</span>
                </div>
                <div className="space-y-3">
                  {([
                    { date: 'Mer. 5 août', name: 'Erik Truffaz & Antonio Lizana', sub: '« New Sketches of Spain »', slug: 'erik-truffaz', price: '25 €' },
                    { date: 'Jeu. 6 août', name: 'Dal Sasso Big Band', sub: 'Africa Brass Revisited', slug: 'dal-sasso', price: '22 €', promo: '18 €' },
                    { date: 'Ven. 7 août', name: 'Ladyva & Barcelona Big Blues Band', sub: 'Une association explosive !', slug: 'ladyva', price: '22 €' },
                    { date: 'Sam. 8 août', name: 'Akpé Motion featuring Karla Harris', sub: '« Électric Miles »', slug: 'akpe-motion', price: '22 €', promo: '18 €' },
                  ] as Array<{ date: string; name: string; sub: string; slug: string; price: string; promo?: string }>).map((c, i) => (
                    <Link
                      key={i}
                      href={`/artistes/${c.slug}`}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl transition-colors hover:bg-white/5"
                      style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#d4af37' }}>{c.date} • 21h</p>
                        <p className="font-bold text-white truncate">{c.name}</p>
                        <p className="text-sm truncate" style={{ color: '#f7f3e9' }}>{c.sub}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {c.promo && promoActive ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{c.promo}</span>
                            <span className="text-sm line-through" style={{ color: '#f7f3e9', opacity: 0.6 }}>{c.price}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold" style={{ color: '#d4af37' }}>{c.price}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', color: '#f7f3e9' }}>
                  Pass Céret : 2 concerts 40 € • 3 concerts 55 € • 4 concerts 65 €
                </div>
              </div>

              {/* Saint-Génis */}
              <div className="max-w-4xl mx-auto mb-10">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                  <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} aria-hidden="true" />
                  <h3 className="text-xl font-bold text-white">Saint-Génis-des-Fontaines</h3>
                  <span className="text-sm" style={{ color: '#b87333' }}>26 & 27 juillet • Cloître</span>
                </div>
                <div className="space-y-3">
                  {[
                    { date: 'Dim. 26 juillet', name: 'Cecil L. Recchia Quintet', sub: 'sings Django Reinhardt', slug: 'cecile-recchia', price: '15 €' },
                    { date: 'Lun. 27 juillet', name: 'Knobil Trio', sub: 'Chanson et Jazz pailleté', slug: 'knobil-trio', price: '15 €' },
                  ].map((c, i) => (
                    <Link
                      key={i}
                      href={`/artistes/${c.slug}`}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl transition-colors hover:bg-white/5"
                      style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#d4af37' }}>{c.date} • 21h</p>
                        <p className="font-bold text-white truncate">{c.name}</p>
                        <p className="text-sm truncate" style={{ color: '#f7f3e9' }}>{c.sub}</p>
                      </div>
                      <span className="text-lg font-bold shrink-0" style={{ color: '#d4af37' }}>{c.price}</span>
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-sm" style={{ color: '#b87333' }}>Concerts à 15 € — billetterie à venir.</p>
              </div>

              <div className="text-center">
                <Link
                  href="/billetterie"
                  className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  Réserver mes places
                </Link>
              </div>
            </div>
          </section>

          {/* Section À propos */}
          <section className="py-12 md:py-16 relative overflow-hidden" aria-labelledby="about-heading">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#d4af37' }}></div>
              <div className="absolute bottom-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
              <div className="absolute top-1/2 right-10 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div>
                  <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
                    Un festival <span style={{ color: '#d4af37' }}>unique</span>
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8" style={{ color: '#f7f3e9' }}>
                    Une expérience musicale immersive qui repousse les frontières de l&#39;art.
                  </p>
                  <Link 
                    href="/mot-du-president"
                    className="inline-flex items-center font-semibold group transition-colors hover:opacity-80 text-sm sm:text-base"
                    style={{ color: '#d4af37' }}
                    aria-label="Découvrir la vision du festival Jazz en Tech"
                  >
                    Découvrir notre vision 
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform" aria-hidden="true">→</span>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: 'rgba(26, 26, 26, 0.6)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      <Music className="w-8 h-8" style={{ color: '#d4af37' }} aria-hidden="true" />
                    </div>
                    <div className="text-sm font-bold text-white">Artistes</div>
                    <div className="text-xs" style={{ color: '#d4af37' }}>Exceptionnels</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: 'rgba(114, 47, 55, 0.6)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      <Users className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-bold text-white">Public</div>
                    <div className="text-xs" style={{ color: '#d4af37' }}>Passionné</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#d4af37' }}>
                      <Star className="w-8 h-8" style={{ color: '#1a1a1a' }} aria-hidden="true" />
                    </div>
                    <div className="text-sm font-bold text-white">Expérience</div>
                    <div className="text-xs" style={{ color: '#d4af37' }}>Unique</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#b87333' }}>
                      <Calendar className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-bold text-white">Événements</div>
                    <div className="text-xs" style={{ color: '#d4af37' }}>Inoubliables</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="py-12 md:py-16 text-white relative overflow-hidden" aria-labelledby="cta-heading">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute top-10 left-10 w-32 h-32 md:w-40 md:h-40 border rounded-full animate-pulse" style={{ borderColor: '#f7f3e9' }}></div>
              <div className="absolute top-32 right-20 w-24 h-24 md:w-32 md:h-32 border rounded-full animate-pulse delay-1000" style={{ borderColor: '#1a1a1a' }}></div>
              <div className="absolute bottom-20 left-1/3 w-36 h-36 md:w-48 md:h-48 border rounded-full animate-pulse delay-500" style={{ borderColor: '#f7f3e9' }}></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Prêt pour cette 11ème édition ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
                Réservez vos places dès maintenant pour cette 11ème édition exceptionnelle !
              </p>
              <Link 
                href="/billetterie"
                className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base"
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              >
                Réserver mes billets
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}