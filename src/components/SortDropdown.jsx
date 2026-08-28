import { SORT_OPTIONS } from '../hooks/useSortFilter'
import { ArrowUpDown } from 'lucide-react'

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <ArrowUpDown size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-blue-600 bg-blue-950 py-2.5 pl-8 pr-8 text-sm text-ink-100 focus:border-amber-400 focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
