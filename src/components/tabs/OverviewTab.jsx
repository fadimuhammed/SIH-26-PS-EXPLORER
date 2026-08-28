export default function OverviewTab({ ps }) {
  const o = ps.detail?.overview || {}
  return (
    <div className="space-y-6 text-sm leading-relaxed text-ink-300">
      {ps.is_aicte_open_theme && (
        <span className="inline-block rounded-sm border border-amber-400/50 bg-blue-900 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-400">
          Open Theme — ideation category, not a fully-specified brief
        </span>
      )}

      {o.in_plain_terms && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">In plain terms</h3>
          <p>{o.in_plain_terms}</p>
        </section>
      )}
      {o.why_it_matters && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Why it matters</h3>
          <p>{o.why_it_matters}</p>
        </section>
      )}
      {Array.isArray(o.pain_points) && o.pain_points.length > 0 && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Pain points</h3>
          <ul className="list-inside list-disc space-y-1">
            {o.pain_points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}
      {o.background && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Background</h3>
          <p>{o.background}</p>
        </section>
      )}
      {o.whats_being_asked && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">What's being asked</h3>
          <p>{o.whats_being_asked}</p>
        </section>
      )}
      {Array.isArray(o.expected_solution) && o.expected_solution.length > 0 && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Expected solution</h3>
          <ul className="list-inside list-disc space-y-1">
            {o.expected_solution.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
