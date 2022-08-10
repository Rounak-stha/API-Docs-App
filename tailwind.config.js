/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark': '#121415',
      'callout': '#222325',
      'highlight': '#0040c0',
      'highlight-light': '#0959c9',
      'bdr-clr': '#262a2d',
      'btn-bg': '#0040c0',
      'btn-bdr': '#0040cf',
      ...colors
    }
  },
  plugins: [],
}
