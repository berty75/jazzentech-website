import Link from 'next/link'
import { Music } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Music className="w-16 h-16 mx-auto mb-4" style={{ color: '#722f37' }} />
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#722f37' }}>
            Artiste introuvable
          </h1>
          <p className="text-gray-600 mb-8">
            Désolé, nous n'avons pas trouvé l'artiste que vous recherchez.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/programmation"
            className="block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#722f37', color: '#f7f3e9' }}
          >
            Voir la programmation
          </Link>
          
          <Link 
            href="/"
            className="block px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 hover:opacity-80"
            style={{ borderColor: '#722f37', color: '#722f37' }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}