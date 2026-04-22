const VARIANTS = {
  emerald: {
    bg: 'rgba(52,211,153,0.10)',
    color: '#10b981',
    border: 'rgba(52,211,153,0.25)',
  },
  yellow: {
    bg: 'rgba(217,119,6,0.08)',
    color: '#b45309',
    border: 'rgba(217,119,6,0.20)',
  },
  red: {
    bg: 'rgba(220,38,38,0.07)',
    color: '#dc2626',
    border: 'rgba(220,38,38,0.18)',
  },
  muted: {
    bg: 'rgba(0,0,0,0.04)',
    color: '#6b6b68',
    border: 'rgba(0,0,0,0.08)',
  },
}

export default function Badge({ children, variant = 'emerald' }) {
  const v = VARIANTS[variant] ?? VARIANTS.muted
  return (
    <span
      style={{
        background: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        fontSize: 11,
        padding: '3px 10px',
        borderRadius: 999,
        display: 'inline-block',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </span>
  )
}
