const purple = `rgb(102, 51, 153)`
const white = `#fff`
const red = `#f33`
const grey90 = `#232129`
const lightGrey = `hsla(0, 0%, 0%, 0.2)`
const black80 = `#1B1F23`
const transparentLightYellow = `rgba(255, 229, 100, 0.2)`
const lightWhite = `rgba(255, 255, 255, 0.86)`
const transparentLightWhite = `hsla(0, 0%, 100%, 0.2)`
// const purple60 = `#663399`

export default {
  text: grey90,
  background: white,
  primary: red,
  secondary: black80,
  muted: lightGrey,
  highlight: transparentLightYellow,
  heading: grey90,
  modes: {
    dark: {
      text: lightWhite,
      background: purple,
      primary: lightWhite,
      secondary: lightWhite,
      muted: transparentLightWhite,
      highlight: transparentLightWhite,
      heading: white,
    },
  },
}
