/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        acc: {
          DEFAULT: '#34D399',
          dark: '#10b981',
          subtle: 'rgba(52,211,153,0.10)',
          border: 'rgba(52,211,153,0.25)',
        },
        ink: {
          DEFAULT: '#1a1a18',
          muted: '#6b6b68',
          subtle: '#a0a09c',
        },
        stone: {
          bg: '#f7f5f2',
          surface: '#ffffff',
          border: 'rgba(0,0,0,0.07)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
