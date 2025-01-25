export default function tailwindConfig() {
  return {
    content: [
      "./screens/**/*.{html,tsx}",
      "./components/**/*.{html,tsx}",
      "./navigation/**/*.{html,tsx}",
      "App.tsx",
      "./assets/fonts/regular.ttf",
      "_layout.tsx",
      "./app/**/*.{html,tsx}",
      "index.tsx",
      "layout.tsx",
    ],
    theme: {
      extend: {
        colors: {
          "wellness-gold": "#F9CF67",
          "wellness-green": "#228565",
          "wellness-purple": "#7345B6",
          "green-40": "#699E58",
          "green-20": "#699E58",
          "border-gray-100": "#F9F9F9",
          "border-gray-200": "#E5E7EB",
          "": "#6B46C1",
        },
        fontFamily: {
          sans: ["regular"],
          "sans-bold": ["SFProText-Bold"],
        },
        spacing: {
          tab: "3.5rem",
          22: "5.5rem",
        },
        margin: {
          tab: "3.5rem",
        },
        lineHeight: {
          5: "1.25rem",
        },
        fontSize: {
          xs: "0.75rem",
        },
        fontWeight: {
          extrabold: "800",
        },
      },
    },
    variants: {},
    plugins: [],
    corePlugins: require("tailwind-rn/unsupported-core-plugins"),
  };
}
