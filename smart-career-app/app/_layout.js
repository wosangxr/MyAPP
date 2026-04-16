import { Stack } from "expo-router";
import { LanguageProvider } from "../context/languageContext";
import { AuthProvider } from "../context/authContext";
import { ThemeProvider } from "../context/themeContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
