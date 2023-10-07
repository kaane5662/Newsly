/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', "sans-serif"],
        'rcondensed': ['Roboto Condensed', "sans-serif"],
        'outfit': ['Outfit', "sans-serif"]
      }
    },
  },
  plugins: [],
}

