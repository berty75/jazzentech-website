'use client'
import { useEffect, useState } from 'react'

interface BilletwebEvent {
  id: string
  title: string
  date: string
  price: number
  description: string
}

export default function BilletterieBilletweb() {
  const [events, setEvents] = useState<BilletwebEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBilletwebEvents()
  }, [])

  const fetchBilletwebEvents = async () => {
    try {
      // Données d'exemple en attendant l'API Billetweb
      setEvents([
        {
          id: '1',
          title: 'Jazz Fusion Night',
          date: '2025-06-15',
          price: 35,
          description: 'Soirée jazz fusion exceptionnelle avec Marcus Thompson'
        },
        {
          id: '2',
          title: 'Tech Jazz Experience',
          date: '2025-06-16',
          price: 40,
          description: 'Concert immersif avec Luna Rodriguez et l\'IA'
        },
        {
          id: '3',
          title: 'Virtual Reality Jazz',
          date: '2025-06-17',
          price: 45,
          description: 'Expérience VR unique avec le Virtual Jazz Collective'
        }
      ])
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jazz-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des événements...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-jazz-red mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">
                📅 {new Date(event.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-gray-600 mb-4">{event.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-jazz-red">{event.price}€</p>
            </div>
          </div>
          <button 
            onClick={() => window.open(`https://www.billetweb.fr/jazz-en-tech-${event.id}`, '_blank')}
            className="bg-jazz-yellow text-jazz-red px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition-colors w-full"
          >
            🎫 Réserver sur Billetweb
          </button>
        </div>
      ))}
    </div>
  )
}