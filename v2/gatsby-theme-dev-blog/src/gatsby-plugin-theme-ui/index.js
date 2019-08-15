import merge from "deepmerge";
import typography from "./typography";
import colors from "./colors";
import styles from "./styles";

export default merge.all([
  { initialColorMode: `light` },
  typography,
  {
    colors,
    fonts: {
      monospace: `"SFMono-Regular", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace`
    },
    sizes: {
      container: typography.typography.rhythm(26)
    },
    styles
  }
]);
