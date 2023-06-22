import { alpha } from "@mui/material/styles";
import typography from "./typography";
import shadows from "./shadows";
import colorToken from "./palette";

// mui theme settings
const themeSettings = (mode) => {
  return {
    palette: {
      common: { black: "#000", white: "#fff" },
      mode: mode,
      primary: colorToken.PRIMARY,
      secondary: colorToken.SECONDARY,
      info: colorToken.INFO,
      success: colorToken.SUCCESS,
      warning: colorToken.WARNING,
      error: colorToken.ERROR,
      grey: colorToken.GREY,
      divider: alpha(colorToken.GREY[500], 0.24),
      ...(mode === "dark"
        ? {
            text: {
              primary: colorToken.GREY[100],
              secondary: colorToken.GREY[300],
              disabled: colorToken.GREY[500],
            },
          }
        : {
            text: {
              primary: colorToken.GREY[800],
              secondary: colorToken.GREY[600],
              disabled: colorToken.GREY[500],
            },
          }),

      ...(mode === "dark"
        ? {
            background: {
              paper: colorToken.GREY[900],
              default: colorToken.GREY[900],
              neutral: colorToken.GREY[700],
            },
          }
        : {
            background: {
              paper: "#fff",
              default: colorToken.GREY[100],
              neutral: colorToken.GREY[200],
            },
          }),

      ...(mode === "dark"
        ? {
            action: {
              active: "#CCCCCC",
              hover: alpha("#AAAAAA", 0.08),
              selected: alpha("#AAAAAA", 0.16),
              disabled: alpha("#AAAAAA", 0.8),
              disabledBackground: alpha("#AAAAAA", 0.24),
              focus: alpha("#AAAAAA", 0.24),
              hoverOpacity: 0.08,
              disabledOpacity: 0.48,
            },
          }
        : {
            action: {
              active: colorToken.GREY[600],
              hover: alpha(colorToken.GREY[500], 0.08),
              selected: alpha(colorToken.GREY[500], 0.16),
              disabled: alpha(colorToken.GREY[500], 0.8),
              disabledBackground: alpha(colorToken.GREY[500], 0.24),
              focus: alpha(colorToken.GREY[500], 0.24),
              hoverOpacity: 0.08,
              disabledOpacity: 0.48,
            },
          }),
    },
    shape: { borderRadius: 4 },
    typography,
    shadows: shadows(),
  };
};
export default themeSettings;
