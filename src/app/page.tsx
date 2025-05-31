import Link from 'next/link'
import { Calendar, Music, Users, Star, MapPin, Ticket } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - SANS ANIMATIONS TEXTE */}
      <section className="hero-gradient text-white pt-16 pb-24 relative overflow-hidden min-h-screen flex items-center">
        {/* Éléments artistiques de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#d4af37' }}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#b87333' }}></div>
        </div>
        
        {/* Petits carrés et formes géométriques animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-16 w-8 h-8 border border-yellow-300/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-16 left-16 w-6 h-6 border animate-bounce-slow" style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}></div>
          <div className="absolute top-1/2 right-8 w-4 h-4 transform rotate-45 animate-pulse" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rotate-45 animate-float" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 border animate-spin-slow" style={{ borderColor: 'rgba(184, 115, 51, 0.4)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="pt-8">
              {/* Titre SANS animation d'apparition */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Jazz en Tech
              </h1>
              
              {/* Texte SANS animation */}
              <p className="text-xl mb-8 max-w-2xl" style={{ color: '#f7f3e9' }}>
                Le festival de jazz qui marie tradition et innovation technologique
              </p>
              
              {/* Boutons SANS animation */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/programmation"
                  className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                >
                  Billetterie & Programmation
                </Link>
                <Link
                  href="/artistes"
                  className="inline-block border-2 px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  style={{ borderColor: '#d4af37', color: '#d4af37' }}
                >
                  Découvrir les Artistes
                </Link>
              </div>
            </div>
            
            {/* AFFICHE OFFICIELLE - garde l'animation d'entrée depuis la droite */}
            <div className="flex justify-center items-start pt-24 animate-fade-in-right delay-700">
              <div className="relative group">
                <img 
                  src="/images/affiche-2025.jpg" 
                  alt="Affiche Jazz en Tech 2025 - 10ème édition"
                  className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge anniversaire avec couleurs jazz */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center font-bold text-sm shadow-xl" style={{ background: 'linear-gradient(45deg, #d4af37, #b87333)', color: '#1a1a1a' }}>
                  <div className="text-center">
                    <div className="text-xs">10ème</div>
                    <div className="text-xs">édition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos - nouvelles couleurs */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, white 50%, #f7f3e9 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#1a1a1a' }}>
                Un festival <span style={{ color: '#722f37' }}>unique</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#722f37' }}>
                Jazz en Tech est le premier festival qui unit la richesse du jazz traditionnel 
                aux innovations technologiques d'aujourd'hui. Une expérience musicale 
                immersive qui repousse les frontières de l'art.
              </p>
              <Link 
                href="/mot-du-president"
                className="inline-flex items-center font-semibold group transition-colors hover:opacity-80"
                style={{ color: '#722f37' }}
              >
                Découvrir notre vision 
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
            
            {/* Design en losange avec nouvelles couleurs */}
            <div className="relative w-80 h-80 mx-auto">
              
              {/* Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#1a1a1a' }}>
                  <Music className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Artistes</div>
                <div className="text-xs" style={{ color: '#722f37' }}>Exceptionnels</div>
              </div>
              
              {/* Right */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#722f37' }}>
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Public</div>
                <div className="text-xs" style={{ color: '#722f37' }}>Passionné</div>
              </div>
              
              {/* Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#b87333' }}>
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Événements</div>
                <div className="text-xs" style={{ color: '#722f37' }}>Inoubliables</div>
              </div>
              
              {/* Left */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#d4af37' }}>
                  <Star className="w-10 h-10" style={{ color: '#1a1a1a' }} />
                </div>
                <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Expérience</div>
                <div className="text-xs" style={{ color: '#722f37' }}>Unique</div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Section Dates importantes - BACKGROUND ÉLÉGANT */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #722f37 50%, #1a1a1a 100%)' }}>
        {/* Éléments décoratifs flottants */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#d4af37' }}></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#d4af37' }}>
              10ème édition - Été 2025
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Module 1 - Saint-Genis */}
            <div className="rounded-2xl p-8 shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl" style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(184, 115, 51, 0.05))', 
              border: '2px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}></div>
                <div className="relative w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                  <Calendar className="w-10 h-10" style={{ color: '#1a1a1a' }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#d4af37' }}>27-28 Juillet</h3>
              <p className="mb-4 font-semibold" style={{ color: '#f7f3e9' }}>Saint-Genis-des-Fontaines</p>
              <div className="text-sm space-y-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
                  <strong>• Manu le Prince</strong>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)', color: '#b87333' }}>
                  <strong>• Florin Gugulica</strong>
                </div>
              </div>
            </div>
            
            {/* Module 2 - Céret */}
            <div className="rounded-2xl p-8 shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl" style={{ 
              background: 'linear-gradient(135deg, rgba(114, 47, 55, 0.1), rgba(212, 175, 55, 0.05))', 
              border: '2px solid rgba(114, 47, 55, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.3)' }}></div>
                <div className="relative w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#722f37' }}>
                  <MapPin className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#d4af37' }}>7-8-9 Août</h3>
              <p className="mb-4 font-semibold" style={{ color: '#f7f3e9' }}>Céret, place de la République</p>
              <div className="text-sm space-y-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
                  <strong>• Stefano Di Battista</strong>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)', color: '#b87333' }}>
                  <strong>• Jacky Terrasson & Camille Bertault</strong>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)', color: '#722f37' }}>
                  <strong>• Charlotte Planchou</strong>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bouton CTA supplémentaire */}
          <div className="text-center mt-12">
            <Link 
              href="/programmation"
              className="inline-block px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
              style={{ 
                backgroundColor: '#d4af37', 
                color: '#1a1a1a',
                border: '2px solid transparent'
              }}
            >
              Voir toute la programmation
            </Link>
          </div>
        </div>
      </section>

      {/* Section Actualités */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: '#1a1a1a' }}></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: '#722f37' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#1a1a1a' }}>
            Actualités
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #722f37, #1a1a1a)' }}>
                <Music className="w-16 h-16 text-white group-hover:scale-125 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-colors" style={{ color: '#1a1a1a' }}>
                  Programmation 2025 dévoilée
                </h3>
                <p className="mb-4" style={{ color: '#722f37' }}>
                  Découvrez les artistes exceptionnels qui monteront sur scène pour cette 10ème édition...
                </p>
                <Link 
                  href="/programmation"
                  className="inline-flex items-center font-semibold group/link transition-colors hover:opacity-80"
                  style={{ color: '#722f37' }}
                >
                  Lire la suite 
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </article>

            <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a1a, #b87333)' }}>
                <Users className="w-16 h-16 group-hover:scale-125 transition-transform duration-300" style={{ color: '#d4af37' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-colors" style={{ color: '#1a1a1a' }}>
                  Appel aux bénévoles
                </h3>
                <p className="mb-4" style={{ color: '#722f37' }}>
                  Rejoignez notre équipe et vivez le festival de l'intérieur...
                </p>
                <Link 
                  href="/benevoles"
                  className="inline-flex items-center font-semibold group/link transition-colors hover:opacity-80"
                  style={{ color: '#722f37' }}
                >
                  Lire la suite 
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </article>

            <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #b87333, #722f37)' }}>
                <Ticket className="w-16 h-16 group-hover:scale-125 transition-transform duration-300" style={{ color: '#d4af37' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-colors" style={{ color: '#1a1a1a' }}>
                  Billetterie ouverte
                </h3>
                <p className="mb-4" style={{ color: '#722f37' }}>
                  Les billets sont maintenant disponibles à tarifs très raisonnables...
                </p>
                <Link 
                  href="/programmation"
                  className="inline-flex items-center font-semibold group/link transition-colors hover:opacity-80"
                  style={{ color: '#722f37' }}
                >
                  Lire la suite 
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA final - CORRIGÉ */}
      <section className="py-16 text-white relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #d4af37 0%, #b87333 50%, #722f37 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 border rounded-full animate-pulse" style={{ borderColor: '#f7f3e9' }}></div>
          <div className="absolute top-32 right-20 w-32 h-32 border rounded-full animate-pulse delay-1000" style={{ borderColor: '#1a1a1a' }}></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 border rounded-full animate-pulse delay-500" style={{ borderColor: '#f7f3e9' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Prêt pour cette 10ème édition ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
            Réservez vos billets dès maintenant pour vivre Jazz en Tech 2025
          </p>
          <Link 
            href="/programmation" 
            className="inline-block px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#1a1a1a', color: '#d4af37' }}
          >
            Réserver mes billets
          </Link>
        </div>
      </section>
    </div>
  )
}