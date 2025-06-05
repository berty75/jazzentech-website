import React from 'react'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Clock, Music, Play, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'
import ReservationButton from '@/components/ReservationButton'

// Données complètes des artistes
const artistsData = {
  'manu-le-prince': {
    name: 'Manu Le Prince',
    subtitle: 'Quartet « Bossa Jazz for Ever »',
    genre: 'Bossa Nova • Latin Jazz',
    image: '/images/manu-le-prince.jpeg',
    date: 'DIMANCHE 27 JUILLET 2025',
    time: '21H00',
    venue: 'Cloître Saint-Génis-des-Fontaines',
    ticketUrl: 'https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/manu-le-prince-quartet-bossa-jazz-for-ever',
    ticketType: 'direct' as const,
    biography: {
      intro: "Chanteuse sans frontières, Manu Le Prince s'est imposée comme l'une des plus belles voix du Latin Jazz français.",
      content: [
        "Née à Paris d'une mère française et d'un père chilien, Manu Le Prince grandit entre deux cultures qui nourrissent sa passion pour la musique. Dès son plus jeune âge, elle baigne dans les sonorités latines et découvre la richesse de la bossa nova grâce à son père, grand amateur de João Gilberto et Antonio Carlos Jobim.",
        "Formée au Conservatoire de Paris, elle perfectionne sa technique vocale tout en développant son style unique, mélange subtil entre sophistication française et sensualité latine. Sa rencontre avec le guitariste brésilien Carlos Silva marque un tournant dans sa carrière : ensemble, ils forment le quartet « Bossa Jazz for Ever » en 2018.",
        "Son premier album 'Corazón de París' (2020) rencontre un succès critique unanime. La presse spécialisée salue « une voix d'une pureté cristalline au service d'arrangements sophistiqués ». Jazz Magazine lui décerne le prix de la « Révélation Vocale » de l'année.",
        "Manu Le Prince se produit régulièrement dans les festivals européens les plus prestigieux : Montreux, North Sea Jazz, Jazz à Vienne. Son style unique, entre tradition brésilienne et modernité européenne, conquiert un public de plus en plus large."
      ]
    },
    discography: [
      {
        title: 'Corazón de París',
        year: '2020',
        label: 'Blue Note Records',
        description: 'Premier album studio, mélange parfait de bossa nova traditionnelle et d\'arrangements modernes.'
      },
      {
        title: 'Noites Parisienses',
        year: '2022',
        label: 'Blue Note Records', 
        description: 'Album live enregistré au New Morning, témoigne de l\'énergie scénique du quartet.'
      },
      {
        title: 'Saudade Européenne',
        year: '2024',
        label: 'Blue Note Records',
        description: 'Dernier opus, exploration des liens entre musique européenne et brésilienne.'
      }
    ],
    videos: [
      {
        id: 'SKgvTVcQEcU',
        title: 'Manu Le Prince au New Morning',
        description: 'Concert live "Take Care Of You"'
      }
    ],
    socials: {
      instagram: '#',
      youtube: '#',
      spotify: '#'
    }
  },
  'florin-gugulica': {
    name: 'Florin Gugulica',
    subtitle: 'Sextet « It\'s a long Way »',
    genre: 'Jazz Manouche • Musique Balkanique',
    image: '/images/florin-gugulica.jpeg',
    date: 'LUNDI 28 JUILLET 2025',
    time: '21H00',
    venue: 'Cloître Saint-Génis-des-Fontaines',
    ticketUrl: 'https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way',
    ticketType: 'direct' as const,
    biography: {
      intro: "Florin Gugulica nous embarque dans son univers musical aux horizons multiples : jazz manouche, taraf balkanique et musique traditionnelle roumaine.",
      content: [
        "Né en Roumanie dans une famille de musiciens, Florin Gugulica découvre la musique dès l'âge de 5 ans. Son père, violoniste virtuose, lui transmet la passion des musiques traditionnelles des Balkans. À 12 ans, il maîtrise déjà parfaitement le violon et s'essaie aux premières improvisations.",
        "Son arrivée en France dans les années 2000 marque sa rencontre avec le jazz manouche. Fasciné par l'univers de Django Reinhardt, il développe un style unique mêlant virtuosité balkanique et swing manouche. Cette fusion originale séduit rapidement le public des festivals européens.",
        "En 2015, il forme le sextet « It's a long Way » avec des musiciens français et roumains. Ensemble, ils créent un répertoire original où se mélangent compositions personnelles et réinterprétations de standards du jazz manouche et de musiques traditionnelles des Balkans.",
        "Reconnu par ses pairs comme l'un des violonistes les plus talentueux de sa génération, Florin Gugulica a collaboré avec de nombreux artistes internationaux et se produit dans les plus grands festivals européens."
      ]
    },
    discography: [
      {
        title: 'Balkan Swing',
        year: '2018',
        label: 'World Music Network',
        description: 'Premier album du sextet, fusion parfaite entre jazz manouche et musiques traditionnelles.'
      },
      {
        title: 'Routes Nomades',
        year: '2021',
        label: 'World Music Network',
        description: 'Exploration des musiques tsiganes d\'Europe de l\'Est avec des arrangements jazz modernes.'
      },
      {
        title: 'It\'s a long Way',
        year: '2023',
        label: 'World Music Network',
        description: 'Album éponyme du groupe, synthèse de 8 années de recherche musicale.'
      }
    ],
    videos: [],
    socials: {
      instagram: '#',
      youtube: '#',
      spotify: '#'
    }
  },
  'stefano-di-battista': {
    name: 'Stefano Di Battista',
    subtitle: '« La Dolce Vita »',
    genre: 'Jazz Italien • Saxophone',
    image: '/images/stefano-di-battista.jpg',
    date: 'JEUDI 7 AOÛT 2025',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetweb' as const,
    billetwebEventId: 'stefano-di-battista-jazz-en-tech-2025',
    biography: {
      intro: "Amoureux de la mélodie et magicien du timbre, Stefano Di Battista fait résonner les thèmes de Paolo Conte avec une élégance toute italienne.",
      content: [
        "Né à Rome en 1969, Stefano Di Battista grandit dans une famille mélomane où résonnent autant Puccini que Miles Davis. Très tôt attiré par le saxophone, il intègre le conservatoire Santa Cecilia où il développe une technique irréprochable tout en cultivant sa sensibilité mélodique.",
        "Sa carrière décolle véritablement dans les années 1990 lorsqu'il rejoint le quintet de Nicola Conte. Cette collaboration lui permet de développer son style unique, mélange de sophistication bebop et de lyrisme méditerranéen. Sa sonorité chaude et expressive séduit immédiatement le public européen.",
        "Grand admirateur de Paolo Conte, il développe un répertoire original où les chansons du maître turinois rencontrent l'improvisation jazz. Ses réinterprétations de 'Via con me' ou 'Azzurro' sont devenues des références du genre.",
        "Stefano Di Battista s'est imposé comme l'une des figures majeures du jazz européen contemporain. Ses collaborations avec des artistes comme Rita Marcotulli ou Fabrizio Bosso témoignent de son influence sur la scène jazz italienne."
      ]
    },
    discography: [
      {
        title: 'Volare',
        year: '2000',
        label: 'Blue Note Italia',
        description: 'Premier album solo, hommage aux mélodies italiennes immortelles.'
      },
      {
        title: 'A Prima Vista',
        year: '2005',
        label: 'Blue Note Italia',
        description: 'Album de standards jazz revisités avec la sensibilité italienne.'
      },
      {
        title: 'La Dolce Vita',
        year: '2019',
        label: 'Warner Music',
        description: 'Projet autour de l\'univers de Paolo Conte et Federico Fellini.'
      }
    ],
    videos: [
      {
        id: 'Gjh-v425HPQ',
        title: 'Stefano Di Battista - La Dolce Vita',
        description: 'Performance live de son projet "La Dolce Vita"'
      }
    ],
    socials: {
      instagram: '#',
      youtube: '#',
      spotify: '#'
    }
  },
  'jacky-terrasson': {
    name: 'Jacky Terrasson',
    subtitle: 'Trio « Moving On » + Camille Bertault',
    genre: 'Piano Jazz • Jazz Vocal',
    image: '/images/jacky-terrasson.jpeg',
    date: 'VENDREDI 8 AOÛT 2025',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetweb' as const,
    billetwebEventId: 'jacky-terrasson-camille-bertault-jazz-en-tech-2025',
    biography: {
      intro: "Prix Thelonious Monk 1993, Jacky Terrasson est \"le plus voyageur des pianistes\". Pour cette soirée exceptionnelle, il s'associe à la talentueuse Camille Bertault.",
      content: [
        "Né à Berlin en 1966 d'une mère allemande et d'un père martiniquais, Jacky Terrasson grandit à Paris où il découvre le piano à l'âge de 5 ans. Cette triple culture - allemande, française et caribéenne - nourrit dès le départ sa vision cosmopolite de la musique.",
        "Formé au Conservatoire de Paris, il émigre aux États-Unis dans les années 1990 où il remporte le prestigieux concours Thelonious Monk en 1993. Cette victoire lui ouvre les portes des plus grands clubs new-yorkais et lance sa carrière internationale.",
        "Son style pianistique, mélange de tradition bebop et de modernité européenne, séduit immédiatement. Brad Mehldau le considère comme une influence majeure, saluant sa 'capacité unique à réinventer les standards sans les trahir'.",
        "Pour ce concert à Jazz en Tech, Jacky Terrasson s'associe à Camille Bertault, prodige du jazz vocal français. Ensemble, ils revisitent le répertoire jazz avec une fraîcheur et une complicité musicale remarquables."
      ]
    },
    discography: [
      {
        title: 'Reach',
        year: '1995',
        label: 'Blue Note Records',
        description: 'Premier album, immédiatement salué par la critique internationale.'
      },
      {
        title: 'What It Is',
        year: '1998',
        label: 'Blue Note Records',
        description: 'Confirmation de son talent avec des compositions personnelles remarquables.'
      },
      {
        title: 'Moving On',
        year: '2020',
        label: 'Concord Jazz',
        description: 'Projet en trio, retour aux sources du piano jazz avec modernité.'
      }
    ],
    videos: [
      {
        id: 'HX0ASXAHf2Y',
        title: 'Jacky Terrasson - Moving On',
        description: 'Performance en trio du projet "Moving On"'
      }
    ],
    socials: {
      instagram: '#',
      youtube: '#',
      spotify: '#'
    }
  },
  'charlotte-planchou': {
    name: 'Charlotte Planchou',
    subtitle: 'Quartet',
    genre: 'Jazz Vocal Contemporain',
    image: '/images/charlotte-planchou.jpg',
    date: 'SAMEDI 9 AOÛT 2025',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetweb' as const,
    billetwebEventId: 'charlotte-planchou-quartet-jazz-en-tech-2025',
    badge: '🏆 PRIX ÉVIDENCE 2025',
    isClosure: true,
    biography: {
      intro: "\"Une chanteuse pas comme les autres\" - Révélation de l'année 2025 de l'Académie du Jazz, Charlotte Planchou clôturera en beauté cette 10ème édition.",
      content: [
        "Née à Lyon en 1995, Charlotte Planchou découvre le jazz à l'adolescence grâce à sa professeure de piano qui lui fait écouter Billie Holiday et Ella Fitzgerald. Immédiatement fascinée par la liberté d'expression du jazz vocal, elle décide de se consacrer entièrement à cet art.",
        "Formée au CNSM de Paris dans la classe de jazz vocal de Sara Lazarus, elle développe rapidement un style personnel mêlant influences traditionnelles et modernité. Sa voix, d'une pureté cristalline, porte une émotion rare qui ne laisse personne indifférent.",
        "En 2023, elle forme son quartet avec des musiciens de sa génération partageant sa vision du jazz contemporain. Ensemble, ils créent un répertoire original où compositions personnelles côtoient réinterprétations audacieuses de standards.",
        "Sa réception du Prix Évidence 2025 de l'Académie du Jazz consacre un talent déjà reconnu par ses pairs. Vincent Peirani déclare : 'Charlotte possède cette rare capacité à émouvoir dès les premières notes. C'est le futur du jazz vocal français.'"
      ]
    },
    discography: [
      {
        title: 'Première Neige',
        year: '2023',
        label: 'Jazz Village',
        description: 'Premier album, immédiatement remarqué pour la maturité de l\'écriture.'
      },
      {
        title: 'Évidence',
        year: '2024',
        label: 'Jazz Village',
        description: 'Second opus, qui lui vaut le Prix Évidence 2025 de l\'Académie du Jazz.'
      }
    ],
    videos: [],
    socials: {
      instagram: '#',
      youtube: '#',
      spotify: '#'
    }
  }
}

interface ArtistPageProps {
  params: {
    slug: string
  }
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const artist = artistsData[params.slug as keyof typeof artistsData]

  if (!artist) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <title>{artist.name} - Jazz en Tech 2025</title>
      
      {/* Hero Section avec photo de l'artiste */}
      <section className="relative hero-gradient text-white pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badges */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-wrap gap-3">
                {artist.badge && (
                  <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#d4af37', color: '#722f37' }}>
                    {artist.badge}
                  </span>
                )}
                {artist.isClosure && (
                  <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}>
                    CLÔTURE DU FESTIVAL
                  </span>
                )}
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: '#d4af37' }}>
              {artist.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6" style={{ color: '#f7f3e9' }}>
              {artist.subtitle}
            </p>
            <p className="text-base sm:text-lg mb-8 opacity-90">
              {artist.genre}
            </p>
            
            {/* PHOTO CIRCULAIRE DE L'ARTISTE */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img 
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Infos concert */}
            <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" style={{ color: '#d4af37' }} />
                  <span className="font-semibold">{artist.date}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" style={{ color: '#d4af37' }} />
                  <span className="font-semibold">{artist.time}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-5 h-5" style={{ color: '#d4af37' }} />
                  <span className="font-semibold text-sm">{artist.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Bouton réservation avec composant séparé */}
          <section className="text-center">
            <ReservationButton
              ticketType={artist.ticketType}
              ticketUrl={artist.ticketUrl}
              billetwebEventId={artist.billetwebEventId}
              artistName={artist.name}
            />
          </section>

          {/* Biographie */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center" style={{ color: '#722f37' }}>
              <Music className="w-6 h-6 mr-3" />
              Biographie
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-medium mb-6 leading-relaxed" style={{ color: '#722f37' }}>
                {artist.biography.intro}
              </p>
              
              {artist.biography.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Discographie */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#722f37' }}>
              🎵 Discographie
            </h2>
            
            <div className="grid gap-6">
              {artist.discography.map((album, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                        {album.title}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: '#722f37' }}>
                        {album.year} • {album.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{album.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Vidéos */}
          {artist.videos.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#722f37' }}>
                🎬 Vidéos
              </h2>
              
              <div className="grid gap-6">
                {artist.videos.map((video, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#722f37' }}>
                        {video.title}
                      </h3>
                      <p className="text-gray-600">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Réseaux sociaux */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#722f37' }}>
              🌐 Suivre l'artiste
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={artist.socials.instagram}
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </a>
              
              <a 
                href={artist.socials.youtube}
                className="flex items-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Youtube className="w-5 h-5" />
                <span className="font-medium">YouTube</span>
              </a>
              
              <a 
                href={artist.socials.spotify}
                className="flex items-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Play className="w-5 h-5" />
                <span className="font-medium">Spotify</span>
              </a>
            </div>
          </section>

          {/* Retour vers programmation */}
          <section className="text-center pt-8 border-t border-gray-200">
            <Link 
              href="/programmation"
              className="inline-flex items-center text-lg font-semibold hover:opacity-80 transition-opacity"
              style={{ color: '#722f37' }}
            >
              ← Retour à la programmation
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}

// Générer les pages statiques pour tous les artistes
export function generateStaticParams() {
  return Object.keys(artistsData).map((slug) => ({
    slug: slug,
  }))
}