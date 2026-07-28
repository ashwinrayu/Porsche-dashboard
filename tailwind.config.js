/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porsche: {
          bgLight: '#F7F7F5',       // Executive Studio Light
          bgDark: '#090909',        // Mission Control Dark
          cardLight: '#FFFFFF',     // Pure White Light Card
          cardDark: '#121417',      // Deep Dark Card
          cardHoverLight: '#F0F0EE',
          cardHoverDark: '#1A1D23',
          red: '#D5001C',           // Porsche Guards Red Accent
          mutedLight: '#666666',
          mutedDark: '#999999',
          borderLight: 'rgba(17, 17, 17, 0.08)',
          borderDark: 'rgba(255, 255, 255, 0.08)',
          gold: '#D97706',
          emerald: '#059669',
          blue: '#2563EB',
          silver: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '24': '24px',
        '32': '32px',
      },
      boxShadow: {
        'luxury-light': '0 10px 40px -10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.08)',
        'luxury-dark': '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-red': '0 0 25px rgba(213, 0, 28, 0.3)',
        'glow-red-lg': '0 0 40px rgba(213, 0, 28, 0.4)',
      },
      transitionDuration: {
        '600': '600ms',
      }
    },
  },
  plugins: [],
}
