import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Calendar, Music, Users, Star, MapPin, Ticket, Play } from 'lucide-react'

// Lazy loading des sections lourdes
const VideoSection = dynamic(() => import('@/components/VideoSection'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-gray-300 rounded-xl h-64"></div>
        ))}
      </div>
    </div>
  )
})

const FreeVideoSection = dynamic(() => import('@/components/FreeVideoSection'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-gray-300 rounded-xl h-64"></div>
        ))}
      </div>
    </div>
  )
})

// Métadonnées SEO pour la page d'accueil
export const metadata: Metadata = {
  title: 'Jazz en Tech 2025 - Festival de Jazz à Céret et Saint-Génis-des-Fontaines | 10ème édition',
  description: 'Découvrez Jazz en Tech 2025, le festival de jazz incontournable des Pyrénées-Orientales. Du 27 juillet au 9 août 2025 à Céret et Saint-Génis-des-Fontaines. Programmation exceptionnelle avec Manu Le Prince, Florin Gugulica, Stefano Di Battista, Jacky Terrasson, Camille Bertault et Charlotte Planchou.',
  keywords: [
    'Jazz en Tech 2025',
    'festival jazz',
    'Céret',
    'Saint-Génis-des-Fontaines',
    'Pyrénées-Orientales',
    'concert',
    'musique',
    'jazz manouche',
    'bossa nova',
    'été 2025',
    'Manu Le Prince',
    'Florin Gugulica',
    'Stefano Di Battista',
    'Jacky Terrasson',
    'Camille Bertault',
    'Charlotte Planchou',
    '10ème édition'
  ].join(', '),
  
  openGraph: {
    title: 'Jazz en Tech 2025 - Festival de Jazz | 10ème édition',
    description: 'Le festival de jazz incontournable des Pyrénées-Orientales. Du 27 juillet au 9 août 2025. Programmation exceptionnelle pour cette 10ème édition.',
    images: [
      {
        url: 'https://jazzentech.comhttps://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg',
        width: 1200,
        height: 630,
        alt: 'Affiche Jazz en Tech 2025 - 10ème édition',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Jazz en Tech 2025',
    url: 'https://jazzentech.com'
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Jazz en Tech 2025 - Festival de Jazz | 10ème édition',
    description: 'Le festival de jazz incontournable des Pyrénées-Orientales. Du 27 juillet au 9 août 2025.',
    images: ['https://jazzentech.comhttps://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg'],
    creator: '@jazzentech'
  },
  
  alternates: {
    canonical: 'https://jazzentech.com'
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    'google-site-verification': 'ubaL4o8UgQ30SY4PvSeSahpzMDVE3cHRhCaucb57IEk'
  }
}

// Données structurées JSON-LD pour l'événement
const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": "Jazz en Tech 2025",
    "description": "Festival de jazz à Céret et Saint-Génis-des-Fontaines, 10ème édition du 27 juillet au 9 août 2025",
    "image": "https://jazzentech.comhttps://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg",
    "startDate": "2025-07-27",
    "endDate": "2025-08-09",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": [
      {
        "@type": "Place",
        "name": "Cloître Saint-Génis-des-Fontaines",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Saint-Génis-des-Fontaines",
          "postalCode": "66740",
          "addressCountry": "FR"
        }
      },
      {
        "@type": "Place",
        "name": "Place de la République",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Céret",
          "postalCode": "66400",
          "addressCountry": "FR"
        }
      }
    ],
    "performer": [
      {
        "@type": "MusicGroup",
        "name": "Manu Le Prince",
        "genre": "Bossa Nova, Latin Jazz"
      },
      {
        "@type": "MusicGroup",
        "name": "Florin Gugulica",
        "genre": "Jazz Manouche, Musique Balkanique"
      },
      {
        "@type": "MusicGroup",
        "name": "Stefano Di Battista",
        "genre": "Jazz Italien, Saxophone"
      },
      {
        "@type": "MusicGroup",
        "name": "Jacky Terrasson",
        "genre": "Piano Jazz"
      },
      {
        "@type": "MusicGroup",
        "name": "Camille Bertault",
        "genre": "Jazz Vocal Contemporain"
      },
      {
        "@type": "MusicGroup",
        "name": "Charlotte Planchou",
        "genre": "Jazz Vocal Contemporain"
      }
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Jazz en Tech",
      "url": "https://jazzentech.com"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://jazzentech.com/billetterie",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Composant image optimisé
const OptimizedImage = ({ src, alt, className, priority = false, width = 400, height = 500 }: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    priority={priority}
    // Supprime ces deux lignes :
    // placeholder="blur"
    // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  />
)

export default function Home() {
  return (
    <>
      <StructuredData />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <header className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-24 relative overflow-hidden min-h-[80vh] md:min-h-screen flex items-center">
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
                  Jazz en Tech
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl" style={{ color: '#f7f3e9' }}>
                  Le festival qui fait swinguer les Pyrénées Orientales 
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link
                    href="/billetterie"
                    className="inline-block px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
                    style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                    aria-label="Accéder à la billetterie Jazz en Tech 2025"
                  >
                    Billetterie
                  </Link>
                  <Link
                    href="/programmation"
                    className="inline-block border-2 px-4 sm:px-6 md:px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base"
                    style={{ borderColor: '#d4af37', color: '#d4af37' }}
                    aria-label="Découvrir la programmation Jazz en Tech 2025"
                  >
                    Programmation
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center items-start opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
                <div className="relative group w-full max-w-sm lg:max-w-md">
                  <OptimizedImage
                    src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/affiche-2025_xkytzn.jpg"
                    alt="Affiche Jazz en Tech 2025 - 10ème édition du festival de jazz"
                    className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority={true}
                    width={400}
                    height={600}
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
        </header>

        <main>
          {/* Section concerts payants */}
          <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, rgba(212, 175, 55, 0.1) 50%, #f7f3e9 100%)' }} aria-labelledby="paid-concerts-heading">
            {/* Éléments décoratifs */}
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#722f37' }}></div>
              <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
              <div className="absolute bottom-10 left-1/3 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-8 md:mb-12">
                <h2 id="paid-concerts-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
                  🎫 Concerts payants avec billetterie
                </h2>
                <p className="text-base md:text-lg max-w-2xl mx-auto mb-4" style={{ color: '#1a1a1a' }}>
                  Découvrez les artistes exceptionnels de cette 10ème édition
                </p>
                <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)', border: '2px solid #722f37' }}>
                  <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-2" style={{ color: '#722f37' }} aria-hidden="true" />
                  <span className="text-xs md:text-sm font-medium" style={{ color: '#722f37' }}>Réservation obligatoire</span>
                </div>
              </div>

              {/* Grille d'artistes payants */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
                
                {/* Manu Le Prince */}
                <Link href="/artistes/manu-le-prince" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Manu Le Prince - Concert du 27 juillet">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/manu-le-prince_bymuww.jpg"
                      alt="Manu Le Prince - Chanteuse de Bossa Nova et Latin Jazz"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h3 className="font-bold text-xs md:text-sm mb-1">MANU LE PRINCE</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-07-27">27 JUIL</time>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Florin Gugulica */}
                <Link href="/artistes/florin-gugulica" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Florin Gugulica - Concert du 28 juillet">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica_iuybea.jpg"
                      alt="Florin Gugulica - Clarinettiste de Jazz Manouche et Musique Balkanique"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h3 className="font-bold text-xs md:text-sm mb-1">FLORIN GUGULICA</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-07-28">28 JUIL</time>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Stefano Di Battista */}
                <Link href="/artistes/stefano-di-battista" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Stefano Di Battista - Concert du 7 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/stefano-di-battista_p7imeu.jpg"
                      alt="Stefano Di Battista - Saxophoniste de Jazz Italien"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h3 className="font-bold text-xs md:text-sm mb-1">STEFANO DI BATTISTA</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-07">7 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Jacky Terrasson */}
                <Link href="/artistes/jacky-terrasson" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Jacky Terrasson - Concert du 8 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/jacky-terrasson_c2r3t7.jpg"
                      alt="Jacky Terrasson - Pianiste de Jazz"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h3 className="font-bold text-xs md:text-sm mb-1">JACKY TERRASSON</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-08">8 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Camille Bertault */}
                <Link href="/artistes/camille-bertault" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Camille Bertault - Concert du 8 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/camille-bertault_ehnf2z.jpg"
                      alt="Camille Bertault - Chanteuse de Jazz Vocal Contemporain"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h3 className="font-bold text-xs md:text-sm mb-1">CAMILLE BERTAULT</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-08">8 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Charlotte Planchou */}
                <Link href="/artistes/charlotte-planchou" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Charlotte Planchou - Concert du 9 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/charlotte-planchou_tumrdd.jpg"
                      alt="Charlotte Planchou - Chanteuse de Jazz Vocal Contemporain, Prix Évidence 2025"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h3 className="font-bold text-xs md:text-sm mb-1">CHARLOTTE PLANCHOU</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-09">9 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>

              <div className="text-center mt-8 md:mt-12">
                <Link 
                  href="/billetterie"
                  className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
                  style={{ 
                    backgroundColor: '#722f37', 
                    color: '#f7f3e9'
                  }}
                  aria-label="Réserver vos places pour les concerts payants"
                >
                  Réserver mes places
                </Link>
              </div>
            </div>
          </section>

          {/* Section concerts gratuits */}
          <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, rgba(212, 175, 55, 0.1) 50%, #f7f3e9 100%)' }} aria-labelledby="free-concerts-heading">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#722f37' }}></div>
              <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
              <div className="absolute bottom-10 left-1/3 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-8 md:mb-12">
                <h2 id="free-concerts-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
                  🎵 Concerts gratuits
                </h2>
                <p className="text-base md:text-lg md:text-xl max-w-3xl mx-auto mb-4" style={{ color: '#1a1a1a' }}>
                  Du 6 au 9 août le jazz vivra dans les rues de Céret
                </p>
                <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', border: '2px solid #d4af37' }}>
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" style={{ color: '#d4af37' }} aria-hidden="true" />
                  <span className="text-xs md:text-sm font-medium" style={{ color: '#d4af37' }}>Centre-ville de Céret</span>
                </div>
              </div>

              {/* Grille artistes concerts gratuits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                
                <Link href="/artistes/triton-66" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Triton 66 - Concerts gratuits des 6 et 7 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/triton-66_n3dcpl.jpg"
                      alt="Triton 66 - Quintet de Jazz Standards et Swing"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                      <h3 className="font-bold text-sm md:text-lg mb-1">TRITON 66</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-06">6 & 7 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/artistes/florin-gugulica" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Florin Gugulica Trio - Concerts gratuits des 6, 7 et 9 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/florin-gugulica-trio_wejyxd.jpg"
                      alt="Florin Gugulica Trio - Jazz Manouche en concert gratuit"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                      <h3 className="font-bold text-sm md:text-lg mb-1">FLORIN GUGULICA</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-06">6, 7 & 9 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/artistes/david-vilayleck" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir David Vilayleck Trio - Concert gratuit du 8 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764876/david-vilayleck_kjwhfp.jpg"
                      alt="David Vilayleck Trio - Jazz Power Trio et Jazz Fusion"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                      <h3 className="font-bold text-sm md:text-lg mb-1">DAVID VILAYLECK</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-08">VEN. 8 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/artistes/cavale-trio" className="group relative block overflow-hidden rounded-lg shadow-xl" aria-label="Découvrir Cavale - Concerts gratuits des 8 et 9 août">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <OptimizedImage
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/v1757764875/cavale-trio_j1bwqr.jpg"
                      alt="Cavale - Trio de Jazz Contemporain et Musique Acoustique"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={300}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                      <h3 className="font-bold text-sm md:text-lg mb-1">CAVALE</h3>
                      <div className="flex items-center text-xs">
                        <Calendar className="w-3 h-3 mr-1" style={{ color: '#d4af37' }} aria-hidden="true" />
                        <time dateTime="2025-08-08">8 & 9 AOÛT</time>
                      </div>
                    </div>
                  </div>
                </Link>

              </div>

              <div className="text-center mt-8 md:mt-12">
                <Link 
                  href="/programmation"
                  className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
                  style={{ 
                    backgroundColor: '#d4af37', 
                    color: '#1a1a1a'
                  }}
                  aria-label="Voir le planning détaillé des concerts gratuits"
                >
                  Voir le planning détaillé
                </Link>
              </div>
            </div>
          </section>

          {/* Section dates importantes */}
<section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #722f37 50%, #1a1a1a 100%)' }} aria-labelledby="dates-heading">
  <div className="absolute inset-0 opacity-20" aria-hidden="true">
    <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#d4af37' }}></div>
    <div className="absolute top-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
    <div className="absolute bottom-20 left-1/3 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-8 md:mb-12">
      <h2 id="dates-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: '#d4af37' }}>
        10ème édition - Été 2025
      </h2>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
      {/* Saint-Génis */}
      <article className="rounded-2xl p-6 md:p-8 shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl" style={{ 
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(184, 115, 51, 0.05))', 
        border: '2px solid rgba(212, 175, 55, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="relative mb-4 md:mb-6">
          <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }} aria-hidden="true"></div>
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#d4af37' }}>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: '#1a1a1a' }} aria-hidden="true" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#d4af37' }}>
          <time dateTime="2025-07-27/2025-07-28">27-28 Juillet</time>
        </h3>
        <p className="mb-3 md:mb-4 font-semibold text-sm sm:text-base" style={{ color: '#f7f3e9' }}>Saint-Genis-des-Fontaines</p>
        <div className="text-xs sm:text-sm space-y-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
            <strong>• Manu le Prince</strong>
          </div>
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)', color: '#b87333' }}>
            <strong>• Florin Gugulica</strong>
          </div>
        </div>
      </article>
      
      {/* Céret */}
      <article className="rounded-2xl p-6 md:p-8 shadow-2xl text-center transform hover:-translate-y-3 transition-all duration-300 hover:shadow-xl" style={{ 
        background: 'linear-gradient(135deg, rgba(114, 47, 55, 0.1), rgba(212, 175, 55, 0.05))', 
        border: '2px solid rgba(114, 47, 55, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="relative mb-4 md:mb-6">
          <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: 'rgba(114, 47, 55, 0.3)' }} aria-hidden="true"></div>
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#722f37' }}>
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" aria-hidden="true" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#d4af37' }}>
          <time dateTime="2025-08-06/2025-08-09">6-7-8-9 Août</time>
        </h3>
        <p className="mb-3 md:mb-4 font-semibold text-sm sm:text-base" style={{ color: '#f7f3e9' }}>Céret</p>
        <div className="text-xs sm:text-sm space-y-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
            <strong>• Stefano Di Battista, Jacky Terrasson et Camille Bertault, Charlotte Planchou</strong>
          </div>
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(114, 47, 55, 0.15)', color: '#f7f3e9' }}>
            <strong>+ concerts gratuits sur 2 podiums</strong>
            <div className="text-xs mt-1" style={{ color: '#d4af37' }}>11h, 17h, 18h • Bd Maréchal Joffre & Place Picasso</div>
          </div>
        </div>
      </article>
    </div>
    
    <div className="text-center mt-8 md:mt-12">
      <Link 
        href="/programmation"
        className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
        style={{ 
          backgroundColor: '#d4af37', 
          color: '#1a1a1a',
          border: '2px solid transparent'
        }}
        aria-label="Voir toute la programmation détaillée"
      >
        Voir toute la programmation
      </Link>
    </div>
  </div>
</section>

          {/* Section À propos + Vidéos */}
          <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f7f3e9 0%, white 50%, #f7f3e9 100%)' }} aria-labelledby="about-heading">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-2 rounded-full animate-spin-slow" style={{ borderColor: '#722f37' }}></div>
              <div className="absolute bottom-20 right-20 w-16 h-16 md:w-24 md:h-24 border-2 rounded-full animate-spin-slow delay-1000" style={{ borderColor: '#b87333' }}></div>
              <div className="absolute top-1/2 right-10 w-12 h-12 md:w-20 md:h-20 border-2 rounded-full animate-spin-slow delay-500" style={{ borderColor: '#d4af37' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              
              {/* Festival unique */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
                <div>
                  <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: '#1a1a1a' }}>
                    Un festival <span style={{ color: '#722f37' }}>unique</span>
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8" style={{ color: '#722f37' }}>
                    Une expérience musicale immersive qui repousse les frontières de l'art.
                  </p>
                  <Link 
                    href="/mot-du-president"
                    className="inline-flex items-center font-semibold group transition-colors hover:opacity-80 text-sm sm:text-base"
                    style={{ color: '#722f37' }}
                    aria-label="Découvrir la vision du festival Jazz en Tech"
                  >
                    Découvrir notre vision 
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform" aria-hidden="true">→</span>
                  </Link>
                </div>
                
                {/* Design responsive */}
                <div className="relative">
                  <div className="hidden md:block relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                    {/* Version desktop avec positions absolues */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#1a1a1a' }}>
                        <Music className="w-8 h-8 md:w-10 md:h-10 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Artistes</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Exceptionnels</div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#722f37' }}>
                        <Users className="w-8 h-8 md:w-10 md:h-10 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Public</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Passionné</div>
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#b87333' }}>
                        <Calendar className="w-8 h-8 md:w-10 md:h-10 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Événements</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Inoubliables</div>
                    </div>
                    
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 md:mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#d4af37' }}>
                        <Star className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#1a1a1a' }} aria-hidden="true" />
                      </div>
                      <div className="text-xs md:text-sm font-bold" style={{ color: '#1a1a1a' }}>Expérience</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Unique</div>
                    </div>
                  </div>

                  {/* Version mobile */}
                  <div className="block md:hidden grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#1a1a1a' }}>
                        <Music className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Artistes</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Exceptionnels</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#722f37' }}>
                        <Users className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Public</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Passionné</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#d4af37' }}>
                        <Star className="w-8 h-8" style={{ color: '#1a1a1a' }} aria-hidden="true" />
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Expérience</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Unique</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-lg mx-auto" style={{ backgroundColor: '#b87333' }}>
                        <Calendar className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <div className="text-sm font-bold" style={{ color: '#1a1a1a' }}>Événements</div>
                      <div className="text-xs" style={{ color: '#722f37' }}>Inoubliables</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vidéos concerts payants avec lazy loading */}
              <Suspense fallback={
                <div className="animate-pulse mb-16 md:mb-24">
                  <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="bg-gray-300 rounded-xl h-64"></div>
                    ))}
                  </div>
                </div>
              }>
                <VideoSection />
              </Suspense>

              {/* Vidéos concerts gratuits avec lazy loading */}
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-gray-300 rounded-xl h-64"></div>
                    ))}
                  </div>
                </div>
              }>
                <FreeVideoSection />
              </Suspense>

            </div>
          </section>

          {/* CTA final */}
          <section className="py-12 md:py-16 text-white relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #d4af37 0%, #b87333 50%, #722f37 100%)' }} aria-labelledby="cta-heading">
            <div className="absolute inset-0 opacity-20" aria-hidden="true">
              <div className="absolute top-10 left-10 w-32 h-32 md:w-40 md:h-40 border rounded-full animate-pulse" style={{ borderColor: '#f7f3e9' }}></div>
              <div className="absolute top-32 right-20 w-24 h-24 md:w-32 md:h-32 border rounded-full animate-pulse delay-1000" style={{ borderColor: '#1a1a1a' }}></div>
              <div className="absolute bottom-20 left-1/3 w-36 h-36 md:w-48 md:h-48 border rounded-full animate-pulse delay-500" style={{ borderColor: '#f7f3e9' }}></div>
            </div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Prêt pour cette 10ème édition ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
                Réservez vos billets dès maintenant pour vivre Jazz en Tech 2025
              </p>
              <Link 
                href="/billetterie" 
                className="inline-block px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base"
                style={{ backgroundColor: '#1a1a1a', color: '#d4af37' }}
                aria-label="Réserver vos billets pour Jazz en Tech 2025"
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