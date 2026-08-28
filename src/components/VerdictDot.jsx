const COLORS = {
  Green: '#6FA87D',
  Yellow: '#D9A441',
  Red: '#C75C4A',
}

export default function VerdictDot({ verdict, size = 8 }) {
  if (!verdict) return null
  const color = COLORS[verdict] || '#7C8BAD'
  return (
    <span
      aria-label={`Verdict: ${verdict}`}
      title={verdict}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}99`,
        flexShrink: 0,
      }}
    />
  )
}
