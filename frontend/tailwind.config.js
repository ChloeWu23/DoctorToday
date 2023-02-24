/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`${srcDir}/components/**/*.{vue,js,ts}`,
  `${srcDir}/layouts/**/*.vue`,
  `${srcDir}/pages/**/*.vue`,
  // `${srcDir}/composables/**/*.{js,ts}`,
  // `${srcDir}/plugins/**/*.{js,ts}`,
  `${srcDir}/App.{js,ts,vue}`,
  `${srcDir}/app.{js,ts,vue}`,
  `${srcDir}/Error.{js,ts,vue}`,
  `${srcDir}/error.{js,ts,vue}`],
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
  }
}
