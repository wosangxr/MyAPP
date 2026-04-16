import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { useProfileStore } from "../../store/useProfileStore";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { companyService } from "../../services/companyService";

export default function Apply() {
  const profile = useProfileStore();
  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLang();
  const { c } = useTheme();

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert(t("required"), t("fill_name_email"));
      return;
    }
    if (!email.includes("@")) {
      Alert.alert(t("invalid"), t("valid_email"));
      return;
    }
    
    // Pass application to the shared mock database so HR can see it
    await companyService.applyToJob("1", { name: fullName, email: email, title: profile.title });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={s.successContainer}>
        <View style={s.successIcon}>
          <Feather name="check-circle" size={64} color={colors.success} />
        </View>
        <Text style={s.successTitle}>{t("application_submitted")}</Text>
        <Text style={s.successText}>
          Your application for Frontend Developer at TechCorp has been sent successfully. You'll receive a confirmation email shortly.
        </Text>
        <View style={s.successStats}>
          <View style={s.successStat}>
            <Text style={s.successStatNum}>92%</Text>
            <Text style={s.successStatLabel}>{t("match_score")}</Text>
          </View>
          <View style={s.successStatDivider} />
          <View style={s.successStat}>
            <Text style={s.successStatNum}>3-5</Text>
            <Text style={s.successStatLabel}>{t("review_days")}</Text>
          </View>
        </View>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backBtnText}>{t("back_to_jobs")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.viewBtn} onPress={() => router.push("/(main)/interviews")}>
          <Text style={s.viewBtnText}>{t("view_my_applications")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      {/* Job Info */}
      <View style={s.jobCard}>
        <View style={s.jobRow}>
          <View style={s.jobLogo}>
            <Text style={s.jobLogoText}>T</Text>
          </View>
          <View>
            <Text style={s.jobTitle}>Frontend Developer</Text>
            <Text style={s.jobCompany}>TechCorp Co., Ltd.</Text>
          </View>
        </View>
        <View style={s.matchBadge}>
          <Feather name="zap" size={14} color={colors.success} />
          <Text style={s.matchText}>92% Match</Text>
        </View>
      </View>

      {/* Form */}
      <View style={s.formSection}>
        <Text style={s.sectionTitle}>{t("personal_info")}</Text>

        <Text style={s.label}>{t("full_name")} *</Text>
        <View style={s.inputBox}>
          <Feather name="user" size={18} color={colors.textMuted} />
          <TextInput
            style={s.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder={t("enter_full_name")}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <Text style={s.label}>{t("email_address")} *</Text>
        <View style={s.inputBox}>
          <Feather name="mail" size={18} color={colors.textMuted} />
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder={t("enter_email")}
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
          />
        </View>

        <Text style={s.label}>{t("phone_number")}</Text>
        <View style={s.inputBox}>
          <Feather name="phone" size={18} color={colors.textMuted} />
          <TextInput
            style={s.input}
            value={phone}
            onChangeText={setPhone}
            placeholder={t("enter_phone")}
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={s.formSection}>
        <Text style={s.sectionTitle}>{t("cover_letter")}</Text>
        <Text style={s.hint}>{t("cover_letter_hint")}</Text>
        <TextInput
          style={s.textArea}
          value={coverLetter}
          onChangeText={setCoverLetter}
          placeholder={t("write_cover_letter")}
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
        />
        <Text style={s.charCount}>{coverLetter.length}/500</Text>
      </View>

      {/* Resume Section */}
      <View style={s.formSection}>
        <Text style={s.sectionTitle}>{t("resume")}</Text>
        <TouchableOpacity style={s.resumeBtn} onPress={() => router.push("/(main)/resume")}>
          <Feather name="file-text" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={s.resumeName}>{t("my_resume")}</Text>
            <Text style={s.resumeHint}>{t("tap_to_view")}</Text>
          </View>
          <Feather name="chevron-right" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Submit */}
      <View style={s.submitSection}>
        <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
          <Feather name="send" size={18} color={colors.textWhite} />
          <Text style={s.submitBtnText}>{t("submit_application")}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  jobCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  jobLogo: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  jobLogoText: { fontSize: 18, fontWeight: "700", color: colors.primary },
  jobTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  jobCompany: { fontSize: 13, color: colors.textSecondary },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  matchText: { fontSize: 12, fontWeight: "600", color: colors.success },

  formSection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.text, marginBottom: spacing.md },
  label: { fontSize: 12, fontWeight: "600", color: colors.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    backgroundColor: colors.surfaceAlt,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  input: { flex: 1, fontSize: 15, color: colors.text },
  hint: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    height: 120,
  },
  charCount: { fontSize: 12, color: colors.textMuted, textAlign: "right", marginTop: 4 },

  resumeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resumeName: { fontSize: 15, fontWeight: "600", color: colors.text },
  resumeHint: { fontSize: 12, color: colors.textMuted },

  submitSection: { padding: spacing.lg },
  submitBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    ...shadow.md,
  },
  submitBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: "700" },

  successContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  successIcon: { marginBottom: spacing.xl },
  successTitle: { fontSize: 24, fontWeight: "700", color: colors.text, marginBottom: spacing.sm },
  successText: { fontSize: 14, color: colors.textSecondary, textAlign: "center", lineHeight: 22 },
  successStats: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.lg,
    marginTop: spacing.xxl,
    gap: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  successStat: { alignItems: "center" },
  successStatNum: { fontSize: 24, fontWeight: "700", color: colors.primary },
  successStatLabel: { fontSize: 12, color: colors.textMuted },
  successStatDivider: { width: 1, backgroundColor: colors.border },
  backBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: radius.md,
    marginTop: spacing.xxl,
    width: "100%",
    alignItems: "center",
  },
  backBtnText: { color: colors.textWhite, fontSize: 15, fontWeight: "700" },
  viewBtn: {
    paddingVertical: 14,
    marginTop: spacing.sm,
  },
  viewBtnText: { color: colors.primary, fontSize: 14, fontWeight: "600" },
});
