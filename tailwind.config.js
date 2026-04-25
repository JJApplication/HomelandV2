/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F4F1EA',
          secondary: '#FCFBF8',
          tertiary: '#ECE7DE',
        },
        accent: {
          DEFAULT: '#FF6A1A',
          hover: '#EA5C10',
          active: '#D94E02',
          subtle: 'rgba(255, 106, 26, 0.08)',
        },
        lime: {
          DEFAULT: '#D8F05C',
          hover: '#C8E247',
          subtle: 'rgba(216, 240, 92, 0.24)',
        },
        text: {
          primary: '#111111',
          secondary: '#4F4A43',
          muted: '#8A847B',
        },
        border: {
          DEFAULT: '#26221D',
          subtle: '#CFC8BC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
