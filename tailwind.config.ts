import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#C9943A',
        secondary: '#8B4513',
        tertiary:  '#4A7C59',
        neutral:   '#F5EFE6',
        dark:      '#1C1A17',
      },
      fontFamily: {
        serif: ['Noto Serif', 'serif'],
        sans:  ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config