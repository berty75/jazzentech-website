// src/app/plan-site/page.tsx
import React from 'react'
import Link from 'next/link'
import { 
  Home, 
  User, 
  Music, 
  Users, 
  Heart, 
  Mail, 
  FileText, 
  Shield, 
  Cookie, 
  Map, 
  Building,
  Calendar,
  MapPin,
  Phone,
  Star
} from 'lucide-react'

export default function PlanSite() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - AJOUTÉE AVEC PALETTE JAZZ */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Plan du Site
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Naviguez facilement dans l'univers Jazz en Tech grâce à notre plan de site complet
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Map className="w-5 h-5" style={{ color: '#d4af37' }} />
              <span className="text-sm font-medium" style={{ color: '#f7f3e9' }}>Navigation simplifiée</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Grille principale - RESPONSIVE */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            
            {/* Pages principales */}
            <div 
              className="p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Home className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#722f37' }}>Pages principales</h2>
              </div>
              
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/mot-du-president" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mot du Président
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/programmation" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Programmation & Billetterie
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Artistes
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/benevoles" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Devenir Bénévole
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pages légales */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 md:mb-6">
                <Shield className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#722f37' }}>Informations légales</h2>
              </div>
              
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link 
                    href="/mentions-legales" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/politique-confidentialite" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/politique-cookies" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Cookie className="w-4 h-4 mr-2" />
                    Politique de Cookies
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/plan-site" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Plan du Site
                  </Link>
                </li>
              </ul>
            </div>

            {/* Artistes en vedette - RESPONSIVE */}
            <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4 md:mb-6">
                <Music className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#722f37' }}>Artistes 2025</h2>
              </div>
              
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-center text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  <div 
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span><strong>Manu Le Prince</strong> - 27 juillet</span>
                </li>
                <li className="flex items-center text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  <div 
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: '#b87333' }}
                  ></div>
                  <span><strong>Florin Gugulica</strong> - 28 juillet</span>
                </li>
                <li className="flex items-center text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  <div 
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: '#722f37' }}
                  ></div>
                  <span><strong>Stefano Di Battista</strong> - 7 août</span>
                </li>
                <li className="flex items-center text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  <div 
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span><strong>Jacky Terrasson & Camille Bertault</strong> - 8 août</span>
                </li>
                <li className="flex items-center text-xs md:text-sm" style={{ color: '#1a1a1a' }}>
                  <div 
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: '#b87333' }}
                  ></div>
                  <span><strong>Charlotte Planchou</strong> - 9 août</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section contact et informations - RESPONSIVE */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            
            {/* Contact & Réseaux */}
            <div className="bg-white border border-gray-200 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4 md:mb-6">
                <Mail className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#722f37' }}>Nous contacter</h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3" style={{ color: '#d4af37' }} />
                  <a 
                    href="mailto:contact@jazzentech.com" 
                    className="font-medium hover:underline transition-colors text-sm md:text-base"
                    style={{ color: '#722f37' }}
                  >
                    contact@jazzentech.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" style={{ color: '#d4af37' }} />
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>06 08 75 87 67</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-3" style={{ color: '#d4af37' }} />
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Réseaux sociaux (Facebook, Instagram)</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" style={{ color: '#d4af37' }} />
                  <span className="text-sm md:text-base" style={{ color: '#1a1a1a' }}>Céret & St-Génis-des-Fontaines (66)</span>
                </div>
              </div>
            </div>

            {/* Dates importantes */}
            <div 
              className="p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Calendar className="w-6 h-6 mr-3" style={{ color: '#722f37' }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#722f37' }}>Dates importantes</h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div 
                  className="p-3 md:p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                >
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#722f37' }}>Saint-Génis-des-Fontaines</p>
                  <p className="text-xs md:text-sm text-gray-600">27-28 juillet 2025</p>
                </div>
                
                <div 
                  className="p-3 md:p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(184, 115, 51, 0.2)' }}
                >
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#722f37' }}>Céret</p>
                  <p className="text-xs md:text-sm text-gray-600">7-8-9 août 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information sur l'association - COULEURS JAZZ CORRIGÉES */}
          <div 
            className="p-6 md:p-8 rounded-2xl text-white shadow-lg"
            style={{ backgroundColor: '#722f37' }}
          >
            <div className="flex items-center mb-4 md:mb-6">
              <Building className="w-6 h-6 mr-3" style={{ color: '#d4af37' }} />
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#d4af37' }}>
                À propos de Jazz en Tech
              </h2>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed" style={{ color: '#f7f3e9' }}>
              Association loi 1901 créée pour promouvoir la rencontre entre la tradition jazz et l'innovation 
              technologique. Notre festival propose une programmation unique mêlant artistes confirmés et 
              découvertes musicales dans un cadre exceptionnel des Pyrénées-Orientales.
            </p>
            
            <div className="mt-4 md:mt-6 grid sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: '#d4af37' }}
                ></div>
                <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>10ème édition en 2025</span>
              </div>
              
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: '#d4af37' }}
                ></div>
                <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>5 concerts exceptionnels</span>
              </div>
              
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: '#d4af37' }}
                ></div>
                <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>2 lieux magiques</span>
              </div>
              
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: '#d4af37' }}
                ></div>
                <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>Artistes internationaux</span>
              </div>
            </div>
          </div>

          {/* Navigation rapide - NOUVELLE SECTION */}
          <div 
            className="mt-8 md:mt-12 text-center p-4 md:p-6 rounded-2xl"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6" style={{ color: '#722f37' }}>
              Navigation rapide
            </h3>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <Link 
                href="/programmation"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                🎫 Billetterie
              </Link>
              
              <Link 
                href="/artistes"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#d4af37', color: '#722f37' }}
              >
                🎷 Artistes
              </Link>
              
              <Link 
                href="/benevoles"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#b87333', color: '#f7f3e9' }}
              >
                🤝 Bénévolat
              </Link>
              
              <Link 
                href="/contact"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                📧 Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}