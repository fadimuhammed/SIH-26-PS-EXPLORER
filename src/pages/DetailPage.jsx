import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import VerdictDot from '../components/VerdictDot'
import { daysUntil } from '../hooks/usePSData'
import OverviewTab from '../components/tabs/OverviewTab'
import AnalysisTab from '../components/tabs/AnalysisTab'
import EvaluatorLensTab from '../components/tabs/EvaluatorLensTab'
import BuildPlanTab from '../components/tabs/BuildPlanTab'
import UnlockMoreTab from '../components/tabs/UnlockMoreTab'

const TABS = [
  { id: 'overview', label: 'Overview', Comp: OverviewTab },
  { id: 'analysis', label: 'Analysis', Comp: AnalysisTab },
  { id: 'evaluator', label: 'Evaluator Lens', Comp: EvaluatorLensTab },
  { id: 'plan', label: '36-Hr Plan', Comp: BuildPlanTab },
  { id: 'unlock', label: 'Unlock More', Comp: UnlockMoreTab },
]

export default function DetailPage() {
  const { psNumber } = useParams()
  const [ps, setPs] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    let cancelled = false
    setPs(null)
    setNotFound(false)
    // Fetch only this PS's record (light fields + detail blob) on demand,
    // instead of shipping the full ~3MB dataset for every visit.
    fetch(`${import.meta.env.BASE_URL}data/ps/${psNumber}.json`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setPs(data)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
    return () => {
      cancelled = true
    }
  }, [psNumber])

  if (notFound) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink-300">Problem statement not found.</p>
        <Link to="/" className="mt-4 inline-block text-ink-300 hover:underline">
          Back to explorer
        </Link>
      </div>
    )
  }

  if (!ps) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">Loading…</p>
      </div>
    )
  }

  const days = daysUntil(ps.deadline_date)
  const ActiveTab = TABS.find((t) => t.id === tab)?.Comp

  return (
    <div className="min-h-screen">
      <div className="border-b border-blue-800 bg-blue-900/20">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-100">
            <ArrowLeft size={14} />
            Back to explorer
          </Link>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            {ps.is_aicte_open_theme && (
              <span className="rounded-sm border border-amber-400/50 bg-blue-950 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-400">
                Open Theme
              </span>
            )}
            {ps.is_autodesk_cluster && (
              <span className="rounded-sm border border-amber-400/50 bg-blue-950 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-400">
                Design-Quality-Dependent
              </span>
            )}
            {!ps.is_stub && <VerdictDot verdict={ps.verdict} size={10} />}
            <span className="font-mono text-xs text-ink-500">{ps.ps_number}</span>
            <span className="rounded-sm border border-blue-600 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300">
              {ps.category}
            </span>
          </div>

          <h1 className="mb-2 text-xl font-semibold leading-snug text-ink-100 sm:text-2xl">{ps.title}</h1>
          <p className="mb-3 text-sm text-ink-500">
            {ps.org} · {ps.theme}
          </p>

          <div className="flex flex-wrap gap-4 font-mono text-xs text-ink-500">
            <span>{days === null ? 'No deadline' : days < 0 ? 'Closed' : `${days}d left · ${ps.deadline}`}</span>
            <span>{ps.ideas} ideas submitted</span>
            {!ps.is_stub && ps.scores && <span>Score: {ps.scores.total}/30</span>}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {ps.is_stub ? (
          <div className="rounded-md border border-blue-700 bg-blue-900/40 p-8 text-center">
            <p className="text-sm text-ink-300">Full content unavailable for this problem statement.</p>
          </div>
        ) : ps.is_autodesk_cluster ? (
          <AutodeskDetail ps={ps} />
        ) : (
          <>
            <div className="mb-6 flex gap-1 overflow-x-auto border-b border-blue-800">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative whitespace-nowrap px-3 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                    tab === t.id ? 'text-amber-400' : 'text-ink-500 hover:text-ink-300'
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.div layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-amber-400" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {ActiveTab && <ActiveTab ps={ps} />}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

// Autodesk CAD/BIM cluster (SIH26112-26116): distinct layout, no 36-Hr Plan
// tab since it doesn't map cleanly onto a CAD deliverable. Falls back to a
// simplified single-scroll view using whatever overview/analysis content exists.
function AutodeskDetail({ ps }) {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-amber-400/30 bg-amber-400/5 p-3 text-xs text-ink-300">
        This problem statement is scored on design quality (Fusion 360 / Forma / Revit deliverable),
        not the standard Innovation/Feasibility numbers used elsewhere on this site.
        {ps.ps_number === 'SIH26115' && ' This PS has no CAD requirement — submission is PPT-only.'}
      </div>
      <OverviewTab ps={ps} />
      <AnalysisTab ps={ps} />
    </div>
  )
}
