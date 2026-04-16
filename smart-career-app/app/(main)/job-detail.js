import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useAppStore } from "../../store/useAppStore";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const JOB = {
  id: "1",
  title: "Frontend Developer",
  company: "TechCorp Co., Ltd.",
  location: "Bangkok, Thailand",
  salary: "30,000 - 50,000 THB",
  type: "Full-time",
  posted: "2 days ago",
  match: 92,
  logo: "T",
  logoColor: "#4F46E5",
  description:
    "We are looking for a talented Frontend Developer to join our growing team. You will work on building responsive and high-performance web applications using React and TypeScript.",
  requirements: [
    "2+ years experience with React or similar framework",
    "Strong proficiency in JavaScript/TypeScript",
    "Experience with CSS-in-JS or Tailwind CSS",
    "Familiarity with REST APIs and GraphQL",
    "Experience with Git version control",
  ],
  benefits: [
    "Flexible working hours",
    "Remote work 2 days/week",
    "Annual bonus & salary review",
    "Health insurance",
    "Free lunch & snacks",
    "Learning budget 50,000 THB/year",
  ],
  skills: ["React", "TypeScript", "CSS", "GraphQL", "Git"],
};

function MatchBar({ match }) {
  const { t } = useLang();
  return (
    <View style={jd.matchSection}>
      <View style={jd.matchHeader}>
        <Feather name="cpu" size={16} color={colors.primary} />
        <Text style={jd.matchTitle}>{t("ai_match_score")}</Text>
        <Text style={jd.matchPercent}>{match}%</Text>
      </View>
      <View style={jd.matchBarBg}>
        <View style={[jd.matchBarFill, { width: `${match}%` }]} />
      </View>
      <Text style={jd.matchInsight}>
        You match well because of your strong React and TypeScript skills. Consider learning GraphQL to improve even further.
      </Text>
    </View>
  );
}

export default function JobDetail() {
  const { toggleSaveJob, isJobSaved } = useAppStore();
  const saved = isJobSaved(JOB.id);
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <ScrollView style={[jd.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <View style={jd.headerCard}>
        <View style={jd.headerRow}>
          <View style={[jd.logo, { backgroundColor: JOB.logoColor + "15" }]}>
            <Text style={[jd.logoText, { color: JOB.logoColor }]}>{JOB.logo}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              toggleSaveJob({
                id: JOB.id,
                title: JOB.title,
                company: JOB.company,
                location: JOB.location,
                salary: JOB.salary,
                match: JOB.match,
                type: JOB.type,
                savedAt: "",
              })
            }
          >
            <FontAwesome
              name={saved ? "bookmark" : "bookmark-o"}
              size={22}
              color={saved ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <Text style={jd.jobTitle}>{JOB.title}</Text>
        <Text style={jd.jobCompany}>{JOB.company}</Text>

        <View style={jd.tagsRow}>
          <View style={jd.tag}>
            <Feather name="map-pin" size={13} color={colors.textSecondary} />
            <Text style={jd.tagText}>{JOB.location}</Text>
          </View>
          <View style={jd.tag}>
            <Feather name="clock" size={13} color={colors.textSecondary} />
            <Text style={jd.tagText}>{JOB.type}</Text>
          </View>
          <View style={jd.tag}>
            <Feather name="dollar-sign" size={13} color={colors.textSecondary} />
            <Text style={jd.tagText}>{JOB.salary}</Text>
          </View>
        </View>

        <Text style={jd.posted}>Posted {JOB.posted}</Text>
      </View>

      {/* Match Score */}
      <MatchBar match={JOB.match} />

      {/* Description */}
      <View style={jd.section}>
        <Text style={jd.sectionTitle}>{t("job_description")}</Text>
        <Text style={jd.descText}>{JOB.description}</Text>
      </View>

      {/* Requirements */}
      <View style={jd.section}>
        <Text style={jd.sectionTitle}>{t("requirements")}</Text>
        {JOB.requirements.map((req, i) => (
          <View key={i} style={jd.reqItem}>
            <View style={jd.reqBullet}>
              <Feather name="check" size={12} color={colors.success} />
            </View>
            <Text style={jd.reqText}>{req}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={jd.section}>
        <Text style={jd.sectionTitle}>{t("required_skills")}</Text>
        <View style={jd.skillsRow}>
          {JOB.skills.map((skill) => (
            <View key={skill} style={jd.skillChip}>
              <Text style={jd.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Benefits */}
      <View style={jd.section}>
        <Text style={jd.sectionTitle}>{t("benefits_perks")}</Text>
        {JOB.benefits.map((b, i) => (
          <View key={i} style={jd.benefitItem}>
            <Feather name="gift" size={14} color={colors.accent} />
            <Text style={jd.benefitText}>{b}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={jd.actionSection}>
        <TouchableOpacity
          style={jd.applyBtn}
          onPress={() => router.push("/(main)/apply")}
        >
          <Feather name="send" size={18} color={colors.textWhite} />
          <Text style={jd.applyBtnText}>{t("apply_now")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={jd.saveBtn}
          onPress={() =>
            toggleSaveJob({
              id: JOB.id,
              title: JOB.title,
              company: JOB.company,
              location: JOB.location,
              salary: JOB.salary,
              match: JOB.match,
              type: JOB.type,
              savedAt: "",
            })
          }
        >
          <FontAwesome
            name={saved ? "bookmark" : "bookmark-o"}
            size={16}
            color={colors.primary}
          />
          <Text style={jd.saveBtnText}>{saved ? t("saved") : t("save_job")}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const jd = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  headerCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.md,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { fontSize: 24, fontWeight: "700" },
  jobTitle: { fontSize: 22, fontWeight: "700", color: colors.text, marginTop: spacing.md },
  jobCompany: { fontSize: 15, color: colors.textSecondary, marginTop: 4 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  tagText: { fontSize: 12, color: colors.textSecondary },
  posted: { fontSize: 12, color: colors.textMuted, marginTop: spacing.md },

  matchSection: {
    backgroundColor: colors.primaryBg,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary + "20",
    marginBottom: spacing.md,
  },
  matchHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  matchTitle: { flex: 1, fontSize: 14, fontWeight: "600", color: colors.primary },
  matchPercent: { fontSize: 20, fontWeight: "700", color: colors.primary },
  matchBarBg: { height: 8, backgroundColor: colors.surface, borderRadius: 4, overflow: "hidden" },
  matchBarFill: { height: 8, backgroundColor: colors.primary, borderRadius: 4 },
  matchInsight: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginTop: spacing.sm },

  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.text, marginBottom: spacing.md },
  descText: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },

  reqItem: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginBottom: spacing.sm },
  reqBullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.successBg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  reqText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 20 },

  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  skillChip: {
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  skillText: { fontSize: 13, fontWeight: "600", color: colors.primary },

  benefitItem: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  benefitText: { fontSize: 14, color: colors.textSecondary },

  actionSection: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  applyBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    ...shadow.md,
  },
  applyBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: "700" },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: colors.primaryBg,
    padding: 14,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  saveBtnText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
});
