/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blueLight: 'hsl(206, 40%, 50%)',
        blueDark: 'hsl(211, 28%, 29%)',
        greenTrustPilot: 'hsl(150, 48%, 48%)'
      }, 
      fontFamily: {
        sans: ['Lato', 'sans-serif']
      },
      spacing: {
        180: '32rem'
      },
      backgroundImage: {
        'hero': "url('assets/homepage-bg-5-combo.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ],
}
