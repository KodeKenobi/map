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
        "green-40": "#699E58",
        "green-20": "#699E58",
        "border-grey-2": "#C0C0C0",
        "grey-text-2": "#B1B1B1",
        "grey-hover": "#C0C0C0",
        white: "#FFFFFF",
        "w3-purple": "#7345B6",
        "w3-gold-1": "#F9CF67",
        "w3-green-grad-1": "#76B8A2",
        "w3-text": "#141414",
        "w3-green-primary": "#228565",
        "w3-green-grad-2": "#76B8A2",
      },
      fontFamily: {
        sans: ["regular"],
        "sans-bold": ["SFProText-Bold"],
      },
      spacing: {
        tab: "3.5rem",
      },
      margin: {
        tab: "3.5rem",
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
