// src/app/artistes/page.tsx - Version avec format carré sur desktop
import { Calendar, MapPin, Users, Music, Ticket, Play } from 'lucide-react'

export default function Artistes() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-jazz-yellow">
            Nos Artistes
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Découvrez les talents exceptionnels de cette 10ème édition
          </p>
        </div>
      </section>

      {/* Section Artistes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {/* Manu Le Prince */}
          <div className="max-w-5xl mx-auto mb-12">
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
                    <h2 className="text-2xl font-bold">Manu Le Prince</h2>
                    <p className="text-sm opacity-90">Quartet « Bossa Jazz for Ever »</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    <div>
                      <div className="bg-jazz-yellow bg-opacity-10 rounded-xl p-4 mb-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-jazz-red mr-2" />
                          <span className="font-bold text-jazz-red">Dim. 27 juillet – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-jazz-yellow mr-2" />
                          <span className="text-sm text-gray-600">Cloître Saint-Génis-des-Fontaines</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Formation :</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• <strong>Manu Le Prince</strong> – chant</div>
                          <div>• <strong>Franck Monbaylet</strong> – piano</div>
                          <div>• <strong>Philippe Brassoud</strong> – contrebasse</div>
                          <div>• <strong>Christophe Bras</strong> – batterie</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          Chanteuse sans frontières, <strong>Manu Le Prince</strong> s'est imposée comme 
                          l'une des plus belles voix du Latin Jazz français. Brésilienne de cœur, 
                          elle se partage entre Paris et Rio depuis 30 ans.
                        </p>
                        
                        <div className="bg-jazz-yellow bg-opacity-10 rounded-lg p-3 mb-4">
                          <p className="text-xs text-jazz-red font-medium italic">
                            "Un trésor de la musique brésilienne conçu en France" – Télérama
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=SKgvTVcQEcU" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/manu-le-prince-quartet-bossa-jazz-for-ever" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-jazz-yellow text-jazz-red px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
                        >
                          <Ticket className="w-4 h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Florin Gugulica */}
          <div className="max-w-5xl mx-auto mb-12">
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
                    <h2 className="text-2xl font-bold">Florin Gugulica</h2>
                    <p className="text-sm opacity-90">Sextet « It's a long Way »</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    <div>
                      <div className="bg-jazz-yellow bg-opacity-10 rounded-xl p-4 mb-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-jazz-red mr-2" />
                          <span className="font-bold text-jazz-red">Lun. 28 juillet – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-jazz-yellow mr-2" />
                          <span className="text-sm text-gray-600">Cloître Saint-Génis-des-Fontaines</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Formation :</h4>
                        <div className="text-sm text-gray-600 space-y-1">
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
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          <strong>Florin Gugulica</strong> nous embarque dans son univers musical aux horizons 
                          multiples : jazz manouche, taraf balkanique, fanfares tziganes... Des musiques 
                          de tous horizons tissées dans son monde intime.
                        </p>
                        
                        <div className="bg-jazz-yellow bg-opacity-10 rounded-lg p-3 mb-4">
                          <p className="text-xs text-jazz-red font-medium">
                            Avec Didier Lockwood, Bireli Lagrène, Stochelo Rosenberg...
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href="https://www.facebook.com/FestivalJazzenTech/videos/1155459846348417/?ref=embed_video&t=0" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Facebook
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-jazz-yellow text-jazz-red px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
                        >
                          <Ticket className="w-4 h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stefano Di Battista */}
          <div className="max-w-5xl mx-auto mb-12">
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
                    <h2 className="text-2xl font-bold">Stefano Di Battista</h2>
                    <p className="text-sm opacity-90">« La Dolce Vita »</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    <div>
                      <div className="bg-jazz-yellow bg-opacity-10 rounded-xl p-4 mb-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-jazz-red mr-2" />
                          <span className="font-bold text-jazz-red">Jeu. 7 août – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-jazz-yellow mr-2" />
                          <span className="text-sm text-gray-600">Place de la République – Céret</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Formation :</h4>
                        <div className="text-sm text-gray-600 space-y-1">
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
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          Amoureux de la mélodie, magicien du timbre, <strong>Stefano Di Battista</strong> 
                          fait résonner les thèmes de Paolo Conte, Andrea Bocelli, Lucio Dalla... 
                          Un univers de passion, style et beauté italienne.
                        </p>
                        
                        <div className="bg-jazz-yellow bg-opacity-10 rounded-lg p-3 mb-4">
                          <p className="text-xs text-jazz-red font-medium">
                            Avec Michel Petrucciani, Enrico Rava, Aldo Romano...
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=Gjh-v425HPQ" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-jazz-yellow text-jazz-red px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
                        >
                          <Ticket className="w-4 h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jacky Terrasson & Camille Bertault */}
          <div className="max-w-5xl mx-auto mb-12">
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
                    <h2 className="text-xl font-bold">Jacky Terrasson</h2>
                    <p className="text-sm opacity-90">Trio « Moving On » + Camille Bertault</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    <div>
                      <div className="bg-jazz-yellow bg-opacity-10 rounded-xl p-4 mb-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-jazz-red mr-2" />
                          <span className="font-bold text-jazz-red">Ven. 8 août – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-jazz-yellow mr-2" />
                          <span className="text-sm text-gray-600">Place de la République – Céret</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Formation :</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• <strong>Jacky Terrasson</strong> – piano</div>
                          <div>• <strong>Sylvain Romano</strong> – contrebasse</div>
                          <div>• <strong>Lukmil Perez</strong> – batterie</div>
                          <div>• <strong>Camille Bertault</strong> – voix</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          Prix Thelonious Monk 1993, <strong>Jacky Terrasson</strong> « le plus voyageur des pianistes » 
                          invite <strong>Camille Bertault</strong>, Victoire du Jazz 2023, pour un quartet d'exception.
                        </p>
                        
                        <div className="bg-jazz-yellow bg-opacity-10 rounded-lg p-2 mb-4">
                          <p className="text-xs text-jazz-red font-medium">
                            « Un sens du rythme stupéfiant, une justesse infaillible » – Jazz Magazine
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=HX0ASXAHf2Y" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-jazz-yellow text-jazz-red px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
                        >
                          <Ticket className="w-4 h-4 mr-1" />
                          Billets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charlotte Planchou */}
          <div className="max-w-5xl mx-auto mb-12">
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
                    <h2 className="text-xl font-bold">Charlotte Planchou</h2>
                    <p className="text-sm opacity-90">Quartet</p>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    <div>
                      <div className="bg-jazz-yellow bg-opacity-10 rounded-xl p-4 mb-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 text-jazz-red mr-2" />
                          <span className="font-bold text-jazz-red">Sam. 9 août – 21h</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-jazz-yellow mr-2" />
                          <span className="text-sm text-gray-600">Place de la République – Céret</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Formation :</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• <strong>Charlotte Planchou</strong> – voix</div>
                          <div>• <strong>Dexter Goldberg</strong> – piano</div>
                          <div>• <strong>Thomas Posner</strong> – contrebasse</div>
                          <div>• <strong>Pierre Demange</strong> – batterie</div>
                        </div>
                      </div>

                      <div className="bg-jazz-red bg-opacity-10 rounded-lg p-3">
                        <p className="text-xs text-jazz-red font-bold">
                          🏆 Prix Évidence de l'Académie du Jazz
                        </p>
                        <p className="text-xs text-jazz-red">
                          (Révélation de l'année) – Mars 2025
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          « Une chanteuse pas comme les autres » (Jazz Magazine) clôturera le festival. 
                          De l'opéra au jazz, elle puise chez Ella Fitzgerald, Nina Simone, Léo Ferré, 
                          Gainsbourg...
                        </p>
                        
                        <div className="bg-jazz-yellow bg-opacity-10 rounded-lg p-2 mb-4">
                          <p className="text-xs text-jazz-red font-medium italic">
                            « Une heure de musique gracieuse et habitée, ça ne se refuse pas » – Jazz Magazine
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href="https://www.youtube.com/watch?v=5k4eWo9HHZ4" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          YouTube
                        </a>
                        <a 
                          href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center bg-jazz-yellow text-jazz-red px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors"
                        >
                          <Ticket className="w-4 h-4 mr-1" />
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

      {/* CTA Section */}
      <section className="py-12 catalan-soft-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            5 concerts exceptionnels vous attendent
          </h2>
          <p className="mb-6 text-gray-100">
            Saint-Génis-des-Fontaines (27-28 juillet) • Céret (7-8-9 août)
          </p>
          <a 
            href="https://boutique.tourisme-pyrenees-mediterranee.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-jazz-red px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Billetterie officielle
          </a>
        </div>
      </section>
    </div>
  )
}