function Phase({ label, window, items }) {
  if (!Array.isArray(items) || items.length === 0) return null
  return (
    <section>
      <h3 className="mb-1.5 flex items-baseline gap-2 text-xs font-medium uppercase tracking-wider text-ink-300">
        {label}
        <span className="font-mono text-[10px] text-ink-500">{window}</span>
      </h3>
      <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-ink-300">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </section>
  )
}

export default function BuildPlanTab({ ps }) {
  const b = ps.detail?.build_plan || {}
  const swot = b.swot || {}
  return (
    <div className="space-y-6">
      <Phase label="Idea" window="Hr 0–4" items={b.idea_0_4} />
      <Phase label="Prototype" window="Hr 4–22" items={b.prototype_4_22} />
      <Phase label="Integration" window="Hr 22–30" items={b.integration_22_30} />
      <Phase label="Polish" window="Hr 30–36" items={b.polish_30_36} />

      {b.how_to_stand_out && (
        <section className="rounded-md border border-amber-400/30 bg-amber-400/5 p-3">
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">How to stand out</h3>
          <p className="text-sm leading-relaxed text-ink-300">{b.how_to_stand_out}</p>
        </section>
      )}

      {(swot.strengths || swot.weaknesses) && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.isArray(swot.strengths) && swot.strengths.length > 0 && (
            <div>
              <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Strengths</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-ink-300">
                {swot.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(swot.weaknesses) && swot.weaknesses.length > 0 && (
            <div>
              <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Weaknesses</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-ink-300">
                {swot.weaknesses.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
