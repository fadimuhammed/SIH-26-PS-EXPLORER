import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { FILTER_FIELDS } from '../hooks/useSortFilter'

function FilterGroup({ field, options, selected, onSelect }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-blue-800 pb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-2 text-left text-xs font-medium uppercase tracking-wider text-ink-300"
      >
        {field.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-ink-500">
                <input
                  type="radio"
                  name={field.key}
                  checked={!selected}
                  onChange={() => onSelect(field.key, null)}
                  className="accent-amber-400"
                />
                All
              </label>
              {options.map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-2 text-xs text-ink-300">
                  <input
                    type="radio"
                    name={field.key}
                    checked={selected === opt}
                    onChange={() => onSelect(field.key, opt)}
                    className="accent-amber-400"
                  />
                  <span className="truncate">{opt}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FilterPanel({ facets, filters, onSelect, onClearAll }) {
  const [expanded, setExpanded] = useState(false)
  const activeCount = Object.values(filters).filter(Boolean).length

  const optionsFor = (key) => {
    switch (key) {
      case 'category':
        return facets.categories
      case 'theme':
        return facets.themes
      case 'org':
        return facets.orgs
      case 'innovation_scope':
        return facets.scopes
      case 'invention_effort':
        return facets.efforts
      case 'verdict':
        return facets.verdicts
      default:
        return []
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-2 rounded-md border border-blue-600 bg-blue-950 px-3 py-2.5 text-sm text-ink-100 hover:border-amber-400/60"
      >
        <SlidersHorizontal size={14} />
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-amber-400 px-1.5 py-0.5 font-mono text-[10px] font-bold text-blue-950">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <>
            {/* mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 sm:hidden"
              onClick={() => setExpanded(false)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-lg border-t border-blue-600 bg-blue-950 p-4 sm:absolute sm:inset-auto sm:mt-2 sm:w-80 sm:rounded-md sm:border"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink-100">Filters</span>
                <div className="flex items-center gap-3">
                  {activeCount > 0 && (
                    <button onClick={onClearAll} className="text-xs text-amber-400 hover:underline">
                      Clear all
                    </button>
                  )}
                  <button onClick={() => setExpanded(false)} aria-label="Close filters">
                    <X size={16} className="text-ink-500" />
                  </button>
                </div>
              </div>
              {FILTER_FIELDS.map((field) => (
                <FilterGroup
                  key={field.key}
                  field={field}
                  options={optionsFor(field.key)}
                  selected={filters[field.key]}
                  onSelect={onSelect}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
