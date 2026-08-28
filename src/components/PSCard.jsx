import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cpu, HardDrive, Lightbulb, Zap } from 'lucide-react'
import VerdictDot from './VerdictDot'
import RevisionCloud from './RevisionCloud'
import { daysUntil } from '../hooks/usePSData'

const SCOPE_ICON = { Breakthrough: Zap, Moderate: Lightbulb, Incremental: Lightbulb }

export default function PSCard({ ps, index, animate = true }) {
  const days = daysUntil(ps.deadline_date)
  const CatIcon = ps.category === 'Hardware' ? HardDrive : Cpu
  const ScopeIcon = SCOPE_ICON[ps.innovation_scope] || Lightbulb

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true, margin: '-40px' } : undefined}
      transition={{ duration: 0.25, delay: (index % 24) * 0.05, ease: 'easeOut' }}
    >
      <Link
        to={`/ps/${ps.ps_number}`}
        className={`group relative block h-full rounded-md border border-blue-700 bg-blue-900/60 p-4 transition-colors hover:border-ink-100/40 hover:bg-blue-850 ${
          ps.is_stub ? 'bp-hatch' : ''
        }`}
      >
        {ps.is_aicte_open_theme && (
          <span className="absolute -top-2 left-4 rounded-sm border border-amber-400/50 bg-blue-950 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-400">
            Open Theme
          </span>
        )}

        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {!ps.is_stub && <VerdictDot verdict={ps.verdict} />}
            <span className="font-mono text-xs text-ink-500">{ps.ps_number}</span>
          </div>
          <span className="flex items-center gap-1 rounded-sm border border-blue-600 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-300">
            <CatIcon size={11} />
            {ps.category}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-ink-100 group-hover:text-ink-100/80">
          {ps.title}
        </h3>

        <p className="mb-3 truncate text-xs text-ink-500">{ps.org}</p>

        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-sm bg-blue-800 px-1.5 py-0.5 text-[10px] text-ink-300">{ps.theme}</span>
          {ps.label_fixed && (
            <span className="ml-1 font-mono text-[10px] text-amber-400" title="Theme/category corrected from source data — see revision mark">
              <RevisionCloud>corrected</RevisionCloud>
            </span>
          )}
        </div>

        {!ps.is_stub && (
          <div className="mb-3 flex items-center gap-3 font-mono text-[10px] text-ink-500">
            <span className="flex items-center gap-1">
              <ScopeIcon size={11} className="text-ink-300" />
              {ps.innovation_scope}
            </span>
            <span>Effort: {ps.invention_effort}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-blue-800 pt-2 font-mono text-[10px] text-ink-500">
          <span>
            {days === null
              ? 'No deadline'
              : days < 0
              ? 'Closed'
              : days === 0
              ? 'Closes today'
              : `${days}d left`}
          </span>
          <span>{ps.ideas} ideas</span>
        </div>
      </Link>
    </motion.div>
  )
}
