import Link from 'next/link'
import { Calendar, Music, Users, Star, MapPin, Ticket, Play } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <title>Jazz en Tech - Festival de Jazz Innovation</title>
      
      {/* Hero Section - PADDING TOP CORRIGÉ */}
      <section className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-24 relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
        {/* Éléments artistiques de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#d4af37' }}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#b87333' }}></div>
        </div>
        
        {/* Petits carrés et formes géométriques animés - CORRIGÉS RESPONSIVE */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-16 w-6 h-6 md:w-8 md:h-8 border border-yellow-300/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-16 left-16 w-4 h-4 md:w-6 md:h-6 border animate-bounce-slow" style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}></div>
          <div className="absolute top-1/2 right-8 w-3 h-3 md:w-4 md:h-4 transform rotate-45 animate-pulse" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 md:w-3 md:h-3 rotate-45 animate-float" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-4 h-4 md:w-5 md:h-5 border animate-spin-slow" style={{ borderColor: 'rgba(184, 115, 51, 0.4)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
  <div className="order-2 lg:order-1">
  {/* Titre RESPONSIVE - SANS DÉCALAGE */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight">
    Jazz en Tech
  </h1>
  
  {/* Texte RESPONSIVE */}
  <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl" style={{ color: '#f7f3e9' }}>
  Le festival qui fait swinguer les Pyrénées Orientales 
  </p>
  
  {/* Boutons CORRIGÉS - Billetterie et Programmation */}
  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
    <Link
      href="/billetterie"
      className="inline-block px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
      style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
    >
      Billetterie
    </Link>
    <Link
      href="/programmation"
      className="inline-block border-2 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
      style={{ borderColor: '#d4af37', color: '#d4af37' }}
    >
      Programmation
    </Link>
  </div>
</div>
    
    {/* Ici vous devez ajouter la deuxième colonne (affiche) */}
    <div className="order-1 lg:order-2 flex justify-center items-start animate-fade-in-right delay-700">
      <div className="relative group w-full max-w-sm lg:max-w-md">
        <img 
          src="/images/affiche-2025.jpg" 
          alt="Affiche Jazz en Tech 2025 - 10ème édition"
          className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge anniversaire */}
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold shadow-xl" style={{ background: 'linear-gradient(45deg, #d4af37, #b87333)', color: '#1a1a1a' }}>
          <div className="text-center">
            <div className="text-xs sm:text-xs md:text-sm">10ème</div>
            <div className="text-xs sm:text-xs md:text-sm">édition</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </section>

      {/* SECTION CONCERTS PAYANTS AVEC BILLETTERIE */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, rgba(212, 175, 55, 0.1) 50%, #f7f3e9 100%)' }}>
        {/* Éléments décoratifs de fond - CORRIGÉS RESPONSIVE */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#722f37' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
              🎫 CONCERTS PAYANTS AVEC BILLETTERIE
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-4" style={{ color: '#1a1a1a' }}>
              Découvrez les artistes exceptionnels de cette 10ème édition
            </p>
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)', border: '2px solid #722f37' }}>
              <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-2" style={{ color: '#722f37' }} />
              <span className="text-xs md:text-sm font-medium" style={{ color: '#722f37' }}>Réservation obligatoire</span>
            </div>
          </div>

          {/* Grille d'images des artistes PAYANTS - 6 CARTES ORDRE CHRONOLOGIQUE */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
            
            {/* Florin Gugulica */}
            <Link href="/artistes/florin-gugulica" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/florin-gugulica.jpeg" 
                  alt="Florin Gugulica"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Informations overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                  <h3 className="font-bold text-xs md:text-sm mb-1">FLORIN GUGULICA</h3>
                  <p className="text-xs opacity-90 mb-1">Sextet</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>27 JUIL</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Manu Le Prince */}
            <Link href="/artistes/manu-le-prince" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/manu-le-prince.jpeg" 
                  alt="Manu Le Prince"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Informations overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                  <h3 className="font-bold text-xs md:text-sm mb-1">MANU LE PRINCE</h3>
                  <p className="text-xs opacity-90 mb-1">Quartet « Bossa Jazz »</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>28 JUIL</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Stefano Di Battista */}
            <Link href="/artistes/stefano-di-battista" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/stefano-di-battista.jpg" 
                  alt="Stefano Di Battista"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                  <h3 className="font-bold text-xs md:text-sm mb-1">STEFANO DI BATTISTA</h3>
                  <p className="text-xs opacity-90 mb-1">« La Dolce Vita »</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>7 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Jacky Terrasson */}
            <Link href="/artistes/jacky-terrasson" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/jacky-terrasson.jpeg" 
                  alt="Jacky Terrasson"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                  <h3 className="font-bold text-xs md:text-sm mb-1">JACKY TERRASSON</h3>
                  <p className="text-xs opacity-90 mb-1">Trio « Moving On »</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>8 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Camille Bertault */}
            <Link href="/artistes/camille-bertault" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/camille-bertault.jpg" 
                  alt="Camille Bertault"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                  <h3 className="font-bold text-xs md:text-sm mb-1">CAMILLE BERTAULT</h3>
                  <p className="text-xs opacity-90 mb-1">Chanteuse</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>8 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Charlotte Planchou */}
            <Link href="/artistes/charlotte-planchou" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/charlotte-planchou.jpg" 
                  alt="Charlotte Planchou"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                  <h3 className="font-bold text-xs md:text-sm mb-1">CHARLOTTE PLANCHOU</h3>
                  <p className="text-xs opacity-90 mb-1">Quartet</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>9 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>

          {/* Bouton CTA */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/billetterie"
              className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
              style={{ 
                backgroundColor: '#722f37', 
                color: '#f7f3e9'
              }}
            >
              Réserver mes places
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION CONCERTS GRATUITS - MAINTENANT 4 ARTISTES ORDRE CHRONOLOGIQUE */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, rgba(212, 175, 55, 0.1) 50%, #f7f3e9 100%)' }}>
        {/* Mêmes éléments décoratifs que les concerts payants - CORRIGÉS RESPONSIVE */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#722f37' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
              🎵 CONCERTS GRATUITS 🎵
            </h2>
            <p className="text-base md:text-lg md:text-xl max-w-3xl mx-auto mb-4" style={{ color: '#1a1a1a' }}>
              Du 6 au 9 août le jazz vivra dans les rues de Céret
            </p>
            <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', border: '2px solid #d4af37' }}>
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" style={{ color: '#d4af37' }} />
              <span className="text-xs md:text-sm font-medium" style={{ color: '#d4af37' }}>Centre-ville de Céret</span>
            </div>
          </div>

          {/* Grille d'artistes concerts gratuits - ORDRE CHRONOLOGIQUE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            
            {/* Triton 66 Quintet */}
            <Link href="/artistes/triton-66" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/triton-66.jpg" 
                  alt="Triton 66"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                  <h3 className="font-bold text-sm md:text-lg mb-1">TRITON 66</h3>
                  <p className="text-xs md:text-sm opacity-90 mb-2">Quintet</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>6 & 7 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Florin Gugulica Trio */}
            <Link href="/artistes/florin-gugulica" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/florin-gugulica-trio.jpg" 
                  alt="Florin Gugulica Trio"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                  <h3 className="font-bold text-sm md:text-lg mb-1">FLORIN GUGULICA</h3>
                  <p className="text-xs md:text-sm opacity-90 mb-2">Trio</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>6, 7 & 9 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* David Vilayleck Trio */}
            <Link href="/artistes/david-vilayleck" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/david-vilayleck.jpg" 
                  alt="David Vilayleck"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                  <h3 className="font-bold text-sm md:text-lg mb-1">DAVID VILAYLECK</h3>
                  <p className="text-xs md:text-sm opacity-90 mb-2">Trio Piano</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>VEN. 8 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Cavale Trio */}
            <Link href="/artistes/cavale-trio" className="group relative block overflow-hidden rounded-lg shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src="/images/cavale-trio.jpg" 
                  alt="Cavale Trio"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                  <h3 className="font-bold text-sm md:text-lg mb-1">CAVALE TRIO</h3>
                  <p className="text-xs md:text-sm opacity-90 mb-2">Jazz contemporain</p>
                  <div className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} />
                    <span>8 & 9 AOÛT</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>

          {/* Bouton CTA vers programmation */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/programmation"
              className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
              style={{ 
                backgroundColor: '#d4af37', 
                color: '#1a1a1a'
              }}
            >
              Voir le planning détaillé
            </Link>
          </div>
        </div>
      </section>

      {/* Section Dates importantes - CORRIGÉE AVEC NOMS ARTISTES */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #722f37 50%, #1a1a1a 100%)' }}>
        {/* Éléments décoratifs flottants - CORRIGÉS RESPONSIVE */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#d4af37' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: '#d4af37' }}>
              10ème édition - Été 2025
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Module 1 - Saint-Genis */}
            <div className="rounded-2xl p-6 md:p-8 shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl" style={{ 
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(184, 115, 51, 0.05))', 
              border: '2px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="relative mb-4 md:mb-6">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}></div>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: '#1a1a1a' }} />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#d4af37' }}>27-28 Juillet</h3>
              <p className="mb-3 md:mb-4 font-semibold text-sm sm:text-base" style={{ color: '#f7f3e9' }}>Saint-Genis-des-Fontaines</p>
              <div className="text-xs sm:text-sm space-y-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
                  <strong>• Florin Gugulica Sextet</strong>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)', color: '#b87333' }}>
                  <strong>• Manu le Prince Quartet</strong>
                </div>
              </div>
            </div>
            
            {/* Module 2 - Céret CORRIGÉ */}
            <div className="rounded-2xl p-6 md:p-8 shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl" style={{ 
              background: 'linear-gradient(135deg, rgba(114, 47, 55, 0.1), rgba(212, 175, 55, 0.05))', 
              border: '2px solid rgba(114, 47, 55, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="relative mb-4 md:mb-6">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.3)' }}></div>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#722f37' }}>
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#d4af37' }}>6-7-8-9 Août</h3>
              <p className="mb-3 md:mb-4 font-semibold text-sm sm:text-base" style={{ color: '#f7f3e9' }}>Céret, place de la République</p>
              <div className="text-xs sm:text-sm space-y-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
                  <strong>• Stefano Di Battista, Jacky Terrasson et Camille Bertault, Charlotte Planchou</strong>
                </div>
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(114, 47, 55, 0.15)', color: '#f7f3e9' }}>
                  <strong>+ concerts gratuits dans les rues de Céret</strong>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bouton CTA supplémentaire */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/programmation"
              className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
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

      {/* Section À propos + Vidéos CONCERTS PAYANTS AVEC BILLETTERIE */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, white 50%, #f7f3e9 100%)' }}>
        {/* Éléments décoratifs - CORRIGÉS RESPONSIVE */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#722f37' }}></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* PARTIE 1 : Festival unique - SECTION RESPONSIVE CORRIGÉE */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: '#1a1a1a' }}>
                Un festival <span style={{ color: '#722f37' }}>unique</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8" style={{ color: '#722f37' }}>
                Jazz en Tech est le premier festival qui unit la richesse du jazz traditionnel 
                aux innovations technologiques d'aujourd'hui. Une expérience musicale 
                immersive qui repousse les frontières de l'art.
              </p>
              <Link 
                href="/mot-du-president"
                className="inline-flex items-center font-semibold group transition-colors hover:opacity-80 text-sm sm:text-base"
                style={{ color: '#722f37' }}
              >
                Découvrir notre vision 
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
            
            {/* Design responsive CORRIGÉ */}
            <div className="relative">
              {/* Version Desktop (cachée sur mobile) */}
              <div className="hidden md:block relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* Top */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#1a1a1a' }}>
                    <Music className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Artistes</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Exceptionnels</div>
                </div>
                
                {/* Right */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#722f37' }}>
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Public</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Passionné</div>
                </div>
                
                {/* Bottom */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#b87333' }}>
                    <Calendar className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Événements</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Inoubliables</div>
                </div>
                
                {/* Left */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#d4af37' }}>
                    <Star className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#1a1a1a' }} />
                  </div>
                  <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Expérience</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Unique</div>
                </div>
              </div>

              {/* Version Mobile (grille simple) */}
              <div className="block md:hidden grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#1a1a1a' }}>
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Artistes</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Exceptionnels</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#722f37' }}>
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Public</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Passionné</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#d4af37' }}>
                    <Star className="w-8 h-8" style={{ color: '#1a1a1a' }} />
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Expérience</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Unique</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#b87333' }}>
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Événements</div>
                  <div className="text-xs" style={{ color: '#722f37' }}>Inoubliables</div>
                </div>
              </div>
            </div>
          </div>

          {/* PARTIE 2 : Vidéos CONCERTS PAYANTS AVEC BILLETTERIE - ORDRE CHRONOLOGIQUE */}
          <div className="mb-16 md:mb-24">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
                🎬 Concerts payants avec billetterie
              </h2>
              <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#1a1a1a' }}>
                Découvrez en vidéo les têtes d'affiche de cette 10ème édition
              </p>
            </div>
            
            {/* Grille de vidéos payantes - ORDRE CHRONOLOGIQUE */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              
              {/* Vidéo 1 - Florin Gugulica Sextet */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/JchABVZGrGE"
                    title="Florin Gugulica Sextet - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎷 Florin Gugulica Sextet
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">« It's a long Way »</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">27 JUILLET 2025</span>
                  </div>
                </div>
              </div>

              {/* Vidéo 2 - Manu Le Prince */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/SKgvTVcQEcU"
                    title="Manu Le Prince - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎤 Manu Le Prince
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Quartet « Bossa Jazz for Ever »</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">28 JUILLET 2025</span>
                  </div>
                </div>
              </div>

              {/* Vidéo 3 - Stefano Di Battista */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/3Sif0lacQt8?si=FJpgv_E1Q5C6NjHD"
                    title="Stefano Di Battista - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎷 Stefano Di Battista
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">« La Dolce Vita »</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">7 AOÛT 2025</span>
                  </div>
                </div>
              </div>

              {/* Vidéo 4 - Jacky Terrasson */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/HX0ASXAHf2Y"
                    title="Jacky Terrasson - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎹 Jacky Terrasson
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Trio « Moving On » + Camille Bertault</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">8 AOÛT 2025</span>
                  </div>
                </div>
              </div>

              {/* Vidéo 5 - Camille Bertault */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/MAo6eSowSko"
                    title="Camille Bertault - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎤 Camille Bertault
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Invitée de Jacky Terrasson</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">8 AOÛT 2025</span>
                  </div>
                </div>
              </div>

              {/* Vidéo 6 - Charlotte Planchou */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/5k4eWo9HHZ4"
                    title="Charlotte Planchou - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎤 Charlotte Planchou
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Quartet</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">9 AOÛT 2025</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* PARTIE 3 : Vidéos CONCERTS GRATUITS - ORDRE CHRONOLOGIQUE */}
          <div>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
                🎬 Concerts gratuits en vidéo
              </h2>
              <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#1a1a1a' }}>
                Découvrez les artistes qui animeront les rues de Céret
              </p>
            </div>
            
            {/* Grille de vidéos concerts gratuits - ORDRE CHRONOLOGIQUE */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
              
              {/* Vidéo 1 - Triton 66 Quintet */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/S8n12s-2GjE"
                    title="Triton 66 Quintet - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎷 Triton 66 Quintet
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Jazz</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">6 & 7 AOÛT</span>
                  </div>
                </div>
              </div>

{/* Vidéo 2 - Florin Gugulica Trio - Version lien direct sécurisée */}
<div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
  <div className="aspect-video rounded-lg overflow-hidden mb-4 relative bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
    <a 
      href="https://www.facebook.com/phl123/videos/676111201850458" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white text-center hover:scale-105 transition-transform p-4"
    >
      <div className="text-4xl mb-2">▶️</div>
      <div className="text-sm font-semibold">Voir la vidéo sur Facebook</div>
      <div className="text-xs opacity-75 mt-1">Florin Gugulica Trio</div>
    </a>
  </div>
  <div className="text-center">
    <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
      🎻 Florin Gugulica Trio
    </h3>
    <p className="text-xs md:text-sm text-gray-600">Jazz manouche</p>
    <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
      <Calendar className="w-3 h-3 mr-1" />
      <span className="font-semibold">6, 7 & 9 AOÛT</span>
    </div>
  </div>
</div>

              {/* Vidéo 3 - David Vilayleck Trio */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/CdDbtkyXd00"
                    title="David Vilayleck Trio - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🎹 David Vilayleck Trio
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Piano jazz</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">8 AOÛT - 11H</span>
                  </div>
                </div>
              </div>

              {/* Vidéo 4 - Cavale Trio */}
              <div className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/BZbzXJ0eOcw"
                    title="Cavale Trio - Jazz en Tech"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                    🥁 Cavale Trio
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Jazz contemporain</p>
                  <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="font-semibold">8 & 9 AOÛT</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bouton CTA vers la programmation */}
            <div className="text-center mt-8 md:mt-12">
              <Link 
                href="/programmation"
                className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
                style={{ 
                  backgroundColor: '#722f37', 
                  color: '#f7f3e9'
                }}
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Découvrir toute la programmation
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* CTA final - RESPONSIVE */}
      <section className="py-12 md:py-16 text-white relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #d4af37 0%, #b87333 50%, #722f37 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 md:w-40 md:h-40 border rounded-full animate-pulse" style={{ borderColor: '#f7f3e9' }}></div>
          <div className="absolute top-32 right-20 w-24 h-24 md:w-32 md:h-32 border rounded-full animate-pulse delay-1000" style={{ borderColor: '#1a1a1a' }}></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 md:w-48 md:h-48 border rounded-full animate-pulse delay-500" style={{ borderColor: '#f7f3e9' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Prêt pour cette 10ème édition ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
            Réservez vos billets dès maintenant pour vivre Jazz en Tech 2025
          </p>
          <Link 
            href="/billetterie" 
            className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base"
            style={{ backgroundColor: '#1a1a1a', color: '#d4af37' }}
          >
            Réserver mes billets
          </Link>
        </div>
      </section>
    </div>
  )
}