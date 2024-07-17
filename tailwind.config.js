const plugin = require('tailwindcss/plugin')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        'warm-blue': '#4242E0',
        'harp-white': '#EBEFF2',
        'light-grey': '#D9D9D9',
        'goose-grey': '#C8D2DA',
        'ash-grey': '#B2BCC3',
        'geyser-grey': '#D4E0E9',
        'cool-grey': '#959EA6',
        'lite-grey': '#959EA61A',
        'baltic-black': '#2A2C2D',
        'gravel-black': '#494B4D',
      },
      backgroundImage: {
        backgroundDesktop: "url('/src/assets/images/helix.svg')",
        backgroundDesktopBlue: "url('/src/assets/images/helix-blue.svg')",
        backgroundDesktopDark: "url('/src/assets/images/helix-dark.svg')",
      }
    },
  },
  plugins: []
};
