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
  // Feature card heading (exact text)
  expect(screen.getByText('Catálogo digital')).toBeInTheDocument()
  expect(screen.getByText('Préstamos real-time')).toBeInTheDocument()
})

test('renders stat values', () => {
  render(<Landing />, { wrapper })
  expect(screen.getByText('127')).toBeInTheDocument()
  expect(screen.getByText('340')).toBeInTheDocument()
})
