/** @type {import('tailwindcss').Config} */
export default {
  purge: [],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
      },
    }
  },
  plugins: []
};