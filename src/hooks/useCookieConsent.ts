// src/hooks/useCookieConsent.ts
'use client'
import { useState, useEffect } from 'react'

export type ConsentSettings = {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentSettings | null>(null)
  const [hasConsent, setHasConsent] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Petit délai pour éviter le flash
    const timer = setTimeout(() => {
      const consentValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('jazzentech-consent='))
        ?.split('=')[1]
      
      if (consentValue) {
        try {
          const parsedConsent = JSON.parse(decodeURIComponent(consentValue))
          setConsent(parsedConsent)
          setHasConsent(true)
        } catch (error) {
          console.error('Erreur parsing consent:', error)
        }
      }
      setIsLoading(false)
    }, 100) // Délai de 100ms

    return () => clearTimeout(timer)
  }, [])

  const setConsentCookie = (consentSettings: ConsentSettings) => {
    const consentString = encodeURIComponent(JSON.stringify(consentSettings))
    document.cookie = `jazzentech-consent=${consentString}; path=/; max-age=31536000; SameSite=Lax`
    setConsent(consentSettings)
    setHasConsent(true)
  }

  const removeConsent = () => {
    document.cookie = 'jazzentech-consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setConsent(null)
    setHasConsent(false)
  }

  return {
    consent,
    hasConsent,
    isLoading,
    setConsentCookie,
    removeConsent
  }
}