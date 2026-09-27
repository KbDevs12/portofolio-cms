/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,html}"],
  theme: {
    extend: {
      colors: {
        ink: "#12151A",
        panel: "#1A1E24",
        paper: "#ECE7DC",
        accent: "#C08A3E",
      },
      fontFamily: {
        serif: ["Newsreader", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
