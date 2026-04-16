import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const { width } = Dimensions.get("window");

const JOBS = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "InnoTech",
    location: "Bangkok",
    salary: "50k - 80k",
    type: "Full-time",
    match: 95,
    skills: ["React", "TypeScript", "Node.js"],
    description: "Lead development of cutting-edge web applications in a fast-paced startup environment.",
    logo: "I",
    logoColor: "#10B981",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangkok",
    salary: "30k - 50k",
    type: "Full-time",
    match: 92,
    skills: ["React", "CSS", "JavaScript"],
    description: "Build beautiful and responsive user interfaces for enterprise clients.",
    logo: "T",
    logoColor: "#4F46E5",
  },
  {
    id: "3",
    title: "Full-Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "45k - 70k",
    type: "Remote",
    match: 88,
    skills: ["React", "Node.js", "PostgreSQL"],
    description: "Work on the complete stack from database design to frontend implementation.",
    logo: "S",
    logoColor: "#F59E0B",
  },
  {
    id: "4",
    title: "Mobile Developer",
    company: "MobileFirst",
    location: "Bangkok",
    salary: "40k - 65k",
    type: "Full-time",
    match: 85,
    skills: ["React Native", "TypeScript", "Firebase"],
    description: "Create cross-platform mobile apps for millions of users.",
    logo: "M",
    logoColor: "#8B5CF6",
  },
];

export default function Swipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const { t } = useLang();
  const { c } = useTheme();

  const currentJob = JOBS[currentIndex];
  const isFinished = currentIndex >= JOBS.length;

  const handleLike = () => {
    if (currentJob) {
      setLiked([...liked, currentJob.id]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentJob) {
      setPassed([...passed, currentJob.id]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSuperLike = () => {
    if (currentJob) {
      setLiked([...liked, currentJob.id]);
      Alert.alert(t("super_like_title"), `${t("super_like_msg")} ${currentJob.title} ${t("super_like_msg2")}`);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setLiked([]);
    setPassed([]);
  };

  if (isFinished) {
    return (
      <View style={sw.doneContainer}>
        <View style={sw.doneIcon}>
          <Feather name="check-circle" size={64} color={colors.success} />
        </View>
        <Text style={sw.doneTitle}>{t("all_caught_up")}</Text>
        <Text style={sw.doneText}>
          {t("swipe_done_text")}{"\n"}
          {t("like")}: {liked.length} · {t("pass")}: {passed.length}
        </Text>
        <TouchableOpacity style={sw.resetBtn} onPress={resetCards}>
          <Feather name="refresh-cw" size={16} color={colors.textWhite} />
          <Text style={sw.resetBtnText}>{t("start_over")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const matchColor = currentJob.match >= 90 ? colors.success : currentJob.match >= 80 ? colors.primary : colors.warning;

  return (
    <View style={[sw.container, { backgroundColor: c.background }]}>
      {/* Progress */}
      <View style={sw.progressBar}>
        <View style={sw.progressRow}>
          <Text style={sw.progressText}>{currentIndex + 1} / {JOBS.length}</Text>
          <View style={sw.progressStats}>
            <View style={sw.statBadge}>
              <Feather name="heart" size={12} color={colors.success} />
              <Text style={sw.statText}>{liked.length}</Text>
            </View>
            <View style={sw.statBadge}>
              <Feather name="x" size={12} color={colors.error} />
              <Text style={sw.statText}>{passed.length}</Text>
            </View>
          </View>
        </View>
        <View style={sw.progressTrack}>
          <View style={[sw.progressFill, { width: `${((currentIndex + 1) / JOBS.length) * 100}%` }]} />
        </View>
      </View>

      {/* Card */}
      <View style={sw.card}>
        {/* Match Score */}
        <View style={[sw.matchCircle, { borderColor: matchColor }]}>
          <Text style={[sw.matchNum, { color: matchColor }]}>{currentJob.match}%</Text>
          <Text style={sw.matchLabel}>{t("match")}</Text>
        </View>

        {/* Company Header */}
        <View style={sw.cardHeader}>
          <View style={[sw.logo, { backgroundColor: currentJob.logoColor + "15" }]}>
            <Text style={[sw.logoText, { color: currentJob.logoColor }]}>{currentJob.logo}</Text>
          </View>
          <View>
            <Text style={sw.cardTitle}>{currentJob.title}</Text>
            <Text style={sw.cardCompany}>{currentJob.company}</Text>
          </View>
        </View>

        {/* Details */}
        <View style={sw.detailsRow}>
          <View style={sw.detailItem}>
            <Feather name="map-pin" size={14} color={colors.textSecondary} />
            <Text style={sw.detailText}>{currentJob.location}</Text>
          </View>
          <View style={sw.detailItem}>
            <Feather name="dollar-sign" size={14} color={colors.textSecondary} />
            <Text style={sw.detailText}>{currentJob.salary}</Text>
          </View>
          <View style={sw.detailItem}>
            <Feather name="clock" size={14} color={colors.textSecondary} />
            <Text style={sw.detailText}>{currentJob.type}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={sw.descText}>{currentJob.description}</Text>

        {/* Skills */}
        <View style={sw.skillsRow}>
          {currentJob.skills.map((skill) => (
            <View key={skill} style={sw.skillChip}>
              <Text style={sw.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={sw.actions}>
        <TouchableOpacity style={sw.passBtn} onPress={handlePass}>
          <Feather name="x" size={28} color={colors.error} />
        </TouchableOpacity>

        <TouchableOpacity style={sw.superBtn} onPress={handleSuperLike}>
          <FontAwesome name="star" size={22} color={colors.star} />
        </TouchableOpacity>

        <TouchableOpacity style={sw.likeBtn} onPress={handleLike}>
          <Feather name="heart" size={28} color={colors.success} />
        </TouchableOpacity>
      </View>

      <View style={sw.hintRow}>
        <Text style={sw.hintText}>{t("pass")}</Text>
        <Text style={sw.hintText}>{t("super_like")}</Text>
        <Text style={sw.hintText}>{t("like")}</Text>
      </View>
    </View>
  );
}

const sw = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: spacing.md },

  progressBar: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  progressRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressText: { fontSize: 13, fontWeight: "600", color: colors.textSecondary },
  progressStats: { flexDirection: "row", gap: spacing.sm },
  statBadge: { flexDirection: "row", alignItems: "center", gap: 4 },
  statText: { fontSize: 13, fontWeight: "600", color: colors.textSecondary },
  progressTrack: { height: 4, backgroundColor: colors.surfaceAlt, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 },

  card: {
    flex: 1,
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.lg,
  },
  matchCircle: {
    position: "absolute",
    top: -1,
    right: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...shadow.md,
  },
  matchNum: { fontSize: 16, fontWeight: "700" },
  matchLabel: { fontSize: 9, color: colors.textMuted, fontWeight: "600" },

  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.xl },
  logo: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { fontSize: 24, fontWeight: "700" },
  cardTitle: { fontSize: 20, fontWeight: "700", color: colors.text },
  cardCompany: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },

  detailsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginTop: spacing.xl },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  detailText: { fontSize: 13, color: colors.textSecondary },

  descText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: spacing.xl,
  },

  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.xl },
  skillChip: {
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  skillText: { fontSize: 13, fontWeight: "600", color: colors.primary },

  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xl,
    paddingVertical: spacing.lg,
  },
  passBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.errorBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.error + "30",
    ...shadow.md,
  },
  superBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.warningBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.warning + "30",
    ...shadow.md,
  },
  likeBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.successBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.success + "30",
    ...shadow.md,
  },

  hintRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: spacing.md,
  },
  hintText: { fontSize: 12, color: colors.textMuted },

  doneContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  doneIcon: { marginBottom: spacing.xl },
  doneTitle: { fontSize: 24, fontWeight: "700", color: colors.text },
  doneText: { fontSize: 14, color: colors.textSecondary, textAlign: "center", lineHeight: 22, marginTop: spacing.sm },
  resetBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xxl,
  },
  resetBtnText: { color: colors.textWhite, fontSize: 15, fontWeight: "600" },
});
