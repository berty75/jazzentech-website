import React from 'react'

interface Album {
  title: string
  year: string
  label: string
  description: string
}

interface DiscographySectionProps {
  discography: Album[]
}

export default function DiscographySection({ discography }: DiscographySectionProps) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        🎵 Discographie
      </h2>
      
      <div className="grid gap-6">
        {discography.map((album, index) => (
          <div key={index} className="rounded-xl p-6" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1 text-white">
                  {album.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: '#d4af37' }}>
                  {album.year} • {album.label}
                </p>
              </div>
            </div>
            <p style={{ color: '#f7f3e9' }}>{album.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}