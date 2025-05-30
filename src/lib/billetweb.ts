// Configuration pour l'API Billetweb
export const billetwebConfig = {
    apiKey: process.env.BILLETWEB_API_KEY,
    organizerId: process.env.BILLETWEB_ORGANIZER_ID,
    baseUrl: 'https://www.billetweb.fr/api'
  }
  
  export async function getBilletwebEvents() {
    // Implémentation de l'API Billetweb
    // Documentation: https://www.billetweb.fr/api-documentation
    
    try {
      const response = await fetch(`${billetwebConfig.baseUrl}/events`, {
        headers: {
          'Authorization': `Bearer ${billetwebConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Erreur API Billetweb')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Erreur Billetweb:', error)
      return []
    }
  }