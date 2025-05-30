import React from 'react'

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-jazz-red mb-8">Politique de Confidentialité</h1>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <p className="mb-4">
              L'association (loi 1901) Jazz En Tech (« nous », « notre », « nos ») exploite le site web 
              <a href="https://www.jazzentech.com" className="text-jazz-red hover:underline">https://www.jazzentech.com</a> 
              (ci-après désigné par le terme « Service »).
            </p>
            <p className="mb-4">
              Cette page vous explique nos politiques en matière de collecte, d'utilisation et de communication 
              des données à caractère personnel lorsque vous utilisez notre Service ainsi que les choix qui 
              s'offrent à vous en ce qui concerne ces données.
            </p>
            <p>
              Nous utilisons vos données pour fournir et améliorer le Service. En utilisant le Service, vous 
              consentez à la collecte et à l'utilisation d'informations conformément à la présente politique.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Définitions</h2>
            <ul className="space-y-3">
              <li><strong>Service :</strong> Par Service on entend le site web https://www.jazzentech.com exploité par l'association (loi 1901) Jazz En Tech.</li>
              <li><strong>Données à caractère personnel :</strong> Données concernant un individu vivant qui peut être identifié à partir de ces données.</li>
              <li><strong>Données d'Utilisation :</strong> Données recueillies automatiquement et générées par l'utilisation du Service.</li>
              <li><strong>Cookies :</strong> Petits fichiers enregistrés sur votre dispositif (ordinateur ou dispositif mobile).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Collecte et utilisation des données</h2>
            
            <h3 className="text-xl font-semibold text-jazz-red mb-3">Données à Caractère Personnel</h3>
            <p className="mb-4">
              Lorsque vous utilisez notre Service, il est possible que nous vous demandions de nous fournir 
              certaines données personnelles nominatives qui peuvent servir à vous contacter ou à vous identifier :
            </p>
            <ul className="mb-4">
              <li>Adresse e-mail</li>
              <li>Prénom et nom de famille</li>
              <li>Cookies et Données d'Utilisation</li>
            </ul>

            <h3 className="text-xl font-semibold text-jazz-red mb-3">Données d'Utilisation</h3>
            <p>
              Nous pouvons également recueillir des informations relatives au mode d'accès et d'utilisation 
              du Service. Ces données peuvent comprendre l'adresse IP de votre ordinateur, le type de navigateur, 
              la version du navigateur, les pages consultées, la date et l'heure de visite, etc.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Utilisation des données</h2>
            <p className="mb-4">Nous utilisons les données recueillies à des fins diverses :</p>
            <ul className="space-y-2">
              <li>Pour fournir et assurer notre Service</li>
              <li>Pour vous faire part des changements apportés à notre Service</li>
              <li>Pour assurer l'assistance client</li>
              <li>Pour améliorer notre Service</li>
              <li>Pour détecter, prévenir et régler les problèmes techniques</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Droits RGPD</h2>
            <p className="mb-4">
              Si vous résidez dans l'Espace économique européen (EEE), vous avez certains droits en matière 
              de protection des données :
            </p>
            <ul className="space-y-2">
              <li>Droit d'accès aux informations que nous détenons</li>
              <li>Droit de rectification</li>
              <li>Droit d'opposition</li>
              <li>Droit de limitation</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit au retrait du consentement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Sécurité des données</h2>
            <p>
              La sécurité de vos données nous tient à cœur. Nous nous efforcions d'utiliser des méthodes 
              commercialement acceptables pour protéger vos données personnelles, bien qu'aucune méthode 
              de transmission ou de stockage ne soit sûre à 100%.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-jazz-red mb-4">Nous contacter</h2>
            <p>
              Pour toute question relative à cette Politique de Confidentialité, veuillez nous contacter à : 
              <a href="mailto:contact@jazzentech.com" className="text-jazz-red hover:underline">contact@jazzentech.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}