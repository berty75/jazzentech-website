// PATH: src/components/DonorWall.tsx
'use client'

import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Heart } from 'lucide-react'

const palierLabel: Record<string, string> = {
  'grand-mecene': 'Grand Mécène',
  'mecene': 'Mécène',
}

export default function DonorWall() {
  const donors = useQuery(api.donations.listPublicDonors)

  if (!donors || donors.length === 0) return null

  return (
    <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-4 h-4" style={{ color: '#d4af37' }} fill="#d4af37" />
        <h4 className="text-sm font-bold" style={{ color: '#d4af37' }}>
          Ils soutiennent Jazz en Tech 2026
        </h4>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {donors.map((d, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              color: '#f7f3e9',
            }}
          >
            <span className="font-semibold">{d.name}</span>
            {palierLabel[d.palier] && (
              <span className="font-normal" style={{ color: '#d4af37', fontSize: '10px' }}>
                — {palierLabel[d.palier]}
              </span>
            )}
          </span>
        ))}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(247, 243, 233, 0.6)' }}>
        Un immense merci à chacun de nos donateurs pour leur précieux soutien.
        Grâce à votre générosité, la 11ème édition du festival pourra voir le jour !
      </p>
    </div>
  )
}