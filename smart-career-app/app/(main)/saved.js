import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppStore } from "../../store/useAppStore";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

export default function Saved() {
  const { savedJobs, toggleSaveJob } = useAppStore();
  const { t } = useLang();

  const renderEmpty = () => (
    <View style={s.emptyContainer}>
      <View style={s.emptyIcon}>
        <Feather name="bookmark" size={48} color={colors.textMuted} />
      </View>
      <Text style={s.emptyTitle}>{t("no_saved_jobs")}</Text>
      <Text style={s.emptyText}>{t("saved_jobs_hint")}</Text>
      <TouchableOpacity style={s.browseBtn} onPress={() => router.push("/(main)/jobs")}>
        <Text style={s.browseBtnText}>{t("browse_jobs")}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      {/* Header Stats */}
      <View style={s.headerBar}>
        <View style={s.headerStat}>
          <Text style={s.headerStatNum}>{savedJobs.length}</Text>
          <Text style={s.headerStatLabel}>{t("saved_jobs")}</Text>
        </View>
      </View>

      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg, flexGrow: 1 }}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.card}
            activeOpacity={0.7}
            onPress={() => router.push("/(main)/job-detail")}
          >
            <View style={s.cardRow}>
              <View style={s.logoCircle}>
                <Text style={s.logoLetter}>{item.company[0]}</Text>
              </View>
              <View style={s.cardInfo}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <Text style={s.cardCompany}>{item.company}</Text>
                <View style={s.cardTags}>
                  <View style={s.cardTag}>
                    <Feather name="map-pin" size={11} color={colors.textSecondary} />
                    <Text style={s.cardTagText}>{item.location}</Text>
                  </View>
                  <View style={s.cardTag}>
                    <Feather name="dollar-sign" size={11} color={colors.textSecondary} />
                    <Text style={s.cardTagText}>{item.salary}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={s.cardFooter}>
              <View style={[s.matchBadge, { backgroundColor: item.match >= 85 ? colors.success + "18" : colors.warning + "18" }]}>
                <Text style={[s.matchText, { color: item.match >= 85 ? colors.success : colors.warning }]}>{item.match}{t("match_percent")}</Text>
              </View>
              <View style={s.cardActions}>
                <TouchableOpacity
                  style={s.applySmall}
                  onPress={() => router.push("/(main)/apply")}
                >
                  <Text style={s.applySmallText}>{t("apply")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleSaveJob(item)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Feather name="trash-2" size={16} color={colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  headerBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerStat: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  headerStatNum: { fontSize: 20, fontWeight: "700", color: colors.primary },
  headerStatLabel: { fontSize: 14, color: colors.textSecondary },

  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  cardRow: { flexDirection: "row", gap: spacing.md },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  logoLetter: { fontSize: 18, fontWeight: "700", color: colors.primary },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  cardCompany: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  cardTags: { flexDirection: "row", gap: spacing.sm, marginTop: 6 },
  cardTag: { flexDirection: "row", alignItems: "center", gap: 3 },
  cardTagText: { fontSize: 12, color: colors.textSecondary },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  matchBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  matchText: { fontSize: 12, fontWeight: "700" },
  cardActions: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  applySmall: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  applySmallText: { color: colors.textWhite, fontSize: 13, fontWeight: "600" },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 60 },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceAlt,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
  emptyText: { fontSize: 14, color: colors.textMuted, marginTop: 4, textAlign: "center" },
  browseBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radius.md,
    marginTop: spacing.lg,
  },
  browseBtnText: { color: colors.textWhite, fontSize: 14, fontWeight: "600" },
});
