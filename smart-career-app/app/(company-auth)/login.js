import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";

export default function EmployerLogin() {
  const { t } = useLang();
  const { c } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError(t("enter_email_password"));
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(company)/dashboard");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: c.background }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.replace("/(auth)/onboarding")} style={[styles.backBtn, { borderColor: c.border }]}>
                <Feather name="arrow-left" size={20} color={c.text} />
            </TouchableOpacity>
        </View>

        <View style={styles.brandContainer}>
            <View style={[styles.iconBox, { backgroundColor: '#10B981' }]}>
                <Feather name="briefcase" size={32} color="#fff" />
            </View>
            <View style={[styles.badge, { backgroundColor: '#10B98115', borderColor: '#10B98130' }]}>
                <Text style={styles.badgeText}>{t("comp_login_title")}</Text>
            </View>
            <Text style={[styles.title, { color: c.text }]}>{t("comp_welcome")}</Text>
            <Text style={[styles.subtitle, { color: c.textMuted }]}>{t("comp_login_sub")}</Text>
        </View>

        <View style={styles.form}>
            <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: c.text }]}>{t("email")}</Text>
                <View style={[styles.inputBox, { backgroundColor: c.surface, borderColor: c.border }]}>
                    <Feather name="mail" size={18} color={c.textMuted} />
                    <TextInput
                        placeholder={t("email")}
                        placeholderTextColor={c.textMuted}
                        style={[styles.input, { color: c.text }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: c.text }]}>{t("password")}</Text>
                <View style={[styles.inputBox, { backgroundColor: c.surface, borderColor: c.border }]}>
                    <Feather name="lock" size={18} color={c.textMuted} />
                    <TextInput
                        placeholder={t("password")}
                        placeholderTextColor={c.textMuted}
                        secureTextEntry={!showPassword}
                        style={[styles.input, { color: c.text }]}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? "eye" : "eye-off"} size={18} color={c.textMuted} />
                    </TouchableOpacity>
                </View>
            </View>

            {error ? (
                <View style={[styles.errorBox, { backgroundColor: colors.error + '10' }]}>
                    <Feather name="alert-circle" size={16} color={colors.error} />
                    <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
                </View>
            ) : null}

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: "#10B981" }]} 
                onPress={handleLogin} 
                disabled={loading} 
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>{t("comp_login_btn")}</Text>
                )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
                <View style={[styles.divider, { backgroundColor: c.border }]} />
                <Text style={[styles.dividerText, { color: c.textMuted }]}>{t("auth_divider") || "or login with"}</Text>
                <View style={[styles.divider, { backgroundColor: c.border }]} />
            </View>

            <View style={styles.socialRow}>
                <TouchableOpacity style={[styles.socialBtn, { backgroundColor: c.surface, borderColor: c.border }]}>
                    <AntDesign name="google" size={20} color="#EA4335" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialBtn, { backgroundColor: c.surface, borderColor: c.border }]}>
                    <FontAwesome5 name="linkedin" size={20} color="#0A66C2" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.footerLink} onPress={() => {}}>
                <Text style={[styles.footerText, { color: c.textMuted }]}>
                    {t("new_company")}<Text style={{ color: "#10B981", fontWeight: "800" }}>{t("onboard_choice_employer")}</Text>
                </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  header: { marginTop: 40, marginBottom: 20 },
  backBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  brandContainer: { alignItems: 'center', marginBottom: 40 },
  iconBox: {
      width: 64,
      height: 64,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      ...shadow.md,
  },
  badge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: radius.full,
      borderWidth: 1,
      marginBottom: 12
  },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#10B981', textTransform: 'uppercase' },
  title: { fontSize: 26, fontWeight: "800", textAlign: 'center' },
  subtitle: { fontSize: 14, marginTop: 8, textAlign: 'center', paddingHorizontal: 20 },

  form: { gap: 16 },
  inputGroup: { gap: 8 },
  label: { fontSize: 13, fontWeight: '700' },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: 54,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: { flex: 1, fontSize: 15 },
  errorBox: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, borderRadius: radius.md },
  error: { fontSize: 13, fontWeight: "600" },
  button: { height: 54, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', marginTop: 10, ...shadow.md },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 10, gap: 12 },
  divider: { flex: 1, height: 1 },
  dividerText: { fontSize: 12 },
  socialRow: { flexDirection: "row", gap: 12, justifyContent: 'center' },
  socialBtn: { width: 60, height: 50, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },

  footerLink: { marginTop: 20, alignItems: "center" },
  footerText: { fontSize: 14, fontWeight: '600' },
});
