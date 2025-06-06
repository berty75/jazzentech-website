import React from 'react'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Clock, Music, Play, Instagram, Apple, Facebook } from 'lucide-react'
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
      instagram: 'https://www.instagram.com/manu.leprince/',
      facebook: 'https://www.facebook.com/manuleprinceoff/',
      appleMusic: 'https://music.apple.com/fr/artist/manu-le-prince/158238593'
    }
  },
  'florin-gugulica': {
    name: 'Florin Gugulica',
    subtitle: 'Sextet « It\'s a long Way » & Trio',
    genre: 'Jazz Manouche • Musique Balkanique',
    image: '/images/florin-gugulica.jpeg',
    date: 'LUNDI 28 JUILLET 2025 + 6, 7 & 9 AOÛT 2025',
    time: 'Concerts payants et gratuits',
    venue: 'Saint-Génis-des-Fontaines & Céret',
    ticketUrl: 'https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way',
    ticketType: 'direct' as const,
    badge: '🎭 DOUBLE FORMATION',
    biography: {
      intro: "Florin Gugulica nous embarque dans son univers musical aux horizons multiples : jazz manouche, taraf balkanique et musique traditionnelle roumaine. Artiste polyvalent, il se produit en sextet pour les concerts payants et en trio pour les concerts gratuits.",
      content: [
        "Né en Roumanie dans une famille de musiciens, Florin Gugulica découvre la musique dès l'âge de 5 ans. Son père, violoniste virtuose, lui transmet la passion des musiques traditionnelles des Balkans. À 12 ans, il maîtrise déjà parfaitement le violon et s'essaie aux premières improvisations.",
        "Son arrivée en France dans les années 2000 marque sa rencontre avec le jazz manouche. Fasciné par l'univers de Django Reinhardt, il développe un style unique mêlant virtuosité balkanique et swing manouche. Cette fusion originale séduit rapidement le public des festivals européens.",
        "En 2015, il forme le sextet « It's a long Way » avec des musiciens français et roumains. Ensemble, ils créent un répertoire original où se mélangent compositions personnelles et réinterprétations de standards du jazz manouche et de musiques traditionnelles des Balkans.",
        "Pour Jazz en Tech 2025, Florin présente une particularité unique : il se produit dans deux formations différentes. Le sextet « It's a long Way » pour le concert payant du 28 juillet à Saint-Génis-des-Fontaines, et en trio pour les concerts gratuits des 6, 7 et 9 août à Céret, offrant ainsi deux expériences musicales complémentaires."
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
    videos: [
      {
        id: 'JchABVZGrGE',
        title: 'Florin Gugulica Sextet',
        description: 'Performance du sextet "It\'s a long Way"'
      },
      {
        id: 'sHogMmjL08A',
        title: 'Florin Gugulica Trio',
        description: 'Performance en trio pour les concerts gratuits'
      }
    ],
    socials: {
      instagram: '#',
      facebook: 'https://www.facebook.com/phl123',
      appleMusic: '#'
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
    ticketType: 'billetterie' as const,
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
      instagram: 'https://www.instagram.com/stefanodibattista_official/',
      facebook: 'https://www.facebook.com/stefano.d.battista.10/?locale=fr_FR',
      appleMusic: 'https://music.apple.com/fr/artist/stefano-di-battista/14638702'
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
    ticketType: 'billetterie' as const,
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
      instagram: 'https://www.instagram.com/jacky_terrasson/',
      facebook: 'https://www.facebook.com/jackyterrasson/?locale=fr_FR',
      appleMusic: 'https://music.apple.com/fr/artist/jacky-terrasson/1100040'
    }
  },
  'camille-bertault': {
    name: 'Camille Bertault',
    subtitle: 'Chanteuse invitée de Jacky Terrasson',
    genre: 'Jazz Vocal Contemporain',
    image: '/images/camille-bertault.jpg',
    date: 'VENDREDI 8 AOÛT 2025',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetterie' as const,
    badge: '🏆 VICTOIRE DU JAZZ 2023',
    biography: {
      intro: "\"Un talent impertinent\" selon Le Figaro, Camille Bertault est l'une des artistes les plus talentueuses de la scène jazz actuelle. Elle rejoint Jacky Terrasson pour une soirée exceptionnelle.",
      content: [
        "Après une formation au conservatoire, Camille Bertault obtient un prix de piano classique et étudie l'opéra, le théâtre et la danse au conservatoire de Nice. À l'âge de 20 ans, elle écrit, met en scène et joue dans des spectacles pour enfants.",
        "Inspirée par un père passionné de jazz, elle se tourne vers le chant jazz et l'improvisation au Conservatoire de Paris. En 2016, elle est repérée par le label new-yorkais Sunnyside Records, qui distribue son premier album En vie et lui ouvre les portes de la scène jazz new-yorkaise.",
        "C'est là qu'elle rencontre Dan Tepfer, Michael Leonhart, Jeff Ballard et Joe Sanders, avec lesquels elle enregistre sous le label Sony France son deuxième album en 2018, Pas de Géant, salué par une presse enthousiaste.",
        "Camille entame alors une tournée internationale et sort en 2020 son troisième album, Le Tigre, chez Sony, suivi de Playground, en collaboration avec David Helbock chez ACT. En 2023, son cinquième album, Bonjour mon amour, paraît sur le label collectif d'artistes Vita, et elle remporte une Victoire du Jazz."
      ]
    },
    discography: [
      {
        title: 'En vie',
        year: '2016',
        label: 'Sunnyside Records',
        description: 'Premier album qui lui ouvre les portes de la scène jazz new-yorkaise.'
      },
      {
        title: 'Pas de Géant',
        year: '2018',
        label: 'Sony France',
        description: 'Deuxième album salué par une presse enthousiaste.'
      },
      {
        title: 'Le Tigre',
        year: '2020',
        label: 'Sony',
        description: 'Troisième album marquant sa maturité artistique.'
      },
      {
        title: 'Playground',
        year: '2022',
        label: 'ACT',
        description: 'Collaboration avec David Helbock.'
      },
      {
        title: 'Bonjour mon amour',
        year: '2023',
        label: 'Vita',
        description: 'Cinquième album qui lui vaut une Victoire du Jazz.'
      }
    ],
    videos: [
      {
        id: 'MAo6eSowSko',
        title: 'Camille Bertault - Bonjour mon amour',
        description: 'Performance de son album récompensé aux Victoires du Jazz'
      }
    ],
    socials: {
      instagram: 'https://www.instagram.com/camillebertault/?hl=fr',
      facebook: 'https://www.facebook.com/CamBertault/?locale=fr_FR',
      appleMusic: 'https://music.apple.com/fr/artist/camille-bertault/1084204688'
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
    ticketType: 'billetterie' as const,
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
    videos: [
      {
        id: '5k4eWo9HHZ4',
        title: 'Charlotte Planchou - Évidence',
        description: 'Performance de son album primé'
      }
    ],
    socials: {
      instagram: 'https://www.instagram.com/charlotteplanchou/?hl=fr',
      facebook: 'https://www.facebook.com/charlotteplanchou/?locale=fr_FR',
      appleMusic: 'https://music.apple.com/fr/artist/charlotte-planchou/1466442533'
    }
  },
  // NOUVEAUX ARTISTES CONCERTS GRATUITS
  'cavale-trio': {
    name: 'Cavale Trio',
    subtitle: 'Prêle Abelanet, Damien Guisset, Pierre Baradel',
    genre: 'Jazz Contemporain • Musique Acoustique',
    image: '/images/cavale-trio.jpg',
    date: 'VENDREDI 8 & SAMEDI 9 AOÛT 2025',
    time: '18H00',
    venue: 'Centre-ville de Céret',
    ticketType: 'gratuit' as const,
    biography: {
      intro: "Musicienne multi-instrumentiste (accordéon, batterie, percussions, piano), Prêle Abelanet compose et joue dans différentes formations musicales, spectacles, histoires, lectures musicales.",
      content: [
        "Durant son parcours en partie autodidacte, elle a abordé le jazz, la musique acousmatique, et participé à des ateliers d'improvisation, en perpétuelle exploration du langage sonore et musical.",
        "Prêle fonde en 2011 son groupe CAVALE qu'elle dirige autour de ses compositions (jazz imaginatif poétique), et produit son 5ième album en 2024 (Exuvie).",
        "Sa musique semble raconter des histoires, des humeurs, des paysages, comme un film imaginaire, avec une écriture riche de mélodies puissantes, rythmes entêtants et improvisations.",
        "Le trio Cavale réunit Prêle Abelanet à l'accordéon, Damien Guisset à la contrebasse et Pierre Baradel à la batterie pour une expérience musicale immersive et poétique."
      ]
    },
    discography: [
      {
        title: 'Exuvie',
        year: '2024',
        label: 'Autoproduit',
        description: 'Cinquième album du groupe, jazz imaginatif et poétique.'
      }
    ],
    videos: [
      {
        id: 'BZbzXJ0eOcw',
        title: 'Cavale Trio - Performance live',
        description: 'Concert du trio avec Prêle Abelanet'
      }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: '#'
    }
  },
  'david-vilayleck': {
    name: 'David Vilayleck Trio',
    subtitle: 'David Vilayleck, Jean Luc Lehr, Eric Flandrin',
    genre: 'Jazz Power Trio • Jazz Fusion',
    image: '/images/david-vilayleck.jpg',
    date: 'VENDREDI 8 AOÛT 2025',
    time: '11H00',
    venue: 'Centre-ville de Céret',
    ticketType: 'gratuit' as const,
    biography: {
      intro: "La musique du David Vilayleck Trio est celle d'un jazz power trio (basse, batterie, guitare) qui permet la croisée d'influences world, jazz fusion, free, rock et contemporain.",
      content: [
        "Les compositions du guitariste, à la fois complexes et accessibles, offrent des improvisations ouvertes où l'énergie et le partage sont palpables dès les premières notes : des mélodies envoûtantes, rythmes hypnotiques, aux cascades post-coltraniennes ou hendrixiennes.",
        "David Vilayleck dirige depuis un an la série de concerts jazz club au Nautilus à Perpignan. Il a tourné dans le monde entier et sa musique est publiée sur des labels tels que Chinabot (Londres, UK), Ayan Records et autres.",
        "Le trio réunit David Vilayleck à la guitare, Jean Luc Lehr à la basse et Eric Flandrin à la batterie pour une formation puissante et créative.",
        "Leur approche du jazz power trio permet une exploration libre des territoires musicaux, entre tradition et modernité, dans un esprit de partage et d'innovation constante."
      ]
    },
    discography: [
      {
        title: 'Power Trio Sessions',
        year: '2023',
        label: 'Chinabot Records',
        description: 'Album explorant les frontières du jazz power trio.'
      }
    ],
    videos: [
      {
        id: 'CdDbtkyXd00',
        title: 'David Vilayleck Trio - Live Session',
        description: 'Performance en trio du guitariste David Vilayleck'
      }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: '#'
    }
  },
  'triton-66': {
    name: 'Triton 66 Quintet',
    subtitle: 'Bernard Poujal, Garry Fowler, Joel Bergeon, Jean-Yves Bouche, Albert Woda',
    genre: 'Jazz Standards • Swing',
    image: '/images/triton-66.jpg',
    date: 'MERCREDI 6 & JEUDI 7 AOÛT 2025',
    time: '18H00 et 11H00',
    venue: 'Centre-ville de Céret',
    ticketType: 'gratuit' as const,
    biography: {
      intro: "Cinq musiciens passionnés animés par le plaisir du jeu collectif et le désir de partager une musique vivante, généreuse et accessible.",
      content: [
        "L'ensemble explore un répertoire allant des grands standards du jazz à la bossa nova, en passant par des compositions emblématiques de Miles Davis, Dizzy Gillespie, Herbie Hancock, Sonny Rollins et bien d'autres figures majeures du genre.",
        "À travers des arrangements subtils, une belle complicité musicale et une énergie communicative, le quintette propose un voyage sonore riche en nuances, entre swing, groove et improvisation.",
        "Le quintet réunit Bernard Poujal à la batterie, Garry Fowler à la guitare, Joel Bergeon au saxophone, Jean-Yves Bouche à la guitare et Albert Woda à la basse.",
        "Leur approche respectueuse des traditions du jazz, enrichie d'une sensibilité contemporaine, fait de chaque concert un moment de partage authentique et généreux."
      ]
    },
    discography: [
      {
        title: 'Standards & More',
        year: '2023',
        label: 'Autoproduit',
        description: 'Répertoire de standards jazz et compositions originales.'
      }
    ],
    videos: [
      {
        id: 'S8n12s-2GjE',
        title: 'Triton 66 Quintet - Live Performance',
        description: 'Concert du quintet avec leurs standards préférés'
      }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: '#'
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

  // Composant pour les concerts gratuits (pas de bouton réservation)
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
      <p className="mt-4 text-gray-600">
        Rendez-vous dans le centre-ville de Céret pour ce concert en accès libre
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <title>{artist.name} - Jazz en Tech 2025</title>
      
      {/* Hero Section avec photo de l'artiste */}
<section className="relative hero-gradient text-white pt-36 pb-16 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 overflow-hidden">        {/* Image de fond avec overlay */}
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
                {artist.ticketType === 'gratuit' && (
                  <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                    CONCERT GRATUIT
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
          
          {/* Bouton réservation ou info concert gratuit */}
          <section className="text-center">
            {artist.ticketType === 'gratuit' ? (
              <ConcertGratuitInfo />
            ) : artist.ticketType === 'billetterie' ? (
              <Link 
                href="/billetterie"
                className="inline-block px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ 
                  backgroundColor: '#722f37', 
                  color: '#f7f3e9'
                }}
              >
                🎫 Réserver mes places
              </Link>
            ) : (
              <ReservationButton
                ticketType={artist.ticketType}
                ticketUrl={artist.ticketUrl}
                billetwebEventId={artist.billetwebEventId}
                artistName={artist.name}
              />
            )}
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
          {artist.discography && artist.discography.length > 0 && (
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
          )}

          {/* Vidéos */}
          {artist.videos && artist.videos.length > 0 && (
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
              {artist.socials.instagram !== '#' && (
                <a 
                  href={artist.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">Instagram</span>
                </a>
              )}
              
              {artist.socials.facebook !== '#' && (
  <a 
    href={artist.socials.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
  >
    <Facebook className="w-5 h-5" />
    <span className="font-medium">Facebook</span>
  </a>
)}
              
              {artist.socials.appleMusic !== '#' && (
                <a 
                  href={artist.socials.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Apple className="w-5 h-5" />
                  <span className="font-medium">Apple Music</span>
                </a>
              )}
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