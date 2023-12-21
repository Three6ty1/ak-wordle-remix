const path = require('path')
const fromRoot = p => path.join(__dirname, p)

module.exports = {
  mode: 'jit',
  content: [fromRoot('./app/**/*.+(js|ts|tsx|mdx|md)')],
  darkMode: 'media',
  theme: {
    extend: {
      animation: {
        flip: 'flip 1s ease-out forwards',
        win: 'win 2.5s linear forwards',
        'fade-in-out': 'fade-in-out 3s linear forwards',
        'fade-in': 'fade-in 2s linear forwards'
      },
      fontFamily: {
        sans: ['Azbuka W01 Condensed', 'Ariel'],
      },
      colors: {
        incorrect: '#919090',
        higher: '#08aadd',
        lower: '#c80000',
        half: '#FFAC1C',
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
    require('daisyui'),
  ],
}
