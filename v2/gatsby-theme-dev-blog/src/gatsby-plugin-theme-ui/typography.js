import { toTheme } from "@theme-ui/typography";

let theme = {
  baseFontSize: 16,
  baseLineHeight: 1.45,
  scaleRatio: 2,
  googleFonts: [],
  headerFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif"
  ],
  bodyFontFamily: ["georgia", "serif"],
  headerWeight: "bold",
  bodyWeight: "normal",
  boldWeight: "bold",
  blockMarginBottom: 0.85
};

export default toTheme(theme);
