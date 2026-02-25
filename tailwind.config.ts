/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        birthstone: ['var(--font-birthstone)', 'cursive'],
      },
    },
  },
  plugins: [],
}