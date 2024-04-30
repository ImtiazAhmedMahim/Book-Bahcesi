/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./main/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
