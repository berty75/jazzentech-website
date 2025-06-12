import React from 'react'
import { Calendar } from 'lucide-react'

export default function VideoSection() {
  const paidVideos = [
    {
      id: 'SKgvTVcQEcU',
      title: '🎤 Manu Le Prince',
      date: '27 JUILLET 2025'
    },
    {
      id: 'CvwmwRXlevk',
      title: '🎷 Florin Gugulica',
      date: '28 JUILLET 2025'
    },
    {
      id: '3Sif0lacQt8',
      title: '🎷 Stefano Di Battista',
      date: '7 AOÛT 2025'
    },
    {
      id: 'HX0ASXAHf2Y',
      title: '🎹 Jacky Terrasson',
      date: '8 AOÛT 2025'
    },
    {
      id: 'MAo6eSowSko',
      title: '🎤 Camille Bertault',
      date: '8 AOÛT 2025'
    },
    {
      id: '5k4eWo9HHZ4',
      title: '🎤 Charlotte Planchou',
      date: '9 AOÛT 2025'
    }
  ]

  return (
    <div className="mb-16 md:mb-24">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#722f37' }}>
          🎬 Concerts payants avec billetterie
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#1a1a1a' }}>
          Découvrez en vidéo les têtes d'affiche de cette 10ème édition
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {paidVideos.map((video, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
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
    </div>
  )
}