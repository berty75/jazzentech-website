import { Music, Calendar, MapPin, Heart, Award, Users } from 'lucide-react'

import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Mot du Président - Jazz en Tech 2025',
  description: 'Message et bilan de la 10ème édition du festival Jazz en Tech 2025.'
}

export default function MotDuPresident() {
  return (
    <div className="min-h-screen">
      <title>Mot du Président - Jazz en Tech 2025</title>
      {/* Hero Section - 10ème anniversaire RESPONSIVE */}
      <section className="relative overflow-hidden">
      <div className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-block bg-jazz-gold text-white px-3 md:px-4 py-2 rounded-full font-bold text-xs md:text-sm mb-4">
                  🎉 10ème Anniversaire - Bilan
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight text-white">
                  Mot du Président
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-warm-cream leading-relaxed mb-4 md:mb-6">
                  "Cette 10ème édition a été un très beau succès. Dix années de passion, de découvertes 
                  et de partage autour du jazz que nous avons célébrées avec les plus belles voix et 
                  les musiciens les plus passionnants."
                </p>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-jazz-gold bg-opacity-20 rounded-full flex items-center justify-center">
                    <Music className="w-5 h-5 md:w-6 md:h-6 text-jazz-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Alain Brunet</p>
                    <p className="text-warm-cream text-xs md:text-sm opacity-80">Président de Jazz en Tech</p>
                  </div>
                </div>
              </div>
              
              {/* Photo du président - RESPONSIVE */}
              <div className="relative">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
                <Image 
                      src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/v1757764875/alain-brunet_gb0jx1.jpg" 
                      alt="Alain Brunet, Président de Jazz en Tech"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                  <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-jazz-gold rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    <div className="text-center">
                      <div className="text-xs">10ème</div>
                      <div className="text-xs">édition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Remerciements - PRINCIPAL */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Titre principal */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block px-4 py-2 rounded-full font-bold text-sm mb-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                ✅ Bilan 10ème édition
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Un très beau succès
              </h2>
              <p className="text-base md:text-lg text-stone-300">
                Retour sur une 10ème édition couronnée de succès
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                
                {/* Bilan de fréquentation - TEXTE EXACT */}
                <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                    <Users className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                    Bilan de fréquentation
                  </h3>
                  
                  <div className="space-y-4 md:space-y-6">
                    <p className="text-base md:text-lg text-white leading-relaxed">
                      La 10ème édition de Jazz en Tech qui s'est déroulée dans les Pyrénées-Orientales 
                      à Saint-Génis-des-Fontaines (27/28 juillet) et Céret (6-9 août) a connu un très beau succès.
                    </p>
                    
                    <div className="border-l-4 border-jazz-gold pl-4">
                      <h4 className="font-semibold text-white mb-2">Saint-Génis-des-Fontaines</h4>
                      <p className="text-sm md:text-base text-stone-300">
                        Le cloître roman de Saint-Génis-des-Fontaines fît le plein les deux soirs au point 
                        que quelques personnes ne purent accéder, à notre plus grand regret, à ce lieu 
                        historique à la belle acoustique.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-jazz-gold pl-4">
                      <h4 className="font-semibold text-white mb-2">Céret</h4>
                      <p className="text-sm md:text-base text-stone-300">
                        A Céret, la place de la République connut une affluence record à deux reprises 
                        les 7 et 8 août. Les 500 chaises disposées par les services techniques de la ville 
                        furent toutes occupées. Le 9 août, si quelques chaises restèrent disponibles, 
                        ce fut toutefois une très belle assistance qui put apprécier et applaudir le 
                        quartet de la chanteuse Charlotte Planchou.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                      <p className="text-base md:text-lg text-white font-medium">
                        Le bilan de cette 10ème édition est donc un bon bilan en termes de fréquentation 
                        et de qualité des concerts ce qui nous permet d'envisager 2026 avec plus de sérénité.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remerciements détaillés - TEXTE EXACT */}
                <div className="text-white rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                    Nos remerciements chaleureux
                  </h3>
                  
                  <p className="text-base md:text-lg text-warm-cream mb-6">
                    Je tiens à remercier chaleureusement toutes celles et ceux qui ont permis 
                    la réalisation du festival.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Les 30 bénévoles de Céret et Saint-Génis-des Fontaines</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">La mairie de Céret, son service culture, l'équipe de la médiathèque, les services techniques</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">La mairie de Saint-Génis-des-Fontaines</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Les offices de tourisme de Céret, Vallespir Tourisme et Saint-Génis-des-Fontaines Pyrénées-Méditerranée</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Les mécènes du festival</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">La région Occitanie</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Le département des Pyrénées-Orientales</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">La Spedidam</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-jazz-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">L'ensemble des intermittents du spectacle- musiciens et techniciens- qui constituent le cœur d'un festival</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                    <p className="text-base md:text-lg text-warm-cream">
                      Et bien sûr le public qui nous a fait confiance et que nous espérons retrouver 
                      aussi nombreux en 2026 pour une 11ème édition festive et heureuse.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar - RESPONSIVE */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-4 md:space-y-6">
                  
                  {/* Informations pratiques 2025 */}
                  <div className="rounded-2xl p-4 md:p-6" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                    <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Édition 2025
                    </h3>
                    
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm md:text-base">Dates</span>
                        </div>
                        <div className=" ml-5 md:ml-6 text-sm md:text-base" style={{ color: '#f7f3e9' }}>27 juillet - 9 août</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm md:text-base">Lieux</span>
                        </div>
                        <div className=" ml-5 md:ml-6 space-y-1 text-sm md:text-base" style={{ color: '#f7f3e9' }}>
                          <div>• Saint-Génis-des-Fontaines</div>
                          <div>• Céret</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Music className="w-3 h-3 md:w-4 md:h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-white text-sm md:text-base">Artistes</span>
                        </div>
                        <div className=" ml-5 md:ml-6 space-y-1 text-sm md:text-base" style={{ color: '#f7f3e9' }}>
                          <div>• Manu le Prince</div>
                          <div>• Florin Gugulica</div>
                          <div>• Stefano Di Battista</div>
                          <div>• Jacky Terrasson</div>
                          <div>• Camille Bertault</div>
                          <div>• Charlotte Planchou</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nos engagements */}
                  <div className="rounded-2xl p-4 md:p-6" style={{ backgroundColor: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                    <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center">
                      <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Nos engagements
                    </h3>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm md:text-lg">🚲</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm md:text-base">Mobilités douces</div>
                          <div className="text-xs md:text-sm text-stone-300 mt-1">
                            Pour nous rejoindre, privilégiez les mobilités douces
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm md:text-lg">💜</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm md:text-base">Contre les violences</div>
                          <div className="text-xs md:text-sm text-stone-300 mt-1">
                            Jazz en Tech participe contre les violences faites aux femmes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA - Vision 2026 */}
                  <div className="text-white rounded-2xl p-4 md:p-6 text-center" style={{ backgroundColor: 'rgba(114, 47, 55, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                    <h4 className="font-bold mb-2 md:mb-3 text-sm md:text-base">À l'année prochaine</h4>
                    <p className="text-xs md:text-sm text-warm-cream mb-3 md:mb-4">
                      Rendez-vous en 2026 pour une 11ème édition festive et heureuse
                    </p>
                    <a 
                      href="/galerie" 
                      className="inline-block bg-jazz-gold text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm md:text-base"
                    >
                      Revivre l'édition 2025
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vidéos - CONSERVÉE */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Découvrez Jazz en Tech en vidéo</h2>
              <p className="text-base md:text-lg text-stone-300">
                Jazz en Tech c'est aussi...
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Première vidéo - Arles sur tech */}
              <div className="rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/oLzreIDvkJ8?si=2jgYBaPq1MNRjSqL"
                    title="Jazz en Tech - Vidéo 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="font-bold text-lg text-center mb-2" style={{ color: '#d4af37' }}>
                  des moments d'exception
                </h3>
              </div>

              {/* Deuxième vidéo - Javanaise */}
              <div className="rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/D5HyggB1Iv4?si=XVvYZIDjLxnO4tj2"
                    title="Jazz en Tech - Vidéo 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="font-bold text-lg text-center mb-2" style={{ color: '#d4af37' }}>
                  un festival transfrontalier
                </h3>
                <p className="text-sm text-center" style={{ color: '#f7f3e9' }}>
                  24 juillet 2023, concert à Sant Joan de les Abadesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature - RESPONSIVE */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl p-6 md:p-8 shadow-lg" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-jazz-red rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-white text-lg md:text-2xl font-bold">
                AB
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Alain Brunet</h3>
              <p className="mb-3 md:mb-4 text-sm md:text-base" style={{ color: '#d4af37' }}>Président de Jazz en Tech</p>
              <p className="text-xs md:text-sm italic" style={{ color: '#f7f3e9' }}>
                "Merci à tous ceux qui ont rendu possible cette 10ème édition exceptionnelle."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}