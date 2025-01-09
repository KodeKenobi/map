module.exports = {
  content: [
    "./screens/**/*.{html,tsx}",
    "./components/**/*.{html,tsx}",
    "./navigation/**/*.{html,tsx}",
    "App.tsx",
    "./assets/fonts/regular.ttf",
    "_layout.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "wellness-gold": "#F9CF67",
        "wellness-green": "#228565",
        "wellness-purple": "#7345B6",
      },
      fontFamily: {
        sans: ["regular"],
        "sans-bold": ["SFProText-Bold"],
      },
      spacing: {
        tab: "3.5rem", // Add a custom spacing called "tab"
      },
      margin: {
        tab: "3.5rem", // Add a custom margin called "tab"
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
