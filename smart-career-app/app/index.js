import { View, Image, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { logEvent } from "../utils/analytics";
import { registerForPushNotificationsAsync } from "../utils/notifications";
import { router } from "expo-router";
import { useLang } from "../context/languageContext";

export default function Splash() {
  const { t } = useLang();

  useEffect(() => {
    registerForPushNotificationsAsync();
    logEvent("app_open");
    setTimeout(() => {
      router.replace("/(auth)/onboarding");
    }, 2000);
  }, []);

  return (
    <View style={s.container}>
      <Image
        source={require("../assets/logo.png")}
        style={s.logo}
      />
      <Text style={s.title}>{t("smart_career")}</Text>
      <Text style={s.subtitle}>{t("find_dream_job")}</Text>
      <View style={s.loaderContainer}>
        <View style={s.loaderDot} />
        <View style={[s.loaderDot, { opacity: 0.6 }]} />
        <View style={[s.loaderDot, { opacity: 0.3 }]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },
  logo: { width: 120, height: 120, marginBottom: 16 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: "#94A3B8",
    marginTop: 6,
  },
  loaderContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 40,
  },
  loaderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#818CF8",
  },
});
