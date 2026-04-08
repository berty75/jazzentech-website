'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'Erreur de connexion')
      }
    } catch {
      setError('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  const input: React.CSSProperties = {
    width: '100%', height: '48px', padding: '0 16px', fontSize: '14px',
    color: '#1a1a1a', background: '#f7f6f3', border: '1px solid #ddd',
    borderRadius: '10px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(45deg, #1a1a1a 0%, #722f37 40%, #b87333 80%, #d4af37 100%)' }}>
      <div className="w-full max-w-[400px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-70 transition-opacity"
          style={{ color: 'rgba(255,255,255,0.7)' }}>
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
        </Link>

        <div className="text-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dpgfensnv/image/upload/f_auto,q_auto,w_200/jazz_en_tech_logo_smkogd.png"
            alt="Jazz en Tech" width={80} height={80} className="mx-auto mb-3" style={{ objectFit: 'contain' }} />
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#fff', fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em', margin: 0 }}>
            JAZZ EN TECH
          </h1>
          <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', marginTop: '4px', textTransform: 'uppercase' }}>
            Espace Administrateur
          </p>
        </div>

        <div className="rounded-2xl px-8 py-8 sm:px-10" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Adresse e-mail
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jazzentech.com" required style={input}
              onFocus={(e) => (e.target.style.borderColor = '#722f37')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')} />

            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '8px', marginTop: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Mot de passe
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required style={input}
              onFocus={(e) => (e.target.style.borderColor = '#722f37')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')} />

            <button type="submit" disabled={loading}
              style={{ width: '100%', height: '48px', marginTop: '20px', background: '#722f37', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.6 : 1 }}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Se connecter'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <a href="/dashboard/login/forgot" style={{ fontSize: '13px', color: '#722f37', textDecoration: 'none' }}>
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  )
}