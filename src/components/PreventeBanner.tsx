'use client'

import React, { useState, useEffect } from 'react'
import { X, Music } from 'lucide-react'
import { useModal } from './ModalContext'

const PreventeBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const { openModal } = useModal()

  const endDate = new Date('2026-03-01T23:59:59')

  useEffect(() => {
    const dismissed = localStorage.getItem('prevente-banner-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      if (Date.now() - dismissedTime < 24 * 60 * 60 * 1000) {
        return
      }
    }

    const now = new Date()
    const startDate = new Date('2026-01-01T00:00:00')
    if (now >= startDate && now <= endDate) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        })
      } else {
        setIsVisible(false)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    localStorage.setItem('prevente-banner-dismissed', Date.now().toString())
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] py-2 px-4 shadow-lg"
      style={{ 
        background: 'linear-gradient(90deg, #722f37 0%, #1a1a1a 50%, #722f37 100%)',
      }}
    >
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4 text-white pr-10">
        <Music className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#d4af37' }} />
        
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-xs sm:text-sm">
          <span className="font-semibold">
            🎺 Erik Truffaz & Antonio Lizana
          </span>
          
          <span className="hidden sm:inline" style={{ color: '#d4af37' }}>•</span>
          
          <span className="text-xs">
            <strong style={{ color: '#d4af37' }}>20€ au lieu de 25€</strong>
            <span className="hidden sm:inline" style={{ color: '#f7f3e9' }}> • Plus que {timeLeft.days}j {timeLeft.hours}h</span>
          </span>
        </div>

        <button
          onClick={() => openModal()}
          className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 flex-shrink-0"
          style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
        >
          Réserver
        </button>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition-all duration-200 z-[70]"
        aria-label="Fermer la bannière"
      >
        <X className="w-5 h-5" style={{ color: '#f7f3e9' }} />
      </button>
    </div>
  )
}

export default PreventeBanner