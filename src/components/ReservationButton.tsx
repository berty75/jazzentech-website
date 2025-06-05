'use client'
import { Ticket } from 'lucide-react'

interface ReservationButtonProps {
  ticketType: 'direct' | 'billetweb'
  ticketUrl?: string
  billetwebEventId?: string
  artistName: string
}

// Fonction pour gérer la réservation via l'API Billetweb
const handleBilletwebReservation = async (eventId: string, artistName: string) => {
  try {
    // Afficher un message de chargement
    alert('Redirection vers la billetterie en cours...')
    
    // Ici vous pouvez faire un appel à votre API Billetweb
    // Exemple d'appel API :
    /*
    const response = await fetch('/api/billetweb/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: eventId,
        artistName: artistName
      })
    })
    
    const data = await response.json()
    
    if (data.bookingUrl) {
      window.open(data.bookingUrl, '_blank')
    }
    */
    
    // Pour l'instant, redirection temporaire vers Billetweb (à remplacer par votre logique)
    window.open(`https://www.billetweb.fr/jazz-en-tech-${eventId}`, '_blank')
    
  } catch (error) {
    console.error('Erreur lors de la réservation:', error)
    alert('Une erreur est survenue. Veuillez réessayer plus tard.')
  }
}

export default function ReservationButton({ 
  ticketType, 
  ticketUrl, 
  billetwebEventId, 
  artistName 
}: ReservationButtonProps) {
  if (ticketType === 'direct' && ticketUrl) {
    return (
      <a 
        href={ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
        style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
      >
        <Ticket className="w-6 h-6 mr-3" />
        Réserver maintenant
      </a>
    )
  }

  if (ticketType === 'billetweb' && billetwebEventId) {
    return (
      <button
        onClick={() => handleBilletwebReservation(billetwebEventId, artistName)}
        className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:opacity-90"
        style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
      >
        <Ticket className="w-6 h-6 mr-3" />
        Réserver via Billetweb
      </button>
    )
  }

  return null
}