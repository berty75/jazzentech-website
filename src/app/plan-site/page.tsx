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
  Star,
  Ticket,
  Newspaper,
  Camera
} from 'lucide-react'

export default function PlanSite() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Plan du Site
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#f7f3e9' }}>
            Naviguez facilement dans l'univers Jazz en Tech grâce à notre plan de site complet
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Map className="w-5 h-5" style={{ color: "#d4af37" }} />
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
              className="p-4 md:p-6 rounded-2xl transition-shadow"
              style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Home className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Pages principales</h2>
              </div>
              
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link 
                    href="/" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/mot-du-president" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mot du Président
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/programmation" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Programmation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/galerie" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Galerie Photos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/billetterie" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Billetterie
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/benevoles" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Devenir Bénévole
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dossier-presse" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Newspaper className="w-4 h-4 mr-2" />
                    Dossier de Presse
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pages des artistes individuels - TOUS LES ARTISTES */}
            <div 
              className="p-4 md:p-6 rounded-2xl transition-shadow"
              style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Star className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Artistes 2025</h2>
              </div>
              
              <ul className="space-y-3 md:space-y-4">
                {/* Artistes concerts payants */}
                <li>
                  <div className="mb-2">
                    <h3 className="text-xs font-bold uppercase text-stone-400 mb-2">Concerts Payants</h3>
                  </div>
                </li>
                <li>
                  <Link 
                    href="/artistes/manu-le-prince" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Manu Le Prince
                    <span className="ml-auto text-xs text-stone-400">27 juillet</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/florin-gugulica" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Florin Gugulica
                    <span className="ml-auto text-xs text-stone-400">28 juillet</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/stefano-di-battista" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Stefano Di Battista
                    <span className="ml-auto text-xs text-stone-400">7 août</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/jacky-terrasson" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Jacky Terrasson
                    <span className="ml-auto text-xs text-stone-400">8 août</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/camille-bertault" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Camille Bertault
                    <span className="ml-auto text-xs text-amber-400 font-semibold">8 août - INVITÉE</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/charlotte-planchou" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Charlotte Planchou
                    <span className="ml-auto text-xs text-stone-400">9 août</span>
                  </Link>
                </li>
                
                {/* Séparateur */}
                <li>
                  <div className="border-t border-opacity-20 my-3"></div>
                  <div className="mb-2">
                    <h4 className="text-xs font-bold uppercase text-amber-400 mb-2">Concerts Gratuits - 2 Podiums</h4>
                  </div>
                </li>
                
                {/* Artistes concerts gratuits */}
                <li>
                  <Link 
                    href="/artistes/triton-66" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Triton 66
                    <span className="ml-auto text-xs text-amber-400 font-semibold">6-7 août - GRATUIT</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/florin-gugulica" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Florin Gugulica Trio
                    <span className="ml-auto text-xs text-amber-400 font-semibold">6,7,9 août - GRATUIT</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/david-vilayleck" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    David Vilayleck
                    <span className="ml-auto text-xs text-amber-400 font-semibold">8 août - GRATUIT</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/artistes/cavale-trio" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Cavale
                    <span className="ml-auto text-xs text-amber-400 font-semibold">8-9 août - GRATUIT</span>
                  </Link>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-opacity-20">
                <p className="text-xs md:text-sm text-stone-300">
                  🎵 Pages individuelles dédiées à chaque artiste
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  🎫 Concerts payants • 🎵 Concerts gratuits sur 2 podiums
                </p>
              </div>
            </div>

            {/* Pages légales */}
            <div className="p-4 md:p-6 rounded-2xl transition-shadow" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <div className="flex items-center mb-4 md:mb-6">
                <Shield className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Informations légales</h2>
              </div>
              
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <Link 
                    href="/mentions-legales" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/politique-confidentialite" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/politique-cookies" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Cookie className="w-4 h-4 mr-2" />
                    Politique de Cookies
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/plan-site" 
                    className="flex items-center font-medium transition-all duration-300 hover:translate-x-1 text-sm md:text-base"
                    style={{ color: '#d4af37' }}
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Plan du Site
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Section billetterie et réservations */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            
            {/* Billetterie et réservations */}
            <div 
              className="p-4 md:p-6 rounded-2xl transition-shadow"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Ticket className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Billetterie & Réservations</h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#d4af37'
                  }}
                >
                  <h3 className="font-semibold text-sm md:text-base mb-2" style={{ color: '#f7f3e9' }}>Concerts Payants</h3>
                  <p className="text-xs md:text-sm text-stone-300">27-28 juillet & 7-8-9 août 2025</p>
                  <p className="text-xs text-stone-400">Via Billetweb - Billetterie principale</p>
                  <p className="text-xs text-stone-400 mt-1">🎤 6 concerts avec billetterie</p>
                </div>
                
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#b87333'
                  }}
                >
                  <h3 className="font-semibold text-sm md:text-base mb-2" style={{ color: '#b87333' }}>Concerts Gratuits</h3>
                  <p className="text-xs md:text-sm text-stone-300">6, 7, 8 et 9 août 2025</p>
                  <p className="text-xs text-amber-400 font-bold">🎉 ACCÈS LIBRE - 2 PODIUMS</p>
                  <p className="text-xs text-stone-400">📍 Bd Maréchal Joffre & Place Picasso</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-opacity-20">
                <Link 
                  href="/billetterie"
                  className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Accéder à la billetterie
                </Link>
              </div>
            </div>

            {/* Lieux du festival */}
            <div className="p-4 md:p-6 rounded-2xl transition-shadow" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <div className="flex items-center mb-4 md:mb-6">
                <MapPin className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Lieux du Festival</h2>
              </div>
              
              <div className="space-y-4">
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#d4af37'
                  }}
                >
                  <h3 className="font-semibold text-sm md:text-base mb-2" style={{ color: '#f7f3e9' }}>Saint-Génis-des-Fontaines</h3>
                  <p className="text-xs md:text-sm text-stone-300 mb-1">Cloître historique</p>
                  <p className="text-xs text-stone-400">27-28 juillet 2025 • Concerts payants</p>
                  <div className="flex items-center text-xs text-stone-400 mt-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Pyrénées-Orientales (66)</span>
                  </div>
                </div>
                
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#d4af37'
                  }}
                >
                  <h3 className="font-semibold text-sm md:text-base mb-2" style={{ color: '#f7f3e9' }}>Céret - Place de la République</h3>
                  <p className="text-xs md:text-sm text-stone-300 mb-1">Concerts payants</p>
                  <p className="text-xs text-stone-400">7-8-9 août 2025 • Billetterie</p>
                  <div className="flex items-center text-xs text-stone-400 mt-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>Capitale de l'art moderne</span>
                  </div>
                </div>
                
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#b87333'
                  }}
                >
                  <h3 className="font-semibold text-sm md:text-base mb-2" style={{ color: '#b87333' }}>Céret - 2 Podiums Gratuits</h3>
                  <p className="text-xs md:text-sm text-stone-300 mb-1">Bd Maréchal Joffre & Place Picasso</p>
                  <p className="text-xs text-amber-400 font-bold">6-9 août 2025 • ACCÈS LIBRE</p>
                  <div className="flex items-center text-xs text-stone-400 mt-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>11h, 17h et 18h • Navigation GPS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section contact et informations */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            
            {/* Contact & Réseaux */}
            <div className="p-4 md:p-6 rounded-2xl transition-shadow" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <div className="flex items-center mb-4 md:mb-6">
                <Mail className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Nous contacter</h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3" style={{ color: '#d4af37' }} />
                  <a 
                    href="mailto:contactjazzentech@gmail.com" 
                    className="font-medium hover:underline transition-colors text-sm md:text-base"
                    style={{ color: '#f7f3e9' }}
                  >
                    contactjazzentech@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" style={{ color: '#d4af37' }} />
                  <a 
                    href="tel:0608758767"
                    className="font-medium hover:underline transition-colors text-sm md:text-base"
                    style={{ color: '#f7f3e9' }}
                  >
                    06 08 75 87 67
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Camera className="w-4 h-4 mr-3" style={{ color: "#d4af37" }} />
                  <span className="text-sm md:text-base" style={{ color: '#f7f3e9' }}>Réseaux sociaux (Facebook, Instagram)</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" style={{ color: "#d4af37" }} />
                  <span className="text-sm md:text-base" style={{ color: '#f7f3e9' }}>Céret & St-Génis-des-Fontaines (66)</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-opacity-20">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Formulaire de contact
                </Link>
              </div>
            </div>

            {/* Dates importantes */}
            <div 
              className="p-4 md:p-6 rounded-2xl transition-shadow"
              style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <Calendar className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-lg md:text-2xl font-semibold" style={{ color: '#f7f3e9' }}>Dates importantes</h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#d4af37'
                  }}
                >
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#f7f3e9' }}>Saint-Génis-des-Fontaines</p>
                  <p className="text-xs md:text-sm text-stone-300">27-28 juillet 2025</p>
                  <p className="text-xs text-stone-400">Ouverture du festival • Concerts payants</p>
                </div>
                
                <div 
                  className="p-3 md:p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: 'rgba(26, 26, 26, 0.4)',
                    borderColor: '#b87333'
                  }}
                >
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#b87333' }}>Céret - Concerts Gratuits</p>
                  <p className="text-xs md:text-sm text-stone-300">6-9 août 2025</p>
                  <p className="text-xs text-amber-400 font-bold">2 podiums simultanés • 11h, 17h, 18h</p>
                  <p className="text-xs text-stone-400 mt-1">📍 Bd Maréchal Joffre & Place Picasso</p>
                </div>
                
                <div 
                  className="p-3 md:p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(184, 115, 51, 0.2)' }}
                >
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#f7f3e9' }}>Céret - Concerts Payants</p>
                  <p className="text-xs md:text-sm text-stone-300">7-8-9 août 2025</p>
                  <p className="text-xs text-stone-400">Cœur du festival - 3 soirées</p>
                  <p className="text-xs text-stone-400 mt-1">🎤 Place de la République</p>
                </div>
              </div>
            </div>
          </div>

          {/* Information sur l'association */}
          <div 
            className="p-6 md:p-8 rounded-2xl text-white shadow-lg mb-8 md:mb-12"
            style={{ backgroundColor: '#722f37' }}
          >
            <div className="flex items-center mb-4 md:mb-6">
              <Building className="w-6 h-6 mr-3" style={{ color: "#f7f3e9" }} />
                <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#d4af37' }}>
                  À propos de Jazz en Tech
                </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#f7f3e9' }}>
                  Association loi 1901 créée pour promouvoir la rencontre entre la tradition jazz et l'innovation 
                  technologique. Notre festival propose une programmation unique mêlant artistes confirmés et 
                  découvertes musicales dans un cadre exceptionnel des Pyrénées-Orientales.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: '#d4af37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>SIRET : 838 417 012 00013</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: '#d4af37' }}
                    ></div>
                    <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>Président : Alain Brunet</span>
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
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
                  <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>10 artistes exceptionnels</span>
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>3 lieux magiques</span>
                </div>
                
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: '#d4af37' }}
                  ></div>
                  <span className="text-xs md:text-sm" style={{ color: '#f7f3e9' }}>2 podiums gratuits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation rapide */}
          <div 
            className="text-center p-4 md:p-6 rounded-2xl"
            style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6" style={{ color: '#f7f3e9' }}>
              Navigation rapide
            </h3>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
              <Link 
                href="/billetterie"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                🎫 Billetterie
              </Link>
              
              <Link 
                href="/programmation"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#d4af37', color: '#722f37' }}
              >
                🎵 Programme
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
              
              <Link 
                href="/dossier-presse"
                className="px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                style={{ backgroundColor: '#d4af37', color: '#722f37' }}
              >
                📰 Presse
              </Link>
            </div>
            
            <p className="text-xs md:text-sm text-stone-300">
              🗺️ Cette page présente l'architecture complète du site Jazz en Tech
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}