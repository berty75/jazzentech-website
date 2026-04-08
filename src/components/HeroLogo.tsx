// PATH: src/components/HeroLogo.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HeroLogo() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleResize) }
  }, [])

  const progress = Math.min(scrollY / 400, 1)
  const baseSize = isMobile ? 140 : 280
  const size = Math.max(baseSize * (1 - progress * 0.85), 0)
  const opacity = Math.max(1 - progress * 1.3, 0)
  const top = (isMobile ? -5 : -25) - scrollY * 0.2

  if (opacity <= 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: `${Math.max(top, -50)}px`,
        left: isMobile ? '0px' : '-15px',
        zIndex: 35,
        pointerEvents: 'none',
        opacity,
      }}
    >
      <Image
        src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_800/jazz_en_tech_logo_smkogd.png"
        alt="Jazz en Tech"
        width={400}
        height={400}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
        }}
        priority
      />
    </div>
  )
}