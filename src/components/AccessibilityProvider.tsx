'use client'
import { useEffect } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

interface AccessibilityProviderProps {
  children: React.ReactNode
}

// 🎛️ Variable pour activer/désactiver axe-core
const ENABLE_AXE_CORE = false // Mettre à true pour réactiver

export default function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  useEffect(() => {
    // Charger axe-core en développement
    if (ENABLE_AXE_CORE && process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      import('@axe-core/react').then((axe) => {
        axe.default(React, ReactDOM, 1000)
      }).catch(() => {
        // Ignore si axe-core n'est pas disponible
        console.log('axe-core non disponible')
      })
    }
  }, [])

  return <>{children}</>
}