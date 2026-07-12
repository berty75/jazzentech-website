// PATH: src/app/concerts-gratuits/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Music } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Concerts Gratuits dans les rues de Céret - Jazz en Tech 2026',
  description:
    "Du 4 au 8 août 2026, Jazz en Tech offre des concerts gratuits à Céret : l'Harmonie de Céret place de la République, puis boulevard Joffre et place Picasso. André Mallau Quartet, Karla Harris Quartet, Lisa Jazz Trio, Florin Gugulica Quartet, Gavin Hackett Quintet et Triton 66 Quintet.",
}

const groups = [
  {
    slug: 'harmonie-ceret',
    name: 'Harmonie de Céret',
    genre: 'Harmonie • Fanfare • Jazz',
    when: 'Mardi 4 août • 19h',
    venue: 'Place de la République',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/harmonie-ceret.jpg',
  },
  {
    slug: 'andre-mallau-quartet',
    name: 'André Mallau Quartet',
    genre: 'Jazz • Hommage à Miles Davis',
    when: 'Mer. 5 août 17h & Jeu. 6 août 18h',
    venue: 'Bd Joffre / Place Picasso',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/mallau.jpg',
  },
  {
    slug: 'karla-harris-quartet',
    name: 'Karla Harris Quartet',
    genre: "Jazz vocal d'Atlanta",
    when: 'Mer. 5 août 18h & Jeu. 6 août 17h',
    venue: 'Place Picasso / Bd Joffre',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/karla-harris-ceret.jpg',
  },
  {
    slug: 'lisa-jazz-trio',
    name: 'Lisa Jazz Trio',
    genre: 'Jazz • Chanson',
    when: 'Vendredi 7 août • 16h30',
    venue: 'Boulevard Joffre',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/lisa-jazz-trio.jpg',
  },
  {
    slug: 'florin-gugulica-quartet',
    name: 'Florin Gugulica Quartet',
    genre: 'Jazz manouche • Klezmer',
    when: 'Vendredi 7 août • 18h',
    venue: 'Place Picasso',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/gugulica.jpg',
  },
  {
    slug: 'gavin-hackett-quintet',
    name: 'Gavin Hackett Quintet',
    genre: 'Swing • Jazz vocal',
    when: 'Samedi 8 août • 17h',
    venue: 'Boulevard Joffre',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/david-hackett.jpg',
  },
  {
    slug: 'triton-66-quintet',
    name: 'Triton 66 Quintet',
    genre: 'Jazz • Bossa Nova • Swing',
    when: 'Samedi 8 août • 18h',
    venue: 'Place Picasso',
    image: 'https://res.cloudinary.com/dpgfensnv/image/upload/c_fill,g_auto,w_800,h_800,f_auto,q_auto/triton.jpg',
  },
]

const schedule = [
  { day: 'Mardi 4 août', joffre: null, picasso: { name: 'Harmonie de Céret', slug: 'harmonie-ceret', note: 'Place de la République • 19h' } },
  { day: 'Mercredi 5 août', joffre: { name: 'André Mallau Quartet', slug: 'andre-mallau-quartet' }, picasso: { name: 'Karla Harris Quartet', slug: 'karla-harris-quartet' } },
  { day: 'Jeudi 6 août', joffre: { name: 'Karla Harris Quartet', slug: 'karla-harris-quartet' }, picasso: { name: 'André Mallau Quartet', slug: 'andre-mallau-quartet' } },
  { day: 'Vendredi 7 août', joffre: { name: 'Lisa Jazz Trio', slug: 'lisa-jazz-trio', note: '16h30' }, picasso: { name: 'Florin Gugulica Quartet', slug: 'florin-gugulica-quartet' } },
  { day: 'Samedi 8 août', joffre: { name: 'Gavin Hackett Quintet', slug: 'gavin-hackett-quintet' }, picasso: { name: 'Triton 66 Quintet', slug: 'triton-66-quintet' } },
]

export default function ConcertsGratuits() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative text-white pt-48 pb-12 sm:pt-44 sm:pb-16 md:pt-44 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', border: '1px solid #d4af37' }}
          >
            <Music className="w-4 h-4" style={{ color: '#d4af37' }} />
            <span className="text-sm font-semibold" style={{ color: '#d4af37' }}>
              Accès libre • Du 4 au 8 août 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Concerts gratuits dans les rues de Céret
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#f7f3e9', opacity: 0.9 }}>
            Chaque jour du festival, deux podiums gratuits font vivre la ville :
            boulevard Joffre à 17h et place Picasso à 18h.
          </p>
        </div>
      </section>

      {/* Tableau horaires */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div
          className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr style={{ backgroundColor: '#722f37' }}>
                  <th className="px-4 py-3 text-sm font-bold text-white">Jazz en Tech</th>
                  <th className="px-4 py-3 text-sm font-bold text-white">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: '#d4af37' }} /> Boulevard Joffre — 17h
                    </span>
                  </th>
                  <th className="px-4 py-3 text-sm font-bold text-white">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: '#d4af37' }} /> Place Picasso — 18h
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr
                    key={row.day}
                    style={{
                      backgroundColor: i % 2 === 0 ? 'rgba(26,26,26,0.5)' : 'rgba(26,26,26,0.3)',
                      borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                    }}
                  >
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: '#d4af37' }}>
                      {row.day}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#f7f3e9' }}>
                      {row.joffre ? (
                        <Link href={`/artistes/${row.joffre.slug}`} className="hover:underline">
                          {row.joffre.name}
                          {'note' in row.joffre && row.joffre.note ? (
                            <span style={{ color: '#b87333' }}> — {row.joffre.note}</span>
                          ) : null}
                        </Link>
                      ) : (
                        <span style={{ opacity: 0.4 }}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#f7f3e9' }}>
                      {row.picasso ? (
                        <Link href={`/artistes/${row.picasso.slug}`} className="hover:underline">
                          {row.picasso.name}
                        </Link>
                      ) : (
                        <span style={{ opacity: 0.4 }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cartes groupes */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Les groupes à découvrir
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {groups.map((g) => (
            <Link
              key={g.slug}
              href={`/artistes/${g.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: 'rgba(26,26,26,0.5)', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            >
              <div className="relative aspect-square">
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
                  >
                    GRATUIT
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-grow p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#b87333' }}>
                  {g.genre}
                </p>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{g.name}</h3>
                <div className="mt-auto space-y-1">
                  <p className="flex items-center gap-2 text-xs" style={{ color: '#f7f3e9' }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color: '#d4af37' }} /> {g.when}
                  </p>
                  <p className="flex items-center gap-2 text-xs" style={{ color: '#f7f3e9' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#d4af37' }} /> {g.venue}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: '#d4af37' }}>
                  Découvrir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
