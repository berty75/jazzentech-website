import { Heart, Star, Award, Crown, Users, ExternalLink, CheckCircle2, Info } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soutenir Jazz en Tech 2026',
  description: 'Soutenez la 11ème édition du festival Jazz en Tech. Dons via HelloAsso, déduction fiscale 66%, contreparties exclusives.'
}

const paliers = [
  {
    id: 'fan',
    label: 'Fan',
    montant: 20,
    coutReel: 7,
    icon: <Star className="w-6 h-6" />,
    color: 'rgba(212, 175, 55, 0.1)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
    featured: false,
    contreparties: [
      'Nom sur le site si souhaité',
    ],
  },
  {
    id: 'soutien',
    label: 'Soutien',
    montant: 50,
    coutReel: 17,
    icon: <Heart className="w-6 h-6" />,
    color: 'rgba(212, 175, 55, 0.12)',
    borderColor: 'rgba(212, 175, 55, 0.4)',
    featured: false,
    contreparties: [
      "Nom sur le site si souhaité",
      "Une invitation au Musée d'Art Moderne",
      "Une invitation au Musée de la Musique",
    ],
  },
  {
    id: 'passionne',
    label: 'Passionné',
    montant: 100,
    coutReel: 34,
    icon: <Award className="w-6 h-6" />,
    color: 'rgba(114, 47, 55, 0.25)',
    borderColor: 'rgba(212, 175, 55, 0.5)',
    featured: true,
    contreparties: [
      "Nom sur le site si souhaité",
      "Une invitation au Musée d'Art Moderne",
      "Une invitation au Musée de la Musique",
      "Une entrée au concert pour une personne",
    ],
  },
  {
    id: 'mecene',
    label: 'Mécène',
    montant: 500,
    coutReel: 170,
    icon: <Crown className="w-6 h-6" />,
    color: 'rgba(114, 47, 55, 0.3)',
    borderColor: 'rgba(212, 175, 55, 0.6)',
    featured: false,
    contreparties: [
      "Logo dans le programme",
      "4 invitations aux concerts",
      "Une invitation au Musée d'Art Moderne",
      "Une invitation au Musée de la Musique",
    ],
  },
  {
    id: 'grand-mecene',
    label: 'Grand Mécène',
    montant: 1000,
    coutReel: 340,
    icon: <Users className="w-6 h-6" />,
    color: 'rgba(184, 115, 51, 0.2)',
    borderColor: 'rgba(184, 115, 51, 0.7)',
    featured: false,
    contreparties: [
      "Affichage sur le site internet",
      "Affichage sur le lieu des concerts",
      "2 invitations à tous les concerts du festival",
      "Une invitation au Musée d'Art Moderne",
      "Une invitation au Musée de la Musique",
    ],
  },
]

export default function SoutenirPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="text-white pt-36 pb-8 sm:pt-40 sm:pb-12 md:pt-44 md:pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block px-3 py-2 rounded-full font-bold text-xs mb-4"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              ❤️ Financement participatif — HelloAsso
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
              Soutenez Jazz en Tech 2026
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-warm-cream leading-relaxed max-w-2xl mx-auto mb-6">
              La 11ème édition a besoin de vous. Notre mécène principal ne peut cette année 
              renouveler son soutien. Chaque don, quel qu'en soit le montant, 
              est décisif pour la réalisation de cette édition anniversaire.
            </p>
            {/* Déduction fiscale */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
              style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
              <span className="text-3xl font-bold text-jazz-gold">66%</span>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">de déduction fiscale</p>
                <p className="text-stone-400 text-xs">Association loi 1901 d'intérêt général</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explication déduction */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-2xl p-4 md:p-6 flex items-start gap-4"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.07)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
            <Info className="w-5 h-5 text-jazz-gold flex-shrink-0 mt-0.5" />
            <p className="text-sm text-stone-300 leading-relaxed">
              Jazz en Tech est une association reconnue d'intérêt général (loi 1901).
              Vos dons ouvrent droit à une <strong className="text-white">réduction d'impôt de 66 %</strong> du montant versé
              (dans la limite de 20 % du revenu imposable, art. 200 du CGI).
              La colonne <em>Coût réel</em> ci-dessous indique ce que représente votre don
              après déduction. Un reçu fiscal vous sera automatiquement adressé via HelloAsso.
            </p>
          </div>
        </div>
      </section>

      {/* Paliers */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Choisissez votre palier
              </h2>
              <p className="text-stone-400">
                Chaque palier inclut les contreparties des paliers précédents.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {paliers.map((p) => (
                <div
                  key={p.id}
                  className={`relative rounded-2xl p-5 md:p-6 flex flex-col transition-transform hover:-translate-y-1 ${p.featured ? 'ring-2 ring-jazz-gold' : ''}`}
                  style={{ backgroundColor: p.color, border: `1px solid ${p.borderColor}` }}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}>
                      ⭐ Recommandé
                    </div>
                  )}

                  {/* Header palier */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-jazz-gold"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)' }}>
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{p.label}</h3>
                    </div>
                  </div>

                  {/* Montants */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">{p.montant} €</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-stone-400">Coût réel après déduction :</span>
                      <span className="text-sm font-bold text-jazz-gold">{p.coutReel} €</span>
                    </div>
                  </div>

                  {/* Contreparties */}
                  <ul className="space-y-2 flex-1 mb-6">
                    {p.contreparties.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-200">
                        <CheckCircle2 className="w-4 h-4 text-jazz-gold flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`https://www.helloasso.com/associations/jazz-en-tech/formulaires/1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: p.featured ? '#d4af37' : 'rgba(212, 175, 55, 0.15)',
                      color: p.featured ? '#1a1a1a' : '#d4af37',
                      border: p.featured ? 'none' : '1px solid rgba(212, 175, 55, 0.4)'
                    }}
                  >
                    Donner {p.montant} €
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HelloAsso explainer */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-jazz-gold" />
              Pourquoi HelloAsso ?
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
              <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
                <div className="text-2xl font-bold mb-2" style={{ color: '#d4af37' }}>0 %</div>
                <p className="text-white font-semibold text-xs">Commission</p>
                <p className="text-stone-400 text-xs mt-1">100 % de votre don va au festival</p>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
                <div className="text-2xl mb-2">🧾</div>
                <p className="text-white font-semibold text-xs">Reçu fiscal auto</p>
                <p className="text-stone-400 text-xs mt-1">Envoyé automatiquement par email</p>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-white font-semibold text-xs">Paiement sécurisé</p>
                <p className="text-stone-400 text-xs mt-1">Plateforme française certifiée</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA retour */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-stone-400 text-sm mb-4">
            Pour en savoir plus sur le festival et la programmation 2026
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/mot-du-president"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors hover:opacity-80"
              style={{ border: '1px solid rgba(212, 175, 55, 0.4)', color: '#d4af37' }}>
              ← Mot du Président
            </Link>
            <Link href="/billetterie"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors hover:opacity-80"
              style={{ border: '1px solid rgba(212, 175, 55, 0.4)', color: '#d4af37' }}>
              Billetterie →
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}