import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const WORK_STYLE_KEYS = {
  startup: { titleKey: "startup", descKey: "startup_desc" },
  corporate: { titleKey: "corporate", descKey: "corporate_desc" },
  remote: { titleKey: "remote", descKey: "remote_desc" },
  freelance: { titleKey: "freelance", descKey: "freelance_desc" },
};

const SKILL_KEYS = {
  frontend: "frontend_dev",
  backend: "backend_dev",
  mobile: "mobile_dev",
  data: "data_science",
  design: "ui_ux_design",
  devops: "devops_cloud",
};

const WORK_STYLES = [
  {
    id: "startup",
    icon: "zap",
    title: "Startup",
    description: "Fast-paced, creative, flexible environment with high growth potential",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    id: "corporate",
    icon: "briefcase",
    title: "Corporate",
    description: "Structured, stable career path with established processes and benefits",
    color: "#4F46E5",
    bg: "#EEF2FF",
  },
  {
    id: "remote",
    icon: "globe",
    title: "Remote",
    description: "Work from anywhere with flexibility and digital collaboration tools",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    id: "freelance",
    icon: "coffee",
    title: "Freelance",
    description: "Be your own boss, choose your projects, and set your own schedule",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

const SKILLS_INTEREST = [
  { id: "frontend", label: "Frontend Development", icon: "monitor" },
  { id: "backend", label: "Backend Development", icon: "server" },
  { id: "mobile", label: "Mobile Development", icon: "smartphone" },
  { id: "data", label: "Data Science", icon: "database" },
  { id: "design", label: "UI/UX Design", icon: "pen-tool" },
  { id: "devops", label: "DevOps & Cloud", icon: "cloud" },
];

export default function Personality() {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [step, setStep] = useState(1);
  const { t } = useLang();
  const { c } = useTheme();

  const toggleSkill = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
  };

  const handleFinish = () => {
    router.replace("/(main)/swipe");
  };

  return (
    <ScrollView style={[ps.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      {/* Progress */}
      <View style={ps.progress}>
        <View style={ps.progressTrack}>
          <View style={[ps.progressFill, { width: step === 1 ? "50%" : "100%" }]} />
        </View>
        <Text style={ps.progressText}>{t("step_of")} {step} {t("of")} 2</Text>
      </View>

      {step === 1 ? (
        <>
          {/* Step 1: Work Style */}
          <View style={ps.header}>
            <Text style={ps.title}>{t("work_style_title")}</Text>
            <Text style={ps.subtitle}>
              {t("work_style_subtitle")}
            </Text>
          </View>

          <View style={ps.optionsGrid}>
            {WORK_STYLES.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  ps.styleCard,
                  selectedStyle === style.id && { borderColor: style.color, borderWidth: 2 },
                ]}
                onPress={() => setSelectedStyle(style.id)}
                activeOpacity={0.7}
              >
                <View style={[ps.styleIcon, { backgroundColor: style.bg }]}>
                  <Feather name={style.icon} size={24} color={style.color} />
                </View>
                <Text style={ps.styleTitle}>{t(WORK_STYLE_KEYS[style.id].titleKey)}</Text>
                <Text style={ps.styleDesc}>{t(WORK_STYLE_KEYS[style.id].descKey)}</Text>
                {selectedStyle === style.id && (
                  <View style={[ps.checkIcon, { backgroundColor: style.color }]}>
                    <Feather name="check" size={14} color={colors.textWhite} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[ps.nextBtn, !selectedStyle && { opacity: 0.4 }]}
            onPress={() => selectedStyle && setStep(2)}
            disabled={!selectedStyle}
          >
            <Text style={ps.nextBtnText}>{t("continue_btn")}</Text>
            <Feather name="arrow-right" size={18} color={colors.textWhite} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Step 2: Skills Interest */}
          <View style={ps.header}>
            <Text style={ps.title}>{t("interests_title")}</Text>
            <Text style={ps.subtitle}>
              {t("interests_subtitle")}
            </Text>
          </View>

          <View style={ps.skillsGrid}>
            {SKILLS_INTEREST.map((skill) => {
              const selected = selectedSkills.includes(skill.id);
              return (
                <TouchableOpacity
                  key={skill.id}
                  style={[ps.skillCard, selected && ps.skillCardSelected]}
                  onPress={() => toggleSkill(skill.id)}
                  activeOpacity={0.7}
                >
                  <Feather
                    name={skill.icon}
                    size={22}
                    color={selected ? colors.primary : colors.textMuted}
                  />
                  <Text style={[ps.skillLabel, selected && { color: colors.primary, fontWeight: "700" }]}>
                    {t(SKILL_KEYS[skill.id])}
                  </Text>
                  {selected && (
                    <View style={ps.skillCheck}>
                      <Feather name="check" size={12} color={colors.textWhite} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={ps.stepActions}>
            <TouchableOpacity style={ps.backBtn} onPress={() => setStep(1)}>
              <Feather name="arrow-left" size={16} color={colors.textSecondary} />
              <Text style={ps.backBtnText}>{t("back")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ps.finishBtn, selectedSkills.length === 0 && { opacity: 0.4 }]}
              onPress={handleFinish}
              disabled={selectedSkills.length === 0}
            >
              <Text style={ps.finishBtnText}>{t("find_my_jobs")}</Text>
              <Feather name="zap" size={16} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const ps = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  progress: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  progressTrack: { height: 4, backgroundColor: colors.surfaceAlt, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 },
  progressText: { fontSize: 12, color: colors.textMuted, marginTop: 6, textAlign: "right" },

  header: { padding: spacing.lg },
  title: { fontSize: 24, fontWeight: "700", color: colors.text },
  subtitle: { fontSize: 14, color: colors.textSecondary, lineHeight: 21, marginTop: spacing.sm },

  optionsGrid: { paddingHorizontal: spacing.lg, gap: spacing.md },
  styleCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
    ...shadow.sm,
  },
  styleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  styleTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  styleDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginTop: 4 },
  checkIcon: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  nextBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  nextBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: "700" },

  skillsGrid: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  skillCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
  },
  skillCardSelected: {
    backgroundColor: colors.primaryBg,
    borderColor: colors.primary,
  },
  skillLabel: { flex: 1, fontSize: 15, fontWeight: "500", color: colors.text },
  skillCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  stepActions: { flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.sm, marginTop: spacing.xl },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backBtnText: { fontSize: 15, color: colors.textSecondary, fontWeight: "600" },
  finishBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  finishBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: "700" },
});
