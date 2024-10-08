/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      'trans-white': 'rgba(255, 255, 255, 0.7)',
      'border-form-input': '#E0E0E0',
    }),

    screens: {
      'xs': '360px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px'
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
      'mono': ['Roboto Mono', 'monospace'],
      'inter': ['Inter', 'sans-serif'],
      'inter-title': ['Inter-Title', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

