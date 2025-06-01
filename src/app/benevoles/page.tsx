import React from 'react'
import { Heart, Users, Clock, Phone, Mail, MapPin, Ticket } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Devenir Bénévole - Jazz en Tech 2025',
  description: 'Rejoignez notre équipe de bénévoles pour le festival Jazz en Tech 2025. Vivez le festival de l\'intérieur !'
}

export default function Benevoles() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - AJOUTÉE AVEC PALETTE JAZZ */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Devenez Bénévole
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Rejoignez l'aventure Jazz en Tech et vivez le festival de l'intérieur !
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Heart className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>L'esprit d'équipe</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Introduction - RESPONSIVE ET COULEURS JAZZ */}
          <div 
            className="p-6 md:p-8 rounded-2xl mb-8 md:mb-12"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          >
            <p className="text-base md:text-lg mb-4 leading-relaxed" style={{ color: '#1a1a1a' }}>
              Un festival, et surtout un festival de jazz fonctionne avec la passion de bénévoles qui en sont le carburant. 
              Jazz en Tech est un festival ambitieux dans sa programmation et modeste dans sa structure alors si vous 
              souhaitez nous épauler, vous serez les bienvenus.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#1a1a1a' }}>
              Pas besoin d'expérience particulière, juste l'envie de contribuer. 
              On se débrouille ensemble, dans la bonne humeur.
            </p>
          </div>

          {/* Photo du festival - RESPONSIVE */}
          <div className="mb-8 md:mb-12">
            <img 
              src="/images/benevoles.jpg" 
              alt="Scène du festival Jazz en Tech avec musiciens et équipe technique"
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Grille des informations - RESPONSIVE */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            
            {/* Missions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 md:mb-6">
                <Users className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#722f37' }}>
                  Les petites missions du quotidien
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Aider à monter/démonter</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Tenir la buvette quelques heures</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Orienter les gens qui cherchent leur chemin</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Donner un coup de main là où c'est nécessaire</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Être présent pour que tout se passe bien</span>
                </li>
              </ul>
            </div>
            
            {/* Avantages */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 md:mb-6">
                <Heart className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#722f37' }}>
                  Ce que ça apporte vraiment
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Voir le festival sous un autre angle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Partager des moments avec l'équipe</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Contribuer à quelque chose qu'on aime</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Se rendre utile tout simplement</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold text-lg text-jazz-gold-accessible">•</span>
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Accès privilégié aux concerts</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Informations pratiques - NOUVELLE SECTION */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            
            <div 
              className="text-center p-4 md:p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
              <h4 className="font-semibold mb-2" style={{ color: '#722f37' }}>Durée d'engagement</h4>
              <p className="text-sm md:text-base text-gray-600">De quelques heures à plusieurs jours</p>
            </div>

            <div 
              className="text-center p-4 md:p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
            >
              <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
              <h4 className="font-semibold mb-2" style={{ color: '#722f37' }}>Lieux</h4>
              <p className="text-sm md:text-base text-gray-600">Saint-Génis & Céret</p>
            </div>

            <div 
              className="text-center p-4 md:p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(184, 115, 51, 0.1)' }}
            >
              <Ticket className="w-8 h-8 mx-auto mb-3" style={{ color: '#722f37' }} />
              <h4 className="font-semibold mb-2" style={{ color: '#722f37' }}>Avantages</h4>
              <p className="text-sm md:text-base text-gray-600">T-shirt + repas + concerts</p>
            </div>
          </div>

          {/* Témoignages - NOUVELLE SECTION */}
          <div 
            className="p-6 md:p-8 rounded-2xl mb-8 md:mb-12"
            style={{ backgroundColor: 'rgba(114, 47, 55, 0.05)' }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8" style={{ color: '#722f37' }}>
              Ils témoignent
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <p className="text-sm md:text-base italic mb-3" style={{ color: '#1a1a1a' }}>
                  "Une expérience incroyable ! J'ai découvert le festival sous un autre angle et rencontré des gens formidables."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#d4af37' }}>
                    <span className="text-sm font-bold" style={{ color: '#722f37' }}>M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#722f37' }}>Marie</p>
                    <p className="text-xs text-gray-600">Bénévole depuis 2023</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <p className="text-sm md:text-base italic mb-3" style={{ color: '#1a1a1a' }}>
                  "L'ambiance est extraordinaire, on se sent vraiment utile et on vit le jazz de près !"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-copper-accessible rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-white">P</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#722f37' }}>Pierre</p>
                    <p className="text-xs text-gray-600">Bénévole depuis 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section contact - COULEURS JAZZ CORRIGÉES */}
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6" style={{ color: '#722f37' }}>
              Envie de nous rejoindre ?
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto mb-6 md:mb-8">
              <div 
                className="p-4 md:p-6 rounded-xl text-center"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
              >
                <Phone className="w-6 h-6 mx-auto mb-2" style={{ color: '#722f37' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>Appelez-nous</p>
                <p className="font-bold" style={{ color: '#722f37' }}>06 08 75 87 67</p>
              </div>

              <div 
                className="p-4 md:p-6 rounded-xl text-center"
                style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
              >
                <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: '#722f37' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#1a1a1a' }}>Écrivez-nous</p>
                <p className="font-bold text-sm" style={{ color: '#722f37' }}>contact@jazzentech.com</p>
              </div>
            </div>
            
            <a 
              href="/contact"
              className="btn-primary inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
            >
              Ou utilisez notre formulaire de contact
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}