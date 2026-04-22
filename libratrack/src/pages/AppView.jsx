import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/Logo'
import { MY_LOANS, MY_RESERVATIONS, CATALOG } from '../data/mock'

const EASE = [0.22, 1, 0.36, 1]

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconHome()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function IconGrid()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> }
function IconUser()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function IconSearch()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> }
function IconCheck()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round"><polyline points="4,12 9,17 20,6"/></svg> }
function IconClock()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function IconAlert()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
function IconX()       { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }
function IconBook()    { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> }

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          key={msg}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.28, ease: EASE }}
          onAnimationComplete={() => { if (msg) setTimeout(onDone, 1800) }}
          style={{
            position: 'fixed', bottom: 88, left: '50%', transform: 'translateX(-50%)',
            background: '#1a1d27', border: '1px solid rgba(52,211,153,0.30)',
            borderRadius: 12, padding: '11px 18px', zIndex: 100,
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
            boxShadow: '0 8px 32px rgba(0,0,0,0.50)',
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconCheck />
          </div>
          <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Book detail modal ─────────────────────────────────────────────────────────
function BookModal({ book, onClose, onAction, reserved }) {
  return (
    <AnimatePresence>
      {book && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.70)', backdropFilter: 'blur(6px)', zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <motion.div
            key="sheet"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ duration: 0.38, ease: EASE }}
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 420, background: '#13151c', borderRadius: '20px 20px 0 0', padding: '24px 20px 40px', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Drag handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)', margin: '0 auto 20px' }} />

            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <img src={book.cover} alt={book.title} style={{ width: 80, height: 110, borderRadius: 8, objectFit: 'cover', flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.50)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.10em', fontWeight: 600, marginBottom: 6 }}>{book.genre}</div>
                <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4, lineHeight: '1.3em' }}>{book.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{book.author}</div>
                {book.year && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginTop: 8 }}>{book.year > 0 ? book.year : `${Math.abs(book.year)} a.C.`}</div>}
              </div>
            </div>

            {/* Status */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Estado</span>
              {book.available !== undefined ? (
                <span style={{ fontSize: 12, fontWeight: 500, color: book.available ? '#34D399' : '#fbbf24' }}>
                  {book.available ? '● Disponible' : '● Prestado'}
                </span>
              ) : (
                <span style={{ fontSize: 12, fontWeight: 500, color: book.status === 'ok' ? '#34D399' : book.status === 'warning' ? '#fbbf24' : 'rgba(52,211,153,0.70)' }}>
                  {book.badge}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {book.available && (
                <motion.button
                  onClick={() => onAction('reserved', book)}
                  whileHover={{ background: '#10b981' }} whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '14px', background: reserved ? 'rgba(52,211,153,0.12)' : '#34D399', border: reserved ? '1px solid rgba(52,211,153,0.30)' : 'none', borderRadius: 12, color: reserved ? '#34D399' : '#0d0e12', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {reserved ? '✓ Reservado' : 'Reservar libro'}
                </motion.button>
              )}
              {book.status === 'warning' && (
                <motion.button
                  onClick={() => onAction('renewed', book)}
                  whileHover={{ background: '#10b981' }} whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '14px', background: '#34D399', border: 'none', borderRadius: 12, color: '#0d0e12', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Renovar préstamo →
                </motion.button>
              )}
              {book.status === 'reserved' && book.availableDate && (
                <motion.button
                  onClick={() => onAction('cancelled', book)}
                  whileTap={{ scale: 0.98 }}
                  style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Cancelar reserva
                </motion.button>
              )}
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', padding: '13px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, color: 'rgba(255,255,255,0.55)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Cerrar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Loan card ─────────────────────────────────────────────────────────────────
function LoanCard({ loan, onPress, onRenew }) {
  const statusColor = { ok: '#34D399', warning: '#fbbf24', reserved: 'rgba(52,211,153,0.70)' }
  return (
    <motion.div
      whileHover={{ y: -2, borderColor: 'rgba(52,211,153,0.20)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onPress(loan)}
      transition={{ duration: 0.18 }}
      style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
    >
      <img src={loan.cover} alt={loan.title} style={{ width: 44, height: 62, borderRadius: 6, objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.40)' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{loan.title}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 7 }}>{loan.author}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: statusColor[loan.status] ?? '#fff' }}>
            {loan.status === 'warning' ? <IconAlert /> : <IconClock />}
          </span>
          <span style={{ fontSize: 11, color: statusColor[loan.status] ?? 'rgba(255,255,255,0.45)' }}>{loan.badge}</span>
        </div>
      </div>
      {loan.status === 'warning' && (
        <motion.button
          onClick={e => { e.stopPropagation(); onRenew(loan) }}
          whileHover={{ background: '#10b981' }} whileTap={{ scale: 0.95 }}
          style={{ flexShrink: 0, padding: '6px 12px', background: '#34D399', border: 'none', borderRadius: 8, color: '#0d0e12', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Renovar
        </motion.button>
      )}
    </motion.div>
  )
}

// ── Catalog grid card ─────────────────────────────────────────────────────────
function CatalogCard({ book, onPress, reserved }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onPress(book)}
      transition={{ duration: 0.18 }}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <img src={book.cover} alt={book.title} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 10, display: 'block', boxShadow: '0 6px 20px rgba(0,0,0,0.50)' }} />
        <div style={{ position: 'absolute', top: 6, right: 6, padding: '3px 7px', borderRadius: 6, background: book.available ? 'rgba(52,211,153,0.85)' : 'rgba(0,0,0,0.70)', backdropFilter: 'blur(4px)', fontSize: 9, fontWeight: 600, color: book.available ? '#0d0e12' : 'rgba(255,255,255,0.60)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {reserved ? '✓ Reservado' : book.available ? 'Disp.' : 'Prestado'}
        </div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>{book.author}</div>
    </motion.div>
  )
}

// ── Profile view ──────────────────────────────────────────────────────────────
function ProfileView({ onToast }) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
      style={{ flex: 1, padding: '20px 20px 20px', overflowY: 'auto' }}>
      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, padding: '16px', background: '#0f1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', marginBottom: 2 }}>Matías García</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>Socio #1042 · Plan Pro</div>
        </div>
        <motion.button onClick={() => onToast('Perfil guardado')} whileHover={{ background: 'rgba(52,211,153,0.15)' }} whileTap={{ scale: 0.96 }}
          style={{ marginLeft: 'auto', padding: '6px 12px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.20)', borderRadius: 8, color: '#34D399', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
          Editar
        </motion.button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[{ n: '3', l: 'Activos' }, { n: '27', l: 'Historial' }, { n: '2', l: 'Reservas' }].map(s => (
          <div key={s.l} style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: '-0.04em', color: '#34D399', marginBottom: 2 }}>{s.n}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
        {[
          { label: 'Notificaciones', sub: 'Alertas de vencimiento y novedades', toggle: notifications, onToggle: () => { setNotifications(v => !v); onToast(!notifications ? 'Notificaciones activadas' : 'Notificaciones desactivadas') } },
          { label: 'Modo oscuro', sub: 'Siempre activo en la app', toggle: darkMode, onToggle: () => { setDarkMode(v => !v); onToast('Preferencia guardada') } },
        ].map((item, i, arr) => (
          <div key={item.label} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{item.sub}</div>
            </div>
            <motion.div onClick={item.onToggle} animate={{ background: item.toggle ? '#34D399' : 'rgba(255,255,255,0.10)' }} style={{ width: 40, height: 22, borderRadius: 11, cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
              <motion.div animate={{ x: item.toggle ? 20 : 2 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2 }} />
            </motion.div>
          </div>
        ))}
        <div onClick={() => onToast('Sesión cerrada')} style={{ padding: '14px 16px', cursor: 'pointer', color: '#f87171', fontSize: 13, fontWeight: 500 }}>
          Cerrar sesión
        </div>
      </div>
    </motion.div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function AppView() {
  const [activeNav, setActiveNav]     = useState('inicio')
  const [activeTab, setActiveTab]     = useState('Prestados')
  const [search, setSearch]           = useState('')
  const [toast, setToast]             = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [reservedIds, setReservedIds] = useState(new Set())
  const [loans, setLoans]             = useState(MY_LOANS)

  function showToast(msg) {
    setToast(null)
    setTimeout(() => setToast(msg), 20)
  }

  function handleAction(type, book) {
    setSelectedBook(null)
    if (type === 'reserved') {
      setReservedIds(prev => new Set([...prev, book.id]))
      showToast(`"${book.title}" reservado`)
    } else if (type === 'renewed') {
      setLoans(prev => prev.map(l => l.id === book.id ? { ...l, status: 'ok', badge: 'Renovado — devolver en 14 días' } : l))
      showToast(`Préstamo renovado por 14 días`)
    } else if (type === 'cancelled') {
      showToast(`Reserva cancelada`)
    }
  }

  // Filtered catalog
  const filteredCatalog = useMemo(() => {
    if (!search.trim()) return CATALOG
    const q = search.toLowerCase()
    return CATALOG.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q))
  }, [search])

  const NAV_ITEMS = [
    { id: 'inicio',   label: 'Inicio',   Icon: IconHome },
    { id: 'catalogo', label: 'Catálogo', Icon: IconGrid },
    { id: 'perfil',   label: 'Perfil',   Icon: IconUser },
  ]

  const TABS = ['Prestados', 'Reservas']

  return (
    <div style={{ minHeight: '100vh', background: '#0d0e12', display: 'flex', flexDirection: 'column', maxWidth: 420, margin: '0 auto', position: 'relative' }}>

      <Toast msg={toast} onDone={() => setToast(null)} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onAction={handleAction} reserved={selectedBook ? reservedIds.has(selectedBook.id) : false} />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ padding: '48px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d0e12' }}
      >
        <Logo size={18} light />
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Bienvenido de vuelta</div>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.03em', color: '#fff' }}>
              {activeNav === 'inicio' ? 'Mis libros' : activeNav === 'catalogo' ? 'Catálogo' : 'Mi perfil'}
            </div>
          </div>
          {activeNav === 'inicio' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.18)', borderRadius: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'block' }} />
              <span style={{ fontSize: 11, color: '#34D399', fontWeight: 500 }}>3 activos</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Tabs (inicio only) ── */}
      {activeNav === 'inicio' && (
        <div style={{ display: 'flex', gap: 6, padding: '12px 20px 0', background: '#0d0e12' }}>
          {TABS.map(tab => {
            const active = tab === activeTab
            return (
              <motion.button key={tab} onClick={() => setActiveTab(tab)}
                animate={{ background: active ? 'rgba(52,211,153,0.12)' : 'transparent', color: active ? '#34D399' : 'rgba(255,255,255,0.38)', borderColor: active ? 'rgba(52,211,153,0.25)' : 'transparent' }}
                transition={{ duration: 0.18 }}
                style={{ fontSize: 12, fontWeight: 500, padding: '5px 14px', borderRadius: 999, border: '1px solid transparent', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {tab}
              </motion.button>
            )
          })}
        </div>
      )}

      {/* ── Search (catálogo only) ── */}
      {activeNav === 'catalogo' && (
        <div style={{ padding: '12px 20px 0', background: '#0d0e12' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.28)', fontSize: 13 }}>
            <IconSearch />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar título, autor o género..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 13, fontFamily: 'inherit' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: 0, display: 'flex' }}><IconX /></button>
            )}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ flex: 1, padding: '12px 20px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* INICIO — loan list */}
        {activeNav === 'inicio' && (
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activeTab === 'Prestados' && (
              loans.length ? loans.map((loan, i) => (
                <motion.div key={loan.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.07, ease: EASE }}>
                  <LoanCard loan={loan} onPress={setSelectedBook} onRenew={l => handleAction('renewed', l)} />
                </motion.div>
              )) : <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 13, textAlign: 'center', marginTop: 40 }}>Sin préstamos activos</p>
            )}
            {activeTab === 'Reservas' && (
              MY_RESERVATIONS.length ? MY_RESERVATIONS.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.07, ease: EASE }}>
                  <LoanCard loan={r} onPress={setSelectedBook} onRenew={() => {}} />
                </motion.div>
              )) : <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 13, textAlign: 'center', marginTop: 40 }}>Sin reservas activas</p>
            )}
          </motion.div>
        )}

        {/* CATÁLOGO — grid */}
        {activeNav === 'catalogo' && (
          <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px 12px' }}>
            {filteredCatalog.length ? filteredCatalog.map((book, i) => (
              <motion.div key={book.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                <CatalogCard book={book} onPress={setSelectedBook} reserved={reservedIds.has(book.id)} />
              </motion.div>
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'rgba(255,255,255,0.30)', fontSize: 13, marginTop: 40 }}>
                Sin resultados para "{search}"
              </div>
            )}
          </motion.div>
        )}

        {/* PERFIL */}
        {activeNav === 'perfil' && <ProfileView onToast={showToast} />}
      </div>

      {/* ── Bottom nav ── */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0 28px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(13,14,18,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = activeNav === id
          return (
            <motion.button key={id} onClick={() => { setActiveNav(id); setSearch('') }}
              whileTap={{ scale: 0.90 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 10, color: active ? '#34D399' : 'rgba(255,255,255,0.28)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <motion.div animate={{ background: active ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)' }} style={{ width: 34, height: 30, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon />
              </motion.div>
              {label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
