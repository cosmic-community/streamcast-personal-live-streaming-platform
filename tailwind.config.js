/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7ff',
          100: '#f0edff',
          200: '#e4dcff',
          300: '#d1bfff',
          400: '#b897ff',
          500: '#9c6bff',
          600: '#8b4cf7',
          700: '#7a35e3',
          800: '#672dbf',
          900: '#56289c',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': {
            boxShadow: '0 0 5px #8b4cf7, 0 0 10px #8b4cf7, 0 0 15px #8b4cf7',
          },
          '100%': {
            boxShadow: '0 0 10px #8b4cf7, 0 0 20px #8b4cf7, 0 0 30px #8b4cf7',
          },
        },
      },
    },
  },
  plugins: [],
}