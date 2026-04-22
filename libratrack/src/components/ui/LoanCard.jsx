import { motion } from 'framer-motion'
import Badge from './Badge'

const STATUS_VARIANT = { ok: 'emerald', warning: 'yellow', reserved: 'muted' }

export default function LoanCard({ title, author, status, badge }) {
  return (
    <motion.div
      whileHover={{ y: -2, borderColor: 'rgba(52,211,153,0.22)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: '#0a1a10',
        border: '1px solid rgba(52,211,153,0.08)',
        borderRadius: 12,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 32,
          height: 44,
          borderRadius: 4,
          background: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        📚
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
          {author}
        </div>
        <Badge variant={STATUS_VARIANT[status] ?? 'muted'}>{badge}</Badge>
      </div>
    </motion.div>
  )
}
