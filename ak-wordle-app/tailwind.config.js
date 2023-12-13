const path = require('path')
const fromRoot = p => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Azbuka W01 Condensed', 'Ariel'],
      },
      colors: {
        incorrect: '#919090',
        higher: '#08aadd',
        lower: '#c80000',
        half: '#d3470b',
        correct: '#424142',
        bg_main: '#edeeee',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui')
  ],
}
