// PATH: src/lib/passConfig.ts
// Configuration des Pass Céret et des concerts éligibles.
// Ids de tarifs Billetweb (événement 1370111).

export type PassType = {
  id: string          // id du tarif Pass dans Billetweb
  label: string
  price: number
  concerts: number    // nombre de concerts à choisir
}

export type CeretConcert = {
  ticketId: string    // id du tarif Standard du concert (billet créé à 0 € pour le pass)
  label: string
  date: string
}

// Les 3 pass Céret
export const PASS_TYPES: PassType[] = [
  { id: '7025193', label: 'Pass 2 concerts', price: 40, concerts: 2 },
  { id: '7024312', label: 'Pass 3 concerts', price: 55, concerts: 3 },
  { id: '7024315', label: 'Pass 4 concerts', price: 65, concerts: 4 },
]

// Les 4 concerts de Céret éligibles au pass (tarif Standard)
export const CERET_CONCERTS: CeretConcert[] = [
  { ticketId: '6796626', label: 'Erik Truffaz & Antonio Lizana', date: 'Mer. 5 août' },
  { ticketId: '7024293', label: 'Dal Sasso Big Band', date: 'Jeu. 6 août' },
  { ticketId: '6876954', label: 'Ladyva & Barcelona Big Blues Band', date: 'Ven. 7 août' },
  { ticketId: '7024290', label: 'Akpé Motion feat. Karla Harris', date: 'Sam. 8 août' },
]
