import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useAuth } from "../../context/authContext";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 2-step registration
  const { t } = useLang();
  const { register } = useAuth();

  const validateStep1 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert(t("error"), t("enter_full_name_alert"));
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert(t("error"), t("valid_email_alert"));
      return false;
    }
    if (phone.length < 9) {
      Alert.alert(t("error"), t("valid_phone_alert"));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (password.length < 6) {
      Alert.alert(t("error"), t("password_min_6"));
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert(t("error"), t("passwords_no_match"));
      return false;
    }
    if (!accept) {
      Alert.alert(t("error"), t("accept_terms"));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleRegister = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const success = await register(email, password, {
        firstName,
        lastName,
        phone,
      });
      setLoading(false);
      if (success) {
        Alert.alert(t("welcome_title"), t("account_created"), [
          { text: t("sign_in"), onPress: () => router.replace("/(main)/dashboard") },
        ]);
      } else {
        Alert.alert(t("error"), "ไม่สามารถสร้างบัญชีได้ กรุณาลองใหม่");
      }
    } catch (err) {
      setLoading(false);
      Alert.alert(t("error"), err.message || "เกิดข้อผิดพลาด");
    }
  };

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", t("weak"), t("good"), t("strong")];
  const strengthColor = ["", colors.error, colors.warning, colors.success];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <Text style={styles.title}>{t("create_account")}</Text>
        <Text style={styles.subtitle}>{t("start_journey")}</Text>

        {/* STEP INDICATOR */}
        <View style={styles.stepRow}>
          <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}>
            <Text style={[styles.stepNum, step >= 1 && styles.stepNumActive]}>1</Text>
          </View>
          <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />
          <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}>
            <Text style={[styles.stepNum, step >= 2 && styles.stepNumActive]}>2</Text>
          </View>
        </View>
        <View style={styles.stepLabelRow}>
          <Text style={[styles.stepLabel, step === 1 && styles.stepLabelActive]}>{t("personal_info_step")}</Text>
          <Text style={[styles.stepLabel, step === 2 && styles.stepLabelActive]}>{t("security")}</Text>
        </View>

        {step === 1 ? (
          <>
            {/* NAME */}
            <View style={styles.row}>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <FontAwesome name="user" size={18} color={colors.textMuted} />
                <TextInput
                  placeholder={t("first_name")}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <FontAwesome name="user" size={18} color={colors.textMuted} />
                <TextInput
                  placeholder={t("last_name")}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            {/* EMAIL */}
            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={20} color={colors.textMuted} />
              <TextInput
                placeholder={t("email_placeholder")}
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* PHONE */}
            <View style={styles.inputBox}>
              <Feather name="phone" size={20} color={colors.textMuted} />
              <TextInput
                placeholder={t("phone_placeholder")}
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
              <Text style={styles.buttonText}>{t("continue_btn")}</Text>
              <Feather name="arrow-right" size={18} color={colors.textWhite} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* PASSWORD */}
            <View style={styles.inputBox}>
              <Feather name="lock" size={20} color={colors.textMuted} />
              <TextInput
                placeholder={t("create_password")}
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

            {/* PASSWORD STRENGTH */}
            {password.length > 0 && (
              <View style={styles.strengthRow}>
                {[1, 2, 3].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.strengthBar,
                      { backgroundColor: passwordStrength >= level ? strengthColor[passwordStrength] : colors.border },
                    ]}
                  />
                ))}
                <Text style={[styles.strengthText, { color: strengthColor[passwordStrength] }]}>
                  {strengthLabel[passwordStrength]}
                </Text>
              </View>
            )}

            {/* CONFIRM PASSWORD */}
            <View style={styles.inputBox}>
              <Feather name="shield" size={20} color={colors.textMuted} />
              <TextInput
                placeholder={t("confirm_password")}
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showConfirm}
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Feather name={showConfirm ? "eye" : "eye-off"} size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Match indicator */}
            {confirmPassword.length > 0 && (
              <View style={styles.matchRow}>
                <Feather
                  name={password === confirmPassword ? "check-circle" : "x-circle"}
                  size={14}
                  color={password === confirmPassword ? colors.success : colors.error}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: password === confirmPassword ? colors.success : colors.error,
                    marginLeft: 4,
                  }}
                >
                  {password === confirmPassword ? t("passwords_match") : t("passwords_no_match")}
                </Text>
              </View>
            )}

            {/* TERMS */}
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setAccept(!accept)} activeOpacity={0.7}>
              <View style={[styles.checkbox, accept && styles.checkboxChecked]}>
                {accept && <Feather name="check" size={14} color={colors.textWhite} />}
              </View>
              <Text style={styles.checkboxText}>
                {t("agree_terms")}<Text style={styles.termsLink}>{t("terms_of_service")}</Text> and{" "}
                <Text style={styles.termsLink}>{t("privacy_policy")}</Text>
              </Text>
            </TouchableOpacity>

            {/* BUTTONS */}
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)} activeOpacity={0.7}>
                <Feather name="arrow-left" size={18} color={colors.primary} />
                <Text style={styles.backBtnText}>{t("back")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1 }]}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textWhite} />
                ) : (
                  <Text style={styles.buttonText}>{t("create_account")}</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* LOGIN LINK */}
        <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginRow}>
          <Text style={styles.link}>
            {t("have_account")}<Text style={styles.linkBold}>{t("sign_in")}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: colors.background,
    paddingTop: 48,
  },
  logo: {
    width: 64,
    height: 64,
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: colors.text,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  stepDotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  stepNum: { fontSize: 13, fontWeight: "700", color: colors.textMuted },
  stepNumActive: { color: colors.textWhite },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  stepLineActive: { backgroundColor: colors.primary },
  stepLabelRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 48,
    marginBottom: spacing.xl,
  },
  stepLabel: { fontSize: 12, color: colors.textMuted },
  stepLabelActive: { color: colors.primary, fontWeight: "600" },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
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
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  strengthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: spacing.md,
    marginTop: -6,
    paddingHorizontal: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: { fontSize: 11, fontWeight: "600", marginLeft: 6 },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginBottom: spacing.md,
    paddingHorizontal: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    color: colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },
  termsLink: { color: colors.primary, fontWeight: "600" },
  btnRow: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  backBtnText: { color: colors.primary, fontWeight: "600", fontSize: 14 },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    ...shadow.md,
  },
  buttonText: {
    color: colors.textWhite,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  loginRow: { marginTop: spacing.xl, alignItems: "center" },
  link: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  linkBold: { fontWeight: "700", color: colors.primary },
});
