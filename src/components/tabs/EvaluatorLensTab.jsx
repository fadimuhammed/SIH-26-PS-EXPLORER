const TAG_COLOR = {
  High: '#4DE87A', Direct: '#4DE87A', Low: '#F0604D',
  Tight: '#F0B34D', Moderate: '#F0B34D', 'Complex Integration': '#F0B34D',
}

function ScoreRow({ label, tag, note }) {
  if (!tag && !note) return null
  const color = TAG_COLOR[tag] || '#7EF0F5'
  return (
    <div className="border-b border-blue-800 py-3 last:border-0">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-300">{label}</span>
        {tag && (
          <span
            className="rounded-sm px-1.5 py-0.5 font-mono text-[10px]"
            style={{ color, border: `1px solid ${color}66` }}
          >
            {tag}
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-ink-300">{note}</p>
    </div>
  )
}

export default function EvaluatorLensTab({ ps }) {
  const e = ps.detail?.evaluator_lens || {}
  const sc = e.scorecard || {}
  return (
    <div className="space-y-6 text-sm leading-relaxed text-ink-300">
      <section className="rounded-md border border-blue-700 bg-blue-900/30 p-4">
        <ScoreRow label="Innovation" tag={sc.innovation?.tag} note={sc.innovation?.note} />
        <ScoreRow label="Invention" tag={sc.invention?.tag} note={sc.invention?.note} />
        <ScoreRow label="Technical feasibility" tag={sc.technical_feasibility?.tag} note={sc.technical_feasibility?.note} />
        <ScoreRow label="Impact & benefits" tag={sc.impact_and_benefits?.tag} note={sc.impact_and_benefits?.note} />
        <ScoreRow label="Architecture" tag={sc.architecture?.tag} note={sc.architecture?.note} />
      </section>

      {e.overall_verdict?.reasoning && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">
            Overall verdict — {ps.verdict}
          </h3>
          <p>{e.overall_verdict.reasoning}</p>
        </section>
      )}
      {e.biggest_strength && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Biggest strength</h3>
          <p>{e.biggest_strength}</p>
        </section>
      )}
      {e.biggest_risk && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Biggest risk</h3>
          <p>{e.biggest_risk}</p>
        </section>
      )}
      {e.validate_before_commit && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Validate before you commit</h3>
          <p>{e.validate_before_commit}</p>
        </section>
      )}
    </div>
  )
}
