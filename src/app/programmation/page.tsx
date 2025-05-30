import React from 'react'

export default function Programmation() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-jazz-red mb-8">Programmation & Billetterie</h1>
        
        <div className="grid gap-8">
          {/* Boutons de billetterie principaux */}
          <section className="text-center space-y-4">
            <a 
              href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/manu-le-prince-quartet-bossa-jazz-for-ever"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full max-w-2xl bg-jazz-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-800 transition-colors text-lg"
            >
              Billetterie Manu Le Prince - 27 juillet 2025 à St-Génis-les-Fontaines
            </a>
            
            <a 
              href="https://boutique.tourisme-pyrenees-mediterranee.com/evenements/festival-jazzentech-au-cloitre-saint-genis-des-fontaines/florin-gugulica-sextet-its-a-long-way"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full max-w-2xl bg-jazz-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-800 transition-colors text-lg"
            >
              Billetterie Florin Gugulica - 28 juillet 2025 à St-Génis-les-Fontaines
            </a>
          </section>

          {/* Section programmation complète */}
          <section>
            <h2 className="text-2xl font-semibold text-jazz-red mb-6">
              Programme complet
            </h2>
            
            <div className="space-y-4">
              {/* Concert 1 */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Stéfano di Battista "Dolce vita"
                </h3>
                <p className="text-jazz-red font-semibold mb-2">jeudi 7 août 2025</p>
                <p className="text-gray-600 mb-4">Place de la République - Céret (66)</p>
                <button className="bg-jazz-yellow text-jazz-red px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors">
                  Réserver
                </button>
              </div>

              {/* Concert 2 */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Jacky Terrasson & Camille Bertault
                </h3>
                <p className="text-jazz-red font-semibold mb-2">vendredi 8 août 2025</p>
                <p className="text-gray-600 mb-4">Place de la République - Céret (66)</p>
                <button className="bg-jazz-yellow text-jazz-red px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors">
                  Réserver
                </button>
              </div>

              {/* Concert 3 */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Charlotte Planchou
                </h3>
                <p className="text-jazz-red font-semibold mb-2">Samedi 9 août 2025</p>
                <p className="text-gray-600 mb-4">Place de la République - Céret (66)</p>
                <button className="bg-jazz-yellow text-jazz-red px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors">
                  Réserver
                </button>
              </div>

              {/* Pass 2 soirées */}
              <div className="bg-jazz-yellow/10 border border-jazz-yellow rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-jazz-red mb-2">
                  Pass 2 soirées à Céret
                </h3>
                <p className="text-gray-800 mb-4">2 soirées parmi celles du 7 au 9 août 2025</p>
                <button className="bg-jazz-red text-white px-6 py-2 rounded font-semibold hover:bg-red-800 transition-colors">
                  Réserver
                </button>
              </div>

              {/* Pass 3 soirées */}
              <div className="bg-jazz-yellow/10 border border-jazz-yellow rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-jazz-red mb-2">
                  Pass 3 soirées à Céret
                </h3>
                <p className="text-gray-800 mb-4">Les 3 soirées du 7 au 9 août 2025</p>
                <button className="bg-jazz-red text-white px-6 py-2 rounded font-semibold hover:bg-red-800 transition-colors">
                  Réserver
                </button>
              </div>
            </div>
          </section>

          {/* Information billetterie */}
          <section className="bg-jazz-yellow/10 p-6 rounded-lg">
            <p className="text-center text-gray-600">
              <span className="font-semibold">Billet non reçu ?</span> Cliquez ici
            </p>
            <p className="text-center text-gray-600 mt-2">
              <span className="font-semibold">Fin des ventes dans</span> 2 mois, 12 jours
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}