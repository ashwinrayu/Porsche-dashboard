/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porsche: {
          bg: '#F8FAFC',
          bgLight: '#F1F5F9',
          card: '#FFFFFF',
          cardHover: '#F8FAFC',
          cyan: '#0EA5E9',
          teal: '#0D9488',
          muted: '#475569',
          border: 'rgba(15, 23, 42, 0.08)',
          gold: '#D97706',
          purple: '#7C3AED',
          rose: '#E11D48',
          emerald: '#059669',
          blue: '#2563EB',
          red: '#D5001C',
          green: '#A2E600',
          silver: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 12px rgba(213, 0, 28, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'glow-red': '0 0 15px rgba(213, 0, 28, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'glow-green': '0 0 15px rgba(162, 230, 0, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'glow-lg': '0 0 25px rgba(213, 0, 28, 0.15), 0 8px 24px -4px rgba(15, 23, 42, 0.08)',
      }
    },
  },
  plugins: [],
}
