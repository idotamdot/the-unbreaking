// postcss.config.js – For Vite + Tailwind v3.4+ using @tailwindcss/postcss

import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss').Config} */
export default {
  plugins: [tailwindcss, autoprefixer],
  plugins: [
  require('@tailwindcss/typography'),
],

};
