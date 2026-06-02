/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF8',
        'cream-pink': '#FFF5F8',
        'pink-pale': '#FFD6E4',
        'pink-light': '#E8809C',
        pink: '#7D2E45',
        'pink-deep': '#5C1F31',
        'matcha-pale': '#EEF5E8',
        'matcha-light': '#BDD4AD',
        matcha: '#6E9B72',
        'matcha-deep': '#4A6E4E',
        ivory: '#FDFAF4',
        brown: '#3A2828',
        'brown-mid': '#6B4848',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        arabic: ['"Amiri"', 'serif'],
      },
      maxWidth: { phone: '430px' },
      boxShadow: {
        phone: '0 0 80px rgba(180,80,112,0.12), 0 20px 60px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 1.4s ease-out forwards',
        'slide-up': 'slideUp 0.9s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
