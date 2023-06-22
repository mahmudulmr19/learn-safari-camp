import React, { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import GlobalStyles from "./globalStyles";
import {
  StyledEngineProvider,
  ThemeProvider as ThemeProviders,
  createTheme,
} from "@mui/material/styles";
import { useMode } from "@/hooks";
import themeSettings from "./themes";

const ThemeProvider = ({ children }) => {
  const { mode } = useMode();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProviders theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProviders>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
