/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Be Vietnam Pro", "sans-serif"],
        serif: ["La Belle Aurore", "serif"],
        display: ["Bangla Sangam MN", "sans-serif"],
      },
    },
  },
  plugins: [],
};
