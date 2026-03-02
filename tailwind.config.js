/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
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