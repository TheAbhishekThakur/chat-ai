import React, { FC, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "../store/themeStore";

/**
 * Theme Component
 *
 * This component is responsible for applying the Material UI theme based on the user's selected mode (light/dark).
 * It provides a global theme to all components wrapped inside it.
 */
const Theme: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();

  /**
   * useMemo Hook: Creates a Material UI theme configuration dynamically.
   * This ensures that the theme object is only recalculated when the theme mode changes.
   */
  const themeData = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: { main: "#fff" },
          background: {
            default: theme === "light" ? "#ffffff" : "#202327",
            paper: theme === "light" ? "#f5f5f5" : "#131415",
          },
          text: {
            primary: theme === "light" ? "#000" : "#fff",
          },
        },
      }),
    [theme]
  );

  return (
    <ThemeProvider theme={themeData}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
