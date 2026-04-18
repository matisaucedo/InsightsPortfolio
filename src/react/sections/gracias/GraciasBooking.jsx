import { useReducedMotion, motion } from 'framer-motion';

const SPRING_SCROLL = {
  type: 'spring',
  damping: 70,
  stiffness: 240,
  mass: 1,
};

const STAGGER_ITEM = (delay = 0) => ({
  type: 'spring',
  damping: 70,
  stiffness: 240,
  mass: 1,
  delay,
});

export default function GraciasBooking() {
  const reduced = useReducedMotion();

  const initial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };

  return (
    <section
      id="booking"
      style={{
        paddingTop: 'clamp(64px, 8vw, 128px)',
        paddingBottom: 'clamp(64px, 8vw, 128px)',
        paddingLeft: 'clamp(24px, 5vw, 40px)',
        paddingRight: 'clamp(24px, 5vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Heading block — staggered spring reveals */}
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          {/* Eyebrow */}
          <motion.p
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: '-80px' }}
            transition={STAGGER_ITEM(0)}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: 24,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            ● AGENDÁ TU LLAMADA
          </motion.p>

          {/* H2 — weight 400, tracking -0.04em, lineHeight 1.05 */}
          <motion.h2
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: '-80px' }}
            transition={STAGGER_ITEM(0.12)}
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            Elegí el horario que mejor te quede
          </motion.h2>

          {/* Subtitle — weight 400, 16px */}
          <motion.p
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: '-80px' }}
            transition={STAGGER_ITEM(0.22)}
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.5,
              margin: 0,
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            La sesión es gratuita, dura 60 minutos y salís con un plan claro para tu software.
          </motion.p>
        </div>

        {/* Iframe card — spring scroll reveal, glass-dark border, 20px radius */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, margin: '-80px' }}
          transition={STAGGER_ITEM(0.32)}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: 8,
            boxShadow: '0 30px 80px -30px rgba(0,0,0,0.55)',
          }}
        >
          <iframe
            src="https://api.highlevelowcost.com/widget/booking/XfVaKDBm7P3pAliHpagk"
            style={{
              width: '100%',
              minHeight: 820,
              border: 0,
              borderRadius: 14,
              display: 'block',
              touchAction: 'manipulation',
            }}
            loading="lazy"
            allow="clipboard-read; clipboard-write"
            title="Agenda tu llamada con Insights Software"
          />
        </motion.div>
      </div>
    </section>
  );
}
