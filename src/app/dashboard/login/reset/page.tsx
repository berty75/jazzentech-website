'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, CheckCircle } from 'lucide-react'
import { useState, Suspense } from 'react'

function ResetForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (password.length < 8) { setError('Minimum 8 caractères'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (res.ok) setDone(true)
      else setError(data.error || 'Erreur')
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

  if (!token) return <p style={{ color: '#991b1b' }}>Lien invalide.</p>

  return (
    <div className="rounded-2xl px-8 py-8 sm:px-10" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
      {done ? (
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#16a34a' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Mot de passe changé</h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Redémarrez le serveur puis connectez-vous.
          </p>
          <button onClick={() => router.push('/dashboard/login')}
            style={{ background: '#722f37', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            Se connecter
          </button>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '20px' }}>Nouveau mot de passe</h2>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Nouveau mot de passe
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 caractères" required style={input}
              onFocus={(e) => (e.target.style.borderColor = '#722f37')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')} />
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '8px', marginTop: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Confirmer
            </label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
              placeholder="Retapez le mot de passe" required style={input}
              onFocus={(e) => (e.target.style.borderColor = '#722f37')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')} />
            <button type="submit" disabled={loading}
              style={{ width: '100%', height: '48px', marginTop: '20px', background: '#722f37', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.6 : 1 }}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Changer le mot de passe'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default function ResetPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(45deg, #1a1a1a 0%, #722f37 40%, #b87333 80%, #d4af37 100%)' }}>
      <div className="w-full max-w-[400px]">
        <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center' }}>Chargement...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  )
}