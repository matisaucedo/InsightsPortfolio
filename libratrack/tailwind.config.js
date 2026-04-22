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
