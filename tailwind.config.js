/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
          "gradient-background": "var(--gradient-background)", // Bruger din CSS-variabel
        },
        backgroundImage: {
          "gradient-background": "linear-gradient(180deg, #2B2B2B 13.5%, #881523 47.5%, #2B2B2B 84.5%);",
          'gradingBG': 'linear-gradient(180deg, #000 0%, #2B2B2B 31%)',
        },
        gradingBG: "linear-gradient(180deg, #000 25%, #2B2B2B 100%);",
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
  plugins: [],
};
