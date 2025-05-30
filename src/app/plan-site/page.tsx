// src/app/plan-site/page.tsx
import React from 'react'
import Link from 'next/link'

export default function PlanSite() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-jazz-red mb-8">Plan du Site</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Pages principales */}
            <div className="bg-jazz-yellow/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-jazz-red mb-4">Pages principales</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-jazz-red hover:underline font-medium">
                    🏠 Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/mot-du-president" className="text-jazz-red hover:underline font-medium">
                    👤 Mot du Président
                  </Link>
                </li>
                <li>
                  <Link href="/programmation" className="text-jazz-red hover:underline font-medium">
                    🎵 Programmation & Billetterie
                  </Link>
                </li>
                <li>
                  <Link href="/artistes" className="text-jazz-red hover:underline font-medium">
                    🎭 Artistes
                  </Link>
                </li>
                <li>
                  <Link href="/benevoles" className="text-jazz-red hover:underline font-medium">
                    🤝 Devenir Bénévole
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-jazz-red hover:underline font-medium">
                    📧 Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pages légales */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-jazz-red mb-4">Informations légales</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/mentions-legales" className="text-jazz-red hover:underline font-medium">
                    📋 Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link href="/politique-confidentialite" className="text-jazz-red hover:underline font-medium">
                    🔒 Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/politique-cookies" className="text-jazz-red hover:underline font-medium">
                    🍪 Politique de Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/plan-site" className="text-jazz-red hover:underline font-medium">
                    🗺️ Plan du Site
                  </Link>
                </li>
              </ul>
            </div>

            {/* Artistes en vedette */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-jazz-red mb-4">Artistes 2025</h2>
              <ul className="space-y-2">
                <li className="text-gray-700">🎷 Manu Le Prince - 27 juillet</li>
                <li className="text-gray-700">🎹 Florin Gugulica - 28 juillet</li>
                <li className="text-gray-700">🎺 Stéfano di Battista - 7 août</li>
                <li className="text-gray-700">🎵 Jacky Terrasson & Camille Bertault - 8 août</li>
                <li className="text-gray-700">🎤 Charlotte Planchou - 9 août</li>
              </ul>
            </div>

            {/* Contact & Réseaux */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-jazz-red mb-4">Nous suivre</h2>
              <div className="space-y-3">
                <p className="text-gray-700">
                  📧 <a href="mailto:contact@jazzentech.com" className="text-jazz-red hover:underline">contact@jazzentech.com</a>
                </p>
                <p className="text-gray-700">
                  📱 Réseaux sociaux (Facebook, Instagram)
                </p>
                <p className="text-gray-700">
                  📍 Céret & St-Génis-les-Fontaines (66)
                </p>
              </div>
            </div>
          </div>

          {/* Information sur l'association */}
          <div className="mt-8 bg-jazz-red text-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-jazz-yellow mb-4">À propos de Jazz en Tech</h2>
            <p className="text-gray-200">
              Association loi 1901 créée pour promouvoir la rencontre entre la tradition jazz et l'innovation 
              technologique. Notre festival propose une programmation unique mêlant artistes confirmés et 
              découvertes musicales dans un cadre exceptionnel des Pyrénées-Orientales.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
