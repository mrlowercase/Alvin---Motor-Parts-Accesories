/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './src/**/*.{css,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pink:           '#E8185A',
        teal:           '#00B4C8',
        dark:           '#0D0D0D',
        surface:        '#1A1A1A',
        'border-dark':  '#2E2E2E',
        'text-light':   '#F0F0F0',
        muted:          '#8A8A8A',
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        accent:  ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
