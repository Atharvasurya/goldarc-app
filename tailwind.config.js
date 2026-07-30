/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f4ead2',
          300: '#eeddb7',
          400: '#e2c481',
          500: '#d6ab4b',
          600: '#c19a44',
          700: '#a18038',
          800: '#81662d',
          900: '#6a5325',
        },
        ivory: {
          50: '#fefefe',
          100: '#fcfcfc',
          200: '#f9f9f7',
          300: '#f5f5f2',
          400: '#eeede8',
          500: '#e7e5de',
          600: '#d0cec8',
          700: '#adaba7',
          800: '#8a8986',
          900: '#71706e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
