import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  //darkMode:'class',
  content: [`./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    // `./composables/**/*.{js,ts}`,
    // `./plugins/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`],
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
        'hero': "url('assets/logo-bg.png')",
      }
    },
  }
}


