// src/constants/THEME.js

import COLORS from "./COLORS";
import FONTS from "./FONTS";
import SPACING from "./SPACING";

const lightTheme = {
  mode: "light",
  colors: COLORS.LIGHT_COLORS,
  fonts: FONTS,
  spacing: SPACING,
  radius: {
    XXS: 3,
    XS: 4,
    SM: 8,
    MD: 12,
    LG: 20,
    FULL: 999, // for pills, circles
  },
};

const darkTheme = {
  mode: "dark",
  colors: COLORS.DARK_COLORS,
  fonts: FONTS,
  spacing: SPACING,
  radius: lightTheme.radius, // same radius for both themes
};

export { lightTheme, darkTheme };
