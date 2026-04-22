// Real book covers scraped from lighthouse.framer.media/shop
const IMG = {
  aleph:     'https://framerusercontent.com/images/9or642QycfDzp8VBALeFklfXpk.png',
  rayuela:   'https://framerusercontent.com/images/5WUjvC4IlxCGFtRKbSq1sCbMgo.png',
  ficciones: 'https://framerusercontent.com/images/fGiCteWI9IMWUChCCuglCDrPPcQ.png',
  orwell:    'https://framerusercontent.com/images/55lKUXpojGawK7rU9UHnm6BqeTE.png',
  cien:      'https://framerusercontent.com/images/ELc2f2lQZArhHNsYSMi7tz80Q.png',
  rosa:      'https://framerusercontent.com/images/LjkNfIqaeS801ZL5LhTlrP6bwYw.png',
  quijote:   'https://framerusercontent.com/images/ZBXCkoNfTbtYlkT6P3sDwlUWxg.png',
  odisea:    'https://framerusercontent.com/images/awrPLeu88ymgPSC9CPq7SNHtfn8.png',
  crimen:    'https://framerusercontent.com/images/g73WcBqlLF50BKzbbOcmZggyo.png',
  proceso:   'https://framerusercontent.com/images/YCfCMr9uGSnBv9kpWxyhXOZozg.png',
  pedro:     'https://framerusercontent.com/images/atANMdte6QZ6hvlJ0VBQQIsib7Q.png',
}

export const STATS = [
  { label: 'Préstamos activos', value: '127', delta: '↑ 12% vs ayer', accent: true },
  { label: 'Socios activos', value: '340', delta: '8 nuevos este mes', accent: false },
]

export const PANEL_BOOKS = [
  { title: 'El Aleph', author: 'Borges', status: 'loaned', cover: IMG.aleph },
  { title: 'Rayuela', author: 'Cortázar', status: 'due-today', cover: IMG.rayuela },
  { title: 'Ficciones', author: 'Borges', status: 'available', cover: IMG.ficciones },
  { title: '1984', author: 'Orwell', status: 'overdue', cover: IMG.orwell },
]

export const MY_LOANS = [
  {
    id: 1,
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    genre: 'Cuentos',
    status: 'ok',
    badge: 'Devolver en 12 días',
    cover: IMG.aleph,
    dueDate: '4 mayo 2026',
  },
  {
    id: 2,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    genre: 'Novela',
    status: 'warning',
    badge: 'Vence mañana',
    cover: IMG.rayuela,
    dueDate: '23 abril 2026',
  },
  {
    id: 3,
    title: 'Ficciones',
    author: 'Jorge Luis Borges',
    genre: 'Cuentos',
    status: 'reserved',
    badge: 'Disponible el 28/04',
    cover: IMG.ficciones,
    dueDate: '28 abril 2026',
  },
]

export const MY_RESERVATIONS = [
  {
    id: 4,
    title: 'El proceso',
    author: 'Franz Kafka',
    genre: 'Novela',
    status: 'reserved',
    badge: 'Lista para retirar',
    cover: IMG.proceso,
    availableDate: '22 abril 2026',
  },
  {
    id: 5,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Novela',
    status: 'reserved',
    badge: 'Reservado — retiro el 30/04',
    cover: IMG.cien,
    availableDate: '30 abril 2026',
  },
]

export const CATALOG = [
  { id: 10, title: 'El Aleph', author: 'Jorge Luis Borges', genre: 'Cuentos', year: 1949, available: true, cover: IMG.aleph },
  { id: 11, title: 'Rayuela', author: 'Julio Cortázar', genre: 'Novela', year: 1963, available: false, cover: IMG.rayuela },
  { id: 12, title: 'Ficciones', author: 'Jorge Luis Borges', genre: 'Cuentos', year: 1944, available: true, cover: IMG.ficciones },
  { id: 13, title: '1984', author: 'George Orwell', genre: 'Distopía', year: 1949, available: false, cover: IMG.orwell },
  { id: 14, title: 'Cien años de soledad', author: 'G. García Márquez', genre: 'Novela', year: 1967, available: true, cover: IMG.cien },
  { id: 15, title: 'El nombre de la rosa', author: 'Umberto Eco', genre: 'Misterio', year: 1980, available: true, cover: IMG.rosa },
  { id: 16, title: 'Don Quijote', author: 'Miguel de Cervantes', genre: 'Clásico', year: 1605, available: false, cover: IMG.quijote },
  { id: 17, title: 'La Odisea', author: 'Homero', genre: 'Épica', year: -800, available: true, cover: IMG.odisea },
  { id: 18, title: 'Crimen y castigo', author: 'Fiódor Dostoyevski', genre: 'Novela', year: 1866, available: true, cover: IMG.crimen },
  { id: 19, title: 'El proceso', author: 'Franz Kafka', genre: 'Novela', year: 1925, available: false, cover: IMG.proceso },
  { id: 20, title: 'Pedro Páramo', author: 'Juan Rulfo', genre: 'Novela', year: 1955, available: true, cover: IMG.pedro },
]

export const STATUS_LABELS = {
  loaned: { text: 'Prestado', color: 'emerald' },
  'due-today': { text: 'Vence hoy', color: 'yellow' },
  available: { text: 'Disponible', color: 'emerald' },
  overdue: { text: 'Vencido', color: 'red' },
}
