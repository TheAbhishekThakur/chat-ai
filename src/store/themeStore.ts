import { create } from "zustand";

// Define a type for theme modes (light or dark)
export type Theme = "light" | "dark";

// Define the state and actions for managing the theme
type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Create a Zustand store to manage the theme state
export const useThemeStore = create<ThemeState>((set) => ({
  // Initialize theme from localStorage or default to "light"
  theme: (localStorage.getItem("theme") as Theme) || "light",
  setTheme: (theme: Theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
