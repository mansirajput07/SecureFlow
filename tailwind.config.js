/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 This is critical
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}