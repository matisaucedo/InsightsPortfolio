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
