/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "kwani-logo": "#4A5568", // adjust this color as needed
        red: {
          500: "#f56565", // Example color
          // Add other shades if needed
        },
      },
    },
  },
  plugins: [],
};
