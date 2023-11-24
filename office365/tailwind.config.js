/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0},
        },

        slideAndFade: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '50%': { transform: 'translateX(-100%)', opacity: .1 },
          '100%': { transform: 'translateX(-120%)', opacity: 0 },
        },
        slideAndFadeIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        slideAndFade: 'slideAndFade 600ms forwards',
        slideAndFadeIn: 'slideAndFadeIn 600ms forwards',
        fadeOut: 'fadeOut 1s forwards', // Change '1s' to the duration you want
      },

      backgroundImage: {
        'net': "url('../public/net-bg.jpg')",
        'cards': "url('../public/cards.png)"
      }
    },
  },
    plugins: [
      {
      tailwindcss: {},
      autoprefixer: {},
      }
    ]
}

