/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React components ke liye
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",   // custom blue
        secondary: "#A95E30", // custom orange
        dark: "#111827",      // custom dark gray
      },
    },
  },
  plugins: [],
};
