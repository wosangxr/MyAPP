import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const INTERVIEWS = [
  {
    id: "1",
    company: "TechCorp",
    position: "Frontend Developer",
    date: "April 10, 2026",
    time: "10:00 AM",
    type: "Video Call",
    status: "upcoming",
    platform: "Zoom",
  },
  {
    id: "2",
    company: "CloudX",
    position: "Backend Engineer",
    date: "April 15, 2026",
    time: "2:00 PM",
    type: "On-site",
    status: "upcoming",
    platform: "Office Visit",
  },
  {
    id: "3",
    company: "DesignLab",
    position: "UX Designer",
    date: "March 28, 2026",
    time: "11:00 AM",
    type: "Phone Call",
    status: "completed",
    platform: "Phone",
  },
];

const APPLICATIONS = [
  {
    id: "a1",
    company: "TechCorp",
    position: "Frontend Developer",
    date: "March 25, 2026",
    status: "Interview",
  },
  {
    id: "a2",
    company: "CloudX",
    position: "Backend Engineer",
    date: "March 22, 2026",
    status: "Reviewing",
  },
  {
    id: "a3",
    company: "StartupXYZ",
    position: "Full-Stack Developer",
    date: "March 18, 2026",
    status: "Applied",
  },
  {
    id: "a4",
    company: "Digital Solutions",
    position: "React Developer",
    date: "March 10, 2026",
    status: "Rejected",
  },
];

const STATUS_CONFIG = {
  Interview: { color: colors.success, bg: colors.successBg, icon: "calendar" },
  Reviewing: { color: colors.warning, bg: colors.warningBg, icon: "clock" },
  Applied: { color: colors.primary, bg: colors.primaryBg, icon: "send" },
  Rejected: { color: colors.error, bg: colors.errorBg, icon: "x-circle" },
};

export default function Interviews() {
  const { t } = useLang();
  const { c } = useTheme();
  return (
    <ScrollView style={[iv.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      {/* Upcoming Interviews */}
      <View style={iv.sectionHeader}>
        <Feather name="calendar" size={18} color={colors.primary} />
        <Text style={iv.sectionTitle}>{t("upcoming_interviews")}</Text>
      </View>

      {INTERVIEWS.filter((i) => i.status === "upcoming").map((item) => (
        <View key={item.id} style={iv.interviewCard}>
          <View style={iv.interviewHeader}>
            <View style={iv.companyLogo}>
              <Text style={iv.logoText}>{item.company[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={iv.interviewPosition}>{item.position}</Text>
              <Text style={iv.interviewCompany}>{item.company}</Text>
            </View>
            <View style={iv.upcomingBadge}>
              <Text style={iv.upcomingText}>{t("upcoming")}</Text>
            </View>
          </View>
          <View style={iv.interviewDetails}>
            <View style={iv.detailItem}>
              <Feather name="calendar" size={14} color={colors.textSecondary} />
              <Text style={iv.detailText}>{item.date}</Text>
            </View>
            <View style={iv.detailItem}>
              <Feather name="clock" size={14} color={colors.textSecondary} />
              <Text style={iv.detailText}>{item.time}</Text>
            </View>
            <View style={iv.detailItem}>
              <Feather name="video" size={14} color={colors.textSecondary} />
              <Text style={iv.detailText}>{item.type} · {item.platform}</Text>
            </View>
          </View>
          <View style={iv.interviewActions}>
            <TouchableOpacity style={iv.prepareBtn}>
              <Feather name="book-open" size={14} color={colors.primary} />
              <Text style={iv.prepareBtnText}>{t("prepare")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={iv.joinBtn}>
              <Feather name="video" size={14} color={colors.textWhite} />
              <Text style={iv.joinBtnText}>{t("join_meeting")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Past Interviews */}
      <View style={[iv.sectionHeader, { marginTop: spacing.lg }]}>
        <Feather name="check-circle" size={18} color={colors.textMuted} />
        <Text style={iv.sectionTitle}>{t("past_interviews")}</Text>
      </View>

      {INTERVIEWS.filter((i) => i.status === "completed").map((item) => (
        <View key={item.id} style={[iv.interviewCard, { opacity: 0.7 }]}>
          <View style={iv.interviewHeader}>
            <View style={[iv.companyLogo, { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[iv.logoText, { color: colors.textMuted }]}>{item.company[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={iv.interviewPosition}>{item.position}</Text>
              <Text style={iv.interviewCompany}>{item.company}</Text>
            </View>
            <View style={[iv.upcomingBadge, { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[iv.upcomingText, { color: colors.textMuted }]}>{t("done")}</Text>
            </View>
          </View>
          <View style={iv.interviewDetails}>
            <View style={iv.detailItem}>
              <Feather name="calendar" size={14} color={colors.textMuted} />
              <Text style={[iv.detailText, { color: colors.textMuted }]}>{item.date} · {item.time}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Application Tracker */}
      <View style={[iv.sectionHeader, { marginTop: spacing.lg }]}>
        <Feather name="send" size={18} color={colors.primary} />
        <Text style={iv.sectionTitle}>{t("application_tracker")}</Text>
      </View>

      {APPLICATIONS.map((app) => {
        const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.Applied;
        return (
          <View key={app.id} style={iv.appCard}>
            <View style={[iv.appStatusIcon, { backgroundColor: cfg.bg }]}>
              <Feather name={cfg.icon} size={16} color={cfg.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={iv.appPosition}>{app.position}</Text>
              <Text style={iv.appCompany}>{app.company} · {app.date}</Text>
            </View>
            <View style={[iv.statusBadge, { backgroundColor: cfg.bg }]}>
              <Text style={[iv.statusText, { color: cfg.color }]}>{app.status}</Text>
            </View>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const iv = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.text },

  interviewCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  interviewHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { fontSize: 18, fontWeight: "700", color: colors.primary },
  interviewPosition: { fontSize: 15, fontWeight: "700", color: colors.text },
  interviewCompany: { fontSize: 13, color: colors.textSecondary },
  upcomingBadge: {
    backgroundColor: colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  upcomingText: { fontSize: 11, fontWeight: "600", color: colors.success },

  interviewDetails: { marginTop: spacing.md, gap: spacing.sm },
  detailItem: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  detailText: { fontSize: 13, color: colors.textSecondary },

  interviewActions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  prepareBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  prepareBtnText: { fontSize: 13, fontWeight: "600", color: colors.primary },
  joinBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  joinBtnText: { fontSize: 13, fontWeight: "600", color: colors.textWhite },

  appCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  appStatusIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  appPosition: { fontSize: 14, fontWeight: "600", color: colors.text },
  appCompany: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  statusText: { fontSize: 11, fontWeight: "600" },
});
