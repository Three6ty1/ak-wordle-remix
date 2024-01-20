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
      },
    },
  },
  daisyui: {
    themes: [{
      "light": {
        ...require("daisyui/src/theming/themes")["light"],
        "base-200": "#edeeee"
      }},
      {'dark': {
        ...require("daisyui/src/theming/themes")["dark"],
        "base-content": "white",
        "neutral-content": "white",
        "primary-content": "white",
        "secondary-content": "white",
        "base-100": "#15191e",
        "base-200": "black",
      }}
    ]
    
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}
