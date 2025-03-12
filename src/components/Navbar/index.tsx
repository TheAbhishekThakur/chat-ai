// Importing necessary UI components from Material UI
import { AppBar, Box, Toolbar, Container } from "@mui/material";

// Importing icons for theme toggle and navigation controls
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

// Importing theme state management from Zustand store
import { Theme, useThemeStore } from "../../store/themeStore";
import NavbarContainer from "./style"; // Styled container for Navbar

// Styles for theme toggle icons (inactive state)
const leftIconsStyle = {
  display: { xs: "none", md: "flex" },
  mr: 1,
  cursor: "pointer",
};

// Styles for the active theme icon (highlighted)
const leftIconsActiveStyle = {
  display: { xs: "none", md: "flex" },
  mr: 1,
  cursor: "pointer",
  background: "#c49cea",
  padding: "4px",
  borderRadius: "10px",
};

/**
 * Navbar Component
 *
 * This component represents the top navigation bar, which includes:
 * - Theme toggle buttons (light & dark mode).
 * - A menu button (for mobile).
 * - Settings and profile icons.
 */

const Navbar: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = (value: Theme): void => {
    setTheme(value);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarContainer>
            <Box className="icon-section">
              <WbSunnyIcon
                onClick={() => toggleTheme("light")}
                sx={theme === "light" ? leftIconsActiveStyle : leftIconsStyle}
              />
              <BedtimeIcon
                onClick={() => toggleTheme("dark")}
                sx={theme === "dark" ? leftIconsActiveStyle : leftIconsStyle}
              />
            </Box>
            <Box className="icon-section">
              <MenuIcon
                sx={{
                  display: { xs: "flex" },
                  justifyContent: { xs: "start" },
                }}
              />
              <SettingsIcon sx={{ display: { xs: "none", md: "flex" } }} />
              <AccountCircleRoundedIcon
                sx={{ display: { xs: "none", md: "flex" } }}
              />
            </Box>
          </NavbarContainer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
