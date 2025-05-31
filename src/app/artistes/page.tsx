// src/app/artistes/page.tsx - Version responsive avec palette jazz
import { Calendar, MapPin, Users, Music, Ticket, Play } from 'lucide-react'

export default function Artistes() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - RESPONSIVE ET COULEURS JAZZ */}
      <section className="hero-gradient text-white pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d4af37' }}>
            Nos Artistes
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#f7f3e9' }}>
            Découvrez les talents exceptionnels de cette 10ème édition
          </p>
        </div>
      </section>

      {/* Section Artistes - RESPONSIVE */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Manu Le Prince - COULEURS JAZZ CORRIGÉES */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square">
                  <img 
                    src="/images/manu-le-prince.jpeg" 
                    alt="Manu Le Prince"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl md:text-2xl font-bold">Manu Le Prince</h2>
                    <p className="text-sm opacity-90">Quartet « Bossa Jazz for Ever »</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 md:p-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 h-full">
                    <div>
                      <div 
                        className="rounded-xl p-3 md:p-4 mb-4"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      >
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                          <span className="font-bold text-sm md:text-base" style={{ color: '#722f37' }}>Dim. 27 juillet – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} />
                          <span className="text-xs md:text-sm text-gray-600">Cloître Saint-Génis-des-Fontaines</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#1a1a1a' }}>Formation :</h4>
                        <div className="text-xs md:text-sm text-gray-600 space-y-1">
                          <div>• <strong>Manu Le Prince</strong> – chant</div>
                          <div>• <strong>Franck Monbaylet</strong> – piano</div>
                          <div>• <strong>Philippe Brassoud</strong> – contrebasse</div>
                          <div>• <strong>Christophe Bras</strong> – batterie</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4">
                          Chanteuse sans frontières, <strong>Manu Le Prince</strong> s'est imposée comme 
                          l'une des plus belles voix du Latin Jazz français. Brésilienne de cœur, 
                          elle se partage entre Paris et Rio depuis 30 ans.
                        </p>
                        
                        <div 
                          className="rounded-lg p-2 md:p-3 mb-4"
                          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                        >
                          <p className="text-xs font-medium italic" style={{ color: '#722f37' }}>
                            "Un trésor de la musique brésilienne conçu en France" – Télérama
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=SKgvTVcQEcU" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/manu-le-prince-quartet-bossa-jazz-for-ever" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                        >
                          <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Florin Gugulica - COULEURS JAZZ CORRIGÉES */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square">
                  <img 
                    src="/images/florin-gugulica.jpeg" 
                    alt="Florin Gugulica"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl md:text-2xl font-bold">Florin Gugulica</h2>
                    <p className="text-sm opacity-90">Sextet « It's a long Way »</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 md:p-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 h-full">
                    <div>
                      <div 
                        className="rounded-xl p-3 md:p-4 mb-4"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      >
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                          <span className="font-bold text-sm md:text-base" style={{ color: '#722f37' }}>Lun. 28 juillet – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} />
                          <span className="text-xs md:text-sm text-gray-600">Cloître Saint-Génis-des-Fontaines</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#1a1a1a' }}>Formation :</h4>
                        <div className="text-xs md:text-sm text-gray-600 space-y-1">
                          <div>• <strong>Florin Gugulica</strong> – clarinette</div>
                          <div>• <strong>José Moléro</strong> – trombone</div>
                          <div>• <strong>Gwenaël Ollivier</strong> – piano</div>
                          <div>• <strong>Olivier Lorang</strong> – contrebasse</div>
                          <div>• <strong>Arnaud Le Meur</strong> – batterie</div>
                          <div>• <strong>Alain Brunet</strong> – trompette</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4">
                          <strong>Florin Gugulica</strong> nous embarque dans son univers musical aux horizons 
                          multiples : jazz manouche, taraf balkanique, fanfares tziganes... Des musiques 
                          de tous horizons tissées dans son monde intime.
                        </p>
                        
                        <div 
                          className="rounded-lg p-2 md:p-3 mb-4"
                          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                        >
                          <p className="text-xs font-medium" style={{ color: '#722f37' }}>
                            Avec Didier Lockwood, Bireli Lagrène, Stochelo Rosenberg...
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <a 
                          href="https://www.facebook.com/FestivalJazzenTech/videos/1155459846348417/?ref=embed_video&t=0" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#b87333', color: '#f7f3e9' }}
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Facebook
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                        >
                          <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stefano Di Battista - COULEURS JAZZ CORRIGÉES */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square">
                  <img 
                    src="/images/stefano-di-battista.jpg" 
                    alt="Stefano Di Battista"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl md:text-2xl font-bold">Stefano Di Battista</h2>
                    <p className="text-sm opacity-90">« La Dolce Vita »</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 md:p-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 h-full">
                    <div>
                      <div 
                        className="rounded-xl p-3 md:p-4 mb-4"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      >
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                          <span className="font-bold text-sm md:text-base" style={{ color: '#722f37' }}>Jeu. 7 août – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} />
                          <span className="text-xs md:text-sm text-gray-600">Place de la République – Céret</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#1a1a1a' }}>Formation :</h4>
                        <div className="text-xs md:text-sm text-gray-600 space-y-1">
                          <div>• <strong>Stefano Di Battista</strong> – saxophone</div>
                          <div>• <strong>Fred Nardin</strong> – piano</div>
                          <div>• <strong>Daniel Sorrentino</strong> – contrebasse</div>
                          <div>• <strong>Luigi del Prete</strong> – batterie</div>
                          <div>• <strong>Matteo Cutello</strong> – trompette</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4">
                          Amoureux de la mélodie, magicien du timbre, <strong>Stefano Di Battista</strong> 
                          fait résonner les thèmes de Paolo Conte, Andrea Bocelli, Lucio Dalla... 
                          Un univers de passion, style et beauté italienne.
                        </p>
                        
                        <div 
                          className="rounded-lg p-2 md:p-3 mb-4"
                          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                        >
                          <p className="text-xs font-medium" style={{ color: '#722f37' }}>
                            Avec Michel Petrucciani, Enrico Rava, Aldo Romano...
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=Gjh-v425HPQ" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                        >
                          <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jacky Terrasson & Camille Bertault - COULEURS JAZZ CORRIGÉES */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square">
                  <img 
                    src="/images/jacky-terrasson.jpeg" 
                    alt="Jacky Terrasson"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-lg md:text-xl font-bold">Jacky Terrasson</h2>
                    <p className="text-sm opacity-90">Trio « Moving On » + Camille Bertault</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 md:p-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 h-full">
                    <div>
                      <div 
                        className="rounded-xl p-3 md:p-4 mb-4"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      >
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                          <span className="font-bold text-sm md:text-base" style={{ color: '#722f37' }}>Ven. 8 août – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} />
                          <span className="text-xs md:text-sm text-gray-600">Place de la République – Céret</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#1a1a1a' }}>Formation :</h4>
                        <div className="text-xs md:text-sm text-gray-600 space-y-1">
                          <div>• <strong>Jacky Terrasson</strong> – piano</div>
                          <div>• <strong>Sylvain Romano</strong> – contrebasse</div>
                          <div>• <strong>Lukmil Perez</strong> – batterie</div>
                          <div>• <strong>Camille Bertault</strong> – voix</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-3">
                          Prix Thelonious Monk 1993, <strong>Jacky Terrasson</strong> « le plus voyageur des pianistes » 
                          invite <strong>Camille Bertault</strong>, Victoire du Jazz 2023, pour un quartet d'exception.
                        </p>
                        
                        <div 
                          className="rounded-lg p-2 mb-4"
                          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                        >
                          <p className="text-xs font-medium" style={{ color: '#722f37' }}>
                            « Un sens du rythme stupéfiant, une justesse infaillible » – Jazz Magazine
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=HX0ASXAHf2Y" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                        >
                          <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charlotte Planchou - COULEURS JAZZ CORRIGÉES */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-square">
                  <img 
                    src="/images/charlotte-planchou.jpg" 
                    alt="Charlotte Planchou"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-lg md:text-xl font-bold">Charlotte Planchou</h2>
                    <p className="text-sm opacity-90">Quartet</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-4 md:p-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 h-full">
                    <div>
                      <div 
                        className="rounded-xl p-3 md:p-4 mb-4"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                      >
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: '#722f37' }} />
                          <span className="font-bold text-sm md:text-base" style={{ color: '#722f37' }}>Sam. 9 août – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: '#d4af37' }} />
                          <span className="text-xs md:text-sm text-gray-600">Place de la République – Céret</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm" style={{ color: '#1a1a1a' }}>Formation :</h4>
                        <div className="text-xs md:text-sm text-gray-600 space-y-1">
                          <div>• <strong>Charlotte Planchou</strong> – voix</div>
                          <div>• <strong>Dexter Goldberg</strong> – piano</div>
                          <div>• <strong>Thomas Posner</strong> – contrebasse</div>
                          <div>• <strong>Pierre Demange</strong> – batterie</div>
                        </div>
                      </div>

                      <div 
                        className="rounded-lg p-2 md:p-3"
                        style={{ backgroundColor: 'rgba(114, 47, 55, 0.1)' }}
                      >
                        <p className="text-xs font-bold" style={{ color: '#722f37' }}>
                          🏆 Prix Évidence de l'Académie du Jazz
                        </p>
                        <p className="text-xs" style={{ color: '#722f37' }}>
                          (Révélation de l'année) – Mars 2025
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-3">
                          « Une chanteuse pas comme les autres » (Jazz Magazine) clôturera le festival. 
                          De l'opéra au jazz, elle puise chez Ella Fitzgerald, Nina Simone, Léo Ferré, 
                          Gainsbourg...
                        </p>
                        
                        <div 
                          className="rounded-lg p-2 mb-4"
                          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                        >
                          <p className="text-xs font-medium italic" style={{ color: '#722f37' }}>
                            « Une heure de musique gracieuse et habitée, ça ne se refuse pas » – Jazz Magazine
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=5k4eWo9HHZ4" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
                        >
                          <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: '#d4af37', color: '#722f37' }}
                        >
                          <Ticket className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section - COULEURS JAZZ CORRIGÉES */}
      <section className="py-8 md:py-12 catalan-soft-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            5 concerts exceptionnels vous attendent
          </h2>
          <p className="mb-4 md:mb-6" style={{ color: '#f7f3e9' }}>
            Saint-Génis-des-Fontaines (27-28 juillet) • Céret (7-8-9 août)
          </p>
          <a 
            href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold transition-all duration-300 hover:opacity-90"
            style={{ color: '#722f37' }}
          >
            <Ticket className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Billetterie officielle
          </a>
        </div>
      </section>
    </div>
  )
}