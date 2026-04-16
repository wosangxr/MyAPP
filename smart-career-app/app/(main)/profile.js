import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useProfileStore } from "../../store/useProfileStore";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

function StatCard({ icon, label, value, color }) {
  return (
    <View style={[profileStyles.statCard, { borderLeftColor: color }]}>
      <Feather name={icon} size={20} color={color} />
      <Text style={profileStyles.statValue}>{value}</Text>
      <Text style={profileStyles.statLabel}>{label}</Text>
    </View>
  );
}

function SkillChip({ label }) {
  return (
    <View style={profileStyles.skillChip}>
      <Text style={profileStyles.skillText}>{label}</Text>
    </View>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <View style={profileStyles.sectionHeader}>
      <Text style={profileStyles.sectionTitle}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onAction}>
          <Text style={profileStyles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function Profile() {
  const {
    name, title, email, phone, location, bio,
    skills, experiences, education, portfolio,
    appliedJobs, savedJobs, interviewCount, careerScore, avatar,
  } = useProfileStore();
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <ScrollView style={[profileStyles.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={[profileStyles.headerCard, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={profileStyles.headerTop}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={profileStyles.avatarImg} />
          ) : (
            <View style={profileStyles.avatarLarge}>
              <Feather name="user" size={36} color={colors.textWhite} />
            </View>
          )}
          <TouchableOpacity
            style={profileStyles.editBtn}
            onPress={() => router.push("/(main)/edit-profile")}
          >
            <Feather name="edit-2" size={15} color={colors.primary} />
            <Text style={profileStyles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={profileStyles.profileName}>{name}</Text>
        <Text style={profileStyles.profileTitle}>{title}</Text>

        <View style={profileStyles.infoRow}>
          <Feather name="map-pin" size={14} color={colors.textMuted} />
          <Text style={profileStyles.infoText}>{location}</Text>
        </View>
        <View style={profileStyles.infoRow}>
          <Feather name="mail" size={14} color={colors.textMuted} />
          <Text style={profileStyles.infoText}>{email}</Text>
        </View>
        <View style={profileStyles.infoRow}>
          <Feather name="phone" size={14} color={colors.textMuted} />
          <Text style={profileStyles.infoText}>{phone}</Text>
        </View>

        <Text style={profileStyles.bio}>{bio}</Text>

        {/* Career Score Bar */}
        <View style={profileStyles.scoreSection}>
          <View style={profileStyles.scoreHeader}>
            <Text style={profileStyles.scoreLabel}>{t("career_score_label")}</Text>
            <Text style={profileStyles.scoreValue}>{careerScore}%</Text>
          </View>
          <View style={profileStyles.scoreBarBg}>
            <View style={[profileStyles.scoreBarFill, { width: `${careerScore}%` }]} />
          </View>
        </View>
      </View>

      {/* Stats Row */}
      <View style={profileStyles.statsRow}>
        <StatCard icon="send" label={t("applied")} value={appliedJobs} color={colors.primary} />
        <StatCard icon="bookmark" label={t("saved")} value={savedJobs} color={colors.accent} />
        <StatCard icon="calendar" label={t("interviews")} value={interviewCount} color={colors.success} />
      </View>

      {/* Skills Section */}
      <View style={profileStyles.section}>
        <SectionHeader title={t("skills_expertise")} action={t("edit")} onAction={() => router.push("/(main)/edit-profile")} />
        <View style={profileStyles.skillsGrid}>
          {skills.map((s) => (
            <SkillChip key={s} label={s} />
          ))}
        </View>
      </View>

      {/* Experience Section */}
      <View style={profileStyles.section}>
        <SectionHeader title={t("work_experience")} action={t("add")} onAction={() => router.push("/(main)/edit-profile")} />
        {experiences.map((exp) => (
          <View key={exp.id} style={profileStyles.expCard}>
            <View style={profileStyles.expDot} />
            <View style={profileStyles.expContent}>
              <Text style={profileStyles.expTitle}>{exp.title}</Text>
              <Text style={profileStyles.expCompany}>{exp.company}</Text>
              <Text style={profileStyles.expPeriod}>{exp.period}</Text>
              <Text style={profileStyles.expDesc}>{exp.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Education Section */}
      <View style={profileStyles.section}>
        <SectionHeader title={t("education")} />
        {education.map((edu) => (
          <View key={edu.id} style={profileStyles.eduCard}>
            <View style={profileStyles.eduIcon}>
              <Feather name="award" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={profileStyles.eduDegree}>{edu.degree}</Text>
              <Text style={profileStyles.eduSchool}>{edu.school}</Text>
              <Text style={profileStyles.eduYear}>{edu.year}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Portfolio Section */}
      <View style={profileStyles.section}>
        <SectionHeader title={t("portfolio_projects")} action={t("add")} onAction={() => router.push("/(main)/edit-profile")} />
        {portfolio.map((item) => (
          <View key={item.id} style={profileStyles.portfolioCard}>
            <View style={profileStyles.portfolioHeader}>
              <View style={profileStyles.portfolioIcon}>
                <Feather name="folder" size={18} color={colors.accent} />
              </View>
              <Text style={profileStyles.portfolioTitle}>{item.title}</Text>
            </View>
            <Text style={profileStyles.portfolioDesc}>{item.description}</Text>
            <View style={profileStyles.portfolioTags}>
              {item.tags.map((tag) => (
                <View key={tag} style={profileStyles.portfolioTag}>
                  <Text style={profileStyles.portfolioTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={profileStyles.actionSection}>
        <TouchableOpacity
          style={profileStyles.primaryBtn}
          onPress={() => router.push("/(main)/resume")}
        >
          <Feather name="file-text" size={18} color={colors.textWhite} />
          <Text style={profileStyles.primaryBtnText}>{t("view_my_resume")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={profileStyles.secondaryBtn}
          onPress={() => router.push("/(main)/edit-profile")}
        >
          <Feather name="edit-2" size={18} color={colors.primary} />
          <Text style={profileStyles.secondaryBtnText}>{t("edit_full_profile")}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const profileStyles = StyleSheet.create({
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
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  editBtnText: { fontSize: 13, fontWeight: "600", color: colors.primary },
  profileName: { fontSize: 22, fontWeight: "700", color: colors.text, marginTop: spacing.md },
  profileTitle: { fontSize: 15, color: colors.textSecondary, marginTop: 2 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  infoText: { fontSize: 13, color: colors.textMuted },
  bio: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginTop: spacing.md },
  scoreSection: { marginTop: spacing.lg },
  scoreHeader: { flexDirection: "row", justifyContent: "space-between" },
  scoreLabel: { fontSize: 13, fontWeight: "600", color: colors.text },
  scoreValue: { fontSize: 13, fontWeight: "700", color: colors.primary },
  scoreBarBg: {
    height: 8,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 4,
    marginTop: 6,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  statValue: { fontSize: 20, fontWeight: "700", color: colors.text },
  statLabel: { fontSize: 11, color: colors.textMuted },

  section: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    marginBottom: 0,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  sectionAction: { fontSize: 13, fontWeight: "600", color: colors.primary },

  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  skillChip: {
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  skillText: { fontSize: 13, fontWeight: "600", color: colors.primary },

  expCard: { flexDirection: "row", marginBottom: spacing.lg, gap: spacing.md },
  expDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
  expContent: { flex: 1 },
  expTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  expCompany: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  expPeriod: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  expDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginTop: 6 },

  eduCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  eduIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  eduDegree: { fontSize: 14, fontWeight: "600", color: colors.text },
  eduSchool: { fontSize: 13, color: colors.textSecondary },
  eduYear: { fontSize: 12, color: colors.textMuted },

  portfolioCard: {
    backgroundColor: colors.surfaceAlt,
    padding: spacing.lg,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  portfolioHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  portfolioIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  portfolioTitle: { fontSize: 15, fontWeight: "600", color: colors.text },
  portfolioDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 8, lineHeight: 18 },
  portfolioTags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  portfolioTag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  portfolioTagText: { fontSize: 11, color: colors.textSecondary, fontWeight: "500" },

  actionSection: { padding: spacing.lg, gap: spacing.sm },
  primaryBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  primaryBtnText: { color: colors.textWhite, fontSize: 15, fontWeight: "700" },
  secondaryBtn: {
    flexDirection: "row",
    backgroundColor: colors.primaryBg,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  secondaryBtnText: { color: colors.primary, fontSize: 15, fontWeight: "700" },
});
