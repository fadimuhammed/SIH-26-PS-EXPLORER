import { useMemo } from 'react'
import { daysUntil } from './usePSData'

const SCOPE_RANK = { Breakthrough: 3, Moderate: 2, Incremental: 1 }
const EFFORT_RANK = { Low: 1, Medium: 2, High: 3 }
const VERDICT_RANK = { Green: 3, Yellow: 2, Red: 1 }

export const SORT_OPTIONS = [
  { id: 'ps_number', label: 'PS Number' },
  { id: 'deadline', label: 'Deadline (soonest first)' },
  { id: 'competitive_most', label: 'Most competitive' },
  { id: 'competitive_least', label: 'Least competitive' },
  { id: 'effort_low', label: 'Effort (low → high)' },
  { id: 'innovation_breakthrough', label: 'Innovation (breakthrough first)' },
  { id: 'verdict_best', label: 'Best verdict first' },
]

export const FILTER_FIELDS = [
  { key: 'category', label: 'Category' },
  { key: 'theme', label: 'Theme' },
  { key: 'org', label: 'Organization' },
  { key: 'innovation_scope', label: 'Innovation Scope' },
  { key: 'invention_effort', label: 'Invention Effort' },
  { key: 'verdict', label: 'Verdict' },
]

function competitiveness(ps) {
  // "Most competitive" = most ideas already submitted relative to ask,
  // i.e. higher submission pressure. Falls back to raw idea count.
  const [submitted] = (ps.ideas || '0/0').split('/').map((n) => parseInt(n, 10) || 0)
  return submitted
}

export function useSortFilter(all, { query, filters, sortBy }) {
  return useMemo(() => {
    let list = all

    // Search: title, org, theme, ps_number, description
    if (query && query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((p) =>
        [p.title, p.org, p.theme, p.ps_number, p.description, p.category]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q))
      )
    }

    // Filters: single-select radio per field
    for (const field of Object.keys(filters)) {
      const val = filters[field]
      if (val) {
        list = list.filter((p) => p[field] === val)
      }
    }

    // Sort — stubs (null scores) always sort to the end regardless of mode,
    // since they have nothing to rank on.
    const withRank = [...list]
    const stubsLast = (a, b) => {
      if (a.is_stub && !b.is_stub) return 1
      if (!a.is_stub && b.is_stub) return -1
      return 0
    }

    withRank.sort((a, b) => {
      const stub = stubsLast(a, b)
      if (stub !== 0) return stub
      if (a.is_stub && b.is_stub) return 0

      switch (sortBy) {
        case 'deadline': {
          const da = a.deadline_date ? new Date(a.deadline_date).getTime() : Infinity
          const db = b.deadline_date ? new Date(b.deadline_date).getTime() : Infinity
          return da - db
        }
        case 'competitive_most':
          return competitiveness(b) - competitiveness(a)
        case 'competitive_least':
          return competitiveness(a) - competitiveness(b)
        case 'effort_low':
          return (EFFORT_RANK[a.invention_effort] || 0) - (EFFORT_RANK[b.invention_effort] || 0)
        case 'innovation_breakthrough':
          return (SCOPE_RANK[b.innovation_scope] || 0) - (SCOPE_RANK[a.innovation_scope] || 0)
        case 'verdict_best': {
          // AICTE open-theme PS are generically scored (open ideation, not a
          // real specificity-matched brief) — never let them outrank a
          // genuine scored brief at the same verdict tier.
          const va = VERDICT_RANK[a.verdict] || 0
          const vb = VERDICT_RANK[b.verdict] || 0
          if (va !== vb) return vb - va
          if (a.is_aicte_open_theme !== b.is_aicte_open_theme) {
            return a.is_aicte_open_theme ? 1 : -1
          }
          return (b.scores?.total || 0) - (a.scores?.total || 0)
        }
        case 'ps_number':
        default:
          return parseInt(a.ps_number.replace('SIH', ''), 10) - parseInt(b.ps_number.replace('SIH', ''), 10)
      }
    })

    return withRank
  }, [all, query, filters, sortBy])
}

export { daysUntil }
