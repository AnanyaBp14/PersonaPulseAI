/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
      },

      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        elevated: "0 8px 24px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl2: "1rem",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      container: {
        center: true,
        padding: "1.5rem",
      },
    },
  },

  plugins: [],
};