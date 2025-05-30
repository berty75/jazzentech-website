// src/components/CookieBanner.tsx (version simple et sûre)
'use client'
import { useState, useEffect } from 'react'
import { Cookie } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasConsent = document.cookie.includes('jazzentech-consent=')
      if (!hasConsent) {
        setShowBanner(true)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Accept clicked') // Debug
    document.cookie = 'jazzentech-consent=accepted; path=/; max-age=31536000; SameSite=Lax'
    setShowBanner(false)
  }

  const handleReject = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Reject clicked') // Debug
    document.cookie = 'jazzentech-consent=rejected; path=/; max-age=31536000; SameSite=Lax'
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4"
      style={{ zIndex: 10000 }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Cookie className="text-jazz-yellow mr-3" size={24} />
            <p className="text-gray-700">
              Nous utilisons des cookies pour améliorer votre expérience. 
              <a href="/politique-cookies" className="text-jazz-red hover:underline ml-1">
                En savoir plus
              </a>
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="bg-jazz-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
              style={{ zIndex: 10001 }}
            >
              Accepter
            </button>
            <button
              onClick={handleReject}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              style={{ zIndex: 10001 }}
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}