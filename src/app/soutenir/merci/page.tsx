// PATH: src/app/soutenir/merci/page.tsx
'use client'

import Link from 'next/link'
import { CheckCircle, Heart } from 'lucide-react'

export default function MerciPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ background: 'rgba(212,175,55,0.15)' }}>
          <CheckCircle className="w-10 h-10" style={{ color: '#d4af37' }} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Merci pour votre don !
        </h1>
        <p className="text-white/70 mb-2">
          Votre soutien est précieux pour le festival Jazz en Tech.
        </p>
        <p className="text-white/50 text-sm mb-8">
          Votre reçu fiscal (Cerfa) vous sera envoyé prochainement par email.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/"
            className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: '#d4af37', color: '#1a1a1a' }}>
            Retour à l&apos;accueil
          </Link>
          <Link href="/soutenir"
            className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Heart className="w-4 h-4 inline mr-2" />
            Soutenir encore
          </Link>
        </div>
      </div>
    </div>
  )
}