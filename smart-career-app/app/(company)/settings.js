import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";

export default function CompanySettingsScreen() {
  const { lang, setLang, t } = useLang();
  const { c, isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      t("sign_out"),
      t("onboard_choice_employer") + "?",
      [
        { text: t("cancel"), style: "cancel" },
        { text: t("sign_out"), style: "destructive", onPress: () => router.replace("/(auth)/onboarding") }
      ]
    );
  };

  const toggleLang = () => {
      setLang(lang === 'th' ? 'en' : 'th');
  };

  return (
    <ScrollView style={[s.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={[s.title, { color: c.text }]}>{t("settings")}</Text>
        <Text style={[s.subtitle, { color: c.textMuted }]}>App configurations & security</Text>
      </View>

      <View style={[s.card, { backgroundColor: c.surface, borderColor: c.border }]}>
          <TouchableOpacity style={s.menuItem} onPress={() => router.push('/(company)/profile')}>
              <Feather name="briefcase" size={20} color={c.text} />
              <View style={{ flex: 1 }}>
                <Text style={[s.menuText, { color: c.text }]}>Company Profile & Branding</Text>
              </View>
              <Feather name="chevron-right" size={20} color={c.textMuted} />
          </TouchableOpacity>
          <View style={[s.divider, { backgroundColor: c.border }]} />
          
          <TouchableOpacity style={s.menuItem} onPress={toggleLang}>
              <Feather name="globe" size={20} color={c.text} />
              <View style={{ flex: 1 }}>
                <Text style={[s.menuText, { color: c.text }]}>{t("language")}</Text>
              </View>
              <Text style={{ color: '#10B981', fontWeight: '800' }}>{lang === 'th' ? 'ไทย' : 'EN'}</Text>
          </TouchableOpacity>
          <View style={[s.divider, { backgroundColor: c.border }]} />
          
          <TouchableOpacity style={s.menuItem} onPress={toggleTheme}>
              <Feather name={isDark ? "sun" : "moon"} size={20} color={c.text} />
              <View style={{ flex: 1 }}>
                <Text style={[s.menuText, { color: c.text }]}>Dark Mode</Text>
              </View>
              <Text style={{ color: isDark ? '#10B981' : c.textMuted, fontWeight: '800' }}>{isDark ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
          <View style={[s.divider, { backgroundColor: c.border }]} />
          
          <TouchableOpacity style={s.menuItem} onPress={() => {}}>
              <Feather name="shield" size={20} color={c.text} />
              <Text style={[s.menuText, { color: c.text }]}>{t("security")}</Text>
          </TouchableOpacity>
          <View style={[s.divider, { backgroundColor: c.border }]} />
          
          <TouchableOpacity style={s.menuItem} onPress={handleLogout}>
              <Feather name="log-out" size={20} color={colors.error} />
              <Text style={[s.menuText, { color: colors.error }]}>{t("sign_out")}</Text>
          </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.lg, marginTop: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  
  card: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    ...shadow.sm,
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 14,
  },
  menuText: { fontSize: 15, fontWeight: '600' },
  divider: { height: 1, width: '100%' },
});
