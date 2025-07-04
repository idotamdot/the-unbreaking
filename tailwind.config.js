// tailwind.config.js

// tailwind.config.js – Ritual Configuration for Sigilographic Digitalis
// This file configures Tailwind CSS for the Sigilographic Digitalis project, defining custom

const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.md',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        neon: '#00FFFF',
        purple: '#B026FF',
        emerald: '#50C878',
        sigilwhite: '#FAFAFA',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.sigilwhite'),
            a: { color: theme('colors.neon') },
            h1: { color: theme('colors.emerald') },
            h2: { color: theme('colors.purple') },
            strong: { color: theme('colors.purple') },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
