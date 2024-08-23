/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryl: "#496989",
        secondary: "#36454F",
        textColor: "#1A1A1A",
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        secondary: ["Poppins", "sans-serif"],
      },
    },
    plugins: [],
  },
};
