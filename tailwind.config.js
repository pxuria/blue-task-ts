/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: "#4e91e6",
        secondary: "#2073df",
        muted: "#737789",
        grey: "#333",
      },
    },
  },
  plugins: [],
};
