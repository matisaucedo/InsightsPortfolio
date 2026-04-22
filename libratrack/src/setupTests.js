import '@testing-library/jest-dom'

// Mock IntersectionObserver — not available in jsdom
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
