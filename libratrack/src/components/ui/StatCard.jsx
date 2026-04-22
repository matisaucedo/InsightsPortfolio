export default function StatCard({ label, value, delta, accent = false }) {
  return (
    <div
      style={{
        background: '#0a1a10',
        border: '1px solid rgba(52,211,153,0.08)',
        borderRadius: 12,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
          color: 'rgba(255,255,255,0.30)',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          color: accent ? '#34D399' : '#fff',
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      {delta && (
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)' }}>
          {delta}
        </div>
      )}
    </div>
  )
}
