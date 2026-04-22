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
  // 'Catálogo' appears in both the tab and the bottom nav
  expect(screen.getAllByText('Catálogo').length).toBeGreaterThanOrEqual(1)
})

test('renders loan cards', () => {
  render(<AppView />)
  expect(screen.getByText('El Aleph')).toBeInTheDocument()
  expect(screen.getByText('Rayuela')).toBeInTheDocument()
  expect(screen.getByText('Ficciones')).toBeInTheDocument()
})
