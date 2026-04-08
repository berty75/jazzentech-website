// PATH: src/app/dashboard/contacts/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Heart, FileText, Mail, Settings, Users, Upload, Loader2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const nav = [
  { href: '/dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { href: '/dashboard/dons', label: 'Dons', icon: Heart },
  { href: '/dashboard/contacts', label: 'Contacts', icon: Users },
  { href: '/dashboard/cerfa', label: 'Cerfa', icon: FileText },
  { href: '/dashboard/messagerie', label: 'Messagerie', icon: Mail },
  { href: '/dashboard/settings', label: 'Parametres', icon: Settings },
]

type Client = {
  _id: string; firstName: string; lastName: string; email: string;
  phone?: string; editions: string[]; ticketCount?: number; unsubscribed: boolean; source: string;
}

export default function ContactsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 50
  const [filterYear, setFilterYear] = useState('')

  useEffect(() => {
    fetch('/api/contacts').then(r => r.json()).then(d => {
      if (Array.isArray(d)) setClients(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleImportJSON = async () => {
    setImporting(true)
    setImportResult('')
    try {
      const importRes = await fetch('/api/contacts/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = await importRes.json()
      if (importRes.ok) {
        setImportResult(`${data.imported} importes, ${data.updated} mis a jour`)
        // Refresh
        const updated = await fetch('/api/contacts').then(r => r.json())
        if (Array.isArray(updated)) setClients(updated)
      } else {
        setImportResult(data.error || 'Erreur')
      }
    } catch (e: any) {
      setImportResult('Erreur: ' + e.message)
    } finally {
      setImporting(false)
    }
  }

  const filtered = clients.filter(c => {
    const matchSearch = !search || 
      `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(search.toLowerCase())
    const matchYear = !filterYear || c.editions?.includes(filterYear)
    return matchSearch && matchYear
  })

  const active = clients.filter(c => !c.unsubscribed)
  const years = [...new Set(clients.flatMap(c => c.editions || []))].sort()

  const handleLogout = async () => { await fetch('/api/auth', { method: 'DELETE' }); router.push('/dashboard/login') }

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f3ef' }}>
      <aside className="hidden md:flex flex-col w-[240px] border-r" style={{ background: '#fff', borderColor: '#e5e2dc' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#e5e2dc' }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>JAZZ EN TECH</h1>
          <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Administration</p>
        </div>
        <nav className="flex-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.href === '/dashboard/contacts'
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors"
                style={{ background: active ? 'rgba(114,47,55,0.08)' : 'transparent', color: active ? '#722f37' : '#666', fontWeight: active ? 600 : 400, textDecoration: 'none' }}>
                <item.icon className="w-4 h-4" /> {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t" style={{ borderColor: '#e5e2dc' }}>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sm"
            style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut className="w-4 h-4" /> Deconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>Contacts</h2>
              <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>{active.length} contacts actifs sur {clients.length} total</p>
            </div>
            <button onClick={handleImportJSON} disabled={importing}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: '#722f37', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Importer contacts
            </button>
          </div>

          {importResult && (
            <div className="mb-4 rounded-lg p-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <p style={{ color: '#166534', fontSize: '13px', margin: 0 }}>{importResult}</p>
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#999' }} />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un contact..."
                style={{ width: '100%', height: '40px', paddingLeft: '36px', paddingRight: '14px', fontSize: '14px', color: '#1a1a1a', background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}
              style={{ height: '40px', padding: '0 12px', fontSize: '13px', background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', color: '#555' }}>
              <option value="">Toutes editions</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between mb-2">
            <p style={{ fontSize: '12px', color: '#999' }}>{filtered.length} resultat(s) — page {page}/{Math.ceil(filtered.length / perPage) || 1}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e5e2dc', background: '#fff', cursor: page <= 1 ? 'default' : 'pointer', opacity: page <= 1 ? 0.3 : 1 }}>
                <ChevronLeft className="w-4 h-4" style={{ color: '#555' }} />
              </button>
              <button onClick={() => setPage(Math.min(Math.ceil(filtered.length / perPage), page + 1))} disabled={page >= Math.ceil(filtered.length / perPage)}
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid #e5e2dc', background: '#fff', cursor: page >= Math.ceil(filtered.length / perPage) ? 'default' : 'pointer', opacity: page >= Math.ceil(filtered.length / perPage) ? 0.3 : 1 }}>
                <ChevronRight className="w-4 h-4" style={{ color: '#555' }} />
              </button>
            </div>
          </div>

          {loading ? (
            <p style={{ color: '#999' }}>Chargement...</p>
          ) : (
            <div className="rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e2dc' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Nom</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Email</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Tel</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Editions</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Billets</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice((page - 1) * perPage, page * perPage).map((c) => (
                    <tr key={c._id} style={{ borderBottom: '1px solid #f0eee9' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 500, color: '#1a1a1a' }}>{c.firstName} {c.lastName}</td>
                      <td style={{ padding: '10px 14px', color: '#666' }}>{c.email}</td>
                      <td style={{ padding: '10px 14px', color: '#666' }}>{c.phone || '-'}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <div className="flex gap-1 flex-wrap">
                          {c.editions?.map(y => (
                            <span key={y} className="px-2 py-0.5 rounded text-xs" style={{ background: '#f0eee9', color: '#722f37', fontWeight: 500 }}>{y}</span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'center', color: '#666' }}>{c.ticketCount || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          )}
        </div>
      </main>
    </div>
  )
}