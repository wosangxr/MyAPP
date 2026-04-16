import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      document.body.style.background = "#121212";
      document.body.style.color = "#FFFFFF";
      root.style.setProperty("--bg-primary", "#121212");
      root.style.setProperty("--bg-surface", "#312D4B");
      root.style.setProperty("--text-primary", "#FFFFFF");
      root.style.setProperty("--text-secondary", "#a0aec0");
      root.style.setProperty("--border-color", "rgba(115, 103, 240, 0.2)");
    } else {
      document.body.style.background = "#F8F8F9";
      document.body.style.color = "#3A3541";
      root.style.setProperty("--bg-primary", "#F8F8F9");
      root.style.setProperty("--bg-surface", "#FFFFFF");
      root.style.setProperty("--text-primary", "#3A3541");
      root.style.setProperty("--text-secondary", "#89868D");
      root.style.setProperty("--border-color", "rgba(115, 103, 240, 0.1)");
    }
    
    root.style.setProperty("--color-primary", "#7367F0");
    root.style.setProperty("--color-success", "#10B981");
    root.style.setProperty("--color-warning", "#F59E0B");
    root.style.setProperty("--color-danger", "#EF4444");
    root.style.setProperty("--bg-card-hover", isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}