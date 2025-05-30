import Link from 'next/link'
import { Calendar, Music, Users, Star, MapPin, Ticket } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec affiche */}
      <section className="hero-gradient text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-jazz-yellow">
                Jazz en Tech
              </h1>
              <div className="inline-block bg-jazz-yellow text-jazz-red px-4 py-2 rounded-full font-bold text-sm mb-6">
                🎉 10ème Édition - Été 2025
              </div>
              <p className="text-xl mb-8 max-w-2xl text-gray-200">
                Le festival de jazz qui marie tradition et innovation technologique
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/programmation"
                  className="inline-block bg-jazz-yellow text-jazz-red px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                >
                  Billetterie & Programmation
                </Link>
                <Link
                  href="/artistes"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-jazz-red transition-colors"
                >
                  Découvrir les Artistes
                </Link>
              </div>
            </div>
            
            {/* AFFICHE OFFICIELLE */}
            <div className="relative">
              <img 
                src="/images/affiche-2025.jpg" 
                alt="Affiche Jazz en Tech 2025 - 10ème édition"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-jazz-red mb-6">
                Un festival <span className="text-jazz-yellow">unique</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Jazz en Tech est le premier festival qui unit la richesse du jazz traditionnel 
                aux innovations technologiques d'aujourd'hui. Une expérience musicale 
                immersive qui repousse les frontières de l'art.
              </p>
              <Link 
                href="/mot-du-president"
                className="text-jazz-red hover:text-jazz-yellow font-semibold"
              >
                Découvrir notre vision →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <Music className="w-12 h-12 text-jazz-red mx-auto mb-3" />
                <h3 className="font-bold text-jazz-red">Artistes</h3>
                <p className="text-gray-600">Exceptionnels</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-jazz-yellow mx-auto mb-3" />
                <h3 className="font-bold text-jazz-red">Public</h3>
                <p className="text-gray-600">Passionné</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <Calendar className="w-12 h-12 text-jazz-red mx-auto mb-3" />
                <h3 className="font-bold text-jazz-red">Événements</h3>
                <p className="text-gray-600">Inoubliables</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <Star className="w-12 h-12 text-jazz-yellow mx-auto mb-3" />
                <h3 className="font-bold text-jazz-red">Expérience</h3>
                <p className="text-gray-600">Unique</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Dates importantes */}
      <section className="py-16 warm-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-jazz-red mb-4">
              10ème édition - Été 2025
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <Calendar className="w-16 h-16 text-jazz-red mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-jazz-red mb-2">27-28 Juillet</h3>
              <p className="text-gray-600 mb-3">Saint-Genis-des-Fontaines</p>
              <div className="text-sm text-gray-500">
                <div>• Manu le Prince</div>
                <div>• Florin Gugulica</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <MapPin className="w-16 h-16 text-jazz-yellow mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-jazz-red mb-2">7-8-9 Août</h3>
              <p className="text-gray-600 mb-3">Céret, place de la République</p>
              <div className="text-sm text-gray-500">
                <div>• Stefano Di Battista</div>
                <div>• Jacky Terrasson & Camille Bertault</div>
                <div>• Charlotte Planchou</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Actualités */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-jazz-red mb-12 text-center">
            Actualités
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-jazz-yellow flex items-center justify-center">
                <Music className="w-16 h-16 text-jazz-red" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-jazz-red mb-3">
                  Programmation 2025 dévoilée
                </h3>
                <p className="text-gray-600 mb-4">
                  Découvrez les artistes exceptionnels qui monteront sur scène pour cette 10ème édition...
                </p>
                <Link 
                  href="/programmation"
                  className="text-jazz-red hover:text-jazz-yellow font-semibold"
                >
                  Lire la suite →
                </Link>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-jazz-red flex items-center justify-center">
                <Users className="w-16 h-16 text-jazz-yellow" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-jazz-red mb-3">
                  Appel aux bénévoles
                </h3>
                <p className="text-gray-600 mb-4">
                  Rejoignez notre équipe et vivez le festival de l'intérieur...
                </p>
                <Link 
                  href="/benevoles"
                  className="text-jazz-red hover:text-jazz-yellow font-semibold"
                >
                  Lire la suite →
                </Link>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <Ticket className="w-16 h-16 text-jazz-yellow" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-jazz-red mb-3">
                  Billetterie ouverte
                </h3>
                <p className="text-gray-600 mb-4">
                  Les billets sont maintenant disponibles à tarifs très raisonnables...
                </p>
                <Link 
                  href="/programmation"
                  className="text-jazz-red hover:text-jazz-yellow font-semibold"
                >
                  Lire la suite →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 catalan-soft-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt pour cette 10ème édition ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-100">
            Réservez vos billets dès maintenant pour vivre Jazz en Tech 2025
          </p>
          <Link 
            href="/programmation" 
            className="inline-block bg-white text-jazz-red px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Réserver mes billets
          </Link>
        </div>
      </section>
    </div>
  )
}