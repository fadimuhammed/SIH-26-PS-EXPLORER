export default function AnalysisTab({ ps }) {
  const a = ps.detail?.analysis || {}
  const cl = a.competitive_landscape || {}
  return (
    <div className="space-y-6 text-sm leading-relaxed text-ink-300">
      {a.innovation_scope_note && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">
            Innovation scope — {ps.innovation_scope}
          </h3>
          <p>{a.innovation_scope_note}</p>
        </section>
      )}
      {a.invention_effort_note && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">
            Invention effort — {ps.invention_effort}
          </h3>
          <p>{a.invention_effort_note}</p>
        </section>
      )}
      {(cl.level || cl.note) && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">
            Competitive landscape {cl.level && `— ${cl.level}`}
          </h3>
          <p>{cl.note}</p>
        </section>
      )}
    </div>
  )
}
