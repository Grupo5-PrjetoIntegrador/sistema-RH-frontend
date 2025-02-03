/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cor-destaque': '#E66032',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'serif']
      }
    },
  },
  plugins: [],
}

