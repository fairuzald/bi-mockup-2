/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-green': {
          DEFAULT: '#1A614F',
          light: '#2A9D8F',
          dark: '#144237',
        },
        light: {
          background: '#f5f7fa',
          card: '#ffffff',
          text: '#111827',
          text_secondary: '#6b7280',
          border: '#e5e7eb',
        },
        dark: {
          background: '#0c1110',
          card: '#111816',
          text: '#e5e7eb',
          text_secondary: '#9ca3af',
          border: '#2c3534',
        },
      },
      boxShadow: {
        'glow-green': '0 0 20px 5px rgba(26, 97, 79, 0.3)',
      },
      backgroundImage: {
        'aurora-light':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(42, 157, 143, 0.1), transparent)',
        'aurora-dark':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(26, 97, 79, 0.2), transparent)',
      },
    },
  },
  plugins: [],
};
