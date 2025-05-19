/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#2258A6',
        accent: '#3399FF',
        background: '#eaf4fb',
        neutral: '#1e1e1e',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 12px 0 rgb(34 88 166 / 0.10)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
