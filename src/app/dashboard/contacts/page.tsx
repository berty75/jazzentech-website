// PATH: src/app/dashboard/contacts/page.tsx
'use client'

import { Upload, Loader2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import DashboardShell from '@/components/DashboardShell'

type Client = {
  _id: string; firstName: string; lastName: string; email: string;
  phone?: string; editions: string[]; ticketCount?: number; unsubscribed: boolean; source: string;
}

export default function ContactsPage() {
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
        setImportResult(`${data.imported} importés, ${data.updated} mis à jour`)
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

  const activeCount = clients.filter(c => !c.unsubscribed).length
  const years = [...new Set(clients.flatMap(c => c.editions || []))].sort()
  const totalPages = Math.ceil(filtered.length / perPage) || 1

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a' }}>Contacts</h2>
            <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>{activeCount} contacts actifs sur {clients.length} total</p>
          </div>
          <button onClick={handleImportJSON} disabled={importing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm self-start sm:self-auto shrink-0"
            style={{ background: '#722f37', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
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
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#999' }} />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Rechercher un contact..."
              style={{ width: '100%', height: '40px', paddingLeft: '36px', paddingRight: '14px', fontSize: '14px', color: '#1a1a1a', background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setPage(1) }}
            style={{ height: '40px', padding: '0 12px', fontSize: '13px', background: '#fff', border: '1px solid #e5e2dc', borderRadius: '8px', color: '#555' }}>
            <option value="">Toutes éditions</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Pagination info */}
        <div className="flex items-center justify-between mb-3">
          <p style={{ fontSize: '12px', color: '#999' }}>{filtered.length} résultat(s) — page {page}/{totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}
              className="p-1.5 rounded-md" style={{ border: '1px solid #e5e2dc', background: '#fff', cursor: page <= 1 ? 'default' : 'pointer', opacity: page <= 1 ? 0.3 : 1 }}>
              <ChevronLeft className="w-4 h-4" style={{ color: '#555' }} />
            </button>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}
              className="p-1.5 rounded-md" style={{ border: '1px solid #e5e2dc', background: '#fff', cursor: page >= totalPages ? 'default' : 'pointer', opacity: page >= totalPages ? 0.3 : 1 }}>
              <ChevronRight className="w-4 h-4" style={{ color: '#555' }} />
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: '#999' }}>Chargement...</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
              <div className="overflow-x-auto">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e2dc' }}>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Nom</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Email</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Tél</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>Éditions</th>
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
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2">
              {filtered.slice((page - 1) * perPage, page * perPage).map((c) => (
                <div key={c._id} className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #e5e2dc' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{c.firstName} {c.lastName}</p>
                  <p className="truncate" style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>{c.email}</p>
                  {c.phone && <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{c.phone}</p>}
                  {c.editions?.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-2">
                      {c.editions.map(y => (
                        <span key={y} className="px-2 py-0.5 rounded text-xs" style={{ background: '#f0eee9', color: '#722f37', fontWeight: 500 }}>{y}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  )
}