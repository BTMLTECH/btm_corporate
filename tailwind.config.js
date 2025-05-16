/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
      },
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ]
};