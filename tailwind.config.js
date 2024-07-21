import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "800px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      fontFamily: {
        primary: ["Noto Sans", "sans-serif"],
        second: ["Noto Serif Display", "serif"],
        service: ["Bungee", "sans-serif"],
        league: ["League Spartan", "sans-serif"],
        sanchez: ["Sanchez", "serif"],
        libre: ["Libre Franklin", "sans-serif"],
        paytone: ["Paytone One", "sans-serif"]
      },

      colors: {
        primary: "#C8B997",
        second: "#937632"
      }
    },
    textShadow: {
      line: "-2px -2px 0 #645533, 2px -2px 0 #645533, -2px 2px 0 #645533, 2px 2px 0 #645533",
      pool: "-6px -6px 0 #C8B997, 6px -6px 0 #C8B997, -6px 6px 0 #C8B997, 6px 6px 0 #C8B997",
      service: "rgb(200, 185, 151) 4.03157px 0.638538px 0px"
    },
  },

  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          })
        },
        { values: theme('textShadow') }
      )
    }),
    plugin(function({ matchUtilities }) {
      matchUtilities(
        {
          'text-line': (value) => ({
            '-webkit-text-stroke': value,
          }),
          // 'box-border': (value) => ({
          //   ''
          // })
        }
      )
    })
  ],
}
