// PATH: src/components/DonateButton.tsx
'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function DonateButton({
  amount,
  label,
  featured = false,
}: {
  amount: number
  label: string
  featured?: boolean
}) {
  const [loading, setLoading] = useState(false)

  const handleDonate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
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
    <button
      onClick={handleDonate}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-colors hover:opacity-90"
      style={{
        backgroundColor: featured ? '#d4af37' : 'rgba(212, 175, 55, 0.15)',
        color: featured ? '#1a1a1a' : '#d4af37',
        border: featured ? 'none' : '1px solid rgba(212, 175, 55, 0.4)',
        cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : label}
    </button>
  )
}