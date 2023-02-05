/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "sky-800": "#075985",
        "sky-900": "#0c4a6e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
