/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      display: ['Quicksand', 'sans']
    },
    extend: {
      colors: {
        brand: {
          brand: '#1F2241',
          black: '#06070D',
          white: '#f3f2fe',
          border: '#7c74d6',
          secondary: '#b8b2fc',
        }
      }
    },
  },
  plugins: [],
}

