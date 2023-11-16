/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        bm__card: "#F2F1ED",
        bm__layout: "#F6F7FF",
        bm__faint__text: "#6F797A",
        bm__beige: "#D7D8DA",
        bm_black: "#252525",
        bm_card_grey: "#f3f3f3",
        bm__btn__grey: "#93979D",
        bm_card__orange: "#FF8B00",
        bm__red: "#FF0000",
        bm__ox__red: "#800000",
        bm__niv: "#00AB26",
        bm__grey__text: "#666666",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
