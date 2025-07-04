module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if needed
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // ← this line
  ],
}
