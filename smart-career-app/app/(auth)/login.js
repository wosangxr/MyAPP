import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { MaterialIcons, Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { useLang } from "../../context/languageContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";

export default function Login() {
  const { login, socialLogin, authLoading } = useAuth();
  const { t } = useLang();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError(t("enter_email_password"));
      return;
    }
    const success = await login(email, password);
    if (success) {
      router.replace("/(main)/dashboard");
    } else {
      setError(t("invalid_email_password"));
    }
  };

  const handleSocialLogin = async (provider) => {
    setError("");
    const ok = await socialLogin(provider);
    if (ok) router.replace("/(main)/dashboard");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.backgroundContainer}>
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerSection}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>{t("welcome_back")}</Text>
          <Text style={styles.subtitle}>{t("sign_in_subtitle")}</Text>
        </View>

        {/* SOCIAL LOGIN ICONS SECTION - MOVED UP TO SHOW "MANY WAYS" */}
        <Text style={styles.sectionLabel}>{t("or_continue_with")}</Text>
        <View style={styles.socialRow}>
          {/* Google */}
          <TouchableOpacity
            style={[styles.socialIconBtn, { backgroundColor: "#FFFFFF" }]}
            activeOpacity={0.7}
            onPress={() => handleSocialLogin("Google")}
            disabled={authLoading}
          >
            <AntDesign name="google" size={26} color="#4285F4" />
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            style={[styles.socialIconBtn, { backgroundColor: "#1877F2" }]}
            activeOpacity={0.7}
            onPress={() => handleSocialLogin("Facebook")}
            disabled={authLoading}
          >
            <FontAwesome5 name="facebook-f" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* GitHub */}
          <TouchableOpacity
            style={[styles.socialIconBtn, { backgroundColor: "#333" }]}
            activeOpacity={0.7}
            onPress={() => handleSocialLogin("GitHub")}
            disabled={authLoading}
          >
            <AntDesign name="github" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>{t("email_placeholder")}</Text>
          <View style={styles.divider} />
        </View>

        {/* EMAIL FORM */}
        <View style={styles.formContainer}>
          <View style={styles.inputBox}>
            <MaterialIcons name="email" size={20} color={colors.textMuted} />
            <TextInput
              placeholder={t("email_placeholder")}
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <Feather name="lock" size={20} color={colors.textMuted} />
            <TextInput
              placeholder={t("password_placeholder")}
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>{t("forgot_password")}</Text>
          </TouchableOpacity>

          {error ? (
            <View style={styles.errorBox}>
              <Feather name="alert-circle" size={16} color={colors.error} />
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={authLoading} activeOpacity={0.8}>
            {authLoading ? (
              <ActivityIndicator color={colors.textWhite} />
            ) : (
              <Text style={styles.buttonText}>{t("sign_in")}</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")} style={styles.registerRow}>
          <Text style={styles.link}>
            {t("no_account")}<Text style={styles.linkBold}>{t("register")}</Text>
          </Text>
        </TouchableOpacity>

        {/* DEMO BUTTON */}
        <TouchableOpacity
          style={styles.demoBtn}
          activeOpacity={0.8}
          onPress={async () => {
            const success = await login("test@smart.com", "123456");
            if (success) router.replace("/(main)/dashboard");
          }}
          disabled={authLoading}
        >
          <Feather name="play-circle" size={18} color={colors.primary} />
          <Text style={styles.demoBtnText}>{t("try_demo")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: colors.primary,
    top: -50,
    left: -50,
  },
  orb2: {
    width: 250,
    height: 250,
    backgroundColor: colors.accent,
    bottom: -50,
    right: -50,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerSection: {
    marginBottom: spacing.xl,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: spacing.xl,
  },
  socialIconBtn: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
    gap: spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 2,
    borderRadius: radius.lg,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    ...shadow.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  forgotRow: {
    alignSelf: "flex-end",
    marginBottom: spacing.lg,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.errorBg,
    padding: spacing.md,
    borderRadius: radius.sm,
    marginBottom: spacing.md,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: radius.md,
    ...shadow.md,
  },
  buttonText: {
    color: colors.textWhite,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  registerRow: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  link: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  linkBold: {
    fontWeight: "700",
    color: colors.primary,
  },
  demoBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: spacing.lg,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary + "40",
    backgroundColor: "transparent",
  },
  demoBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});

