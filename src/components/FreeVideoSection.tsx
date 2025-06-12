import React from 'react'
import { Calendar, Play } from 'lucide-react'
import Link from 'next/link'

export default function FreeVideoSection() {
  const freeVideos = [
    {
      id: 'S8n12s-2GjE',
      title: '🎷 Triton 66',
      date: '6 & 7 AOÛT'
    },
    {
      id: 'facebook',
      title: '🎻 Florin Gugulica',
      date: '6, 7 & 9 AOÛT',
      facebookUrl: 'https://www.facebook.com/phl123/videos/676111201850458'
    },
    {
      id: 'CdDbtkyXd00',
      title: '🎹 David Vilayleck',
      date: '8 AOÛT - 11H'
    },
    {
      id: 'BZbzXJ0eOcw',
      title: '🥁 Cavale',
      date: '8 & 9 AOÛT'
    }
  ]

  return (
    <div>
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
          🎬 Concerts gratuits en vidéo
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#1a1a1a' }}>
          Découvrez les artistes qui animeront les rues de Céret
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {freeVideos.map((video, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              {video.facebookUrl ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <a 
                    href={video.facebookUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-center hover:scale-105 transition-transform p-4"
                  >
                    <div className="text-4xl mb-2">▶️</div>
                    <div className="text-sm font-semibold">Voir la vidéo sur Facebook</div>
                    <div className="text-xs opacity-75 mt-1">Florin Gugulica Trio</div>
                  </a>
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                  loading="lazy"
                ></iframe>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base md:text-lg mb-2" style={{ color: '#722f37' }}>
                {video.title}
              </h3>
              <div className="flex items-center justify-center mt-2 text-xs" style={{ color: '#d4af37' }}>
                <Calendar className="w-3 h-3 mr-1" />
                <span className="font-semibold">{video.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 md:mt-12">
        <Link 
          href="/programmation"
          className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
          style={{ 
            backgroundColor: '#722f37', 
            color: '#f7f3e9'
          }}
        >
          <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Découvrir toute la programmation
        </Link>
      </div>
    </div>
  )
}