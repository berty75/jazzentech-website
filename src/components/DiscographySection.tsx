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
      <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#722f37' }}>
        🎵 Discographie
      </h2>
      
      <div className="grid gap-6">
        {discography.map((album, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1" style={{ color: '#1a1a1a' }}>
                  {album.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: '#722f37' }}>
                  {album.year} • {album.label}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{album.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}