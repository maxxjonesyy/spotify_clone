/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1ED760",
        spotifyBlack: "#0A0A0A",
        spotifyGrey: "#2A2828",
      },
    },
  },
  plugins: [],
};
