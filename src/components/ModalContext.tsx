'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Ticket, Shield, Mail, X } from 'lucide-react'

type ModalContextType = {
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}

function BilletwebWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.billetweb.fr/js/export.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <a 
      title="Vente de billets en ligne" 
      href="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
      className="shop_frame"
      target="_blank"
      data-src="https://www.billetweb.fr/shop.php?event=jazz-en-tech"
      data-max-width="100%"
      data-initial-height="550"
      data-scrolling="yes"
      data-id="jazz-en-tech"
      data-resize="1"
    >
      Vente de billets en ligne
    </a>
  )
}

function BilletwebModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 z-[200] transition-opacity duration-300"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(114, 47, 55, 0.85) 0%, rgba(26, 26, 26, 0.95) 100%)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div 
          className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
        >
          <div 
            className="relative p-3 sm:p-4 text-center"
            style={{ background: 'linear-gradient(135deg, #722f37 0%, #1a1a1a 100%)' }}
          >
            <div className="sm:hidden w-12 h-1 bg-white/30 rounded-full mx-auto mb-2"></div>
            
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
            >
              <X className="w-5 h-5" style={{ color: '#d4af37' }} />
            </button>
            
            <div className="flex items-center justify-center gap-2 mb-1">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#d4af37' }} />
              <span className="font-bold text-white text-sm sm:text-base">Réservation</span>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: '#d4af37' }}>
              Erik Truffaz & Antonio Lizana
            </p>
          </div>
          
          <div className="p-2 sm:p-4 overflow-y-auto" style={{ height: 'calc(90vh - 120px)', maxHeight: '500px' }}>
            <BilletwebWidget />
          </div>
          
          <div 
            className="p-2 sm:p-3 border-t flex items-center justify-center gap-4 sm:gap-6 text-xs"
            style={{ backgroundColor: 'rgba(247, 243, 233, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}
          >
            <div className="flex items-center gap-1" style={{ color: '#722f37' }}>
              <Shield className="w-3 h-3" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: '#722f37' }}>
              <Mail className="w-3 h-3" />
              <span>E-billet immédiat</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
      <BilletwebModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ModalContext.Provider>
  )
}