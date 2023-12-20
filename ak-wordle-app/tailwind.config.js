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
        win: {
          '0%': {
            transform: 'rotateX(90deg)',
            opacity: '0'
          },
          '25%': {
            transform: 'rotateX(0)',
            opacity: '1'
          },
          '65%': {
            transform: 'translate(0)',
          },
          '70%': {
            transform: 'translateY(-20%)',
          },
          '75%': {
            transform: 'translateY(5%)',
          },
          '80%': {
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '1'
          },
        },
        'fade-in-out': {
          '0%': {
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0'
          }
        },
        'fade-in': {
          'from': {
            opacity: '0'
          },
          'to': {
            opacity: '1'
          },
        }
      },
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
    require('daisyui')
  ],
}
