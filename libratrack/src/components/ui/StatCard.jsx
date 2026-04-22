// Althea-style oversized stat — no card box, just number + label
export default function StatCard({ label, value, delta, accent = false }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 64,
          fontWeight: 300,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: accent ? '#34D399' : '#1a1a18',
          marginBottom: 10,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#a0a09c',
          fontWeight: 500,
          marginBottom: delta ? 4 : 0,
        }}
      >
        {label}
      </div>
      {delta && (
        <div style={{ fontSize: 12, color: '#34D399', fontWeight: 400 }}>
          {delta}
        </div>
      )}
    </div>
  )
}
