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

const APPLICATIONS = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    logo: "T",
    logoColor: "#4F46E5",
    status: "interview",
    appliedDate: "Mar 28, 2026",
    timeline: [
      { status: "applied", date: "Mar 28", done: true },
      { status: "viewed", date: "Mar 30", done: true },
      { status: "interview", date: "Apr 5", done: true },
      { status: "accepted", date: "", done: false },
    ],
  },
  {
    id: "2",
    title: "Senior React Developer",
    company: "InnoTech",
    logo: "I",
    logoColor: "#10B981",
    status: "viewed",
    appliedDate: "Mar 31, 2026",
    timeline: [
      { status: "applied", date: "Mar 31", done: true },
      { status: "viewed", date: "Apr 2", done: true },
      { status: "interview", date: "", done: false },
      { status: "accepted", date: "", done: false },
    ],
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "DesignHub",
    logo: "D",
    logoColor: "#8B5CF6",
    status: "rejected",
    appliedDate: "Mar 20, 2026",
    timeline: [
      { status: "applied", date: "Mar 20", done: true },
      { status: "viewed", date: "Mar 22", done: true },
      { status: "rejected", date: "Mar 25", done: true },
    ],
  },
];

const STATUS_CONFIG = {
  applied: { label: "status_applied", color: colors.primary, icon: "send" },
  viewed: { label: "status_viewed", color: colors.accent, icon: "eye" },
  interview: { label: "status_interview", color: colors.warning, icon: "calendar" },
  accepted: { label: "status_accepted", color: colors.success, icon: "check-circle" },
  rejected: { label: "status_rejected", color: colors.error, icon: "x-circle" },
};

export default function Applications() {
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <ScrollView style={[s.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      {/* Summary */}
      <View style={s.summaryRow}>
        <View style={[s.summaryCard, { borderLeftColor: colors.primary }]}>
          <Text style={s.summaryNum}>{APPLICATIONS.length}</Text>
          <Text style={s.summaryLabel}>{t("app_total")}</Text>
        </View>
        <View style={[s.summaryCard, { borderLeftColor: colors.warning }]}>
          <Text style={s.summaryNum}>
            {APPLICATIONS.filter((a) => a.status === "interview").length}
          </Text>
          <Text style={s.summaryLabel}>{t("app_interviewing")}</Text>
        </View>
        <View style={[s.summaryCard, { borderLeftColor: colors.success }]}>
          <Text style={s.summaryNum}>
            {APPLICATIONS.filter((a) => a.status === "accepted").length}
          </Text>
          <Text style={s.summaryLabel}>{t("app_accepted")}</Text>
        </View>
      </View>

      {/* Apps List */}
      {APPLICATIONS.map((app) => {
        const cfg = STATUS_CONFIG[app.status];
        return (
          <View key={app.id} style={s.card}>
            {/* Header */}
            <View style={s.cardHeader}>
              <View style={[s.logo, { backgroundColor: app.logoColor + "15" }]}>
                <Text style={[s.logoText, { color: app.logoColor }]}>{app.logo}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.cardTitle}>{app.title}</Text>
                <Text style={s.cardCompany}>{app.company}</Text>
              </View>
              <View style={[s.statusBadge, { backgroundColor: cfg.color + "15" }]}>
                <Feather name={cfg.icon} size={12} color={cfg.color} />
                <Text style={[s.statusText, { color: cfg.color }]}>{t(cfg.label)}</Text>
              </View>
            </View>

            {/* Timeline */}
            <View style={s.timeline}>
              {app.timeline.map((step, i) => {
                const stepCfg = STATUS_CONFIG[step.status];
                const isLast = i === app.timeline.length - 1;
                return (
                  <View key={i} style={s.timelineStep}>
                    <View style={s.timelineLeft}>
                      <View
                        style={[
                          s.timelineDot,
                          step.done
                            ? { backgroundColor: stepCfg.color }
                            : { backgroundColor: colors.border },
                        ]}
                      >
                        {step.done && (
                          <Feather name="check" size={10} color="#fff" />
                        )}
                      </View>
                      {!isLast && (
                        <View
                          style={[
                            s.timelineLine,
                            step.done
                              ? { backgroundColor: stepCfg.color + "40" }
                              : { backgroundColor: colors.border },
                          ]}
                        />
                      )}
                    </View>
                    <View style={s.timelineContent}>
                      <Text
                        style={[
                          s.timelineLabel,
                          !step.done && { color: colors.textMuted },
                        ]}
                      >
                        {t(stepCfg.label)}
                      </Text>
                      <Text style={s.timelineDate}>
                        {step.date || (step.done ? "" : t("app_pending"))}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}

      {/* Empty state hint */}
      {APPLICATIONS.length === 0 && (
        <View style={s.emptyState}>
          <View style={s.emptyIcon}>
            <Feather name="inbox" size={48} color={colors.textMuted} />
          </View>
          <Text style={s.emptyTitle}>{t("app_empty_title")}</Text>
          <Text style={s.emptySub}>{t("app_empty_sub")}</Text>
        </View>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  summaryRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryNum: { fontSize: 22, fontWeight: "800", color: colors.text },
  summaryLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },

  card: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { fontSize: 18, fontWeight: "700" },
  cardTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  cardCompany: { fontSize: 13, color: colors.textSecondary, marginTop: 1 },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  statusText: { fontSize: 11, fontWeight: "600" },

  timeline: { paddingLeft: 4 },
  timelineStep: { flexDirection: "row", minHeight: 44 },
  timelineLeft: { alignItems: "center", width: 28 },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineLine: { width: 2, flex: 1, marginVertical: 2 },
  timelineContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: spacing.sm,
    paddingBottom: spacing.md,
  },
  timelineLabel: { fontSize: 13, fontWeight: "600", color: colors.text },
  timelineDate: { fontSize: 12, color: colors.textMuted },

  emptyState: { alignItems: "center", paddingTop: 60 },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceAlt,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
  emptySub: { fontSize: 14, color: colors.textMuted, marginTop: 6, textAlign: "center", paddingHorizontal: 40 },
});
