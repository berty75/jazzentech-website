// PATH: src/components/DonorBar.tsx
'use client'

import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Heart } from 'lucide-react'

export default function DonorBar() {
  const donors = useQuery(api.donations.listPublicDonors)

  if (!donors || donors.length === 0) return null

  // Répéter suffisamment pour remplir l'écran sans doublon visible
  const repeatCount = Math.max(Math.ceil(20 / donors.length), 4)
  const items = Array.from({ length: repeatCount }, () => donors).flat()
  const duration = Math.max(donors.length * 5, 15)

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.97), rgba(114, 47, 55, 0.95))',
        borderTop: '1px solid rgba(212, 175, 55, 0.4)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center h-9 sm:h-10 px-3 sm:px-6 gap-3">
        {/* Label fixe à gauche */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: '#d4af37' }} fill="#d4af37" />
          <span className="text-xs font-bold" style={{ color: '#d4af37' }}>
            <span className="hidden sm:inline">Merci à nos donateurs</span>
            <span className="sm:hidden">Merci</span>
          </span>
          <span className="text-xs" style={{ color: 'rgba(212, 175, 55, 0.4)' }}>|</span>
        </div>

        {/* Noms défilants */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          }}
        >
          <div
            className="flex gap-5 whitespace-nowrap"
            style={{ animation: `donorScroll ${duration}s linear infinite` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
          >
            {items.map((d, i) => (
              <span key={i} className="text-xs shrink-0 font-medium" style={{ color: '#f7f3e9' }}>
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}