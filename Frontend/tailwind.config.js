// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this according to your project's structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
