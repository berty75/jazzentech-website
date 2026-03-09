import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Clock, Music, Instagram, Apple, Facebook } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import ReservationButton from '@/components/ReservationButton'

// Lazy loading seulement pour la discographie
const DiscographySection = dynamic(() => import('@/components/DiscographySection'), {
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white/10 rounded-xl h-24"></div>
        ))}
      </div>
    </div>
  )
})

// Données complètes des artistes 2026
const artistsData = {
  'erik-truffaz': {
    name: 'Erik Truffaz & Antonio Lizana',
    subtitle: '"New Sketches of Spain"',
    genre: 'Jazz • Flamenco • Trompette',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/erik_truffaz_antonio_lizana_jazz.jpg',
    date: 'MERCREDI 5 AOÛT 2026',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetterie' as const,
    badge: '🎺 HOMMAGE À MILES DAVIS • 100 ANS',
    biography: {
      intro: "Trompettiste de jazz suisse né le 3 avril 1960 à Chêne-Bougeries (canton de Genève), Erik Truffaz a grandi en France, dans le pays de Gex. Il joue de la trompette depuis l'âge de 6 ans. C'est avec l'album « The Dawn » en 1998 qu'il impose un son novateur : un jazz acoustique réinventé à l'aune des rythmiques électroniques.",
      content: [
        "Son style mêle jazz, hip-hop et drum'n'bass, ce qui lui vaut d'être régulièrement comparé à Miles Davis pour la sensibilité de son phrasé. Il remporte le Prix du public aux Victoires du Jazz en 2005 et, en 2023, l'Office fédéral de la culture suisse lui décerne le Grand Prix suisse de musique.",
        "Natif de San Fernando (province de Cadix), l'un des berceaux du chant flamenco, Antonio Lizana est l'un des représentants les plus célèbres du nouveau jazz flamenco. Il pratique avec un rare brio le saxophone alto et le chant flamenco. Ses collaborations avec Arturo O'Farrill et Alejandro Sanz lui ont valu deux Latin Grammy Awards.",
        "« Fasciné par la découverte de musiques liées à la tradition populaire espagnole, le trompettiste Miles Davis en a donné sa vision intense et poétisée dans « Sketches of Spain », chef-d'œuvre marquant l'ouverture du jazz aux musiques du monde. Erik Truffaz et Antonio Lizana proposent leur vision contemporaine de ces « Esquisses d'Espagne » dont le génie a traversé les décennies. » — François Lacharme"
      ]
    },
    discography: [
      {
        title: 'Lune Rouge',
        year: '2019',
        label: 'Blue Note',
        description: 'Album marquant son retour au label Blue Note avec un son électro-jazz affirmé.'
      },
      {
        title: 'The Dawn',
        year: '1998',
        label: 'Blue Note',
        description: 'Album révélation mêlant jazz acoustique et rythmiques électroniques.'
      },
      {
        title: 'Bending New Corners',
        year: '1999',
        label: 'Blue Note',
        description: 'Album confirmant son succès avec le rappeur Nya.'
      },
      {
        title: 'Vishuddha',
        year: '2023',
        label: 'Cristal Records',
        description: "Cinquième album d'Antonio Lizana, fusion jazz-flamenco."
      }
    ],
    lineup: [
      { name: 'Erik Truffaz', instrument: 'trompette' },
      { name: 'Antonio Lizana', instrument: 'chant, sax alto, flûte' },
      { name: 'Renaud Gabriel Pion', instrument: 'clarinettes, arrangements' },
      { name: 'Ana Perez', instrument: 'danse flamenco' },
      { name: 'Pau Figueres', instrument: 'guitare flamenco' },
      { name: 'Arin Keshishi', instrument: 'basse électrique' },
      { name: 'Manuel de la Torre', instrument: 'batterie' },
      { name: 'Vincent Thomas', instrument: 'percussions' }
    ],
    videos: [
      {
        id: 'usfeIQx3uGk',
        title: 'New Sketches of Spain',
        description: 'Erik Truffaz & Antonio Lizana - Projet hommage à Miles Davis'
      }
    ],
    socials: {
      instagram: 'https://www.instagram.com/eriktruffaz/',
      facebook: 'https://www.facebook.com/eriktruffaz/',
      appleMusic: 'https://music.apple.com/us/artist/erik-truffaz/14614727'
    }
  },
  'ladyva': {
    name: 'Ladyva & Barcelona Big Blues Band',
    subtitle: 'Une association explosive !',
    genre: 'Boogie-Woogie • Blues • Big Band',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Ladyva.jpg',
    date: 'VENDREDI 7 AOÛT 2026',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetterie' as const,
    badge: '🎹 BOOGIE-WOOGIE & BIG BAND',
    biography: {
      intro: "Signée par Universal en 2011, la pianiste et chanteuse LADYVA enchaîne depuis les succès et les récompenses. Le boogie-woogie lui colle à la peau depuis vingt ans désormais, avec ses grandes notes graves balancées et ses aiguës égrenées.",
      content: [
        "Elle s'est produite dans tous les festivals boogie européens, ainsi que lors de différents événements d'envergure en Grande Bretagne et en Égypte. En 2017, à Londres, elle reçoit le prix de « Best Boogie Woogie Pianist 2017 ».",
        "Le Barcelona Big Blues Band, mené par le charismatique contrebassiste et chef d'orchestre Ivan Kovacevic, est un big band actif dans le paysage jazz et swing, influencé par le rhythm'n blues et le rock'n roll.",
        "Un son énergique, capable d'être sauvage et brut avec des arrangements sophistiqués. Incontournable de la scène Barcelonaise, il a joué avec de nombreux invités internationaux, tous solistes bien connus du monde du rhythm'n blues : Ray Gelato (GB), Mike Sanchez (GB), Knock Out Greg (S), Lluis Coloma (ES), Steve Lucky & Carmen Getit (USA), etc... Il se produit désormais partout en Europe.",
        "Rythme et envie de danser garantis !"
      ]
    },
    discography: [
      {
        title: 'Ladyva',
        year: '2011',
        label: 'Universal Music',
        description: 'Premier album signé chez Universal, révélant son talent au boogie-woogie.'
      },
      {
        title: 'Boogie Wonderland',
        year: '2015',
        label: 'Autoproduit',
        description: 'Album célébrant le boogie-woogie dans toute sa splendeur.'
      },
      {
        title: 'Live in London',
        year: '2018',
        label: 'Autoproduit',
        description: 'Enregistrement live capturant l\'énergie de ses concerts.'
      }
    ],
    lineup: [
      { name: 'Ladyva', instrument: 'piano & voix' },
      { name: 'Ivan Kovacevic', instrument: 'contrebasse & direction' },
      { name: 'Duska Miscevic', instrument: 'saxophone alto' },
      { name: 'Ignasi Poch', instrument: 'saxophone alto' },
      { name: 'Nil Mujal', instrument: 'saxophone ténor' },
      { name: 'Federico Alvares', instrument: 'saxophone ténor' },
      { name: 'Nuria Vito', instrument: 'saxophone baryton' },
      { name: 'Jaume Torne', instrument: 'trompette' },
      { name: 'Victor Verges', instrument: 'trompette' },
      { name: 'Aram Montagud', instrument: 'trombone' },
      { name: 'Miguel Berenguer', instrument: 'trombone' },
      { name: 'Hector Martin Diaz', instrument: 'guitare' },
      { name: 'Oscar Hita', instrument: 'batterie' }
    ],
    videos: [
      {
        id: 'i-IwcEw2Xz8',
        title: 'Got My Mojo Working (clip 2024)',
        description: 'Clip officiel de Ladyva - boogie-woogie endiablé'
      },
      {
        id: 'gyAQ-pC_78Y',
        title: 'Ladyva Stomp (live 2025)',
        description: 'Performance live explosive de Ladyva'
      },
      {
        id: '7K4T9l4wZSo',
        title: 'Great Balls of Fire (live 2025)',
        description: 'Ladyva interprète le classique de Jerry Lee Lewis'
      }
    ],
    socials: {
      instagram: 'https://www.instagram.com/ladyvaofficial/',
      facebook: 'https://www.facebook.com/Ladyva01/',
      appleMusic: 'https://music.apple.com/us/artist/ladyva/78911153'
    }
  }
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params
  const artist = artistsData[slug as keyof typeof artistsData]

  if (!artist) {
    return {
      title: 'Artiste non trouvé - Jazz en Tech 2026'
    }
  }

  const description = `${artist.name} - ${artist.subtitle}. ${artist.biography.intro.slice(0, 155)}...`
  const imageUrl = artist.image

  return {
    title: `${artist.name} - ${artist.subtitle} | Jazz en Tech 2026`,
    description,
    keywords: [
      artist.name,
      'Jazz en Tech 2026',
      'festival jazz',
      'Céret',
      artist.genre.split(' • ')[0],
      artist.genre.split(' • ')[1] || '',
      'concert',
      'musique'
    ].filter(Boolean).join(', '),
    
    openGraph: {
      title: `${artist.name} - Jazz en Tech 2026`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Photo de ${artist.name}`,
        }
      ],
      locale: 'fr_FR',
      type: 'profile',
      siteName: 'Jazz en Tech 2026'
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${artist.name} - Jazz en Tech 2026`,
      description,
      images: [imageUrl],
      creator: '@jazzentech'
    },
    
    alternates: {
      canonical: `https://jazzentech.com/artistes/${slug}`
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
    }
  }
}

// Composant pour les données structurées
const StructuredData = ({ artist }: { artist: any }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": `${artist.name} - ${artist.subtitle}`,
    "description": artist.biography.intro,
    "image": artist.image,
    "startDate": artist.date,
    "location": {
      "@type": "Place",
      "name": artist.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Céret",
        "addressCountry": "FR"
      }
    },
    "performer": {
      "@type": "MusicGroup",
      "name": artist.name,
      "genre": artist.genre,
      "description": artist.biography.intro,
      "image": artist.image,
      ...(artist.socials.instagram !== '#' && {
        "sameAs": [
          artist.socials.instagram,
          artist.socials.facebook !== '#' ? artist.socials.facebook : undefined,
          artist.socials.appleMusic !== '#' ? artist.socials.appleMusic : undefined
        ].filter(Boolean)
      })
    },
    "organizer": {
      "@type": "Organization",
      "name": "Jazz en Tech",
      "url": "https://jazzentech.com"
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
const OptimizedImage = ({ src, alt, className, priority = false }: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) => (
  <Image
    src={src}
    alt={alt}
    width={600}
    height={400}
    className={className}
    priority={priority}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  />
)

const ConcertGratuitInfo = () => (
  <div className="text-center">
    <div 
      className="inline-flex items-center px-6 py-4 rounded-xl font-bold text-lg shadow-xl"
      style={{ 
        backgroundColor: '#d4af37', 
        color: '#1a1a1a'
      }}
    >
      🎵 Concert Gratuit - Accès Libre 🎵
    </div>
    <p className="mt-4" style={{ color: '#f7f3e9' }}>
      Rendez-vous dans le centre-ville de Céret pour ce concert en accès libre
    </p>
  </div>
)

const LineupSection = ({ lineup }: { lineup: Array<{name: string, instrument: string}> }) => (
  <section aria-labelledby="lineup-heading">
    <h2 id="lineup-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white">
      🎼 Formation
    </h2>
    
    <div className="grid md:grid-cols-2 gap-4">
      {lineup.map((member, index) => (
        <div key={index} className="rounded-lg p-4" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-white">
              {member.name}
            </span>
            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
              {member.instrument}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
)

const SocialsSection = ({ socials }: { socials: {instagram: string, facebook: string, appleMusic: string} }) => (
  <section aria-labelledby="socials-heading">
    <h2 id="socials-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white">
      🌐 Suivre l'artiste
    </h2>
    
    <div className="flex flex-wrap gap-4">
      {socials.instagram !== '#' && (
        <a 
          href={socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          aria-label="Suivre sur Instagram"
        >
          <Instagram className="w-5 h-5" />
          <span className="font-medium">Instagram</span>
        </a>
      )}
      
      {socials.facebook !== '#' && (
        <a 
          href={socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          aria-label="Suivre sur Facebook"
        >
          <Facebook className="w-5 h-5" />
          <span className="font-medium">Facebook</span>
        </a>
      )}
      
      {socials.appleMusic !== '#' && (
        <a 
          href={socials.appleMusic}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
          aria-label="Écouter sur Apple Music"
        >
          <Apple className="w-5 h-5" />
          <span className="font-medium">Apple Music</span>
        </a>
      )}
    </div>
  </section>
)

interface ArtistPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params
  const artist = artistsData[slug as keyof typeof artistsData]

  if (!artist) {
    notFound()
  }

  return (
    <>
      <StructuredData artist={artist} />
      
      <div className="min-h-screen">
        {/* Hero Section avec sémantique améliorée */}
        <header className="relative text-white pt-36 pb-16 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 overflow-hidden">
          {/* Image de fond optimisée */}
          <div className="absolute inset-0" aria-hidden="true">
            <OptimizedImage 
              src={artist.image}
              alt={`Photo de ${artist.name} en concert`}
              className="w-full h-full object-cover opacity-20"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badges */}
              {(artist.badge) && (
                <div className="flex justify-center mb-6">
                  <div className="flex flex-wrap gap-3">
                    {artist.badge && (
                      <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#d4af37', color: '#722f37' }}>
                        {artist.badge}
                      </span>
                    )}

                  </div>
                </div>
              )}
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: '#d4af37' }}>
                {artist.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6" style={{ color: '#f7f3e9' }}>
                {artist.subtitle}
              </p>
              <p className="text-base sm:text-lg mb-8 opacity-90">
                {artist.genre}
              </p>
              
              {/* Photo circulaire optimisée */}
              <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  <OptimizedImage 
                    src={artist.image}
                    alt={`Portrait de ${artist.name}, artiste de ${artist.genre}`}
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                </div>
              </div>
              
              {/* Infos concert */}
              <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5" style={{ color: '#d4af37' }} aria-hidden="true" />
                    <time className="font-semibold">{artist.date}</time>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5" style={{ color: '#d4af37' }} aria-hidden="true" />
                    <span className="font-semibold">{artist.time}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} aria-hidden="true" />
                    <span className="font-semibold text-sm">{artist.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Bouton réservation */}
            <section aria-labelledby="reservation-heading">
              <h2 id="reservation-heading" className="sr-only">Réservation</h2>
              {artist.ticketType === 'billetterie' ? (
                <div className="text-center">
                  <Link 
                    href="/billetterie"
                    className="inline-block px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      backgroundColor: '#d4af37', 
                      color: '#1a1a1a'
                    }}
                    aria-label={`Réserver des places pour ${artist.name}`}
                  >
                    🎫 Réserver mes places
                  </Link>
                </div>
              ) : null}
            </section>

            {/* Biographie */}
            <article aria-labelledby="biography-heading">
              <h2 id="biography-heading" className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-white">
                <Music className="w-6 h-6 mr-3" aria-hidden="true" />
                Biographie
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg font-medium mb-6 leading-relaxed" style={{ color: '#d4af37' }}>
                  {artist.biography.intro}
                </p>
                
                {artist.biography.content.map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed" style={{ color: '#f7f3e9' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            {/* Formation/Lineup */}
            {artist.lineup && (
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-white/10 rounded-lg h-16"></div>
                    ))}
                  </div>
                </div>
              }>
                <LineupSection lineup={artist.lineup} />
              </Suspense>
            )}

            {/* Discographie avec lazy loading */}
            {artist.discography && artist.discography.length > 0 && (
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="bg-white/10 rounded-xl h-24"></div>
                    ))}
                  </div>
                </div>
              }>
                <DiscographySection discography={artist.discography} />
              </Suspense>
            )}

            {/* SECTION VIDÉOS - TAILLE RÉDUITE */}
            {artist.videos && artist.videos.length > 0 && (
              <section aria-labelledby="videos-heading">
                <h2 id="videos-heading" className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  🎬 Vidéos
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {artist.videos.map((video, index) => (
                    <div key={index} className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm mb-1" style={{ color: '#d4af37' }}>
                          {video.title}
                        </h3>
                        <p className="text-xs" style={{ color: '#f7f3e9' }}>{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Réseaux sociaux */}
            <SocialsSection socials={artist.socials} />

            {/* Navigation avec breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-center pt-8" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <ol className="inline-flex items-center space-x-2">
                <li>
                  <Link 
                    href="/"
                    className="text-lg font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: '#d4af37' }}
                  >
                    Accueil
                  </Link>
                </li>
                <li style={{ color: '#b87333' }} aria-hidden="true"> → </li>
                <li>
                  <Link 
                    href="/programmation"
                    className="text-lg font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: '#d4af37' }}
                  >
                    Programmation
                  </Link>
                </li>
                <li style={{ color: '#b87333' }} aria-hidden="true"> → </li>
                <li>
                  <span className="text-lg font-semibold" style={{ color: '#f7f3e9' }}>{artist.name}</span>
                </li>
              </ol>
            </nav>
          </div>
        </main>
      </div>
    </>
  )
}

// Générer les pages statiques pour tous les artistes
export async function generateStaticParams() {
  return Object.keys(artistsData).map((slug) => ({
    slug: slug,
  }))
}