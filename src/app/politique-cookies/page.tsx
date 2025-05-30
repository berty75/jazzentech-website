import React from 'react'

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-jazz-red mb-8">Politique de Cookies</h1>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p className="mb-4">
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lors de 
              votre visite sur notre site web. Les cookies permettent au site de reconnaître votre appareil 
              et de mémoriser certaines informations sur vos préférences ou actions passées.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Types de cookies utilisés</h2>
            
            <div className="space-y-6">
              <div className="bg-jazz-yellow/10 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-jazz-red mb-3">Cookies essentiels</h3>
                <p className="mb-2">
                  Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                </p>
                <ul className="list-disc pl-6">
                  <li>Cookies de session pour maintenir votre connexion</li>
                  <li>Cookies de sécurité pour protéger contre les attaques</li>
                  <li>Cookies de préférences pour mémoriser vos choix</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-jazz-red mb-3">Cookies d'analyse</h3>
                <p className="mb-2">
                  Ces cookies nous aident à comprendre comment vous utilisez notre site.
                </p>
                <ul className="list-disc pl-6">
                  <li>Google Analytics pour mesurer l'audience</li>
                  <li>Statistiques de navigation et de performance</li>
                  <li>Données anonymisées sur l'utilisation du site</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-jazz-red mb-3">Cookies de marketing</h3>
                <p className="mb-2">
                  Ces cookies sont utilisés pour vous proposer du contenu personnalisé.
                </p>
                <ul className="list-disc pl-6">
                  <li>Cookies de réseaux sociaux (Facebook, Instagram)</li>
                  <li>Cookies de remarketing pour les publicités</li>
                  <li>Suivi des conversions</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Gestion de vos cookies</h2>
            <p className="mb-4">
              Vous pouvez contrôler et gérer les cookies de plusieurs façons :
            </p>
            
            <div className="bg-jazz-yellow/10 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-jazz-red mb-3">Paramètres du navigateur</h3>
              <p className="mb-3">
                Vous pouvez modifier les paramètres de votre navigateur pour :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Bloquer tous les cookies</li>
                <li>Accepter seulement les cookies essentiels</li>
                <li>Recevoir une notification avant qu'un cookie soit stocké</li>
                <li>Supprimer les cookies existants</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-jazz-red mb-3">Outils de gestion</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google Analytics :</strong> 
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-jazz-red hover:underline ml-1">
                    Plugin de désactivation
                  </a>
                </li>
                <li>
                  <strong>Publicités personnalisées :</strong> 
                  <a href="http://www.youronlinechoices.eu/" className="text-jazz-red hover:underline ml-1">
                    Your Online Choices
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Durée de conservation</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-jazz-yellow/20">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type de cookie</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Cookies de session</td>
                    <td className="border border-gray-300 px-4 py-2">Jusqu'à fermeture du navigateur</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Cookies de préférences</td>
                    <td className="border border-gray-300 px-4 py-2">1 an</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">2 ans</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Cookies marketing</td>
                    <td className="border border-gray-300 px-4 py-2">6 mois à 2 ans</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Conséquences de la désactivation</h2>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="mb-3">
                <strong>⚠️ Important :</strong> La désactivation de certains cookies peut affecter le fonctionnement du site :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Perte de vos préférences et paramètres</li>
                <li>Nécessité de vous identifier à chaque visite</li>
                <li>Certaines fonctionnalités peuvent ne plus fonctionner</li>
                <li>Expérience utilisateur dégradée</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies, contactez-nous à : 
              <a href="mailto:contact@jazzentech.com" className="text-jazz-red hover:underline ml-1">
                contact@jazzentech.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}