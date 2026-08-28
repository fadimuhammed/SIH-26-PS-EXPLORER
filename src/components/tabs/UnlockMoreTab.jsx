export default function UnlockMoreTab({ ps }) {
  const u = ps.detail?.unlock_more || {}
  const tf = u.team_fit || {}
  const ai = u.ai_buildability_split || {}
  const data = u.data_resource_availability || {}
  const qna = u.judge_qna || []

  return (
    <div className="space-y-6 text-sm leading-relaxed text-ink-300">
      {(tf.roles_needed || tf.ideal_ratio || tf.approach) && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Team fit</h3>
          {Array.isArray(tf.roles_needed) && (
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              {tf.roles_needed.map((r, i) => (
                <span key={i} className="rounded-sm bg-blue-800 px-1.5 py-0.5 text-[11px] text-ink-300">
                  {r}
                </span>
              ))}
            </div>
          )}
          {tf.ideal_ratio && <p className="mb-1"><span className="text-ink-500">Ideal ratio: </span>{tf.ideal_ratio}</p>}
          {tf.approach && <p>{tf.approach}</p>}
        </section>
      )}

      {(ai.ai_can_build_fast || ai.needs_human_judgment || ai.risk_of_leaning_on_ai_only) && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">AI buildability split</h3>
          {ai.ai_can_build_fast && <p className="mb-1"><span className="text-ink-300">AI can build fast: </span>{ai.ai_can_build_fast}</p>}
          {ai.needs_human_judgment && <p className="mb-1"><span className="text-amber-400">Needs human judgment: </span>{ai.needs_human_judgment}</p>}
          {ai.risk_of_leaning_on_ai_only && <p><span className="text-ink-500">Risk of AI-only: </span>{ai.risk_of_leaning_on_ai_only}</p>}
        </section>
      )}

      {(data.status || data.backup_plan) && (
        <section>
          <h3 className="mb-1.5 text-xs font-medium uppercase tracking-wider text-ink-300">Data & resource availability</h3>
          {data.status && <p className="mb-1">{data.status}</p>}
          {data.backup_plan && <p><span className="text-ink-500">Backup plan: </span>{data.backup_plan}</p>}
        </section>
      )}

      {qna.length > 0 && (
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-300">Judge Q&amp;A</h3>
          <div className="space-y-3">
            {qna.map((q, i) => (
              <div key={i} className="rounded-md border border-blue-700 bg-blue-900/30 p-3">
                <p className="mb-1.5 font-medium text-ink-100">Q: {q.question}</p>
                <p className="mb-1.5">{q.strong_answer}</p>
                {q.follow_up && <p className="text-xs text-ink-500">Follow-up: {q.follow_up}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
