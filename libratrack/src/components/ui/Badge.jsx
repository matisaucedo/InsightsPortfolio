const VARIANTS = {
  emerald: {
    bg: 'rgba(52,211,153,0.10)',
    color: '#34D399',
    border: 'rgba(52,211,153,0.20)',
  },
  yellow: {
    bg: 'rgba(251,191,36,0.10)',
    color: '#fbbf24',
    border: 'rgba(251,191,36,0.20)',
  },
  red: {
    bg: 'rgba(248,113,113,0.10)',
    color: '#f87171',
    border: 'rgba(248,113,113,0.20)',
  },
  muted: {
    bg: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.35)',
    border: 'rgba(255,255,255,0.08)',
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
        fontWeight: 400,
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  )
}
