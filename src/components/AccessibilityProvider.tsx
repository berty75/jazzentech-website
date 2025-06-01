'use client'
import { useEffect } from 'react'

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export default function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  useEffect(() => {
    // Charger axe-core en développement
    if (process.env.NODE_ENV === 'development') {
      import('@axe-core/react').then((axe) => {
        axe.default(React, ReactDOM, 1000)
      }).catch(() => {
        // Ignore si axe-core n'est pas disponible
      })
    }
  }, [])

  return <>{children}</>
}