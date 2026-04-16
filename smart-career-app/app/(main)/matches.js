import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useTheme } from "../../context/themeContext";
import { useProfileStore } from "../../store/useProfileStore";
import { useLang } from "../../context/languageContext";

const AI_MATCHES = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "InnoTech",
    location: "Bangkok",
    salary: "50k - 80k",
    match: 95,
    reasons: ["React expert", "TypeScript proficiency", "3+ years experience"],
    logo: "I",
    logoColor: "#10B981",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangkok",
    salary: "30k - 50k",
    match: 92,
    reasons: ["Strong React skills", "UI/UX awareness", "Team collaboration"],
    logo: "T",
    logoColor: "#4F46E5",
  },
  {
    id: "3",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "45k - 70k",
    match: 88,
    reasons: ["Node.js experience", "Firebase knowledge", "Problem solving"],
    logo: "S",
    logoColor: "#F59E0B",
  },
  {
    id: "4",
    title: "React Native Developer",
    company: "MobileFirst",
    location: "Bangkok",
    salary: "40k - 65k",
    match: 85,
    reasons: ["React Native skills", "Mobile development", "Cross-platform"],
    logo: "M",
    logoColor: "#8B5CF6",
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "CloudX",
    location: "Remote",
    salary: "40k - 60k",
    match: 78,
    reasons: ["Node.js experience", "SQL knowledge", "API design"],
    logo: "C",
    logoColor: "#06B6D4",
  },
];

function MatchRing({ match }) {
  const color = match >= 90 ? colors.success : match >= 80 ? colors.primary : colors.warning;
  return (
    <View style={[s.ring, { borderColor: color }]}>
      <Text style={[s.ringText, { color }]}>{match}%</Text>
    </View>
  );
}

export default function Matches() {
  const { skills } = useProfileStore();
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {/* Profile Skills Summary */}
      <View style={s.skillsSummary}>
        <View style={s.summaryHeader}>
          <Feather name="cpu" size={18} color={colors.primary} />
          <Text style={s.summaryTitle}>{t("ai_matching_skills")}</Text>
        </View>
        <View style={s.skillChips}>
          {skills.slice(0, 5).map((skill) => (
            <View key={skill} style={s.skillChip}>
              <Text style={s.skillChipText}>{skill}</Text>
            </View>
          ))}
          {skills.length > 5 && (
            <View style={[s.skillChip, { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[s.skillChipText, { color: colors.textMuted }]}>+{skills.length - 5}</Text>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={AI_MATCHES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.card}
            activeOpacity={0.7}
            onPress={() => router.push("/(main)/job-detail")}
          >
            <View style={s.cardTop}>
              <View style={[s.logo, { backgroundColor: item.logoColor + "15" }]}>
                <Text style={[s.logoText, { color: item.logoColor }]}>{item.logo}</Text>
              </View>
              <View style={s.cardInfo}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <Text style={s.cardCompany}>{item.company}</Text>
              </View>
              <MatchRing match={item.match} />
            </View>

            <View style={s.metaRow}>
              <View style={s.metaTag}>
                <Feather name="map-pin" size={12} color={colors.textSecondary} />
                <Text style={s.metaText}>{item.location}</Text>
              </View>
              <View style={s.metaTag}>
                <Feather name="dollar-sign" size={12} color={colors.textSecondary} />
                <Text style={s.metaText}>{item.salary}</Text>
              </View>
            </View>

            <View style={s.reasonsSection}>
              <Text style={s.reasonsTitle}>{t("why_you_match")}</Text>
              {item.reasons.map((r, i) => (
                <View key={i} style={s.reasonItem}>
                  <Feather name="check-circle" size={13} color={colors.success} />
                  <Text style={s.reasonText}>{r}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={s.applyBtn}
              onPress={() => router.push("/(main)/apply")}
            >
              <Text style={s.applyBtnText}>{t("quick_apply")}</Text>
              <Feather name="arrow-right" size={14} color={colors.textWhite} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  skillsSummary: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  summaryTitle: { fontSize: 14, fontWeight: "600", color: colors.text },
  skillChips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillChip: {
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  skillChipText: { fontSize: 12, fontWeight: "600", color: colors.primary },

  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  logo: { width: 48, height: 48, borderRadius: radius.md, justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 20, fontWeight: "700" },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  cardCompany: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },

  ring: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  ringText: { fontSize: 13, fontWeight: "700" },

  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.md },
  metaTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: colors.textSecondary },

  reasonsSection: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.borderLight },
  reasonsTitle: { fontSize: 12, fontWeight: "600", color: colors.textMuted, marginBottom: spacing.sm },
  reasonItem: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  reasonText: { fontSize: 13, color: colors.textSecondary },

  applyBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.md,
  },
  applyBtnText: { color: colors.textWhite, fontSize: 14, fontWeight: "600" },
});
