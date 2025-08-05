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
        primary: {
          DEFAULT: '#f8fafc',   // Claro - azul grisáceo muy claro
          dark: '#181825',      // Oscuro
        },
        secondary: {
          DEFAULT: '#e0e7ef',   // Claro
          dark: '#1e293b',      // Oscuro
        },
        text: {
          DEFAULT: '#181825',   // Color de texto para modo claro
          dark: '#f4f4fa',      // Color de texto para modo oscuro
        },
        tertiary: {
          DEFAULT: '#181825', // mas oscuro para el modo claro
          dark: '#f4f4fa'     // se mantiene para el modo oscuro
        },
        accent: {
          pink: '#ff6bcb',
          purple: '#a084ee',
          blue: '#5eead4',
          yellow: '#ffe066',
          orange: '#ffb86b',
          green: '#7afcff',
        },
        light: '#f4f4fa',
        dark: '#181825',
        'accent-purple': 'var(--accent-purple)',
        'accent-pink': 'var(--accent-pink)',
        'accent-orange': 'var(--accent-orange)',
        'accent-blue': 'var(--accent-blue)',
        'accent-green': 'var(--accent-green)',
        'accent-yellow': 'var(--accent-yellow)',
        'accent-red': 'var(--accent-red)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-indigo': 'var(--accent-indigo)',
        'accent-lime': 'var(--accent-lime)',
        'accent-emerald': 'var(--accent-emerald)',
        'accent-teal': 'var(--accent-teal)',
        'accent-sky': 'var(--accent-sky)',
        'accent-violet': 'var(--accent-violet)',
        'accent-fuchsia': 'var(--accent-fuchsia)',
        'accent-rose': 'var(--accent-rose)',
        'accent-amber': 'var(--accent-amber)',
        'accent-stone': 'var(--accent-stone)',
        'accent-neutral': 'var(--accent-neutral)',
        'accent-slate': 'var(--accent-slate)',
        'accent-zinc': 'var(--accent-zinc)',
        'accent-gray': 'var(--accent-gray)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 