'use client'

import React, { useState, useEffect } from 'react'

// Composant compte à rebours
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Date de fin des ventes - 25 juillet 2025 à 23h59
    const targetDate = new Date('2025-07-25T23:59:59').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown() // Mise à jour immédiate
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4">
      {/* Jours */}
      <div className="bg-jazz-red text-white rounded-lg p-3 text-center min-w-[60px] shadow-lg">
        <div className="text-xl sm:text-2xl font-bold">{timeLeft.days}</div>
        <div className="text-xs uppercase tracking-wide">Jours</div>
      </div>
      
      <div className="text-jazz-red text-xl font-bold">:</div>
      
      {/* Heures */}
      <div className="bg-jazz-red text-white rounded-lg p-3 text-center min-w-[60px] shadow-lg">
        <div className="text-xl sm:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Heures</div>
      </div>
      
      <div className="text-jazz-red text-xl font-bold">:</div>
      
      {/* Minutes */}
      <div className="bg-jazz-yellow text-jazz-red rounded-lg p-3 text-center min-w-[60px] shadow-lg">
        <div className="text-xl sm:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Min</div>
      </div>
      
      <div className="text-jazz-red text-xl font-bold">:</div>
      
      {/* Secondes */}
      <div className="bg-jazz-yellow text-jazz-red rounded-lg p-3 text-center min-w-[60px] shadow-lg">
        <div className="text-xl sm:text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="text-xs uppercase tracking-wide">Sec</div>
      </div>
    </div>
  )
}

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

          {/* Information billetterie avec compte à rebours */}
          <section className="bg-jazz-yellow/10 p-6 rounded-lg">
            <p className="text-center text-gray-600 mb-4">
              <span className="font-semibold">Billet non reçu ?</span> Cliquez ici
            </p>
            
            <div className="text-center">
              <p className="text-gray-800 font-semibold mb-3 text-lg">
                ⏰ Fin des ventes dans :
              </p>
              <CountdownTimer />
              <p className="text-gray-600 text-sm mt-3">
                Ventes jusqu'au 25 juillet 2025 à 23h59
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}