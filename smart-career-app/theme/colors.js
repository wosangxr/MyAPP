export const colors = {
  // Primary palette
  primary: "#4F46E5",
  primaryLight: "#818CF8",
  primaryDark: "#3730A3",
  primaryBg: "#EEF2FF",

  // Secondary / accent
  accent: "#06B6D4",
  accentLight: "#67E8F9",

  // Success / Warning / Error
  success: "#10B981",
  successBg: "#ECFDF5",
  warning: "#F59E0B",
  warningBg: "#FFFBEB",
  error: "#EF4444",
  errorBg: "#FEF2F2",

  // Backgrounds
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F5F9",
  dark: "#0F172A",
  darkCard: "#1E293B",

  // Text
  text: "#0F172A",
  textSecondary: "#64748B",
  textMuted: "#94A3B8",
  textWhite: "#FFFFFF",
  textLink: "#4F46E5",

  // Borders
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  divider: "#E2E8F0",

  // Misc
  overlay: "rgba(15, 23, 42, 0.5)",
  shadow: "#0F172A",
  star: "#FBBF24",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadow = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};
