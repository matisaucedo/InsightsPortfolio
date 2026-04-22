import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import { STATS, PANEL_BOOKS, STATUS_LABELS } from '../data/mock'

const EASE = [0.22, 1, 0.36, 1]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const FEATURES = [
  { icon: '📚', name: 'Catálogo digital', desc: 'Búsqueda full-text con filtros por autor, género y disponibilidad en tiempo real.' },
  { icon: '⚡', name: 'Préstamos real-time', desc: 'Registro instantáneo, alertas de vencimiento y renovación en un clic.' },
  { icon: '📱', name: 'App para socios', desc: 'Reservas, renovaciones y biblioteca personal desde el celular.' },
]

const STATUS_COLOR = { loaned: 'emerald', 'due-today': 'yellow', available: 'emerald', overdue: 'red' }

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#050e0a' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(100px, 14vw, 160px) clamp(20px, 5vw, 64px) 80px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            maxWidth: 900,
            height: '60vh',
            background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
            filter: 'blur(20px)',
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(52,211,153,0.07)',
                border: '1px solid rgba(52,211,153,0.18)',
                color: '#34D399',
                fontSize: 12,
                padding: '5px 14px',
                borderRadius: 999,
              }}
            >
              <motion.span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: '#34D399',
                  display: 'inline-block',
                  boxShadow: '0 0 8px rgba(52,211,153,0.7)',
                }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Hecho por Insights
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 300,
              letterSpacing: '-0.05em',
              lineHeight: '0.98em',
              color: '#fff',
              marginBottom: 20,
            }}
          >
            El sistema que tu<br />biblioteca necesitaba.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: '1.6em',
              maxWidth: 480,
              margin: '0 auto 32px',
            }}
          >
            Catálogo digital · Préstamos en tiempo real · App mobile para socios. Todo en una plataforma.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.a
              href="#"
              whileHover={{ background: 'rgba(52,211,153,0.22)', borderColor: 'rgba(52,211,153,0.55)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.30)',
                color: '#34D399', fontSize: 14, fontWeight: 500,
                padding: '10px 24px', borderRadius: 999, textDecoration: 'none',
              }}
            >
              Empezar ahora →
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ background: 'rgba(255,255,255,0.08)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.60)', fontSize: 14,
                padding: '10px 24px', borderRadius: 999, textDecoration: 'none',
              }}
            >
              Ver demo
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── BENTO ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ padding: '0 clamp(20px, 5vw, 64px) 80px' }}
      >
        <div
          className="bento-grid"
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 12,
          }}
        >
          {/* Panel principal */}
          <div
            className="bento-main"
            style={{
              background: '#0a1a10',
              border: '1px solid rgba(52,211,153,0.10)',
              borderRadius: 16,
              padding: '20px',
              gridRow: '1 / span 2',
            }}
          >
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(52,211,153,0.5)', marginBottom: 14 }}>
              Panel Bibliotecario
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PANEL_BOOKS.map((book) => {
                const s = STATUS_LABELS[book.status]
                return (
                  <div
                    key={book.title}
                    style={{
                      background: '#071209',
                      border: '1px solid rgba(52,211,153,0.06)',
                      borderRadius: 8,
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                      📚 {book.title} — {book.author}
                    </span>
                    <Badge variant={STATUS_COLOR[book.status]}>{s.text}</Badge>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </motion.section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          padding: '0 clamp(20px, 5vw, 64px) 80px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="features-grid"
          style={{
            maxWidth: 900,
            margin: '0 auto',
            paddingTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.name}
              whileHover={{ borderColor: 'rgba(52,211,153,0.20)', y: -3 }}
              transition={{ duration: 0.2 }}
              style={{
                background: '#0a1a10',
                border: '1px solid rgba(52,211,153,0.07)',
                borderRadius: 14,
                padding: '22px 20px',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 6, letterSpacing: '-0.02em' }}>{f.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: '1.6em' }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── CTA FINAL ────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 64px)',
          textAlign: 'center',
          background: 'linear-gradient(0deg, rgba(52,211,153,0.04) 0%, transparent 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, letterSpacing: '-0.04em', color: '#fff', marginBottom: 12 }}>
          Tu biblioteca, modernizada.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', marginBottom: 28 }}>
          Instalación en menos de un día. Soporte incluido.
        </p>
        <motion.a
          href="#"
          whileHover={{ background: 'rgba(52,211,153,0.22)', borderColor: 'rgba(52,211,153,0.55)' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.30)',
            color: '#34D399', fontSize: 14, fontWeight: 500,
            padding: '12px 28px', borderRadius: 999, textDecoration: 'none',
          }}
        >
          Contactar a Insights →
        </motion.a>
      </motion.section>
    </div>
  )
}
