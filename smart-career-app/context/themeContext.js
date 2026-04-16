import { createContext, useContext, useState } from "react";

const lightColors = {
  primary: "#4F46E5",
  primaryLight: "#818CF8",
  primaryDark: "#3730A3",
  primaryBg: "#EEF2FF",
  accent: "#06B6D4",
  accentLight: "#67E8F9",
  success: "#10B981",
  successBg: "#ECFDF5",
  warning: "#F59E0B",
  warningBg: "#FFFBEB",
  error: "#EF4444",
  errorBg: "#FEF2F2",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9",
  dark: "#0F172A",
  darkCard: "#1E293B",
  text: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  textWhite: "#FFFFFF",
  textLink: "#4F46E5",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  divider: "#E2E8F0",
  overlay: "rgba(15, 23, 42, 0.5)",
  shadow: "#0F172A",
  star: "#FBBF24",
};

const darkColors = {
  primary: "#818CF8",
  primaryLight: "#A5B4FC",
  primaryDark: "#4F46E5",
  primaryBg: "#1E1B4B",
  accent: "#22D3EE",
  accentLight: "#67E8F9",
  success: "#34D399",
  successBg: "#064E3B",
  warning: "#FBBF24",
  warningBg: "#78350F",
  error: "#F87171",
  errorBg: "#7F1D1D",
  background: "#0F172A",
  surface: "#1E293B",
  surfaceAlt: "#334155",
  dark: "#0F172A",
  darkCard: "#1E293B",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  textWhite: "#FFFFFF",
  textLink: "#818CF8",
  border: "#334155",
  borderLight: "#1E293B",
  divider: "#334155",
  overlay: "rgba(0, 0, 0, 0.6)",
  shadow: "#000000",
  star: "#FBBF24",
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));
  const isDark = mode === "dark";
  const c = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ mode, isDark, toggleTheme, setMode, c }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
