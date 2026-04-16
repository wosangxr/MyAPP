import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppStore } from "../../store/useAppStore";
import { colors, spacing, radius } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const ICON_MAP = {
  interview: { icon: "calendar", color: colors.primary, bg: colors.primaryBg },
  message: { icon: "message-circle", color: colors.accent, bg: colors.accent + "15" },
  match: { icon: "zap", color: colors.success, bg: colors.successBg },
  status: { icon: "refresh-cw", color: colors.warning, bg: colors.warningBg },
  system: { icon: "info", color: colors.textMuted, bg: colors.surfaceAlt },
};

function NotifCard({ item, onPress }) {
  const cfg = ICON_MAP[item.type] || ICON_MAP.system;
  return (
    <TouchableOpacity
      style={[s.card, !item.read && s.cardUnread]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={[s.iconCircle, { backgroundColor: cfg.bg }]}>
        <Feather name={cfg.icon} size={18} color={cfg.color} />
      </View>
      <View style={s.cardContent}>
        <View style={s.cardHeader}>
          <Text style={[s.cardTitle, !item.read && { color: colors.text }]}>{item.title}</Text>
          {!item.read && <View style={s.unreadDot} />}
        </View>
        <Text style={s.cardBody} numberOfLines={2}>{item.body}</Text>
        <Text style={s.cardTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useAppStore();
  const unread = unreadCount();
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {/* Header Bar */}
      <View style={s.headerBar}>
        <View style={s.headerLeft}>
          {unread > 0 && (
            <View style={s.badge}>
              <Text style={s.badgeText}>{unread}</Text>
            </View>
          )}
          <Text style={s.headerText}>
            {unread > 0 ? `${unread} ${t("new_notifications")}` : t("all_caught_up_notif")}
          </Text>
        </View>
        {unread > 0 && (
          <TouchableOpacity onPress={markAllNotificationsRead}>
            <Text style={s.markAll}>{t("mark_all_read")}</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <NotifCard item={item} onPress={() => markNotificationRead(item.id)} />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  badge: {
    backgroundColor: colors.error,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: colors.textWhite, fontSize: 11, fontWeight: "700" },
  headerText: { fontSize: 14, color: colors.textSecondary },
  markAll: { fontSize: 13, fontWeight: "600", color: colors.primary },

  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardUnread: {
    backgroundColor: colors.primaryBg,
    borderColor: colors.primary + "20",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: { flex: 1 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cardTitle: { fontSize: 15, fontWeight: "600", color: colors.textSecondary, flex: 1 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  cardBody: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginTop: 4 },
  cardTime: { fontSize: 12, color: colors.textMuted, marginTop: 6 },
});
