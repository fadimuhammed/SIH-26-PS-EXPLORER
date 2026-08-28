import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

// A drafting-plate stamp, the kind you'd find in the corner of an
// engineering blueprint: drawn-by / rev / sheet number. Collapses to a
// small edge tab (like a sidebar) so it doesn't sit on top of content
// once you've seen it.
export default function DraftingStamp() {
  const [open, setOpen] = useState(true)

  return (
    <div className="fixed bottom-3 right-0 z-30 flex select-none items-end sm:bottom-4">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="expanded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex items-stretch">
              <div className="rounded-l-sm border border-r-0 border-ink-500/40 bg-blue-950/90 px-2.5 py-1.5 font-mono text-[9px] leading-tight text-ink-500 backdrop-blur-sm">
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5">
                  <span className="text-ink-500">DRAWN BY</span>
                  <span className="text-ink-300">@_.fadihere._</span>
                  <span className="text-ink-500">SHEET</span>
                  <span className="text-ink-300">SIH2026 / PS-EXPLORER</span>
                  <span className="text-ink-500">REV</span>
                  <span className="text-ink-300">2026.01</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Minimize drawn-by stamp"
                title="Minimize"
                className="flex items-center rounded-r-sm border border-l-0 border-ink-500/40 bg-blue-950/90 px-1 text-ink-500 backdrop-blur-sm hover:text-amber-400"
              >
                <ChevronRight size={12} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onClick={() => setOpen(true)}
            aria-label="Expand drawn-by stamp"
            title="Drawn by @_.fadihere._"
            className="flex items-center gap-1 overflow-hidden rounded-l-sm border border-r-0 border-ink-500/40 bg-blue-950/90 py-2 pl-1.5 pr-1 text-ink-500 backdrop-blur-sm hover:text-amber-400"
          >
            <ChevronLeft size={12} />
            <span
              className="font-mono text-[9px] uppercase tracking-wider"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Drawn By
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
