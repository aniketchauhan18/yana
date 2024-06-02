/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        grid: "grid 15s linear infinite",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        mukta: ["Mukta", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "chakra-petch": ['"Chakra Petch"', "sans-serif"],
      },
      fontWeight: {
        "extra-light": 200,
        light: 300,
        normal: 400,
        medium: 500,
        "semi-bold": 600,
        bold: 700,
        "extra-bold": 800,
        black: 900,
      },
      fontSize: {
        "9xl": "72px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}