/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bangla Sangam MN", "sans-serif"],
        serif: ["La Belle Aurore", "serif"],
        display: ["Bangla Sangam MN", "sans-serif"],
      },
    },
  },
  plugins: [],
};
