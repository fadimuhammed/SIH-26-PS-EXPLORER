import { useState, useEffect, useMemo } from 'react'

// Central data hook. Fetches the *light* list dataset (no per-PS detail
// blobs) so the initial page load isn't blocked on ~2MB of analysis/build
// -plan text that's only needed on individual PS detail pages.
export function usePSData() {
  const [all, setAll] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}data/ps_list.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load PS data (${r.status})`)
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setAll(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(() => {
    if (!all) {
      return { all: [], stats: null, facets: null, loading: !error, error }
    }

    const themes = [...new Set(all.map((p) => p.theme))].sort()
    const orgs = [...new Set(all.map((p) => p.org))].sort()
    const categories = [...new Set(all.map((p) => p.category))].sort()
    const scopes = [...new Set(all.filter((p) => !p.is_stub).map((p) => p.innovation_scope))].sort()
    const efforts = [...new Set(all.filter((p) => !p.is_stub).map((p) => p.invention_effort))].sort()
    const verdicts = [...new Set(all.filter((p) => !p.is_stub).map((p) => p.verdict))].sort()

    const softwareCount = all.filter((p) => p.category === 'Software').length
    const hardwareCount = all.filter((p) => p.category === 'Hardware').length

    return {
      all,
      stats: {
        total: all.length,
        themes: themes.length,
        orgs: orgs.length,
        software: softwareCount,
        hardware: hardwareCount,
      },
      facets: { themes, orgs, categories, scopes, efforts, verdicts },
      loading: false,
      error: null,
    }
  }, [all, error])
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const target = new Date(dateStr)
  if (isNaN(target.getTime())) return null
  const now = new Date()
  const diffMs = target.setHours(23, 59, 59, 999) - now.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}
