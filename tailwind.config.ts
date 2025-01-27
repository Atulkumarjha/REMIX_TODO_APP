import type { Config } from "tailwindcss";
 
export default {
  darkMode: "selector",
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        system: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
          "Apple Color Emoji",
          "Twemoji Mozilla",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
          "EmojiOne Color",
          "Android Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;