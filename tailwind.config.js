/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        colorShift: {
          '0%, 100%': {
            backgroundColor: '#22c55e',
          },
        },
      },
      animation: {
        colorShift: 'colorShift 600ms ease-in-out',
      },
    },
  },
  plugins: [],
};
