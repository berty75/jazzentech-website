import React from 'react'

export default function Benevoles() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-jazz-red mb-8">Devenez Bénévole</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-jazz-yellow/10 p-8 rounded-lg mb-8">
            <p className="text-lg mb-4">
              Un festival, et surtout un festival de jazz fonctionne avec la passion de bénévoles qui en sont le carburant. 
              Jazz en Tech est un festival ambitieux dans sa programmation et modeste dans sa structure alors si vous 
              souhaitez nous épauler, vous serez les bienvenus.
            </p>
            <p className="text-lg">
              Pas besoin d'expérience particulière, juste l'envie de contribuer. 
              On se débrouille ensemble, dans la bonne humeur.
            </p>
          </div>

          {/* Photo du festival */}
          <div className="mb-8">
            <img 
              src="/images/benevoles.jpg" 
              alt="Scène du festival Jazz en Tech avec musiciens et équipe technique"
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-jazz-red mb-4">
                Les petites missions du quotidien
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Aider à monter/démonter
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Tenir la buvette quelques heures
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Orienter les gens qui cherchent leur chemin
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Donner un coup de main là où c'est nécessaire
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Être présent pour que tout se passe bien
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-jazz-red mb-4">
                Ce que ça apporte vraiment
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Voir le festival sous un autre angle
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Partager des moments avec l'équipe
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Contribuer à quelque chose qu'on aime
                </li>
                <li className="flex items-start">
                  <span className="text-jazz-yellow mr-2 font-bold">•</span>
                  Se rendre utile tout simplement
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-jazz-red mb-4">
              Envie de nous rejoindre ?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Contactez-nous au : <span className="font-semibold">06 08 75 87 67</span>
            </p>
            
            <a href="/contact"
              className="inline-block bg-jazz-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors"
            >
              Ou utilisez notre formulaire de contact
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}