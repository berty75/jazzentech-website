// src/app/not-found.tsx
'use client'
import Link from 'next/link'
import { Home, Music, RefreshCw, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentJoke, setCurrentJoke] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])
  const [jazzMode, setJazzMode] = useState(false)

  const jazzJokes = [
    "Cette page a pris une pause solo... de 47 minutes !",
    "404 : Note bleue introuvable dans cette gamme !",
    "Erreur de timing... même Charlie Parker aurait pleuré !",
    "Cette URL swingue... dans le vide intersidéral !",
    "La page fait du free jazz... trop free apparemment !",
    "Comme dirait Miles : 'Do not fear mistakes. There are none... sauf cette page !'",
    "Cette page improvise... mais elle a oublié les accords !",
    "404 : Saxophone manquant, si trouvé rapporter à Coltrane",
    "Cette URL fait du bebop... mais elle a perdu le tempo !",
    "Page en mode 'Take Five'... depuis 1959 !"
  ]

  const instruments = ['🎷', '🎺', '🎹', '🥁', '🎸', '🎻', '🎵', '♪', '♫', '♬', '♩']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % jazzJokes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsAnimating(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handle404Click = () => {
    setClickCount(prev => prev + 1)
    
    // Explosion de particules
    const newParticles = Array.from({length: 8}, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }))
    setParticles(prev => [...prev, ...newParticles])
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)))
    }, 2000)

    if (clickCount === 6) {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 5000)
    }
  }

  const activateJazzMode = () => {
    setJazzMode(!jazzMode)
  }

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden transition-all duration-500"
      style={{ 
        background: jazzMode 
          ? 'linear-gradient(45deg, #1a1a1a, #722f37, #d4af37, #b87333)' 
          : 'linear-gradient(135deg, #1a1a1a 0%, #722f37 50%, #1a1a1a 100%)',
        paddingTop: '6rem'
      }}
    >
      {/* Particules explosives */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: '2rem',
            color: '#d4af37'
          }}
        >
          {instruments[Math.floor(Math.random() * instruments.length)]}
        </div>
      ))}

      {/* Éléments flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({length: 12}).map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
              color: 'rgba(212, 175, 55, 0.2)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {instruments[i % instruments.length]}
          </div>
        ))}
      </div>

      {/* Bouton mode jazz */}
      <div className="absolute top-20 right-4 z-50">
        <button
          onClick={activateJazzMode}
          className="p-3 rounded-full transition-all duration-300 transform hover:scale-110"
          style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
          title="Mode Jazz intensif!"
        >
          <Star className="w-5 h-5" />
        </button>
      </div>

      {/* Easter Egg */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="p-8 rounded-2xl text-center animate-bounce max-w-md mx-4"
            style={{ backgroundColor: '#f7f3e9' }}
          >
            <div className="text-6xl mb-4">🎷</div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#722f37' }}>
              BRAVO ! Vous êtes un vrai jazzman !
            </h3>
            <p className="text-sm mb-4" style={{ color: '#1a1a1a' }}>
              {clickCount} clicks ! Vous avez le rythme dans les doigts !
            </p>
            <div 
              className="animate-pulse font-mono p-3 rounded text-lg font-bold"
              style={{ backgroundColor: '#722f37', color: '#d4af37' }}
            >
              🎵 JAZZ404-BACKSTAGE 🎵
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Titre 404 */}
          <div className="mb-6 relative">
            <button
              onClick={handle404Click}
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95 ${
                isAnimating ? 'animate-spin' : ''
              }`}
              style={{ 
                color: '#d4af37',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                lineHeight: '1'
              }}
            >
              404
            </button>
            
            {/* Click counter */}
            {clickCount > 0 && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <span 
                  className="text-xs px-2 py-1 rounded-full animate-bounce font-bold"
                  style={{ backgroundColor: '#722f37', color: '#d4af37' }}
                >
                  {clickCount} mesures! {clickCount >= 5 ? '🎷' : '♪'}
                </span>
              </div>
            )}

            {/* Orbites d'instruments */}
            <div className="absolute inset-0 pointer-events-none">
              {[0, 1].map(orbit => (
                <div
                  key={orbit}
                  className="absolute inset-0 animate-spin"
                  style={{
                    animationDuration: `${12 + orbit * 6}s`,
                    animationDirection: orbit % 2 ? 'reverse' : 'normal'
                  }}
                >
                  {['🎷', '🎺', '🎹', '🥁'].map((instrument, i) => (
                    <div
                      key={i}
                      className="absolute text-2xl animate-bounce"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-${80 + orbit * 25}px)`,
                        color: orbit === 0 ? '#d4af37' : '#b87333',
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: '3s'
                      }}
                    >
                      {instrument}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Message d'erreur */}
          <div className="mb-8">
            <h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              style={{ color: '#f7f3e9' }}
            >
              {jazzMode ? '🎷 MODE JAZZ INTENSIF 🎷' : 'Oops ! Page introuvable !'}
            </h2>
            
            <div 
              className="min-h-[4rem] flex items-center justify-center px-4"
              style={{ color: '#d4af37' }}
            >
              <p className="text-base sm:text-lg md:text-xl italic font-medium text-center">
                {jazzMode ? '🎵 Cette erreur swingue en mode Blue Note ! 🎵' : jazzJokes[currentJoke]}
              </p>
            </div>
          </div>

          {/* Console jazz */}
          <div 
            className="mb-8 p-6 rounded-2xl border-2"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              borderColor: '#d4af37'
            }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#d4af37' }}>
              🎛️ Console Jazz 404
            </h3>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              {['BASS', 'PIANO', 'SAX', 'DRUMS'].map((instrument, index) => (
                <div key={instrument} className="text-center">
                  <div className="mb-2">
                    <div 
                      className="w-full h-3 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'rgba(114, 47, 55, 0.3)' }}
                    >
                      <div 
                        className="h-full transition-all duration-1000"
                        style={{ 
                          width: `${30 + Math.sin(Date.now() / 1000 + index) * 40}%`,
                          background: 'linear-gradient(to right, #d4af37, #b87333)'
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs font-bold" style={{ color: '#f7f3e9' }}>
                    {instrument}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4">
              {['🎷', '🎺', '🎹', '🥁'].map((instrument, i) => (
                <button
                  key={i}
                  onClick={activateJazzMode}
                  className="text-2xl p-3 rounded-full transition-transform hover:scale-125 active:scale-95"
                  style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                >
                  {instrument}
                </button>
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="group inline-flex items-center px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
              >
                <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Retour au club
              </Link>
              
              <Link
                href="/programmation"
                className="group inline-flex items-center px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
              >
                <Music className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Voir le programme
              </Link>
            </div>

            <div>
              <button
                onClick={handleRefresh}
                className={`group inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  isAnimating ? 'animate-spin' : ''
                }`}
                style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                  color: '#d4af37',
                  border: '2px solid #d4af37'
                }}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                Rejouer le morceau
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div 
            className="p-4 sm:p-6 rounded-2xl border-2 border-dashed max-w-2xl mx-auto mb-6"
            style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              borderColor: '#d4af37'
            }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: '#d4af37' }}>
              🎭 Pendant cette improvisation...
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <Link
                href="/billetterie"
                className="group flex items-center p-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(114, 47, 55, 0.3)' }}
              >
                <div className="mr-3 text-xl sm:text-2xl group-hover:animate-bounce">🎫</div>
                <div className="text-left">
                  <div className="font-semibold text-sm sm:text-base" style={{ color: '#f7f3e9' }}>
                    Billetterie
                  </div>
                  <div className="text-xs sm:text-sm" style={{ color: '#d4af37' }}>
                    Réservez vos places
                  </div>
                </div>
              </Link>
              
              <Link
                href="/benevoles"
                className="group flex items-center p-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(184, 115, 51, 0.3)' }}
              >
                <div className="mr-3 text-xl sm:text-2xl group-hover:animate-bounce">🤝</div>
                <div className="text-left">
                  <div className="font-semibold text-sm sm:text-base" style={{ color: '#f7f3e9' }}>
                    Bénévolat
                  </div>
                  <div className="text-xs sm:text-sm" style={{ color: '#d4af37' }}>
                    Rejoignez le groupe
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Citation jazz */}
          <div 
            className="p-4 rounded-lg max-w-lg mx-auto relative"
            style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
          >
            <div className="absolute -top-2 -left-2 text-2xl animate-bounce" style={{ color: '#d4af37' }}>🎷</div>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce delay-1000" style={{ color: '#b87333' }}>🎺</div>
            
            <blockquote className="text-xs sm:text-sm italic" style={{ color: '#f7f3e9' }}>
              "Jazz is not dead. It just smells funny.<br />
              Tout comme cette page 404... mais avec du style !"
              <footer className="mt-2">
                <cite className="text-xs" style={{ color: '#d4af37' }}>— Frank Zappa (version 404)</cite>
              </footer>
            </blockquote>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-xs opacity-50" style={{ color: '#f7f3e9' }}>
            💡 Cliquez sur le 404 • Étoile pour le mode jazz
          </div>
        </div>
      </div>
    </div>
  )
}