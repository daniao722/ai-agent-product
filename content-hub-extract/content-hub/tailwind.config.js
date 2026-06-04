/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C9A227',
          50: '#FBF5E0',
          100: '#F5E8B5',
          200: '#EDD26A',
          300: '#E4BC2A',
          400: '#C9A227',
          500: '#A07820',
          600: '#7A5B18',
          700: '#543D10',
          800: '#2D2008',
          900: '#0A0500',
        }
      }
    },
  },
  plugins: [],
}
