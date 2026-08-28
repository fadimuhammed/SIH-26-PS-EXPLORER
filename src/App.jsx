import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import DraftingStamp from './components/DraftingStamp'

// Route-level code splitting: DetailPage (with its 5 tab components) is
// only downloaded when someone actually opens a PS, not on first load.
const ListPage = lazy(() => import('./pages/ListPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))

function RouteFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-500">Loading…</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/ps/:psNumber" element={<DetailPage />} />
        </Routes>
      </Suspense>
      <DraftingStamp />
    </>
  )
}
