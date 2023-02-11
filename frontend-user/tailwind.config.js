/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyanLight: 'hsl(166, 80%, 63%)',
        blueLight: 'hsl(205, 95%, 57%)',
        blueDark: 'hsl(201, 61%, 39%)'
      }, 
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      spacing: {
        180: '32rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ],
}
