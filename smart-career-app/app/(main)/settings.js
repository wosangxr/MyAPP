import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { useAuth } from "../../context/authContext";
import { spacing, radius, colors } from "../../theme/colors";
import { checkForAppUpdate } from "../../utils/appUpdate";
import { authenticateUser } from "../../utils/biometric";

export default function Settings() {
  const { lang, setLang, t } = useLang();
  const { isDark, toggleTheme, c } = useTheme();
  const { logout } = useAuth();
  const [pushNotif, setPushNotif] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  const handleBiometricToggle = async (val) => {
    if (val) {
      const result = await authenticateUser();
      if (result.success) setBiometricEnabled(true);
    } else {
      setBiometricEnabled(false);
    }
  };

  const SettingRow = ({ 
    icon, 
    label, 
    value, 
    onPress, 
    rightElement, 
    iconBg, 
    iconColor 
  }) => (
    <TouchableOpacity 
      style={s.settingRow} 
      onPress={onPress} 
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={[s.iconContainer, { backgroundColor: iconBg || c.primaryBg }]}>
        <Feather name={icon} size={18} color={iconColor || c.primary} />
      </View>
      <View style={s.labelContainer}>
        <Text style={[s.settingLabel, { color: c.text }]}>{label}</Text>
        {value && <Text style={[s.settingValueText, { color: c.textMuted }]}>{value}</Text>}
      </View>
      {rightElement ? rightElement : (onPress && <Feather name="chevron-right" size={18} color={c.textMuted} />)}
    </TouchableOpacity>
  );

  const Section = ({ title, children }) => (
    <View style={s.section}>
      <Text style={[s.sectionTitle, { color: c.textMuted }]}>{title}</Text>
      <View style={[s.card, { backgroundColor: c.surface, borderColor: c.border }]}>
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < React.Children.count(children) - 1 && <View style={[s.divider, { backgroundColor: c.border }]} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={[s.container, { backgroundColor: c.background }]}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.header}>
        <Text style={[s.headerTitle, { color: c.text }]}>{t("settings") || "Settings"}</Text>
        <Text style={[s.headerSubtitle, { color: c.textMuted }]}>Customise your experience</Text>
      </View>

      {/* Language Selection */}
      <View style={s.langContainer}>
        <TouchableOpacity
          style={[s.langButton, lang === "en" && { backgroundColor: c.primary, borderColor: c.primary }]}
          onPress={() => setLang("en")}
        >
          <Text style={s.flag}>🇺🇸</Text>
          <Text style={[s.langButtonText, { color: lang === "en" ? "#FFF" : c.text }]}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.langButton, lang === "th" && { backgroundColor: c.primary, borderColor: c.primary }]}
          onPress={() => setLang("th")}
        >
          <Text style={s.flag}>🇹🇭</Text>
          <Text style={[s.langButtonText, { color: lang === "th" ? "#FFF" : c.text }]}>ไทย</Text>
        </TouchableOpacity>
      </View>

      <Section title={t("settings_preferences") || "Preferences"}>
        <SettingRow
          icon="moon"
          label={t("dark_mode") || "Dark Mode"}
          iconBg={isDark ? c.primaryBg : "#F1F5F9"}
          iconColor={isDark ? c.primary : "#475569"}
          rightElement={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: c.border, true: c.primary + "60" }}
              thumbColor={isDark ? c.primary : "#FFF"}
            />
          }
        />
        <SettingRow
          icon="bell"
          label={t("push_notifications") || "Push Notifications"}
          iconBg={c.warningBg}
          iconColor={c.warning}
          rightElement={
            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              trackColor={{ false: c.border, true: c.primary + "40" }}
              thumbColor={pushNotif ? c.primary : "#FFF"}
            />
          }
        />
        <SettingRow
          icon="shield"
          label="Biometric Login"
          iconBg={c.successBg}
          iconColor={c.success}
          rightElement={
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: c.border, true: c.success + "40" }}
              thumbColor={biometricEnabled ? c.success : "#FFF"}
            />
          }
        />
      </Section>

      <Section title="Feedback & Support">
        <SettingRow
          icon="message-circle"
          label="Support & Feedback"
          iconBg={c.accentLight + "40"}
          iconColor={c.accent}
          onPress={() => router.push("/(main)/feedback")}
        />
        <SettingRow
          icon="refresh-cw"
          label="Check for Updates"
          iconBg={c.warningBg}
          iconColor={c.warning}
          onPress={checkForAppUpdate}
        />
      </Section>

      <Section title="Legal & About">
        <SettingRow
          icon="file-text"
          label="Privacy Policy & Terms"
          iconBg={c.errorBg}
          iconColor={c.error}
          onPress={() => router.push("/(main)/privacy-policy")}
        />
        <SettingRow
          icon="info"
          label={t("settings_version") || "Version"}
          value="1.0.2"
          iconBg={c.primaryBg}
          iconColor={c.primary}
        />
      </Section>

      {/* Logout Button */}
      <TouchableOpacity
        id="btn-logout"
        style={[s.logoutBtn, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <View style={s.logoutIconBox}>
          <Feather name="log-out" size={20} color="#EF4444" />
        </View>
        <Text style={s.logoutText}>{t("sign_out") || "Sign Out"}</Text>
        <Feather name="chevron-right" size={18} color="#EF4444" />
      </TouchableOpacity>

      <View style={s.footer}>
        <Text style={[s.footerText, { color: c.textMuted }]}>Smart Career App © 2026</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    marginTop: 4,
  },
  langContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  langButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  langButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  card: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  settingValueText: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.lg + 40 + spacing.md, // Align with label
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  logoutIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: '#EF4444',
    marginLeft: spacing.md,
  },
});
