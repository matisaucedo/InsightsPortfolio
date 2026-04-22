import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import StatCard from '../components/ui/StatCard'
import { STATS } from '../data/mock'

const EASE = [0.22, 1, 0.36, 1]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    name: 'Catálogo digital',
    desc: 'Búsqueda full-text con filtros por autor, género y disponibilidad en tiempo real.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="13 2 13 9 20 9" /><path d="M20 14v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h8l7 7z" /><line x1="9" y1="15" x2="15" y2="15" /><line x1="9" y1="18" x2="12" y2="18" />
      </svg>
    ),
    name: 'Préstamos real-time',
    desc: 'Registro instantáneo, alertas de vencimiento y renovación en un clic.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    name: 'App para socios',
    desc: 'Reservas, renovaciones y biblioteca personal desde el celular.',
  },
]

const JOURNEY = [
  {
    num: '01',
    title: 'Catalogá tu colección',
    desc: 'Subí tu inventario de libros o empezá desde cero. El sistema organiza todo por autor, género, ISBN y disponibilidad automáticamente.',
  },
  {
    num: '02',
    title: 'Gestioná préstamos',
    desc: 'Registrá entregas y devoluciones en segundos. Alertas automáticas de vencimiento para vos y tus socios.',
  },
  {
    num: '03',
    title: 'Socios con su propia app',
    desc: 'Cada socio accede a su panel personal para reservar, renovar y ver su historial desde el celular.',
  },
]

const THIRD_STAT = { label: 'Minutos de setup', value: '15', delta: 'Instalación en el día', accent: false }

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
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
        {/* Subtle radial glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70vw',
            maxWidth: 800,
            height: '55vh',
            background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(52,211,153,0.07)',
                border: '1px solid rgba(52,211,153,0.20)',
                color: '#10b981',
                fontSize: 11,
                fontWeight: 500,
                padding: '5px 14px',
                borderRadius: 999,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <motion.span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: '#34D399',
                  display: 'inline-block',
                  boxShadow: '0 0 6px rgba(52,211,153,0.6)',
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              Hecho por Insights
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(44px, 6.5vw, 88px)',
              fontWeight: 300,
              letterSpacing: '-0.05em',
              lineHeight: '0.96em',
              color: 'var(--txt)',
              marginBottom: 22,
              margin: '0 0 22px',
            }}
          >
            El sistema que tu<br />biblioteca necesitaba.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16,
              color: 'var(--txt-muted)',
              lineHeight: '1.65em',
              maxWidth: 460,
              margin: '0 auto 36px',
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
              whileHover={{ background: 'rgba(52,211,153,0.14)', borderColor: 'rgba(52,211,153,0.50)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)',
                color: '#10b981', fontSize: 14, fontWeight: 500,
                padding: '11px 26px', borderRadius: 999, textDecoration: 'none',
              }}
            >
              Empezar ahora →
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ background: 'rgba(0,0,0,0.04)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: '1px solid rgba(0,0,0,0.10)',
                color: 'var(--txt-muted)', fontSize: 14,
                padding: '11px 26px', borderRadius: 999, textDecoration: 'none',
              }}
            >
              Ver demo
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          padding: '0 clamp(20px, 5vw, 64px) 96px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          className="stats-row"
          style={{
            maxWidth: 860,
            margin: '0 auto',
            paddingTop: 72,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 80,
          }}
        >
          {[...STATS, THIRD_STAT].map((s, i) => (
            <StatCard key={s.label} {...s} accent={i === 0} />
          ))}
        </div>
      </motion.section>

      {/* ── NUMBERED JOURNEY ─────────────────────────────────────────── */}
      <section
        style={{
          padding: '0 clamp(20px, 5vw, 64px) 100px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto', paddingTop: 72 }}>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--txt-subtle)',
              fontWeight: 500,
              marginBottom: 56,
            }}
          >
            Cómo funciona
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {JOURNEY.map((step, i) => (
              <motion.div
                key={step.num}
                variants={slideIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ delay: i * 0.12 }}
                className="journey-step"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 48,
                  padding: '40px 0',
                  borderBottom: i < JOURNEY.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                {/* Big number */}
                <div
                  style={{
                    fontSize: 'clamp(56px, 7vw, 96px)',
                    fontWeight: 300,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    color: 'rgba(0,0,0,0.07)',
                    minWidth: 120,
                    flexShrink: 0,
                    userSelect: 'none',
                  }}
                >
                  {step.num}
                </div>
                {/* Content */}
                <div style={{ paddingTop: 8 }}>
                  <div
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 26px)',
                      fontWeight: 300,
                      letterSpacing: '-0.03em',
                      color: 'var(--txt)',
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: 'var(--txt-muted)',
                      lineHeight: '1.65em',
                      maxWidth: 480,
                    }}
                  >
                    {step.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          padding: '0 clamp(20px, 5vw, 64px) 100px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto', paddingTop: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--txt-subtle)',
              fontWeight: 500,
              marginBottom: 40,
            }}
          >
            Funciones
          </motion.div>

          <div
            className="features-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.name}
                whileHover={{ background: 'rgba(52,211,153,0.03)' }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '32px 28px',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.18)',
                    borderRadius: 10,
                    color: '#10b981',
                    marginBottom: 16,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--txt)',
                    marginBottom: 8,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {f.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--txt-muted)',
                    lineHeight: '1.65em',
                  }}
                >
                  {f.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA FINAL ────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            color: 'var(--txt)',
            marginBottom: 14,
            lineHeight: '1.05em',
          }}
        >
          Tu biblioteca,<br />modernizada.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--txt-muted)',
            marginBottom: 32,
            lineHeight: '1.6em',
          }}
        >
          Instalación en menos de un día. Soporte incluido.
        </p>
        <motion.a
          href="#"
          whileHover={{ background: 'rgba(52,211,153,0.14)', borderColor: 'rgba(52,211,153,0.50)' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.28)',
            color: '#10b981', fontSize: 14, fontWeight: 500,
            padding: '12px 30px', borderRadius: 999, textDecoration: 'none',
          }}
        >
          Contactar a Insights →
        </motion.a>
        <p
          style={{
            fontSize: 12,
            color: 'var(--txt-subtle)',
            marginTop: 20,
          }}
        >
          Sin contrato. Sin costo de instalación.
        </p>
      </motion.section>
    </div>
  )
}
