'use client'

import Link from 'next/link'
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ForgotPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setSent(true)
      else setError('Erreur lors de l\'envoi')
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
        <Link href="/dashboard/login" className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-70 transition-opacity"
          style={{ color: 'rgba(255,255,255,0.7)' }}>
          <ArrowLeft className="w-4 h-4" /> Retour à la connexion
        </Link>

        <div className="rounded-2xl px-8 py-8 sm:px-10" style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#16a34a' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Email envoyé</h2>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Si cette adresse est associée à un compte admin, vous recevrez un lien de réinitialisation.
              </p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>Mot de passe oublié</h2>
              <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
                Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
              </p>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
                  <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Adresse e-mail
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jazzentech.com" required style={input}
                  onFocus={(e) => (e.target.style.borderColor = '#722f37')}
                  onBlur={(e) => (e.target.style.borderColor = '#ddd')} />
                <button type="submit" disabled={loading}
                  style={{ width: '100%', height: '48px', marginTop: '16px', background: '#722f37', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.6 : 1 }}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Envoyer le lien'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}