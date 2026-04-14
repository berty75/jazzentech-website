// PATH: src/components/DonateCustom.tsx
'use client'

import { useState } from 'react'
import { Loader2, Heart, ChevronUp, ChevronDown, Info } from 'lucide-react'

const STEP = 100
const MIN = 1001

export default function DonateCustom() {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const numAmount = parseFloat(amount) || 0
  const isValid = numAmount >= MIN
  const deduction66 = isValid ? Math.round(numAmount * 0.66) : 0
  const coutReel = isValid ? Math.round(numAmount * 0.34) : 0
  // Revenu imposable minimum pour déduire la totalité (don = 20% du revenu)
  const revenuMin = isValid ? numAmount * 5 : 0

  const increment = () => {
    const current = numAmount || MIN - STEP
    setAmount(String(Math.max(MIN, current + STEP)))
  }

  const decrement = () => {
    const current = numAmount || MIN + STEP
    setAmount(String(Math.max(MIN, current - STEP)))
  }

  const handleDonate = async () => {
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: numAmount }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      alert('Erreur lors de la redirection vers le paiement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-5 md:p-8 mt-6 md:mt-8"
      style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
        >
          <Heart className="w-5 h-5" style={{ color: '#d4af37' }} />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">Montant libre</h3>
          <p className="text-xs text-stone-400">À partir de {MIN} € — pour les mécènes exceptionnels</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Input avec chevrons */}
        <div className="flex-1 relative flex">
          <input
            type="number"
            min={MIN}
            step={STEP}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`${MIN}`}
            className="w-full h-14 px-5 pr-24 rounded-xl text-xl font-bold outline-none appearance-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#fff',
              MozAppearance: 'textfield',
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleDonate() }}
          />
          <span
            className="absolute right-16 top-1/2 -translate-y-1/2 text-xl font-bold"
            style={{ color: '#d4af37' }}
          >
            €
          </span>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
            <button
              onClick={increment}
              className="flex items-center justify-center w-10 h-6 rounded-md transition-colors"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              type="button"
            >
              <ChevronUp className="w-4 h-4" style={{ color: '#d4af37' }} />
            </button>
            <button
              onClick={decrement}
              className="flex items-center justify-center w-10 h-6 rounded-md transition-colors"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              type="button"
            >
              <ChevronDown className="w-4 h-4" style={{ color: '#d4af37' }} />
            </button>
          </div>
        </div>

        {/* Bouton donner */}
        <button
          onClick={handleDonate}
          disabled={!isValid || loading}
          className="flex items-center justify-center gap-2 h-14 px-8 rounded-xl font-bold text-base transition-all hover:scale-105 shrink-0"
          style={{
            backgroundColor: isValid ? '#d4af37' : 'rgba(212, 175, 55, 0.2)',
            color: isValid ? '#1a1a1a' : 'rgba(212, 175, 55, 0.5)',
            cursor: isValid && !loading ? 'pointer' : 'default',
          }}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>
              <Heart className="w-4 h-4" />
              {isValid ? `Donner ${numAmount.toLocaleString('fr-FR')} €` : 'Donner'}
            </>
          )}
        </button>
      </div>

      {/* Détail fiscal */}
      {isValid && (
        <div className="space-y-3">
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 p-3 rounded-lg text-sm"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.06)' }}
          >
            <span style={{ color: 'rgba(247, 243, 233, 0.6)' }}>
              Réduction d&apos;impôt (66%) : <strong style={{ color: '#16a34a' }}>{deduction66.toLocaleString('fr-FR')} €</strong>
            </span>
            <span style={{ color: 'rgba(247, 243, 233, 0.6)' }}>
              Coût réel : <strong style={{ color: '#d4af37' }}>{coutReel.toLocaleString('fr-FR')} €</strong>
            </span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg text-xs leading-relaxed"
            style={{ backgroundColor: 'rgba(114, 47, 55, 0.2)', border: '1px solid rgba(114, 47, 55, 0.3)' }}>
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <p style={{ color: 'rgba(247, 243, 233, 0.5)' }}>
              La déduction de 66 % est plafonnée à 20 % de votre revenu imposable (art. 200 du CGI).
              Pour déduire la totalité de ce don, votre revenu imposable doit être d&apos;au moins{' '}
              <strong style={{ color: '#f7f3e9' }}>{revenuMin.toLocaleString('fr-FR')} €</strong>.
              L&apos;excédent éventuel est reportable sur les 5 années suivantes.
            </p>
          </div>
        </div>
      )}

      {/* Hide native spinner */}
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}