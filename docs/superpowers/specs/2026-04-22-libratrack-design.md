# LibraTrack — Design Spec
**Fecha:** 2026-04-22  
**Estado:** Aprobado ✅

---

## Resumen

Proyecto standalone React + Vite que simula el producto **LibraTrack** (sistema de gestión de biblioteca). Vive en `~/Documents/libratrack/`. Se deploya a Render y su URL reemplaza el placeholder en `insights-portfolio/src/react/data/projects.js`.

---

## Identidad visual

| Token | Valor |
|---|---|
| Color acento | `#34D399` (esmeralda) |
| Fondo base | `#050e0a` (negro con tinte verde muy sutil) |
| Fondo cards | `#0a1a10` |
| Bordes | `rgba(52,211,153,0.10)` |
| Texto principal | `#ffffff` |
| Texto secundario | `rgba(255,255,255,0.45)` |
| Font | Inter / system-ui |

### Logo — Lines + Dot (SVG inline)

3 líneas horizontales con longitud decreciente (18px → 13px → 8px) + dot circular en esquina inferior derecha. Todo en `#34D399` con opacidades 100% / 55% / 25%.

**Wordmark:** `Libra` en blanco peso 300 + `Track` en `#34D399`, tracking `-0.05em`.

**App icon:** Logo centrado en cuadrado `56×56` con `border-radius: 16px`, fondo `#071209`, borde `rgba(52,211,153,0.15)`.

---

## Estructura del proyecto

```
libratrack/
├── src/
│   ├── main.jsx
│   ├── App.jsx          ← router: "/" → Landing, "/app" → AppView
│   ├── index.css        ← Tailwind base + custom vars
│   ├── pages/
│   │   ├── Landing.jsx  ← vista Mac del mockup
│   │   └── AppView.jsx  ← vista iPhone del mockup
│   └── components/
│       ├── Navbar.jsx
│       ├── Logo.jsx     ← SVG del logo Lines+Dot
│       └── ui/          ← Badge, StatCard, LoanCard, etc.
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

**Stack:** React 19 + Vite + TailwindCSS v3.4 + Framer Motion  
**Datos:** Mock estática, sin backend  
**Deploy:** Render (static site), mismo patrón que `forza-gym.onrender.com`

---

## Ruta `/` — Landing page (vista Mac)

### Secciones en orden

**1. Navbar**
- Logo (Lines+Dot + wordmark) a la izquierda
- Links: "Funciones", "Precios", "Contacto" — visibilidad 45%
- CTA pill "Empezar →" a la derecha en esmeralda

**2. Hero — full viewport, centrado**
- Badge pill: `● Hecho por Insights` con punto esmeralda animado (pulse)
- H1: "El sistema que tu biblioteca necesitaba." — peso 300, `clamp(40px, 6vw, 80px)`, tracking `-0.05em`
- Subtítulo: "Catálogo digital · Préstamos en tiempo real · App para socios."
- 2 CTAs: "Empezar ahora →" (acento) + "Ver demo" (ghost)
- Glow radial en fondo: `radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 65%)`
- Entrada: `motion` fade-up stagger

**3. Bento grid** (2 columnas: 2fr + 1fr)
- **Celda grande (2fr, 2 rows):** Panel bibliotecario — lista de libros con estados (badge verde/amarillo/rojo). Título `PANEL BIBLIOTECARIO` uppercase 9px.
- **Celda chica 1 (1fr):** Stat `127` Préstamos activos + `↑ 12% vs ayer`
- **Celda chica 2 (1fr):** Stat `340` Socios activos + `8 nuevos este mes`
- Borde `rgba(52,211,153,0.10)`, fondo `#0a1a10`, `border-radius: 12px`

**4. Features — 3 columnas**
- 📚 Catálogo digital
- ⚡ Préstamos real-time  
- 📱 App para socios
- Cada card: ícono emoji + nombre 12px + descripción 11px opacity 50%
- Separador top: `border-top: 1px solid rgba(255,255,255,0.05)`

**5. CTA final**
- "Tu biblioteca, modernizada."
- "Instalación en menos de un día. Soporte incluido."
- Botón "Contactar a Insights →"
- Fondo: `linear-gradient(0deg, rgba(52,211,153,0.04), transparent)`

---

## Ruta `/app` — App socios (vista iPhone)

### Estructura (sin navbar, full-screen app)

**Header**
- Saludo: "Buen día, {nombre} 👋" — 11px opacity 40%
- Título: "Mis libros" — 16px peso 500

**Tabs** (pills): Prestados · Reservas · Catálogo  
- Tab activo: fondo `rgba(52,211,153,0.12)`, borde esmeralda, texto `#34D399`

**Search bar**
- Fondo `rgba(255,255,255,0.04)`, borde sutil, placeholder "Buscar en el catálogo..."

**Lista de libros prestados** (LoanCard × 3)

| Libro | Autor | Estado |
|---|---|---|
| El Aleph | J.L. Borges | Badge verde: "Devolver en 12 días" |
| Rayuela | J. Cortázar | Badge amarillo: "Vence mañana · Renovar" |
| Ficciones | J.L. Borges | Badge tenue: "Reservado — disponible 28/04" |

Cada card: portada placeholder (rectángulo esmeralda suave) + datos + badge.

**Bottom nav**
- Inicio (activo, esmeralda) · Catálogo · Perfil
- Iconos geométricos 16×16, fondo pill activo `rgba(52,211,153,0.15)`

---

## Animaciones

- Todas las entradas: `initial={{ opacity:0, y:24 }}` → `animate={{ opacity:1, y:0 }}` con `duration: 0.7, ease: [0.22,1,0.36,1]`
- Stagger en hero: `staggerChildren: 0.1, delayChildren: 0.05`
- Badge dot: `animate={{ scale: [1,1.3,1] }}` repeat infinite, duration 2s
- Bento cards: `whileInView` con `once: true`
- Hover en LoanCard: `whileHover={{ y: -2, borderColor: "rgba(52,211,153,0.22)" }}`

---

## Deploy

1. Crear repo en GitHub: `matisaucedo/libratrack`
2. Deploy en Render como static site (`npm run build`, publish dir: `dist`)
3. URL esperada: `libratrack.onrender.com`
4. Actualizar en `insights-portfolio/src/react/data/projects.js`:
   ```js
   mockup: {
     device: "split",
     macSrc: "https://libratrack.onrender.com/",
     iphoneSrc: "https://libratrack.onrender.com/app",
     macLabel: "Panel Bibliotecario",
     iphoneLabel: "App Socios",
   }
   ```

---

## Criterios de éxito

- [ ] Landing carga en < 1.5s (solo static assets)
- [ ] Responsive: funciona en 375px (iPhone) y 1280px+ (Mac)
- [ ] Logo visible en navbar y como favicon
- [ ] Bento grid no colapsa en 1024px
- [ ] App socios se ve bien dentro del frame iPhone del portfolio
- [ ] Sin errores de consola
