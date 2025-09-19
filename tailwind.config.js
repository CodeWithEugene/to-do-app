/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#F5F2E9',
        'ink': '#2C3E50',
        'sage': '#7C9082',
        'terracotta': '#C17C74',
        'slate-blue': '#7C93C3',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
