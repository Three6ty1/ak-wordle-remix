const path = require('path')
const fromRoot = p => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': {
              transform: 'rotateX(90deg)',
              opacity: '0'
          },
          '100%': {
              transform: 'rotateX(0)',
              opacity: '1'
          },
        },
      },
      animation: {
        flip: 'flip 1s ease-out forwards',
      },
      fontFamily: {
        sans: ['Azbuka W01 Condensed', 'Ariel'],
      },
      colors: {
        incorrect: '#919090',
        higher: '#08aadd',
        lower: '#c80000',
        half: '#d3470b',
        correct: '#6BBF59',
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
