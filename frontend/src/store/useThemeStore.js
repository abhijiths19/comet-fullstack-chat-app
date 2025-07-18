import { create } from "zustand";

export const useThemeStore = create((set) => {
  // Initialize theme from localStorage or default to "light"
  const initialTheme = localStorage.getItem("chat-theme") || "light";
  console.log("Initial theme:", initialTheme); // Log initial theme
  return {
    theme: initialTheme,
    setTheme: (theme) => {
      console.log("Setting theme to:", theme); // Debug log
      localStorage.setItem("chat-theme", theme);
      set({ theme });
    },
  };
});