import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GraciasHero from '../sections/gracias/GraciasHero.jsx';
import GraciasBooking from '../sections/gracias/GraciasBooking.jsx';

export default function GraciasPage() {
  useEffect(() => {
    document.title = 'Gracias · Insights Software';
  }, []);

  return (
    <main style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <GraciasHero />
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }}
      />
      <GraciasBooking />
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', damping: 70, stiffness: 240, mass: 1, delay: 0.3 }}
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: '0.04em',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        © {new Date().getFullYear()} Insights Software — Creamos tu software a medida
      </motion.footer>
    </main>
  );
}
