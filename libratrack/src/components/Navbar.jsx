import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'

const NAV_LINKS = ['Funciones', 'Precios', 'Contacto']

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 64px)',
        height: 60,
        background: 'rgba(5,14,10,0.80)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo size={20} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'rgba(255,255,255,0.85)')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.45)')}
          >
            {link}
          </a>
        ))}

        <motion.a
          href="#"
          whileHover={{ background: 'rgba(52,211,153,0.20)', borderColor: 'rgba(52,211,153,0.50)' }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 500,
            color: '#34D399',
            background: 'rgba(52,211,153,0.10)',
            border: '1px solid rgba(52,211,153,0.25)',
            borderRadius: 999,
            padding: '6px 16px',
            textDecoration: 'none',
          }}
        >
          Empezar →
        </motion.a>
      </div>
    </motion.nav>
  )
}
