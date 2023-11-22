/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'net': "url('../public/net-bg.jpg')",
        'cards': "url('../public/cards.png)"
      }
    },
  },
  plugins: [],
}

