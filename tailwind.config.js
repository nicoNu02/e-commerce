/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#ff66c4",
        lightPink: "#fae8f3",
      },
      backgroundImage: {
        primary:
          "linear-gradient(to right top, #ff66c4, #ff67bd, #ff69b6, #ff6caf, #ff6ea9, #ff749c, #ff7b91, #ff8388, #ff9379, #ffa86b, #ffbe61, #ffd65f)",
      },
    },
  },
  plugins: [],
};
