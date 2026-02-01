'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Calendar, Music } from 'lucide-react'
import { useModal } from './ModalContext'

const PreventePopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const { openModal } = useModal()

  const endDate = new Date('2026-03-01T23:59:59')
  const MAX_VIEWS = 4

  useEffect(() => {
    const viewCount = parseInt(localStorage.getItem('prevente-popup-views') || '0')
    if (viewCount >= MAX_VIEWS) return

    const now = new Date()
    const startDate = new Date('2026-01-01T00:00:00')
    
    if (now >= startDate && now <= endDate) {
      const timeout = setTimeout(() => {
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timeout)
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
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  const handleClose = () => {
    const viewCount = parseInt(localStorage.getItem('prevente-popup-views') || '0')
    localStorage.setItem('prevente-popup-views', (viewCount + 1).toString())
    setIsVisible(false)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleReserve = () => {
    handleClose()
    openModal()
  }

  if (!isVisible) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
        onClick={handleOverlayClick}
      />

      <div className="fixed inset-0 flex items-center justify-center z-[80] p-4" onClick={handleOverlayClick}>
        <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
          
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/erik_truffaz_antonio_lizana_jazz.jpg"
              alt="Erik Truffaz en concert"
              fill
              className="object-cover"
              priority
            />
            <div 
              className="absolute inset-0" 
              style={{ 
                background: 'linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(114, 47, 55, 0.85) 50%, rgba(26, 26, 26, 0.7) 100%)' 
              }}
            ></div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-[90]"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative p-6 sm:p-8 text-center z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '1px solid #d4af37' }}>
              <Music className="w-4 h-4" style={{ color: '#d4af37' }} />
              <span className="text-xs font-semibold" style={{ color: '#d4af37' }}>HOMMAGE À MILES DAVIS • 100 ANS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-lg">
              Erik Truffaz & Antonio Lizana
            </h2>
            <p className="text-lg sm:text-xl mb-2 drop-shadow-lg" style={{ color: '#d4af37' }}>
              "New Sketches of Spain"
            </p>

            <div className="inline-flex items-center gap-2 mb-4 text-sm px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#f7f3e9' }}>
              <Calendar className="w-4 h-4" style={{ color: '#d4af37' }} />
              <span>Mercredi 5 août 2026 • 21h • Céret</span>
            </div>

            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(212, 175, 55, 0.5)' }}>
              <p className="text-sm mb-1" style={{ color: '#f7f3e9' }}>Tarif prévente jusqu'au 1er mars</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold" style={{ color: '#d4af37' }}>20€</span>
                <span className="text-lg line-through" style={{ color: '#999' }}>25€</span>
              </div>
            </div>

            <p className="text-xs mb-3" style={{ color: '#f7f3e9' }}>Fin de l'offre dans :</p>
            <div className="flex justify-center gap-2 mb-6">
              {[
                { value: timeLeft.days, label: 'j' },
                { value: timeLeft.hours, label: 'h' },
                { value: timeLeft.minutes, label: 'm' },
                { value: timeLeft.seconds, label: 's' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold"
                    style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                      color: '#d4af37',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {item.value}
                  </div>
                  <span className="text-xs mt-1 block" style={{ color: '#f7f3e9' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleReserve}
              className="inline-block w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
            >
              Réserver ma place
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="block mx-auto mt-4 text-sm hover:underline"
              style={{ color: 'rgba(247, 243, 233, 0.7)' }}
            >
              Je verrai plus tard
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PreventePopup