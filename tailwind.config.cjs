/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1ED760",
        spotifyBlack: "#191414",
        spotifyGrey: "#212121",
      },
    },
  },
  plugins: [],
};
