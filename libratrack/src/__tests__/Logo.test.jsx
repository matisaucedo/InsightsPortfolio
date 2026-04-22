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
