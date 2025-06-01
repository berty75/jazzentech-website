import React from 'react'
import { Download, Newspaper, Quote, Calendar, Users, Award, ExternalLink, Image as ImageIcon, Phone, Mail } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dossier de Presse - Jazz en Tech 2025',
  description: 'Dossier de presse officiel du festival Jazz en Tech 2025. Informations pour les médias et journalistes.'
}

export default function DossierPresse() {
  const coupuresPresse = [
    {
      id: 1,
      journal: "L'Indépendant / Vallespir",
      date: "2024",
      titre: "D'une résidence musicale à la scène de l'Union pour le Florin Gugulica sextet",
      image: "/images/presse/vallespir-florin-1.jpeg",
      description: "Florin Gugulica, clarinettiste d'une exceptionnelle virtuosité, nous embarque dans son univers musical aux horizons multiples."
    },
    {
      id: 2,
      journal: "Vallespir",
      date: "2024", 
      titre: "À l'Union, ce fut un exceptionnel concert du Florin Gugulica sextet",
      image: "/images/presse/vallespir-florin-2.jpeg",
      description: "Une soirée jazz mémorable avec le sextet de Florin Gugulica dans un voyage musical diversifié."
    },
    {
      id: 3,
      journal: "Local",
      date: "2024",
      titre: "Les Chapitres ont tant aimé Saint-Germain des prés !",
      image: "/images/presse/arles-chapitres.jpeg", 
      description: "Jazz à Arles-sur-Tech avec Les Chapitres dans une ambiance conviviale et festive."
    },
    {
      id: 4,
      journal: "Eurorégion",
      date: "2025",
      titre: "Le jazz du monde au rendez-vous des 10 ans du festival Jazz en Tech",
      image: "/images/presse/euroregion-10ans.jpeg",
      description: "Dossier spécial pour la 10ème édition avec une programmation exceptionnelle d'artistes internationaux."
    }
  ]

  const citations = [
    {
      texte: "Un trésor de la musique brésilienne conçu en France",
      source: "Télérama",
      artiste: "Manu Le Prince"
    },
    {
      texte: "Une chanteuse pas comme les autres",
      source: "Jazz Magazine", 
      artiste: "Charlotte Planchou"
    },
    {
      texte: "Le plus voyageur des pianistes de jazz",
      source: "Télérama",
      artiste: "Jacky Terrasson"
    },
    {
      texte: "Un sens du rythme stupéfiant, une justesse infaillible",
      source: "Jazz Magazine",
      artiste: "Camille Bertault"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
        <title>Dossier de Presse - Jazz en Tech 2025</title>
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Dossier de Presse
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6" style={{ color: '#f7f3e9' }}>
            Découvrez la couverture médiatique de Jazz en Tech - 10ème édition
          </p>
          
          {/* Bouton téléchargement PDF principal */}
          <a 
            href="/documents/jazz-en-tech-dossier-presse-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm md:text-base"
            style={{ backgroundColor: '#d4af37', color: '#722f37' }}
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger le dossier complet (PDF)
          </a>
          
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Newspaper className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Relations Presse</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">

          {/* Informations clés */}
          <section className="mb-8 md:mb-12">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <div 
                className="text-center p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
                <h3 className="font-bold text-sm md:text-base mb-2" style={{ color: '#722f37' }}>10ème édition</h3>
                <p className="text-xs md:text-sm text-gray-600">27-28 juillet & 7-8-9 août 2025</p>
              </div>
              
              <div 
                className="text-center p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
              >
                <Users className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
                <h3 className="font-bold text-sm md:text-base mb-2" style={{ color: '#722f37' }}>5 concerts</h3>
                <p className="text-xs md:text-sm text-gray-600">Artistes internationaux</p>
              </div>
              
              <div 
                className="text-center p-4 md:p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)' }}
              >
                <Award className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
                <h3 className="font-bold text-sm md:text-base mb-2" style={{ color: '#722f37' }}>2 lieux magiques</h3>
                <p className="text-xs md:text-sm text-gray-600">Saint-Génis & Céret</p>
              </div>
            </div>
          </section>

          {/* Citations presse */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-6">
              <Quote className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#722f37' }}>Ce qu'en dit la presse</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {citations.map((citation, index) => (
                <div 
                  key={index}
                  className="p-4 md:p-6 rounded-xl border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                    borderColor: '#d4af37'
                  }}
                >
                  <Quote className="w-5 h-5 mb-3" style={{ color: '#d4af37' }} />
                  <p className="text-xs md:text-sm italic mb-3" style={{ color: '#1a1a1a' }}>
                    « {citation.texte} »
                  </p>
                  <div className="text-xs">
                    <p className="font-semibold" style={{ color: '#722f37' }}>{citation.source}</p>
                    <p className="text-gray-600">{citation.artiste}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Revue de presse */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center mb-6">
              <ImageIcon className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#722f37' }}>Revue de presse</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {coupuresPresse.map((article) => (
                <div key={article.id} className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden" style={{ height: '250px' }}>
                    <img 
                      src={article.image}
                      alt={article.titre}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <span 
                      className="inline-block px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#722f37' }}
                    >
                      {article.journal}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{article.date}</span>
                  </div>
                  
                  <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2" style={{ color: '#1a1a1a' }}>
                    {article.titre}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  
                  {/* Remplacer le bouton onClick par un lien normal */}
                  <a 
                    href={article.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-medium hover:underline flex items-center"
                    style={{ color: '#722f37' }}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Voir en grand
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Contact presse */}
          <section 
            className="p-6 md:p-8 rounded-xl"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-6 text-center" style={{ color: '#722f37' }}>
              Contact Relations Presse
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(114, 47, 55, 0.2)' }}
                >
                  <Users className="w-6 h-6" style={{ color: '#722f37' }} />
                </div>
                <p className="font-semibold text-sm md:text-base mb-1" style={{ color: '#1a1a1a' }}>Alain Brunet</p>
                <p className="text-xs md:text-sm text-gray-600 mb-3">Président de Jazz en Tech</p>
                <a 
                  href="mailto:contact@jazzentech.com" 
                  className="inline-flex items-center text-xs md:text-sm hover:underline"
                  style={{ color: '#722f37' }}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  contact@jazzentech.com
                </a>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                >
                  <Phone className="w-6 h-6" style={{ color: '#722f37' }} />
                </div>
                <p className="font-semibold text-sm md:text-base mb-1" style={{ color: '#1a1a1a' }}>Téléphone</p>
                <p className="text-xs md:text-sm text-gray-600 mb-3">Contact direct</p>
                <a 
                  href="tel:0608758767"
                  className="text-sm md:text-base font-medium"
                  style={{ color: '#722f37' }}
                >
                  06 08 75 87 67
                </a>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <a 
                href="/documents/jazz-en-tech-dossier-presse-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 text-sm md:text-base"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                <Download className="w-4 h-4 mr-2" />
                Dossier complet (PDF)
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}