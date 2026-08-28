import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

function CountUp({ value, duration = 900 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let start = null
    const step = (ts) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, duration, reduce])

  return <span ref={ref}>{display}</span>
}

export default function StatsBar({ stats }) {
  const items = [
    { label: 'Problem Statements', value: stats.total },
    { label: 'Themes', value: stats.themes },
    { label: 'Organizations', value: stats.orgs },
    { label: 'Software', value: stats.software, suffix: ` / ${stats.hardware} HW` },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="rounded-md border border-blue-700 bg-blue-900/40 px-3 py-3"
        >
          <div className="font-mono text-2xl font-semibold text-amber-400">
            <CountUp value={it.value} />
            {it.suffix && <span className="text-sm text-ink-500">{it.suffix}</span>}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-500">{it.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
