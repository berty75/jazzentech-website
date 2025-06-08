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
      intro: "Chanteuse sans frontières, Manu Le Prince s'est imposée au fil des années comme l'une des plus belles voix du Latin Jazz de l'hexagone.",
      content: [
        "Brésilienne de cœur et anglo-argentine de par ses origines, elle se partage depuis plus d'une trentaine d'années entre Paris et Rio-de-Janeiro, mêlant intimement et avec bonheur le Jazz qui a bercé son enfance à la musique brésilienne, tout particulièrement celle de Tom Jobim.",
        "Manu Le Prince a fait partie de diverses formations dont Magma, Odeurs ou Urban Sax et a aussi à son actif plusieurs albums sous son nom. Son album « Bossa Jazz for Ever » vient d'être réédité par Frémeaux et sera en vente à Saint-Génis-Des-Fontaines.",
        "Selon Télérama, Manu Le Prince est « un trésor de la musique brésilienne conçu en France ». Cette « immense chanteuse de jazz rend hommage à Johnny Alf, père de la bossa, qui a mis en lumière les répertoires de monuments du Jazz tels que Cole Porter ou Wayne Shorter.",
        "L'album a été enregistré à Rio avec les meilleurs musiciens du cru - dont le saxophoniste arrangeur de Johnny, Idriss Boudrioua et le grand batteur Rafael Barata - en 2013. La voix suave et jazzy de la chanteuse sublime le répertoire du compositeur carioca et rend justice à son œuvre fondamentale.» Augustin Bondoux / Frémeaux."
      ]
    },
    discography: [
      {
        title: 'Madrugada',
        year: '2003',
        label: 'Next music',
        description: 'Premier album marquant ses débuts dans la musique brésilienne.'
      },
      {
        title: 'Tribute to Cole Porter',
        year: '2008',
        label: 'Sergent Major',
        description: 'Hommage au grand maître des standards américains.'
      },
      {
        title: 'In a latin mood',
        year: '2017',
        label: 'Sergent Major',
        description: 'Exploration des rythmes latins et de la bossa nova.'
      },
      {
        title: 'Children of the night - Tribute to Wayne Shorter',
        year: '2022',
        label: 'Frémeaux & Associés',
        description: 'Hommage au grand saxophoniste et compositeur de jazz.'
      },
      {
        title: 'Bossa jazz for ever',
        year: '2024',
        label: 'Frémeaux et associés',
        description: 'Réédition de son album culte, disponible en vente au festival.'
      }
    ],
    lineup: [
      { name: 'Manu Le Prince', instrument: 'voix' },
      { name: 'Franck Monbaylet', instrument: 'piano' },
      { name: 'Philippe Brassoud', instrument: 'contrebasse' },
      { name: 'Christophe Bras', instrument: 'batterie' }
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
      intro: "Clarinettiste d'une exceptionnelle virtuosité, Florin Gugulica nous embarque dans son univers musical aux horizons multiples et colorés.",
      content: [
        "Au gré de musiques entendues, découvertes, croisées, inattendues, parfois oubliées, ou encore jouées avec les plus grands du jazz tels que Didier Lockwood, Bireli Lagrène, Stochelo Rosenberg, Hono Winterstein, Diego Imbert, Norig, Rona Hartner, Florin crée, recrée, ré-interprète ou compose.",
        "Il explore des musiques de tous horizons, genres et influences qui ne semblent en rien se ressembler ni se répondre : le « taraf » aussi bien tzigane que balkanique de son enfance roumaine avec en tête, la fanfare joyeuse et conviviale toujours source de danse populaire.",
        "Le jazz manouche, où grâce à Django, se fondent l'émotion de l'Europe centrale, le jazz d'outre-Atlantique de l'après-guerre et la joie du bal musette français. Et bien d'autres encore, d'Europe comme d'Orient, à découvrir jusque par-delà le swing.",
        "Florin Gugulica n'a de cesse de tisser « sa » musique, celle de « son » monde. Son unité n'est ni de lieu ni de temps ni d'action : elle vient de l'intérieur, de « son » intime vie pour s'ériger en miroir harmonieux de la vôtre."
      ]
    },
    lineup: [
      { name: 'Florin Gugulica', instrument: 'clarinette' },
      { name: 'José Moléro', instrument: 'trombone' },
      { name: 'Gwenaël Ollivier', instrument: 'piano' },
      { name: 'Olivier Lorang', instrument: 'contrebasse' },
      { name: 'Arnaud Le Meur', instrument: 'batterie' },
      { name: 'Alain Brunet', instrument: 'trompette (participation)' }
    ],
    videos: [
      {
        id: 'CvwmwRXlevk',
        title: 'Florin Gugulica Sextet "It\'s a long Way"',
        description: 'Performance du sextet - Concert payant avec billetterie (28 juillet 2025)'
      },
      {
        id: 'facebook-link',
        title: 'Florin Gugulica Trio',
        description: 'Performance du trio - Concerts gratuits à Céret (6, 7 & 9 août 2025)',
        facebookUrl: 'https://www.facebook.com/phl123/videos/676111201850458'
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
      intro: "Amoureux de la mélodie, magicien du timbre, Stefano Di Battista fait résonner sous un nouveau jour les thèmes rendus célèbres par Paolo Conte, Andrea Bocelli, Lucio Dalla.",
      content: [
        "Stefano Di Battista débute le saxophone à l'âge de treize ans et suit une formation académique avant de commencer à jouer des musiques de variété. La rencontre avec Massimo Urbani, saxophoniste alto italien marqué par le feu parkérien, joue un rôle déterminant dans son ambition à devenir un musicien de jazz.",
        "Encouragé à se rendre à Paris par le pianiste Jean-Pierre Como, il séduit rapidement plusieurs musiciens de la capitale française qui lui mettent le pied à l'étrier, comme le pianiste star Michel Petrucciani, le batteur Aldo Romano et le chef d'orchestre Laurent Cugny.",
        "Même s'il est, dès lors, surtout actif en France, il maintient des liens étroits avec la communauté des jazzmen italiens, enregistrant notamment avec ses compatriotes Enrico Rava (1996), Rita Marcotulli (1998), Daniele Scannapieco (2003) et Dario Rosciglione (2004).",
        "Fort de son succès public avec plus d'une trentaine de concerts français en quartet, il s'attelle désormais à un nouveau répertoire avec son groupe transalpin, sur son nouvel album intitulé « La Dolce Vita » (mars 2024). Bien plus qu'un simple titre de film, « La Dolce Vita » nous fait pénétrer dans un univers de passion, de style, de désir, de beauté."
      ]
    },
    discography: [
      {
        title: 'Mille bolle blu',
        year: '2015',
        label: 'Jando Music',
        description: 'Album aux sonorités italiennes contemporaines.'
      },
      {
        title: 'La musica insieme',
        year: '2015',
        label: 'Jando Music',
        description: 'Collaboration avec des musiciens italiens de renom.'
      },
      {
        title: 'Italian Standards',
        year: '2016',
        label: 'Casa del Jazz',
        description: 'Réinterprétation des classiques italiens.'
      },
      {
        title: 'Morricone Stories',
        year: '2021',
        label: 'Warner',
        description: 'Hommage au grand compositeur Ennio Morricone.'
      },
      {
        title: 'La dolce vita',
        year: '2024',
        label: 'Warner',
        description: 'Dernier album, synthèse de son univers musical italien.'
      }
    ],
    lineup: [
      { name: 'Stefano Di Battista', instrument: 'saxophone' },
      { name: 'Fred Nardin', instrument: 'piano' },
      { name: 'Daniel Sorrentino', instrument: 'contrebasse' },
      { name: 'Luigi del Prete', instrument: 'batterie' },
      { name: 'Matteo Cutello', instrument: 'trompette' }
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
      intro: "« Le plus voyageur des pianistes de jazz, un pianiste du bonheur » selon Télérama. Après des études de piano classique, Jacky Terrasson remporte en 1993 le prestigieux Prix du Thelonious Monk Institute of Jazz International Piano Competition.",
      content: [
        "C'est aux côtés de Betty Carter, Dee Dee Bridgewater, Cassandra Wilson, ou encore Charles Aznavour, Guy Lafitte, Barney Wilen et Ray Brown qu'il débute sa carrière. Il intègre le Berklee College of Music et développe rapidement son style unique.",
        "Il signe avec le légendaire label Blue Note et son emblématique président Bruce Lundvall, pour une longue et impressionnante aventure de vingt-cinq ans de succès. Cette collaboration lui permet d'enregistrer des albums devenus des références du piano jazz moderne.",
        "Infatigable globe-trotter, il joue régulièrement dans les plus grands festivals de jazz et de piano en Europe, aux États-Unis, en Amérique du Sud et en Asie. Sa vision cosmopolite de la musique nourrit constamment son jeu et ses compositions.",
        "« Moving On » le titre de son nouvel album résume parfaitement ses nouvelles aspirations musicales. Pour ce concert exceptionnel à Jazz en Tech, il s'associe à la talentueuse Camille Bertault pour un projet vocal et instrumental d'une rare complicité."
      ]
    },
    discography: [
      {
        title: 'Gouache',
        year: '2012',
        label: 'EmArcy Records',
        description: 'Album de maturité explorant les couleurs pianistiques.'
      },
      {
        title: 'Take This',
        year: '2015',
        label: 'Impulse!',
        description: 'Retour aux sources du piano jazz contemporain.'
      },
      {
        title: 'Mother',
        year: '2016',
        label: 'Impulse!',
        description: 'Album personnel et intimiste.'
      },
      {
        title: '53',
        year: '2019',
        label: 'Blue Note Records',
        description: 'Album célébrant ses 53 ans, synthèse de son parcours.'
      },
      {
        title: 'Moving On avec Camille Bertault',
        year: '2024',
        label: 'Naïve',
        description: 'Collaboration exceptionnelle avec la chanteuse Camille Bertault.'
      }
    ],
    lineup: [
      { name: 'Jacky Terrasson', instrument: 'piano' },
      { name: 'Camille Bertault', instrument: 'voix' },
      { name: 'Sylvain Romano', instrument: 'contrebasse' },
      { name: 'Lukmil Perez', instrument: 'batterie' }
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
        label: 'Sunny Side',
        description: 'Premier album qui lui ouvre les portes de la scène jazz new-yorkaise.'
      },
      {
        title: 'Pas de géant',
        year: '2018',
        label: 'Okey',
        description: 'Deuxième album salué par une presse enthousiaste.'
      },
      {
        title: 'Le tigre',
        year: '2020',
        label: 'Masterworks',
        description: 'Troisième album marquant sa maturité artistique.'
      },
      {
        title: 'Playground',
        year: '2022',
        label: 'ACT',
        description: 'Collaboration avec David Helbock.'
      },
      {
        title: 'Bonjour Mon Amour',
        year: '2023',
        label: 'Vita Productions',
        description: 'Cinquième album qui lui vaut une Victoire du Jazz.'
      }
    ],
    lineup: [
      { name: 'Jacky Terrasson', instrument: 'piano' },
      { name: 'Camille Bertault', instrument: 'voix' },
      { name: 'Sylvain Romano', instrument: 'contrebasse' },
      { name: 'Lukmil Perez', instrument: 'batterie' }
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
      intro: "« Charlotte Planchou est incontestablement une chanteuse pas comme les autres. Une heure de musique gracieuse et habitée ça ne se refuse pas. On n'a pas fini de parler de Charlotte Planchou. » Jazz Magazine - Prix Évidence de l'Académie du Jazz (Révélation de l'année) en mars 2025.",
      content: [
        "Charlotte Planchou intègre d'abord la Haute École de Musique de Lausanne, dans les classes de chant lyrique, où elle se passionne pour le lied allemand. Entre 2015 et 2016, elle intègre la compagnie Opéra Eclaté et parcourt les maisons d'opéra françaises.",
        "Elle se tourne ensuite vers d'autres répertoires en allant puiser dans le jazz, la chanson, les chansons traditionnelles tziganes ou le cabaret allemand. Elle souhaite « ouvrir » le son du chant, jouer avec ses défauts, laisser vivre sa spontanéité.",
        "La liberté, elle la trouvera dans le jazz, autour d'Ella Fitzgerald et Nina Simone, mais aussi auprès de Léo Ferré, Henri Salvador ou Édith Piaf. Encouragée par le mécène Peter Schnur à composer ses propres chansons originales, elle mêle tout naturellement dans son répertoire ses compositions et textes en français à des reprises de Gainsbourg, Ferré et Michel Legrand.",
        "En 2025, elle reçoit le prestigieux Prix Évidence de l'Académie du Jazz pour son album « Le Carillon », consacrant un talent déjà reconnu par ses pairs. Cette récompense distingue un enregistrement exceptionnel d'un jeune talent à sortir de l'anonymat."
      ]
    },
    discography: [
      {
        title: 'Petite',
        year: '2021',
        label: 'Blang music sarl',
        description: 'Premier album, révélant un talent prometteur.'
      },
      {
        title: 'Le carillon',
        year: '2024',
        label: 'Quais Son Records',
        description: 'Album primé au Prix Évidence 2025 de l\'Académie du Jazz.'
      }
    ],
    lineup: [
      { name: 'Charlotte Planchou', instrument: 'voix' },
      { name: 'Dexter Goldberg', instrument: 'piano' },
      { name: 'Thomas Posner', instrument: 'contrebasse' },
      { name: 'Pierre Demange', instrument: 'batterie' }
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
  // ARTISTES CONCERTS GRATUITS (gardés tels quels)
  'cavale-trio': {
    name: 'Cavale',
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
        title: 'Cavale - Performance live',
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
      <section className="relative hero-gradient text-white pt-36 pb-16 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 overflow-hidden">
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

          {/* Formation/Lineup */}
          {artist.lineup && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#722f37' }}>
                🎼 Formation
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {artist.lineup.map((member, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg" style={{ color: '#1a1a1a' }}>
                        {member.name}
                      </span>
                      <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#d4af37', color: '#722f37' }}>
                        {member.instrument}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

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

          {/* Vidéos - SECTION MODIFIÉE POUR GÉRER YOUTUBE ET FACEBOOK */}
          {artist.videos && artist.videos.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#722f37' }}>
                🎬 Vidéos
              </h2>
              
              <div className="grid gap-6">
                {artist.videos.map((video, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video">
                      {video.facebookUrl ? (
                        // Affichage spécial pour le lien Facebook
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <a 
                            href={video.facebookUrl}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white text-center hover:scale-105 transition-transform p-8"
                          >
                            <div className="text-6xl mb-4">▶️</div>
                            <div className="text-xl font-bold mb-2">Voir la vidéo sur Facebook</div>
                            <div className="text-base opacity-90">Florin Gugulica Trio</div>
                            <div className="text-sm opacity-75 mt-2">Concerts gratuits à Céret</div>
                          </a>
                        </div>
                      ) : (
                        // Affichage YouTube normal
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
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
export async function generateStaticParams() {
  return Object.keys(artistsData).map((slug) => ({
    slug: slug,
  }))
}