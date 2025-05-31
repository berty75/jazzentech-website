import Link from 'next/link'
import { Calendar, Music, Users, Star, MapPin, Ticket } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec effet artistique */}
      <section className="bg-hero-gradient text-white py-24 relative overflow-hidden">
        {/* Éléments artistiques de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-persian-blue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-midnight-blue rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Jazz en Tech
              </h1>
              <div className="inline-block bg-white text-oxford-blue px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                🎉 10ème Édition - Été 2025
              </div>
              <p className="text-xl mb-8 max-w-2xl text-gray-100">
                Le festival de jazz qui marie tradition et innovation technologique
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/programmation"
                  className="inline-block bg-white text-oxford-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Billetterie & Programmation
                </Link>
                <Link
                  href="/artistes"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-oxford-blue transition-all duration-300 transform hover:scale-105"
                >
                  Découvrir les Artistes
                </Link>
              </div>
            </div>
            
            {/* AFFICHE OFFICIELLE avec effet artistique */}
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-20 transform rotate-3"></div>
              <img 
                src="/images/affiche-2025.jpg" 
                alt="Affiche Jazz en Tech 2025 - 10ème édition"
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos - design en losange */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-oxford-blue mb-6">
                Un festival <span className="text-persian-blue">unique</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Jazz en Tech est le premier festival qui unit la richesse du jazz traditionnel 
                aux innovations technologiques d'aujourd'hui. Une expérience musicale 
                immersive qui repousse les frontières de l'art.
              </p>
              <Link 
                href="/mot-du-president"
                className="inline-flex items-center text-oxford-blue hover:text-persian-blue font-semibold group transition-colors"
              >
                Découvrir notre vision 
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
            
            {/* Design en losange - SIMPLE ET EFFICACE */}
            <div className="relative w-80 h-80 mx-auto">
              
              {/* Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="w-20 h-20 bg-oxford-blue rounded-2xl flex items-center justify-center mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold text-oxford-blue">Artistes</div>
                <div className="text-xs text-gray-600">Exceptionnels</div>
              </div>
              
              {/* Right */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-center">
                <div className="w-20 h-20 bg-persian-blue rounded-2xl flex items-center justify-center mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold text-oxford-blue">Public</div>
                <div className="text-xs text-gray-600">Passionné</div>
              </div>
              
              {/* Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                <div className="w-20 h-20 bg-penn-blue rounded-2xl flex items-center justify-center mb-3 shadow-lg transform rotate-12 hover:scale-110 transition-all duration-300">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold text-oxford-blue">Événements</div>
                <div className="text-xs text-gray-600">Inoubliables</div>
              </div>
              
              {/* Left */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-center">
                <div className="w-20 h-20 bg-midnight-blue rounded-2xl flex items-center justify-center mb-3 shadow-lg transform -rotate-12 hover:scale-110 transition-all duration-300">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-bold text-oxford-blue">Expérience</div>
                <div className="text-xs text-gray-600">Unique</div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Section Dates importantes - artistique */}
      <section className="py-16 bg-warm-gradient relative overflow-hidden">
        {/* Éléments décoratifs flottants */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-spin-slow"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-persian-blue rounded-full animate-spin-slow delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 border-2 border-white rounded-full animate-spin-slow delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-oxford-blue mb-4">
              10ème édition - Été 2025
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center transform hover:-translate-y-3 transition-all duration-300 border border-white/30">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-oxford-blue/20 rounded-full blur-xl"></div>
                <Calendar className="relative w-16 h-16 text-oxford-blue mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-oxford-blue mb-2">27-28 Juillet</h3>
              <p className="text-gray-600 mb-3">Saint-Genis-des-Fontaines</p>
              <div className="text-sm text-gray-500 space-y-1">
                <div>• Manu le Prince</div>
                <div>• Florin Gugulica</div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center transform hover:-translate-y-3 transition-all duration-300 border border-white/30">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-persian-blue/20 rounded-full blur-xl"></div>
                <MapPin className="relative w-16 h-16 text-persian-blue mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-oxford-blue mb-2">7-8-9 Août</h3>
              <p className="text-gray-600 mb-3">Céret, place de la République</p>
              <div className="text-sm text-gray-500 space-y-1">
                <div>• Stefano Di Battista</div>
                <div>• Jacky Terrasson & Camille Bertault</div>
                <div>• Charlotte Planchou</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Actualités - artistique */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Formes artistiques */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-0 w-80 h-80 bg-oxford-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-persian-blue rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-oxford-blue mb-12 text-center">
            Actualités
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-persian-blue to-midnight-blue flex items-center justify-center relative overflow-hidden">
                <Music className="w-16 h-16 text-white group-hover:scale-125 transition-transform duration-300" />
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-oxford-blue mb-3 group-hover:text-persian-blue transition-colors">
                  Programmation 2025 dévoilée
                </h3>
                <p className="text-gray-600 mb-4">
                  Découvrez les artistes exceptionnels qui monteront sur scène pour cette 10ème édition...
                </p>
                <Link 
                  href="/programmation"
                  className="inline-flex items-center text-oxford-blue hover:text-persian-blue font-semibold group/link transition-colors"
                >
                  Lire la suite 
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </article>

            <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-oxford-blue to-penn-blue flex items-center justify-center relative overflow-hidden">
                <Users className="w-16 h-16 text-persian-blue group-hover:scale-125 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-oxford-blue mb-3 group-hover:text-persian-blue transition-colors">
                  Appel aux bénévoles
                </h3>
                <p className="text-gray-600 mb-4">
                  Rejoignez notre équipe et vivez le festival de l'intérieur...
                </p>
                <Link 
                  href="/benevoles"
                  className="inline-flex items-center text-oxford-blue hover:text-persian-blue font-semibold group/link transition-colors"
                >
                  Lire la suite 
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </article>

            <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-penn-blue to-midnight-blue flex items-center justify-center relative overflow-hidden">
                <Ticket className="w-16 h-16 text-persian-blue group-hover:scale-125 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-oxford-blue mb-3 group-hover:text-persian-blue transition-colors">
                  Billetterie ouverte
                </h3>
                <p className="text-gray-600 mb-4">
                  Les billets sont maintenant disponibles à tarifs très raisonnables...
                </p>
                <Link 
                  href="/programmation"
                  className="inline-flex items-center text-oxford-blue hover:text-persian-blue font-semibold group/link transition-colors"
                >
                  Lire la suite 
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA final - artistique */}
      <section className="py-16 bg-catalan-soft-gradient text-white relative overflow-hidden">
        {/* Éléments artistiques animés */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 border border-midnight-blue rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-white rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Prêt pour cette 10ème édition ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Réservez vos billets dès maintenant pour vivre Jazz en Tech 2025
          </p>
          <Link 
            href="/programmation" 
            className="inline-block bg-white text-oxford-blue px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Réserver mes billets
          </Link>
        </div>
      </section>
    </div>
  )
}