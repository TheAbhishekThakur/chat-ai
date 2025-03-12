import React, { FC, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeStore } from "../store/themeStore";

const Theme: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();

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
