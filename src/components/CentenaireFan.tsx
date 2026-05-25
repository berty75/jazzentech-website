// PATH: src/components/CentenaireFan.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Item = {
  name: string
  slug: string
  image: string
  quote: string
  source: string
}

const items: Item[] = [
  {
    name: 'Érik Truffaz & Antonio Lizana',
    slug: 'erik-truffaz',
    image:
      'https://res.cloudinary.com/dpgfensnv/image/upload/c_limit,w_900,f_auto,q_auto/truffaz-pochette.jpg',
    quote:
      'Un hommage intense et moderne aux « New Sketches of Spain » de Miles Davis, pour célébrer avec éclat le centenaire d\u2019une légende du jazz. Un moment magique à savourer absolument [...]',
    source: 'La Seine musicale',
  },
  {
    name: 'Dal Sasso Big Band',
    slug: 'dal-sasso',
    image:
      'https://res.cloudinary.com/dpgfensnv/image/upload/c_limit,w_900,f_auto,q_auto/dal-sasso-africa-brass-poschette.webp',
    quote:
      '"John Coltrane\u2019s Africa/Brass Revisited" est une exception inhabituelle à cette règle, une véritable surprise, galvanisante [...].',
    source: 'Radio France',
  },
  {
    name: 'Akpé Motion',
    slug: 'akpe-motion',
    image:
      'https://res.cloudinary.com/dpgfensnv/image/upload/c_limit,w_900,f_auto,q_auto/akpe-pochette.jpg',
    quote:
      '[...] Un « Miles électrique » fait d\u2019intelligence, de surprises, de couleurs et d\u2019éclats chatoyants [...]',
    source: 'Citizen Jazz',
  },
]

export default function CentenaireFan() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (hovered) return
    const t = setInterval(() => setActive((a: number) => (a + 1) % items.length), 3500)
    return () => clearInterval(t)
  }, [hovered])

  const current = items[active]

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
      {/* Éventail de pochettes */}
      <div
        className="relative mx-auto"
        style={{ width: 360, height: 340, perspective: 1000 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {items.map((item, i) => {
          let off = i - active
          if (off > items.length / 2) off -= items.length
          if (off < -items.length / 2) off += items.length
          const isActive = off === 0
          const spread = hovered ? 135 : 64
          const rot = off * (hovered ? 13 : 9)
          const tx = off * spread
          const scale = isActive ? 1 : 0.84
          const z = 20 - Math.abs(off)
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.name}
              className="absolute left-1/2 top-1/2 rounded-xl overflow-hidden transition-all duration-500 ease-out focus:outline-none"
              style={{
                width: 270,
                height: 270,
                marginLeft: -135,
                marginTop: -135,
                transform: `translateX(${tx}px) rotate(${rot}deg) scale(${scale})`,
                transformOrigin: 'bottom center',
                zIndex: z,
                opacity: isActive ? 1 : 0.7,
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              <span className="relative block w-full h-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="270px"
                  className="object-contain drop-shadow-xl"
                />
              </span>
            </button>
          )
        })}
      </div>

      {/* Citation de la pochette active */}
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-bold text-white mb-4">{current.name}</h3>
        <blockquote
          className="text-base md:text-lg leading-relaxed italic mb-3"
          style={{ color: '#f7f3e9' }}
        >
          {current.quote}
        </blockquote>
        <p
          className="text-sm font-semibold uppercase tracking-wide mb-6"
          style={{ color: '#d4af37' }}
        >
          — {current.source}
        </p>
        <Link
          href={`/artistes/${current.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#d4af37', color: '#1a1a1a' }}
        >
          Découvrir le concert <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Navigation par puces */}
        <div className="flex gap-2 justify-center lg:justify-start mt-6">
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Afficher ${it.name}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 10,
                backgroundColor: i === active ? '#d4af37' : 'rgba(247,243,233,0.35)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
