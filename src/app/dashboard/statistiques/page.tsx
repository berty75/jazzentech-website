// PATH: src/app/dashboard/statistiques/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Loader2, TrendingUp, RefreshCw, AlertTriangle, Target, Clock, Calendar } from 'lucide-react'
import DashboardShell from '@/components/DashboardShell'
import Select from '@/components/Select'

const BORDEAUX = '#722f37'
const OR = '#d4af37'
const BRONZE = '#b87333'
const CREME = '#f7f3e9'

// Palette pour les courbes (une couleur par concert)
const SERIES = ['#722f37', '#2f6f7f', '#d4af37', '#4a7c4e', '#8a5fa8', '#c0642b', '#3d5a8c']

type Curve = { d: number; n: number }
type Concert = { name: string; count: number; revenue: number; curve: Curve[]; speed7: number }
type Priority = { name: string; count: number; revenue: number; speed7: number; score: number; reasons: string[] }
type Comparison = { edition: string; atSameStage: number; total: number; isCurrent: boolean }
type Week = { week: number; total: number; parts: Record<string, number>; other: number }
type Stats = {
  editions: string[]; edition: string; daysLeft: number; empty?: boolean
  weeks: Week[]; majorNames: string[]; minSignificant: number
  totals: { tickets: number; revenue: number; passCount: number }
  concerts: Concert[]; globalCurve: Curve[]; priorities: Priority[]
  comparison: Comparison[]
  weekday: { day: string; n: number }[]
  hours: { hour: number; n: number }[]
  channels: { name: string; n: number }[]
}

const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const short = (s: string, n = 22) => (s.length > n ? s.slice(0, n) + '…' : s)

// Les libellés Billetweb sont du type "Mercredi 5 août 2026 - Erik Truffaz".
// On garde l'ARTISTE (après le tiret) : c'est lui qu'on veut lire sur le graphique.
const artist = (label: string) => {
  const i = label.indexOf(' - ')
  const a = i >= 0 ? label.slice(i + 3) : label
  return a.trim() || label
}
// Jour de la semaine, en complément ("Mer. 5 août")
const dayOf = (label: string) => {
  const i = label.indexOf(' - ')
  return i >= 0 ? label.slice(0, i).trim() : ''
}

export default function StatistiquesPage() {
  const [editions, setEditions] = useState<string[]>([])
  const [edition, setEdition] = useState('')
  const [data, setData] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async (ed?: string) => {
    setLoading(true); setError('')
    try {
      const q = ed ? `?edition=${encodeURIComponent(ed)}` : ''
      const res = await fetch(`/api/billetweb/stats${q}`)
      const d = await res.json()
      if (!res.ok) { setError(d.error || 'Erreur'); return }
      setData(d)
      setEditions(d.editions || [])
      if (!ed) setEdition(d.edition || '')
    } catch (e: any) { setError('Erreur : ' + e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const onEdition = (v: string) => { setEdition(v); load(v) }

  return (
    <DashboardShell>
      <div className="p-4 sm:p-6 md:p-10">
        {/* En-tête */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: `linear-gradient(135deg, ${BORDEAUX}, #8f3d47)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp className="w-5 h-5" style={{ color: OR }} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl" style={{ fontWeight: 700, color: '#1a1a1a', fontFamily: "'Playfair Display', Georgia, serif" }}>Statistiques</h2>
              <p style={{ fontSize: '14px', color: '#8a8478' }}>Tendances de vente et priorités de communication</p>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <div style={{ width: '190px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Édition</label>
              <Select value={edition} onChange={onEdition} compact options={editions.map((e) => ({ value: e, label: e }))} placeholder="Édition" />
            </div>
            <button onClick={() => load(edition)} disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{ background: BORDEAUX, color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}Actualiser
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg p-3" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <p style={{ color: '#991b1b', fontSize: '13px', margin: 0 }}>{error}</p>
          </div>
        )}

        {loading && !data && (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: BORDEAUX }} /></div>
        )}

        {data && !data.empty && (
          <>
            {/* Chiffres clés */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <Kpi label="Billets vendus" value={String(data.totals.tickets)} />
              <Kpi label="Recettes" value={eur(data.totals.revenue)} color={BORDEAUX} />
              <Kpi label="Dont pass" value={String(data.totals.passCount)} color={BRONZE} />
              <Kpi label="Jours avant festival" value={data.daysLeft > 0 ? `J-${data.daysLeft}` : 'En cours'} color={data.daysLeft <= 30 ? '#c0392b' : '#1a1a1a'} />
            </div>

            {/* ---- PRIORITÉS : le cœur ---- */}
            <Card title="Où communiquer en priorité" icon={Target}
              subtitle="Score fondé sur la vitesse de vente et le volume, comparés à la moyenne de l'édition. Plus le score est haut, plus le concert a besoin d'un coup de pouce.">
              <div className="space-y-3">
                {data.priorities.map((p, i) => {
                  const urgent = p.score >= 50
                  const warn = p.score >= 25 && p.score < 50
                  const color = urgent ? '#c0392b' : warn ? BRONZE : '#5b7c5b'
                  return (
                    <div key={p.name} className="rounded-xl p-4" style={{ background: i === 0 && urgent ? '#fffbfb' : '#faf8f3', border: `1px solid ${i === 0 && urgent ? '#fecaca' : '#ece7dd'}` }}>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                            {i + 1}
                          </div>
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{short(artist(p.name), 38)}</p>
                            <p style={{ fontSize: '11px', color: '#a8a094', margin: 0 }}>{dayOf(p.name)}</p>
                            <p style={{ fontSize: '12px', color: '#8a8478', margin: 0 }}>
                              {p.count} billets · {p.speed7}/jour cette semaine · {eur(p.revenue)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div style={{ width: '90px', height: '6px', borderRadius: '999px', background: '#eee', overflow: 'hidden' }}>
                            <div style={{ width: `${p.score}%`, height: '100%', background: color }} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 700, color, minWidth: '30px', textAlign: 'right' }}>{p.score}</span>
                        </div>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '42px' }}>
                        {p.reasons.map((r, j) => (
                          <li key={j} style={{ fontSize: '12.5px', color: urgent ? '#991b1b' : '#666', listStyle: 'none' }}>
                            <span style={{ color, marginRight: '6px' }}>▸</span>{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* ---- VENTES PAR SEMAINE : le rythme réel ---- */}
            <Card title="Ventes par semaine" icon={TrendingUp}
              subtitle="Nombre de billets vendus chaque semaine, réparti par concert. C'est ici qu'on voit les pics — et l'accélération à l'approche du festival.">
              <WeeklyBars weeks={data.weeks} majorNames={data.majorNames} daysLeft={data.daysLeft} />
            </Card>

            {/* ---- TABLEAU PAR CONCERT ---- */}
            <Card title="État de chaque concert" icon={TrendingUp}
              subtitle="Une ligne par concert : sa courbe de vente, son total, et son rythme actuel. Un rythme en rouge signale un concert qui décroche.">
              <ConcertRows
                concerts={data.concerts.filter((c) => data.majorNames.includes(c.name))}
                minor={data.concerts.filter((c) => !data.majorNames.includes(c.name))}
                daysLeft={data.daysLeft} />
            </Card>

            {/* ---- COMPARAISON ÉDITIONS ---- */}
            {data.comparison.length > 1 && (
              <Card title="Comparaison avec les éditions précédentes" icon={Calendar}
                subtitle={`Billets vendus au même stade (à J-${data.daysLeft} du festival). Les artistes changent chaque année : on compare le rythme global, pas les têtes d'affiche.`}>
                <BarsComparison rows={data.comparison} />
              </Card>
            )}

            {/* ---- QUAND LES GENS ACHÈTENT ---- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Jour d'achat" icon={Calendar} subtitle="Quand poster sur les réseaux : privilégie la veille des pics.">
                <SimpleBars data={data.weekday.map((w) => ({ label: w.day.slice(0, 3), n: w.n }))} />
              </Card>
              <Card title="Heure d'achat" icon={Clock} subtitle="Les créneaux où ton public est actif.">
                <SimpleBars data={data.hours.filter((h) => h.hour >= 6).map((h) => ({ label: String(h.hour), n: h.n }))} compact />
              </Card>
            </div>

            {/* ---- CANAUX ---- */}
            <Card title="Canaux de vente" icon={Target}>
              <div className="flex flex-wrap gap-3">
                {data.channels.map((c, i) => (
                  <div key={c.name} className="rounded-xl p-3" style={{ background: '#fff', border: '1px solid #ece7dd', minWidth: '130px' }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: SERIES[i % SERIES.length] }} />
                      <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>{c.name}</span>
                    </div>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{c.n}</p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {data?.empty && (
          <p style={{ color: '#888' }}>Aucune vente sur cette édition.</p>
        )}
      </div>
    </DashboardShell>
  )
}

/* ---------- Composants ---------- */

function Kpi({ label, value, color = '#1a1a1a' }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl p-4" style={{ background: '#fff', border: '1px solid #ece7dd' }}>
      <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '22px', fontWeight: 700, color, margin: 0 }}>{value}</p>
    </div>
  )
}

function Card({ title, subtitle, icon: Icon, children }: any) {
  return (
    <div className="rounded-2xl p-5 md:p-6 mb-6" style={{ background: '#fff', border: '1px solid #ece7dd' }}>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon className="w-4 h-4" style={{ color: BRONZE }} />}
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{title}</h3>
      </div>
      {subtitle && <p style={{ fontSize: '12.5px', color: '#8a8478', margin: '0 0 16px', lineHeight: 1.5 }}>{subtitle}</p>}
      {children}
    </div>
  )
}

// ============================================================
//  VENTES PAR SEMAINE — barres empilées (rythme réel)
// ============================================================
function WeeklyBars({ weeks, majorNames, daysLeft }: { weeks: Week[]; majorNames: string[]; daysLeft: number }) {
  const [hover, setHover] = useState<number | null>(null)
  if (!weeks.length) return <p style={{ color: '#999', fontSize: '13px' }}>Pas assez de données.</p>

  const max = Math.max(...weeks.map((w) => w.total), 1)
  const nowWeek = Math.floor(daysLeft / 7)
  const hovered = hover !== null ? weeks.find((w) => w.week === hover) : null

  return (
    <div>
      <div className="flex items-end gap-[3px]" style={{ height: '200px', position: 'relative' }}>
        {weeks.map((w) => (
          <div key={w.week}
            onMouseEnter={() => setHover(w.week)}
            onMouseLeave={() => setHover(null)}
            className="flex-1 flex flex-col justify-end"
            style={{ height: '100%', cursor: 'pointer', minWidth: '6px', opacity: hover !== null && hover !== w.week ? 0.4 : 1, transition: 'opacity .12s' }}>
            <div style={{
              height: `${(w.total / max) * 100}%`, display: 'flex', flexDirection: 'column-reverse',
              borderRadius: '3px 3px 0 0', overflow: 'hidden', minHeight: w.total > 0 ? '3px' : 0,
              outline: w.week === nowWeek ? '1.5px solid #c0392b' : 'none', outlineOffset: '1px',
            }}>
              {majorNames.map((name, i) => {
                const n = w.parts[name] || 0
                if (!n) return null
                return <div key={name} style={{ height: `${(n / w.total) * 100}%`, background: SERIES[i % SERIES.length] }} />
              })}
              {w.other > 0 && <div style={{ height: `${(w.other / w.total) * 100}%`, background: '#d8d2c6' }} />}
            </div>
          </div>
        ))}

        {hovered && (
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            background: '#fff', border: '1px solid #e8dfc8', borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(26,26,26,0.12)', padding: '10px 12px', minWidth: '210px', zIndex: 5, pointerEvents: 'none',
          }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: '11px', fontWeight: 700, color: BORDEAUX }}>
                {hovered.week === 0 ? 'Semaine du festival' : `Semaine J-${hovered.week * 7}`}
              </span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>{hovered.total}</span>
            </div>
            {majorNames.map((name, i) => {
              const n = hovered.parts[name] || 0
              if (!n) return null
              return (
                <div key={name} className="flex items-center justify-between gap-3" style={{ marginBottom: '2px' }}>
                  <div className="flex items-center gap-1.5" style={{ minWidth: 0 }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: SERIES[i % SERIES.length], flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{short(artist(name), 18)}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#1a1a1a' }}>{n}</span>
                </div>
              )
            })}
            {hovered.other > 0 && (
              <div className="flex items-center justify-between gap-3">
                <span style={{ fontSize: '11px', color: '#999' }}>Autres dates</span>
                <span style={{ fontSize: '11.5px', color: '#999' }}>{hovered.other}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-[3px] mt-2">
        {weeks.map((w) => (
          <div key={w.week} className="flex-1 text-center" style={{ minWidth: '6px' }}>
            <span style={{ fontSize: '9px', color: w.week === 0 ? BORDEAUX : '#bbb', fontWeight: w.week === 0 ? 700 : 400 }}>
              {w.week === 0 ? 'J' : w.week % 4 === 0 ? `-${w.week * 7}` : ''}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 pt-3" style={{ borderTop: '1px solid #f4f1ea' }}>
        {majorNames.map((name, i) => (
          <div key={name} className="flex items-center gap-1.5">
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: SERIES[i % SERIES.length] }} />
            <span style={{ fontSize: '11.5px', color: '#666' }}>{short(artist(name), 24)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
//  TABLEAU PAR CONCERT — une ligne, tout se lit d'un coup d'œil
//  Chaque concert a SA propre mini-courbe : aucune superposition,
//  aucune échelle partagée, aucune légende à décoder.
// ============================================================
function ConcertRows({ concerts, minor, daysLeft }: { concerts: Concert[]; minor: Concert[]; daysLeft: number }) {
  if (!concerts.length) return <p style={{ color: '#999', fontSize: '13px' }}>Aucun concert n&apos;a encore assez de ventes.</p>

  const maxCount = Math.max(...concerts.map((c) => c.count), 1)
  const maxSpeed = Math.max(...concerts.map((c) => c.speed7), 0.1)

  return (
    <div>
      {/* En-têtes */}
      <div className="hidden md:flex items-center gap-4 px-3 pb-2" style={{ borderBottom: '1px solid #f0ece3' }}>
        <span style={{ flex: 1, fontSize: '10.5px', color: '#a8a094', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Concert</span>
        <span style={{ width: '110px', fontSize: '10.5px', color: '#a8a094', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Progression</span>
        <span style={{ width: '70px', textAlign: 'right', fontSize: '10.5px', color: '#a8a094', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Billets</span>
        <span style={{ width: '120px', fontSize: '10.5px', color: '#a8a094', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Rythme / jour</span>
      </div>

      {concerts.map((c, i) => {
        const col = SERIES[i % SERIES.length]
        const speedPct = (c.speed7 / maxSpeed) * 100
        const slow = c.speed7 < maxSpeed * 0.4

        return (
          <div key={c.name} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-3 py-3.5"
            style={{ borderBottom: i < concerts.length - 1 ? '1px solid #f4f1ea' : 'none' }}>

            {/* Concert */}
            <div className="flex items-center gap-2.5" style={{ flex: 1, minWidth: 0 }}>
              <span style={{ width: '4px', height: '32px', borderRadius: '2px', background: col, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.name}>
                  {artist(c.name)}
                </p>
                <p style={{ fontSize: '11.5px', color: '#a8a094', margin: 0 }}>{dayOf(c.name)}</p>
              </div>
            </div>

            {/* Mini-courbe : sa propre échelle, donc toujours lisible */}
            <div style={{ width: '110px', flexShrink: 0 }}>
              <Spark curve={c.curve} color={col} daysLeft={daysLeft} />
            </div>

            {/* Billets + barre de proportion */}
            <div style={{ width: '70px', flexShrink: 0 }}>
              <p style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a1a', margin: 0, textAlign: 'right' }}>{c.count}</p>
              <div style={{ height: '3px', borderRadius: '2px', background: '#f0ece3', overflow: 'hidden', marginTop: '3px' }}>
                <div style={{ width: `${(c.count / maxCount) * 100}%`, height: '100%', background: col }} />
              </div>
            </div>

            {/* Rythme hebdo */}
            <div style={{ width: '120px', flexShrink: 0 }}>
              <div className="flex items-center gap-2">
                <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#f0ece3', overflow: 'hidden' }}>
                  <div style={{ width: `${speedPct}%`, height: '100%', background: slow ? '#c0392b' : '#4a7c4e', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: slow ? '#c0392b' : '#4a7c4e', minWidth: '30px', textAlign: 'right' }}>
                  {c.speed7}
                </span>
              </div>
              {slow && <p style={{ fontSize: '10.5px', color: '#c0392b', margin: '2px 0 0' }}>à relancer</p>}
            </div>
          </div>
        )
      })}

      {minor.length > 0 && (
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid #f0ece3' }}>
          <p style={{ fontSize: '10.5px', color: '#a8a094', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '6px' }}>
            Trop peu de ventes pour être analysés
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {minor.map((c) => (
              <span key={c.name} style={{ fontSize: '12px', color: '#a8a094' }}>
                {artist(c.name)} <strong style={{ color: '#8a8478' }}>{c.count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Mini-courbe : chaque concert à sa propre échelle → toujours lisible
function Spark({ curve, color, daysLeft }: { curve: Curve[]; color: string; daysLeft: number }) {
  const W = 110, H = 34
  if (curve.length < 2) return <div style={{ height: `${H}px` }} />

  const maxD = Math.max(...curve.map((p) => p.d), 1)
  const maxN = Math.max(...curve.map((p) => p.n), 1)
  const X = (d: number) => ((maxD - d) / maxD) * W
  const Y = (n: number) => H - 3 - (n / maxN) * (H - 6)

  const pts = curve.map((p) => `${X(p.d)},${Y(p.n)}`).join(' ')
  const area = `${X(curve[0].d)},${H} ${pts} ${X(curve[curve.length - 1].d)},${H}`
  const last = curve[curve.length - 1]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: `${H}px`, display: 'block', overflow: 'visible' }}>
      <polygon points={area} fill={color} opacity="0.10" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      {daysLeft > 0 && daysLeft <= maxD && (
        <line x1={X(daysLeft)} y1={0} x2={X(daysLeft)} y2={H} stroke="#c0392b" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
      )}
      <circle cx={X(last.d)} cy={Y(last.n)} r="2.5" fill={color} />
    </svg>
  )
}

function BarsComparison({ rows }: { rows: Comparison[] }) {
  const max = Math.max(...rows.map((r) => Math.max(r.atSameStage, r.total)), 1)
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.edition}>
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: '13px', fontWeight: r.isCurrent ? 700 : 500, color: r.isCurrent ? BORDEAUX : '#666' }}>
              {r.edition}{r.isCurrent && ' (en cours)'}
            </span>
            <span style={{ fontSize: '12px', color: '#888' }}>
              <strong style={{ color: '#1a1a1a' }}>{r.atSameStage}</strong> au même stade
              {!r.isCurrent && ` · ${r.total} au total`}
            </span>
          </div>
          <div style={{ height: '18px', borderRadius: '6px', background: '#f4f1ea', overflow: 'hidden', position: 'relative' }}>
            {!r.isCurrent && (
              <div style={{ position: 'absolute', inset: 0, width: `${(r.total / max) * 100}%`, background: '#ece7dd' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, width: `${(r.atSameStage / max) * 100}%`, background: r.isCurrent ? BORDEAUX : BRONZE, borderRadius: '6px' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SimpleBars({ data, compact = false }: { data: { label: string; n: number }[]; compact?: boolean }) {
  const max = Math.max(...data.map((d) => d.n), 1)
  return (
    <div className="flex items-end gap-1" style={{ height: '130px' }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center justify-end" style={{ height: '100%' }}>
          <span style={{ fontSize: '9px', color: '#aaa', marginBottom: '2px' }}>{d.n > 0 && !compact ? d.n : ''}</span>
          <div style={{ width: '100%', height: `${(d.n / max) * 100}%`, background: d.n === max ? BORDEAUX : '#e3d9c8', borderRadius: '4px 4px 0 0', minHeight: d.n > 0 ? '2px' : '0' }} />
          <span style={{ fontSize: '9.5px', color: '#888', marginTop: '4px' }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}
