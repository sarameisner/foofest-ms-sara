/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent-color)",
        lightGrey: "var(--light-grey)",
        lightGreyFont: "var(--light-grey-font)",
        fontColor: "var(--font-color)",
      },
      fontFamily: {
        sans: ["Bangla Sangam MN", "sans-serif"],
        serif: ["La Belle Aurore", "serif"],
        display: ["Bangla Sangam MN", "sans-serif"],
      },
    },
  },
  plugins: [],
};
