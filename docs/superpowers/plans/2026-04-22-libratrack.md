# LibraTrack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el sitio standalone de LibraTrack (React + Vite) con landing page y app de socios, deployarlo en Render, y actualizar el portfolio de Insights con las URLs reales.

**Architecture:** Proyecto React 19 + Vite standalone en `~/Documents/libratrack/`. Dos rutas: `/` landing pública (vista Mac del mockup) y `/app` app socios (vista iPhone). Sin backend — mock data estática en `src/data/mock.js`. Deploy a Render como static site.

**Tech Stack:** React 19, Vite, TailwindCSS v3.4, Framer Motion, React Router v6, Vitest + React Testing Library

**Design tokens:**
- Acento: `#34D399` (esmeralda)
- Fondo base: `#050e0a`
- Fondo cards: `#0a1a10`
- Bordes: `rgba(52,211,153,0.10)`

---

## File Map

| Archivo | Responsabilidad |
|---|---|
| `src/main.jsx` | Entry point |
| `src/App.jsx` | Router, rutas `/` y `/app` |
| `src/index.css` | Tailwind + CSS custom props |
| `src/data/mock.js` | Libros, stats, socios — mock data |
| `src/components/Logo.jsx` | SVG Lines+Dot + wordmark |
| `src/components/Navbar.jsx` | Logo + nav links + CTA pill |
| `src/components/ui/Badge.jsx` | Pill de estado (verde/amarillo/rojo) |
| `src/components/ui/StatCard.jsx` | Card de métrica (número + label + delta) |
| `src/components/ui/LoanCard.jsx` | Card de libro prestado (portada + datos + badge) |
| `src/pages/Landing.jsx` | Hero + Bento + Features + CTA |
| `src/pages/AppView.jsx` | Header + Tabs + Search + Lista + BottomNav |
| `tailwind.config.js` | Tokens de color + font |
| `vite.config.js` | Vite config estándar |
| `index.html` | Meta tags + favicon inline |
| `src/__tests__/Logo.test.jsx` | Smoke test Logo |
| `src/__tests__/Landing.test.jsx` | Smoke test Landing |
| `src/__tests__/AppView.test.jsx` | Smoke test AppView |

---

## Task 1: Scaffold del proyecto

**Files:**
- Create: `~/Documents/libratrack/` (directorio nuevo)
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`

- [ ] **Step 1: Crear el proyecto Vite**

```bash
cd ~/Documents
npm create vite@latest libratrack -- --template react
cd libratrack
```

- [ ] **Step 2: Instalar dependencias**

```bash
npm install framer-motion react-router-dom
npm install -D tailwindcss@3.4 postcss autoprefixer vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
npx tailwindcss init -p
```

- [ ] **Step 3: Reemplazar `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
```

- [ ] **Step 4: Crear `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Verificar que Vite arranca**

```bash
npm run dev
```
Esperado: `VITE ready in ~500ms` en `http://localhost:5173`

- [ ] **Step 6: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold libratrack — vite + react + tailwind + framer-motion"
```

---

## Task 2: Tailwind config + CSS vars + index.html

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Reemplazar `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#34D399',
          dim: 'rgba(52,211,153,0.55)',
          subtle: 'rgba(52,211,153,0.10)',
          border: 'rgba(52,211,153,0.15)',
        },
        base: {
          DEFAULT: '#050e0a',
          card: '#0a1a10',
          surface: '#071209',
          line: 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Reemplazar `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent: #34D399;
  --bg: #050e0a;
  --card: #0a1a10;
  --surface: #071209;
}

* {
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: #fff;
  font-family: Inter, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Reemplazar `index.html`**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LibraTrack — Gestión de biblioteca en tiempo real</title>
    <meta name="description" content="Catálogo digital, préstamos en tiempo real y app para socios. Sistema de gestión para bibliotecas." />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26'><rect x='4' y='7' width='18' height='3' rx='1.5' fill='%2334D399'/><rect x='4' y='12' width='13' height='3' rx='1.5' fill='%2334D399' opacity='.55'/><rect x='4' y='17' width='8' height='3' rx='1.5' fill='%2334D399' opacity='.25'/><circle cx='21' cy='18.5' r='2.5' fill='%2334D399'/></svg>" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: tailwind tokens, css vars, index.html meta + favicon"
```

---

## Task 3: Logo component

**Files:**
- Create: `src/components/Logo.jsx`
- Create: `src/__tests__/Logo.test.jsx`

- [ ] **Step 1: Escribir test**

```jsx
// src/__tests__/Logo.test.jsx
import { render, screen } from '@testing-library/react'
import Logo from '../components/Logo'

test('renders wordmark text', () => {
  render(<Logo />)
  expect(screen.getByText('Libra')).toBeInTheDocument()
  expect(screen.getByText('Track')).toBeInTheDocument()
})

test('renders SVG icon', () => {
  const { container } = render(<Logo />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})

test('accepts size prop', () => {
  render(<Logo size={32} />)
  // should not throw
})
```

- [ ] **Step 2: Correr test — debe fallar**

```bash
npx vitest run src/__tests__/Logo.test.jsx
```
Esperado: `FAIL — Cannot find module '../components/Logo'`

- [ ] **Step 3: Crear `src/components/Logo.jsx`**

```jsx
// Lines + Dot logo — 3 líneas horizontales decrecientes + dot
export default function Logo({ size = 24, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
      >
        <rect x="4" y="7" width="18" height="3" rx="1.5" fill="#34D399" />
        <rect x="4" y="12" width="13" height="3" rx="1.5" fill="#34D399" opacity="0.55" />
        <rect x="4" y="17" width="8" height="3" rx="1.5" fill="#34D399" opacity="0.25" />
        <circle cx="21" cy="18.5" r="2.5" fill="#34D399" />
      </svg>
      {/* Wordmark */}
      <span
        style={{
          fontSize: size * 0.75,
          fontWeight: 300,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: '#fff',
        }}
      >
        Libra<span style={{ color: '#34D399' }}>Track</span>
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Correr test — debe pasar**

```bash
npx vitest run src/__tests__/Logo.test.jsx
```
Esperado: `PASS — 3 tests passed`

- [ ] **Step 5: Commit**

```bash
git add src/components/Logo.jsx src/__tests__/Logo.test.jsx
git commit -m "feat: Logo component — Lines+Dot SVG + wordmark"
```

---

## Task 4: Mock data + UI primitives

**Files:**
- Create: `src/data/mock.js`
- Create: `src/components/ui/Badge.jsx`
- Create: `src/components/ui/StatCard.jsx`
- Create: `src/components/ui/LoanCard.jsx`

- [ ] **Step 1: Crear `src/data/mock.js`**

```js
export const STATS = [
  { label: 'Préstamos activos', value: '127', delta: '↑ 12% vs ayer', accent: true },
  { label: 'Socios activos', value: '340', delta: '8 nuevos este mes', accent: false },
]

export const PANEL_BOOKS = [
  { title: 'El Aleph', author: 'Borges', status: 'loaned' },
  { title: 'Rayuela', author: 'Cortázar', status: 'due-today' },
  { title: 'Ficciones', author: 'Borges', status: 'available' },
  { title: '1984', author: 'Orwell', status: 'overdue' },
]

export const MY_LOANS = [
  {
    id: 1,
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    status: 'ok',
    badge: 'Devolver en 12 días',
  },
  {
    id: 2,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    status: 'warning',
    badge: 'Vence mañana · Renovar',
  },
  {
    id: 3,
    title: 'Ficciones',
    author: 'Jorge Luis Borges',
    status: 'reserved',
    badge: 'Reservado — disponible el 28/04',
  },
]

export const STATUS_LABELS = {
  loaned: { text: 'Prestado', color: 'emerald' },
  'due-today': { text: 'Vence hoy', color: 'yellow' },
  available: { text: 'Disponible', color: 'emerald' },
  overdue: { text: 'Vencido', color: 'red' },
}
```

- [ ] **Step 2: Crear `src/components/ui/Badge.jsx`**

```jsx
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
```

- [ ] **Step 3: Crear `src/components/ui/StatCard.jsx`**

```jsx
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
```

- [ ] **Step 4: Crear `src/components/ui/LoanCard.jsx`**

```jsx
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
      {/* Book cover placeholder */}
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
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 6,
          }}
        >
          {author}
        </div>
        <Badge variant={STATUS_VARIANT[status] ?? 'muted'}>{badge}</Badge>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/data/ src/components/ui/
git commit -m "feat: mock data + Badge, StatCard, LoanCard UI primitives"
```

---

## Task 5: Navbar

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Crear `src/components/Navbar.jsx`**

```jsx
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

        {/* CTA pill */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: Navbar — logo + nav links + CTA pill, glassmorphism"
```

---

## Task 6: Landing page

**Files:**
- Create: `src/pages/Landing.jsx`
- Create: `src/__tests__/Landing.test.jsx`

- [ ] **Step 1: Escribir test**

```jsx
// src/__tests__/Landing.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Landing from '../pages/Landing'

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>

test('renders hero headline', () => {
  render(<Landing />, { wrapper })
  expect(screen.getByText(/El sistema que tu/i)).toBeInTheDocument()
})

test('renders CTA button', () => {
  render(<Landing />, { wrapper })
  expect(screen.getByText(/Empezar ahora/i)).toBeInTheDocument()
})

test('renders features section', () => {
  render(<Landing />, { wrapper })
  expect(screen.getByText(/Catálogo digital/i)).toBeInTheDocument()
  expect(screen.getByText(/Préstamos real-time/i)).toBeInTheDocument()
})

test('renders stat values', () => {
  render(<Landing />, { wrapper })
  expect(screen.getByText('127')).toBeInTheDocument()
  expect(screen.getByText('340')).toBeInTheDocument()
})
```

- [ ] **Step 2: Correr test — debe fallar**

```bash
npx vitest run src/__tests__/Landing.test.jsx
```
Esperado: `FAIL — Cannot find module '../pages/Landing'`

- [ ] **Step 3: Crear `src/pages/Landing.jsx`**

```jsx
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'
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
```

- [ ] **Step 4: Correr tests**

```bash
npx vitest run src/__tests__/Landing.test.jsx
```
Esperado: `PASS — 4 tests passed`

- [ ] **Step 5: Verificar visualmente en browser**

```bash
npm run dev
```
Abrir `http://localhost:5173` — verificar hero, glow, bento, features, CTA.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Landing.jsx src/__tests__/Landing.test.jsx
git commit -m "feat: Landing page — hero, bento grid, features, CTA"
```

---

## Task 7: AppView — App de socios

**Files:**
- Create: `src/pages/AppView.jsx`
- Create: `src/__tests__/AppView.test.jsx`

- [ ] **Step 1: Escribir test**

```jsx
// src/__tests__/AppView.test.jsx
import { render, screen } from '@testing-library/react'
import AppView from '../pages/AppView'

test('renders greeting', () => {
  render(<AppView />)
  expect(screen.getByText(/Mis libros/i)).toBeInTheDocument()
})

test('renders loan tabs', () => {
  render(<AppView />)
  expect(screen.getByText('Prestados')).toBeInTheDocument()
  expect(screen.getByText('Reservas')).toBeInTheDocument()
  expect(screen.getByText('Catálogo')).toBeInTheDocument()
})

test('renders loan cards', () => {
  render(<AppView />)
  expect(screen.getByText('El Aleph')).toBeInTheDocument()
  expect(screen.getByText('Rayuela')).toBeInTheDocument()
  expect(screen.getByText('Ficciones')).toBeInTheDocument()
})
```

- [ ] **Step 2: Correr test — debe fallar**

```bash
npx vitest run src/__tests__/AppView.test.jsx
```
Esperado: `FAIL — Cannot find module '../pages/AppView'`

- [ ] **Step 3: Crear `src/pages/AppView.jsx`**

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import LoanCard from '../components/ui/LoanCard'
import Logo from '../components/Logo'
import { MY_LOANS } from '../data/mock'

const TABS = ['Prestados', 'Reservas', 'Catálogo']
const EASE = [0.22, 1, 0.36, 1]

const NAV_ITEMS = [
  { label: 'Inicio', icon: '⊞', active: true },
  { label: 'Catálogo', icon: '◫', active: false },
  { label: 'Perfil', icon: '○', active: false },
]

export default function AppView() {
  const [activeTab, setActiveTab] = useState('Prestados')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050e0a',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 420,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          padding: '48px 20px 16px',
          borderBottom: '1px solid rgba(52,211,153,0.07)',
          background: '#071209',
        }}
      >
        <Logo size={18} />
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 4 }}>
            Buen día, Matías 👋
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.03em', color: '#fff' }}>
            Mis libros
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: '#071209',
        }}
      >
        {TABS.map((tab) => {
          const active = tab === activeTab
          return (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              animate={{
                background: active ? 'rgba(52,211,153,0.12)' : 'transparent',
                color: active ? '#34D399' : 'rgba(255,255,255,0.40)',
                borderColor: active ? 'rgba(52,211,153,0.25)' : 'transparent',
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 12,
                fontWeight: 500,
                padding: '5px 14px',
                borderRadius: 999,
                border: '1px solid transparent',
                cursor: 'pointer',
                background: 'transparent',
                fontFamily: 'inherit',
              }}
            >
              {tab}
            </motion.button>
          )
        })}
      </div>

      {/* Search bar */}
      <div style={{ padding: '12px 20px' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            padding: '9px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(255,255,255,0.22)',
            fontSize: 13,
          }}
        >
          <span>🔍</span>
          Buscar en el catálogo...
        </div>
      </div>

      {/* Loan list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        style={{ flex: 1, padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {MY_LOANS.map((loan, i) => (
          <motion.div
            key={loan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
          >
            <LoanCard {...loan} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom nav */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px 0 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(7,18,9,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              color: item.active ? '#34D399' : 'rgba(255,255,255,0.28)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 32,
                height: 28,
                borderRadius: 8,
                background: item.active ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
              }}
            >
              {item.icon}
            </div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Correr tests**

```bash
npx vitest run src/__tests__/AppView.test.jsx
```
Esperado: `PASS — 3 tests passed`

- [ ] **Step 5: Verificar en browser**

Abrir `http://localhost:5173/app` (requiere router configurado en Task 8).

- [ ] **Step 6: Commit**

```bash
git add src/pages/AppView.jsx src/__tests__/AppView.test.jsx
git commit -m "feat: AppView — header, tabs, search, loan cards, bottom nav"
```

---

## Task 8: Router + App.jsx + main.jsx

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`

- [ ] **Step 1: Reemplazar `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2: Reemplazar `src/App.jsx`**

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import AppView from './pages/AppView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: Verificar ambas rutas en browser**

```bash
npm run dev
```
- `http://localhost:5173/` → Landing page ✓
- `http://localhost:5173/app` → App socios ✓

- [ ] **Step 4: Correr todos los tests**

```bash
npx vitest run
```
Esperado: `PASS — todos los tests pasan`

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/main.jsx
git commit -m "feat: router — / Landing, /app AppView"
```

---

## Task 9: Responsive + build check

**Files:**
- Modify: `src/pages/Landing.jsx` (media query para bento en mobile)

- [ ] **Step 1: Verificar en 375px (iPhone)**

En DevTools → responsive → 375px:
- Hero: OK (usa `clamp`)
- Bento: colapsa a 1 columna → **fix necesario**
- Features: colapsa a 1 columna → **fix necesario**

- [ ] **Step 2: Agregar clases responsive en Landing.jsx**

Reemplazar el div del bento grid:
```jsx
// Cambiar el style del bento grid de:
style={{ ..., gridTemplateColumns: '2fr 1fr', ... }}
// A:
style={{
  maxWidth: 900,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'min(100%, 900px) > 600px ? "2fr 1fr" : "1fr"',
  gap: 12,
}}
```

Mejor solución — agregar en `src/index.css`:
```css
@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr !important;
  }
  .bento-main {
    grid-row: auto !important;
  }
  .features-grid {
    grid-template-columns: 1fr !important;
  }
}
```

Y agregar `className="bento-grid"` al div del bento, `className="bento-main"` a la celda principal, `className="features-grid"` al div de features.

- [ ] **Step 3: Build de producción**

```bash
npm run build
```
Esperado: `dist/` generado sin errores, `✓ built in ~Xs`

- [ ] **Step 4: Preview del build**

```bash
npm run preview
```
Verificar `http://localhost:4173/` y `http://localhost:4173/app`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: responsive bento + features grid, production build verified"
```

---

## Task 10: Deploy a Render + actualizar portfolio

**Files:**
- Modify: `~/Documents/insights-portfolio/src/react/data/projects.js`

- [ ] **Step 1: Crear repo en GitHub**

```bash
cd ~/Documents/libratrack
git remote add origin https://github.com/matisaucedo/libratrack.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Crear static site en Render**

En https://render.com/dashboard:
1. New → Static Site
2. Connect repo `matisaucedo/libratrack`
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Deploy

URL esperada: `https://libratrack.onrender.com`

- [ ] **Step 3: Verificar deploy**

Abrir `https://libratrack.onrender.com` → Landing ✓
Abrir `https://libratrack.onrender.com/app` → App socios ✓

- [ ] **Step 4: Agregar `_redirects` para SPA routing**

```bash
echo "/* /index.html 200" > ~/Documents/libratrack/public/_redirects
```

Commitear y re-deploy:
```bash
git add public/_redirects
git commit -m "fix: add _redirects for SPA routing on Render"
git push
```

- [ ] **Step 5: Actualizar projects.js en el portfolio**

En `~/Documents/insights-portfolio/src/react/data/projects.js`, reemplazar el mockup de `biblioteca`:

```js
mockup: {
  device: "split",
  macSrc: "https://libratrack.onrender.com/",
  iphoneSrc: "https://libratrack.onrender.com/app",
  macLabel: "Panel Bibliotecario",
  iphoneLabel: "App Socios",
},
```

- [ ] **Step 6: Verificar en el portfolio dev**

```bash
cd ~/Documents/insights-portfolio && npm run dev
```
Abrir `http://localhost:5173/proyectos/biblioteca` → mockup muestra LibraTrack real ✓

- [ ] **Step 7: Commit portfolio**

```bash
cd ~/Documents/insights-portfolio
git add src/react/data/projects.js
git commit -m "feat(projects): LibraTrack mockup — real deploy URLs libratrack.onrender.com"
```

---

## Self-Review

**Spec coverage:**
- ✅ Stack React 19 + Vite + Tailwind + Framer Motion
- ✅ Color #34D399 esmeralda en todos los componentes
- ✅ Logo Lines+Dot SVG (Task 3)
- ✅ Landing: Hero + glow radial + badge pulse (Task 6)
- ✅ Landing: Bento 2fr/1fr con panel + stats (Task 6)
- ✅ Landing: Features 3-col (Task 6)
- ✅ Landing: CTA final (Task 6)
- ✅ Navbar glassmorphism (Task 5)
- ✅ App socios: header + tabs + search + LoanCards + BottomNav (Task 7)
- ✅ Router `/` y `/app` (Task 8)
- ✅ Responsive (Task 9)
- ✅ Deploy Render + `_redirects` (Task 10)
- ✅ Actualizar portfolio mockup URLs (Task 10)

**Placeholder scan:** Ningún TBD o TODO encontrado.

**Type consistency:** `MY_LOANS`, `PANEL_BOOKS`, `STATS` definidos en Task 4 y usados correctamente en Tasks 6 y 7. Props de `LoanCard` (`title`, `author`, `status`, `badge`) coinciden en definición y uso.
