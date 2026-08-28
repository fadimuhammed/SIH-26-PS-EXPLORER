import { useState, useMemo } from 'react'
import { usePSData } from '../hooks/usePSData'
import { useSortFilter } from '../hooks/useSortFilter'
import StatsBar from '../components/StatsBar'
import SearchBar from '../components/SearchBar'
import SortDropdown from '../components/SortDropdown'
import FilterPanel from '../components/FilterPanel'
import PSCard from '../components/PSCard'

const PAGE_SIZE = 24

export default function ListPage() {
  const { all, stats, facets, loading, error } = usePSData()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    category: null,
    theme: null,
    org: null,
    innovation_scope: null,
    invention_effort: null,
    verdict: null,
  })
  const [sortBy, setSortBy] = useState('ps_number')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useSortFilter(all, { query, filters, sortBy })
  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible])

  const handleFilterSelect = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }))
    setVisible(PAGE_SIZE)
  }
  const clearAll = () => {
    setFilters({ category: null, theme: null, org: null, innovation_scope: null, invention_effort: null, verdict: null })
    setVisible(PAGE_SIZE)
  }
  const handleQuery = (v) => {
    setQuery(v)
    setVisible(PAGE_SIZE)
  }
  const handleSort = (v) => {
    setSortBy(v)
    setVisible(PAGE_SIZE)
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink-300">Couldn't load problem statement data. Please refresh.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">Loading problem statements…</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="bp-grid absolute inset-0 h-[520px]" />

      {/* Cyanotype exposure sweep — the single orchestrated page-load moment */}
      <div className="pointer-events-none absolute inset-0 h-[520px] overflow-hidden">
        <div
          className="bp-exposure-sweep h-full w-1/3"
          style={{ background: 'linear-gradient(90deg, transparent, #E8EFF522, transparent)' }}
        />
      </div>

      <div className="bp-grid-fade absolute inset-0 h-[520px] pointer-events-none" />

      <header className="bp-exposure-resolve relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6">
        <div className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-ink-500">
          Smart India Hackathon 2026
        </div>
        <h1 className="mb-2 font-mono text-2xl font-semibold uppercase tracking-tight text-ink-100 sm:text-3xl">
          Problem Statement Explorer
        </h1>
        <p className="mb-6 max-w-2xl text-sm text-ink-300">
          All 226 official SIH 2026 problem statements, scored for innovation and
          feasibility with an AI-assisted analysis layer and a 36-hour build plan for each.
        </p>
        <StatsBar stats={stats} />
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar value={query} onChange={handleQuery} />
          </div>
          <div className="flex gap-2">
            <FilterPanel facets={facets} filters={filters} onSelect={handleFilterSelect} onClearAll={clearAll} />
            <SortDropdown value={sortBy} onChange={handleSort} />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-ink-500">
            Showing {shown.length} of {filtered.length} problem statements ({stats.total} total)
          </p>
          {Object.values(filters).some(Boolean) && (
            <button onClick={clearAll} className="text-xs text-amber-400 hover:underline">
              Clear all filters
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="rounded-md border border-blue-700 bg-blue-900/40 p-8 text-center text-sm text-ink-500">
            No problem statements match your filters. Try clearing a filter or broadening your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((ps, i) => (
              <PSCard key={ps.ps_number} ps={ps} index={i} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-md border border-amber-400/50 bg-blue-900/60 px-6 py-2.5 text-sm font-medium text-amber-400 hover:bg-blue-800"
            >
              Load 24 more
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-blue-800 px-4 py-6 text-center text-[11px] text-ink-500 sm:px-6">
        <p className="mb-1">
          Source: Smart India Hackathon, sih.gov.in — data mirrored under CC BY 4.0.
          Scoring is AI-assisted analysis (rule-based keyword scorer), not a human-evaluator credential.
        </p>
        <p className="font-mono text-ink-500">
          Built by <span className="text-ink-300">@_.fadihere._</span>
        </p>
      </footer>
    </div>
  )
}
