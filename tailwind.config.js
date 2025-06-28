/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          400: '#FFD700',
          500: '#FFC700',
          600: '#E6B800',
        },
        silver: {
          400: '#C0C0C0',
          500: '#A8A8A8',
          600: '#909090',
        },
        dark: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#212529',
          900: '#0D1117',
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
        'gradient-silver': 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)',
        'gradient-dark': 'linear-gradient(135deg, #212529 0%, #343A40 100%)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          'from': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)' },
        }
      }
    },
  },
  plugins: [],
};