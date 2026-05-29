import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Clock, Music, Instagram, Apple, Facebook } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import BilletwebPopupButton from '@/components/BilletwebPopupButton'

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
    ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=6796635',
    badge: '🎺 HOMMAGE À MILES DAVIS • 100 ANS',
    biography: {
      intro: "Trompettiste de jazz suisse né dans le canton de Genève, Erik Truffaz a grandi en France, dans le pays de Gex. Il joue de la trompette depuis l'âge de 6 ans. C'est avec l'album « The Dawn » en 1998 qu'il impose un son novateur : un jazz acoustique réinventé à l'aune des rythmiques électroniques.",
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
    ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=6876952',
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
  },
  'dal-sasso': {
    name: 'Dal Sasso Big Band',
    subtitle: 'Africa Brass Revisited',
    genre: 'Big Band • Jazz • Hommage Coltrane',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Dal-Sasso-groupe.jpg',
    date: 'JEUDI 6 AOÛT 2026',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetterie' as const,
    ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024291',
    badge: '🎷 HOMMAGE À JOHN COLTRANE • 100 ANS',
    biography: {
      intro: "Si 2026 est l’année du centenaire de la naissance de Miles Davis, c’est aussi l’année du centenaire de la naissance de John Coltrane devenu depuis une légende du jazz.",
      content: [
        "En 1958, Miles et Coltrane jouent et enregistrent ensemble. En 1961, sort « Africa/Brass », un disque devenu culte dans la riche discographie de Coltrane, car il est le seul que le saxophoniste n’ait jamais enregistré en big band. Près d’un demi-siècle plus tard, Christophe Dal Sasso, reconnu comme l’un des arrangeurs les plus talentueux de l’Hexagone, est retourné à ce répertoire emblématique auquel il redonne, à la tête d’un big band inspiré et fougueux, toute la puissance spirituelle, fidèle à la portée universelle du message humaniste que John Coltrane avait inscrit au cœur de sa musique. Au-delà du mythique Africa Brass, cet All Stars du jazz français interprètera d’autres titres emblématiques de John Coltrane pour une soirée unique.",
        "Le Dal Sasso Big Band rendra également un hommage à Sonny Rollins, dernier géant du Jazz, disparu en mai 2026, figure dorénavant légendaire de cette musique aux côtés de Miles Davis et John Coltrane pour ne citer que les « centenaires ».",
        "« Dal Sasso tire le meilleur de chacun pour s’approcher de l’énergie survoltée du mythique John Coltrane. » JAZZMANIA"
      ]
    },
    discography: [],
    lineup: [
      { name: 'Christophe Dal Sasso', instrument: 'flûtes, arrangements, direction' },
      { name: 'David El-Malek', instrument: 'ténor sax' },
      { name: 'Sophie Alour', instrument: 'ténor sax, flûte' },
      { name: 'Stéphane Guillaume', instrument: 'ténor & soprano sax, flûte' },
      { name: 'Thomas Savy', instrument: 'baryton sax, clarinette' },
      { name: 'Nicolas Folmer', instrument: 'trompette' },
      { name: 'Christian Martinez', instrument: 'trompette' },
      { name: 'Jerry Edwards', instrument: 'trombone' },
      { name: 'Denis Leloup', instrument: 'trombone' },
      { name: 'Pierre de Bethmann', instrument: 'piano' },
      { name: 'Manuel Marchès', instrument: 'contrebasse' },
      { name: 'Karl Jannuska', instrument: 'batterie' },
      { name: 'Nadia Tighidet', instrument: 'percussions' }
    ],
    videos: [
      { id: '8bVUvXI26a8', title: 'Dal Sasso Big Band', description: 'Africa Brass Revisited - Hommage à John Coltrane' },
      { id: 'htTZFc4Ai4Y', title: 'Dal Sasso Big Band', description: 'Christophe Dal Sasso & son big band en concert' },
      { id: 'BjdPras6jsg', title: 'Dal Sasso Big Band', description: 'Le répertoire de John Coltrane revisité' }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: 'https://music.apple.com/fr/artist/dal-sasso-big-band/1468955432'
    }
  },
  'akpe-motion': {
    name: 'Akpé Motion featuring Karla Harris',
    subtitle: '« Électric Miles »',
    genre: 'Jazz Rock • World',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Alain-Brunet.jpg',
    secondImage: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Karla-Harris.jpg',
    imageCaption: 'Alain Brunet',
    secondImageCaption: 'Karla Harris',
    date: 'SAMEDI 8 AOÛT 2026',
    time: '21H00',
    venue: 'Place de la République, Céret',
    ticketType: 'billetterie' as const,
    ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024288',
    badge: '🎺 HOMMAGE À MILES DAVIS • 100 ANS',
    biography: {
      intro: "Akpé Motion nourri de jazz rock et de world music, rend à Miles Davis un hommage singulier avec le percussionniste/plasticien Pascal Bouterin amoureux des peaux travaillées seulement aux balais, avec Nico Morelli, pianiste virtuose, considéré comme l’un des meilleurs pianistes européens, avec le bassiste Didier Delaguila qui apporte sa très belle singularité et son expérience des musiques actuelles, avec celle enfin du trompettiste Alain Brunet très marqué par l’une des figures les plus novatrices, influentes et acclamées de l’histoire du jazz et de toutes les musiques nées du jazz : le Miles Davis dans sa dernière période, celle où les influences rock, hip hop etc… ont façonné l’esthétique de son groupe. Pour ce concert, Akpé Motion s’enrichit d’une chanteuse américaine, Karla Harris d’Atlanta, dont ce sera le premier concert français avant de retrouver à l’automne le groupe qui sera en tournée aux USA.",
      content: [
        "« A Partir d’une maitrise technique irréprochable, et d’une active familiarité avec l’univers Miles Davisien, Alain Brunet s’est inventé un modernisme suave exhaussé par les très diverses musiques qu’il explore au gré d’une sonorité soyeuse (mais de soie sauvage) et de persuasives mélodies. » — Philippe Carles, Dictionnaire encyclopédique du jazz"
      ]
    },
    discography: [],
    lineup: [
      { name: 'Alain Brunet', instrument: 'trompette, bugle, voix' },
      { name: 'Karla Harris', instrument: 'voix' },
      { name: 'Nico Morelli', instrument: 'claviers' },
      { name: 'Didier Del Aguila', instrument: 'basse' },
      { name: 'Pascal Bouterin', instrument: 'batterie, voix' }
    ],
    videos: [
      { id: 'Z1RbRNX8FFQ', title: 'Akpé Motion', description: 'Hommage à Miles Davis - Électric Miles' },
      { id: 'cmuRqqxdEKQ', title: 'Akpé Motion', description: 'Alain Brunet & Akpé Motion en concert' },
      { id: 'r2n-RNCADvw', title: 'Akpé Motion', description: 'L’univers Miles Davisien revisité' }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: 'https://music.apple.com/fr/artist/akp%C3%A9-motion/819201460'
    }
  },
  'cecile-recchia': {
    name: 'Cecil L. Recchia Quintet',
    subtitle: 'sings Django Reinhardt',
    genre: 'Jazz Vocal • Django Reinhardt',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Cecil-L-Recchia.jpg',
    date: 'DIMANCHE 26 JUILLET 2026',
    time: '21H00',
    venue: 'Cloître de Saint-Génis-des-Fontaines',
    city: 'Saint-Génis-des-Fontaines',
    ticketType: 'saint-genis' as const,
    ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024303',
    badge: '🎤 CLOÎTRE DE SAINT-GÉNIS-DES-FONTAINES',
    biography: {
      intro: "Chanteuse française aux origines métissées (italo-espagnole et nord-africaine), Cecil L. Recchia étudie le piano classique dès l’âge de 5 ans. Diplômée de la Sorbonne en langue anglaise et littérature américaine, formée au jazz vocal avec Sonia Cat-Berro et au CIM (école jazz et musiques actuelles) pendant trois ans, elle est finaliste des Trophées du Sunset/Sunside en 2008. Elle se fait connaître du public au sein de son quartet et devient une habituée des lieux de la scène jazz parisienne.",
      content: [
        "En 2015, « Songs of the Tree : A Tribute to Ahmad Jamal » premier album remarqué, place Cecil L. Recchia parmi les valeurs sûres de la scène jazz actuelle. En 2018, « The Gumbo » son second album, célèbre la diversité des rythmes de la Nouvelle-Orléans. Unanimement salué par la critique ce disque confirme Cecil L. Recchia parmi les artistes vocales incontournables du jazz français. En 2021, Play Blue, dont elle signe tous les textes, reçoit les éloges dithyrambiques des médias.",
        "Pour son 4e album, Cecil L. Recchia s’attaque à un défi de taille : réinventer des morceaux instrumentaux de Django Reinhardt, en y posant ses propres textes et sa voix. Le tout sans guitare, loin du swing manouche. Un projet aussi original qu’exigeant, mêlant chant, piano, contrebasse, trompette et batterie. Cecil L. Recchia propose ainsi une relecture audacieuse et raffinée, où se croisent l’élégance du jazz vocal, la force rythmique du hard bop et les couleurs festives de la Nouvelle Orléans. Son dernier disque a reçu le « choc » de Jazz Magazine qui récompense les meilleurs CD.",
        "« Une des grandes vocalistes françaises du jazz. Irrésistible ». FRANCE MUSIQUE"
      ]
    },
    discography: [],
    lineup: [
      { name: 'Cecil L. Recchia', instrument: 'chant, textes' },
      { name: 'David Grebil', instrument: 'batterie, arrangements' },
      { name: 'Noé Huchard', instrument: 'piano' },
      { name: 'Raphaël Dever', instrument: 'contrebasse' },
      { name: 'Malo Mazurié', instrument: 'trompette' }
    ],
    videos: [
      { id: 'CaFjNenURck', title: 'Cecil L. Recchia', description: 'sings Django Reinhardt' },
      { id: 'KWUdDZi1KUM', title: 'Cecil L. Recchia', description: 'Jazz vocal - en concert' },
      { id: 'DO6RcGTgi3Y', title: 'Cecil L. Recchia', description: 'Une relecture audacieuse de Django Reinhardt' }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: 'https://music.apple.com/fr/artist/cecil-l-recchia/1048751590'
    }
  },
  'knobil-trio': {
    name: 'Knobil Trio',
    subtitle: 'Chanson et Jazz pailleté',
    genre: 'Jazz • Chanson • Punk',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/Pierre-Daendliker-Louise.jpg',
    date: 'LUNDI 27 JUILLET 2026',
    time: '21H00',
    venue: 'Cloître de Saint-Génis-des-Fontaines',
    city: 'Saint-Génis-des-Fontaines',
    ticketType: 'saint-genis' as const,
    ticketUrl: 'https://www.billetweb.fr/jazz-en-tech&quick=7024307',
    badge: '🎶 CLOÎTRE DE SAINT-GÉNIS-DES-FONTAINES',
    biography: {
      intro: "Contrebassiste, chanteuse et compositrice, KNOBIL (Louise Knobil, 26 ans) vous invite à plonger dans son univers où le Jazz, le Punk, les paillettes et la Chanson française fusionnent avec une énergie pétillante et audacieuse.",
      content: [
        "Inspirée par des figures emblématiques comme Esperanza Spalding, Charles Mingus et Boris Vian, cette étoile montante du Jazz helvétique transforme son journal intime en une aventure musicale inédite. Polyamour, insomnies chroniques et recettes de pesto se côtoient dans des compositions à la fois personnelles et universelles. Ses mélodies impertinentes mêlant contrebasse et voix, gagnent en intensité grâce au talent de ses fidèles ‘knodisciples’ : Chloé Marsigny à la clarinette basse et aux effets, et Vincent Andreae à la batterie. En 2024, KNOBIL est lauréate du tremplin de Crest Jazz et de la bourse culturelle Leenaards.",
        "« Un subtil manifeste pour le respect des différences ». JAZZ NEWS"
      ]
    },
    discography: [],
    lineup: [
      { name: 'Louise Knobil', instrument: 'contrebasse et voix' },
      { name: 'Chloé Marsigny', instrument: 'clarinette basse' },
      { name: 'Vincent Andreae', instrument: 'batterie' }
    ],
    videos: [
      { id: 'dEs3sM_ZfCU', title: 'Knobil Trio', description: 'Chanson et Jazz pailleté' },
      { id: 'FD0w3v1TMoA', title: 'Knobil Trio', description: 'Louise Knobil - extrait' },
      { id: 'iXRn2ShrQ9Q', title: 'Knobil Trio', description: 'En concert' }
    ],
    socials: {
      instagram: '#',
      facebook: '#',
      appleMusic: 'https://music.apple.com/fr/artist/knobil/1670717367'
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
        "addressLocality": artist.city || "Céret",
        "addressCountry": "FR"
      }
    },
    "performer": {
      "@type": "MusicGroup",
      "name": artist.name,
      "genre": artist.genre,
      "description": artist.biography.intro,
      "image": artist.image,
      ...((artist.socials.instagram !== '#' || artist.socials.facebook !== '#' || artist.socials.appleMusic !== '#') && {
        "sameAs": [
          artist.socials.instagram !== '#' ? artist.socials.instagram : undefined,
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

  const extra = artist as { secondImage?: string; imageCaption?: string; secondImageCaption?: string }

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
              
              {/* Photo(s) circulaire(s) optimisée(s) */}
              <div className="flex justify-center mb-8">
                {extra.secondImage ? (
                  <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
                    <figure className="flex flex-col items-center">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                        <OptimizedImage
                          src={artist.image}
                          alt={`Portrait de ${extra.imageCaption ?? artist.name}`}
                          className="w-full h-full object-cover"
                          priority={true}
                        />
                      </div>
                      {extra.imageCaption && (
                        <figcaption className="mt-3 text-sm font-semibold" style={{ color: '#f7f3e9' }}>
                          {extra.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                    <figure className="flex flex-col items-center">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                        <OptimizedImage
                          src={extra.secondImage}
                          alt={`Portrait de ${extra.secondImageCaption ?? 'invitée'}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {extra.secondImageCaption && (
                        <figcaption className="mt-3 text-sm font-semibold" style={{ color: '#f7f3e9' }}>
                          {extra.secondImageCaption}
                        </figcaption>
                      )}
                    </figure>
                  </div>
                ) : (
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <OptimizedImage
                      src={artist.image}
                      alt={`Portrait de ${artist.name}, artiste de ${artist.genre}`}
                      className="w-full h-full object-cover"
                      priority={true}
                    />
                  </div>
                )}
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
              {artist.ticketUrl ? (
                <div className="text-center">
                  {artist.ticketType === 'saint-genis' && (
                    <p className="text-sm mb-3" style={{ color: '#b87333' }}>
                      Cloître de Saint-Génis-des-Fontaines • 15&nbsp;€
                    </p>
                  )}
                  <BilletwebPopupButton
                    ticketUrl={artist.ticketUrl}
                    className="inline-block px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{
                      backgroundColor: '#d4af37',
                      color: '#1a1a1a'
                    }}
                    ariaLabel={`Réserver des places pour ${artist.name}`}
                  >
                    🎫 Réserver mes places
                  </BilletwebPopupButton>
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
            {artist.socials && (artist.socials.instagram !== '#' || artist.socials.facebook !== '#' || artist.socials.appleMusic !== '#') && (
              <SocialsSection socials={artist.socials} />
            )}

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