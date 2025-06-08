import { Music, Calendar, MapPin, Heart, Award, Users } from 'lucide-react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mot du Président - Jazz en Tech 2025',
  description: 'Message de bienvenue du président du festival Jazz en Tech 2025.'
}

export default function MotDuPresident() {
  return (
    <div className="min-h-screen bg-white">
      <title>Mot du Président - Jazz en Tech 2025</title>
      {/* Hero Section - 10ème anniversaire RESPONSIVE */}
      <section className="relative overflow-hidden">
      <div className="hero-gradient text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16 lg:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-block bg-jazz-gold text-jazz-red px-3 md:px-4 py-2 rounded-full font-bold text-xs md:text-sm mb-4">
                  🎉 10ème Anniversaire
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight text-jazz-gold">
                  Mot du Président
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-warm-cream leading-relaxed mb-4 md:mb-6">
                  "Dix années de passion, de découvertes et de partage autour du jazz. 
                  Un anniversaire que nous célébrons avec les plus belles voix et les musiciens les plus passionnants."
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
                  <img 
                    src="/images/alain-brunet.jpeg" 
                    alt="Alain Brunet, Président de Jazz en Tech"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-jazz-gold rounded-full flex items-center justify-center text-jazz-red font-bold text-xs md:text-sm">
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

      {/* Message du président - RESPONSIVE */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Introduction 10ème anniversaire */}
            <div className="bg-warm-cream rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-jazz-red mb-4 md:mb-6 flex items-center">
                <Award className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                10ème anniversaire
              </h2>
              <p className="text-base md:text-lg text-jazz-black leading-relaxed">
                Cet anniversaire, c'est l'occasion pour le festival de recevoir sur scène les plus belles 
                musiciennes et chanteuses, les plus passionnants musiciens et donc de s'honorer en offrant 
                ces beaux cadeaux à toutes celles et tous ceux qui aiment le jazz… depuis dix ans ou peut-être 
                même depuis leurs « dix ans. »
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                
                {/* Programme détaillé */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-jazz-red mb-4 md:mb-6">Une programmation d'exception</h2>
                  
                  {/* Saint-Genis-des-Fontaines */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-jazz-gold mr-2" />
                      <span className="font-semibold text-jazz-red text-sm md:text-base">Dimanche 27 juillet</span>
                    </div>
                    <div className="flex items-center mb-3 md:mb-4">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-jazz-gold mr-2" />
                      <span className="text-gray-600 text-sm md:text-base">Cloître de Saint-Genis-des-Fontaines</span>
                    </div>
                    <p className="text-jazz-black text-sm md:text-base leading-relaxed">
                      Tout commence au cloître de Saint-Genis-des Fontaines avec un concert donné dans le cadre 
                      de l'année du Brésil en France : le quartet de la chanteuse <strong>Manu le Prince</strong>, 
                      qui vit entre Paris et Rio de Janeiro, nous livrera quelques trésors de la musique brésilienne 
                      avec sa fougue et le talent qu'on lui connaît.
                    </p>
                  </div>

                  {/* Florin Gugulica */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-jazz-gold mr-2" />
                      <span className="font-semibold text-jazz-red text-sm md:text-base">Lundi 28 juillet</span>
                    </div>
                    <p className="text-jazz-black text-sm md:text-base leading-relaxed">
                      Le lendemain, c'est le clarinettiste virtuose <strong>Florin Gugulica</strong> bien connu 
                      des Catalans qui occupera la scène à la tête d'un sextet, pour une création où le jazz et 
                      les musiques du monde feront la fête ensemble pour le plus grand plaisir du public.
                    </p>
                  </div>

                  {/* Céret - cœur du festival AVEC DATE */}
                  <div className="bg-jazz-gold bg-opacity-10 rounded-xl p-4 md:p-6 mb-4 md:mb-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-jazz-gold mr-2" />
                      <span className="font-semibold text-jazz-red text-sm md:text-base">Jeudi 7 août</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-jazz-red mb-3 md:mb-4">Céret, cœur du festival</h3>
                    <p className="text-jazz-black text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                      Céret est devenu depuis 3 ans le cœur du festival. L'excellentissime saxophoniste 
                      <strong> Stefano Di Battista</strong> sera ainsi à l'honneur en ouvrant la scène à Céret, 
                      capitale de tous les arts depuis plus d'un siècle, le 7 août, place de la République.
                    </p>
                    <p className="text-jazz-black text-sm md:text-base leading-relaxed">
                      Il le fera avec des musiques de la « Dolce Vita », le film de Federico Fellini. 
                      Ce qui ajoutera à la magie du jazz, celle du cinéma le plus créatif. Et aussi l'enthousiasme 
                      de la culture italienne avec tous les thèmes de cette musique que nous sommes si nombreux à aimer.
                    </p>
                  </div>

                  {/* Jacky Terrasson et Camille Bertault */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-jazz-gold mr-2" />
                      <span className="font-semibold text-jazz-red text-sm md:text-base">Vendredi 8 août</span>
                    </div>
                    <p className="text-jazz-black text-sm md:text-base leading-relaxed">
                      Il sera suivi vendredi 8 août du pianiste <strong>Jacky Terrasson</strong> qui, pour l'occasion, 
                      invite la chanteuse <strong>Camille Bertault</strong>, l'une des chanteuses les plus passionnantes 
                      qui soit. À n'en pas douter, un quartet d'exception conduit par deux stars du jazz européen.
                    </p>
                  </div>

                  {/* Charlotte Planchou AVEC DATE */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-jazz-gold mr-2" />
                      <span className="font-semibold text-jazz-red text-sm md:text-base">Samedi 9 août</span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-jazz-red mb-2 md:mb-3">Charlotte Planchou clôture le festival</h3>
                    <p className="text-jazz-black text-sm md:text-base leading-relaxed">
                      Autre chanteuse pour clore les concerts céretans, <strong>Charlotte Planchou</strong>, 
                      « une chanteuse pas comme les autres » se plaît à rappeler Jazz Magazine. Après avoir chanté l'opéra, 
                      elle consacre dorénavant son répertoire à la chanson française sans oublier Nina Simone et Ella Fitzgerald. 
                      « Révélation de l'année » pour L'académie du jazz, nous sommes très heureux de l'avoir convaincue 
                      de clore la 10ème édition du festival.
                    </p>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-jazz-red text-white rounded-xl p-6 md:p-8">
                  <p className="text-base md:text-lg leading-relaxed mb-3 md:mb-4">
                    Jazz en Tech nous promet ainsi cinq soirées de rêve et d'enchantement à des tarifs très raisonnables, 
                    mais aussi des <strong>concerts gratuits</strong> en fin de matinée et d'après-midi entre le 6 et 
                    le 9 août avec d'excellents musiciens régionaux.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed italic">
                    Des moments où « la vie est douce », émouvante, joyeuse. Quand elle bat au rythme du jazz.
                  </p>
                </div>
              </div>

              {/* Sidebar - RESPONSIVE */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-4 md:space-y-6">
                  
                  {/* Informations pratiques */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
                    <h3 className="text-base md:text-lg font-bold text-jazz-red mb-4 md:mb-6 flex items-center">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Informations pratiques
                    </h3>
                    
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-jazz-black text-sm md:text-base">Dates</span>
                        </div>
                        <div className="text-gray-600 ml-5 md:ml-6 text-sm md:text-base">Du 27 juillet au 9 août</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-jazz-black text-sm md:text-base">Lieux</span>
                        </div>
                        <div className="text-gray-600 ml-5 md:ml-6 space-y-1 text-sm md:text-base">
                          <div>• Saint-Genis-des-Fontaines</div>
                          <div>• Céret, place de la République</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Music className="w-3 h-3 md:w-4 md:h-4 text-jazz-gold mr-2" />
                          <span className="font-semibold text-jazz-black text-sm md:text-base">Artistes</span>
                        </div>
                        <div className="text-gray-600 ml-5 md:ml-6 space-y-1 text-sm md:text-base">
                          <div>• Manu le Prince</div>
                          <div>• Florin Gugulica</div>
                          <div>• Stefano Di Battista</div>
                          <div>• Jacky Terrasson</div>
                          <div>• Camille Bertault</div>
                          <div>• Charlotte Planchou</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                        <span className="text-jazz-gold-accessible mr-2 text-sm md:text-base">🎟️</span>
                          <span className="font-semibold text-jazz-black text-sm md:text-base">Tarifs</span>
                        </div>
                        <div className="text-gray-600 ml-5 md:ml-6 text-sm md:text-base">
                          Tarifs très raisonnables + concerts gratuits
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nos engagements */}
                  <div className="bg-jazz-gold bg-opacity-10 rounded-2xl p-4 md:p-6 border border-jazz-gold border-opacity-30">
                    <h3 className="text-base md:text-lg font-bold text-jazz-red mb-4 md:mb-6 flex items-center">
                      <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Nos engagements
                    </h3>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm md:text-lg">🚲</span>
                        </div>
                        <div>
                          <div className="font-semibold text-jazz-black text-sm md:text-base">Mobilités douces</div>
                          <div className="text-xs md:text-sm text-gray-600 mt-1">
                            Pour nous rejoindre, privilégiez les mobilités douces
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm md:text-lg">💜</span>
                        </div>
                        <div>
                          <div className="font-semibold text-jazz-black text-sm md:text-base">Contre les violences</div>
                          <div className="text-xs md:text-sm text-gray-600 mt-1">
                            Jazz en Tech participe contre les violences faites aux femmes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA - Bouton d'action */}
                  <div className="bg-jazz-red text-white rounded-2xl p-4 md:p-6 text-center">
                    <h4 className="font-bold mb-2 md:mb-3 text-sm md:text-base">Réservez vos places</h4>
                    <p className="text-xs md:text-sm text-warm-cream mb-3 md:mb-4">
                      Ne ratez pas cette 10ème édition exceptionnelle
                    </p>
                    <a 
                      href="/programmation" 
                      className="inline-block bg-jazz-gold text-jazz-red px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-sm md:text-base"
                    >
                      Voir la programmation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Vidéos CORRIGÉE */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-jazz-red mb-4">Découvrez Jazz en Tech en vidéo</h2>
              <p className="text-base md:text-lg text-gray-600">
                Jazz en Tech c'est aussi...
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Première vidéo - Arles sur tech */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
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
                <h3 className="font-bold text-lg text-jazz-red text-center mb-2">
                  des moments d'exception
                </h3>
              </div>

              {/* Deuxième vidéo - Javanaise CORRIGÉE */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
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
                <h3 className="font-bold text-lg text-jazz-red text-center mb-2">
                  un festival transfrontalier
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  24 juillet 2023, concert à Sant Joan de les Abadesses
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature - RESPONSIVE */}
      <section className="py-12 md:py-16 warm-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-jazz-red rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-white text-lg md:text-2xl font-bold">
                AB
              </div>
              <h3 className="text-lg md:text-xl font-bold text-jazz-red mb-2">Alain Brunet</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Président de Jazz en Tech</p>
              <p className="text-xs md:text-sm text-gray-500 italic">
                "Des moments où la vie est douce, émouvante, joyeuse.<br />
                Quand elle bat au rythme du jazz."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}