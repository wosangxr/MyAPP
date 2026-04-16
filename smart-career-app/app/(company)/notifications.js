import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { spacing, radius, shadow } from "../../theme/colors";

const MOCK_NOTIFS = [
  { id: "1", title: "Top Match Applied!", desc: "A candidate with 96% match applied for Frontend Developer.", time: "2 min ago", icon: "cpu", color: "#10B981" },
  { id: "2", title: "Interview Accepted", desc: "Sarah Connor accepted your interview invitation.", time: "1 hour ago", icon: "calendar", color: "#8B5CF6" },
  { id: "3", title: "Job Post Expiring", desc: "Your posting for 'UX Designer' will expire in 2 days.", time: "5 hours ago", icon: "alert-circle", color: "#F59E0B" },
];

export default function CompanyNotifications() {
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Feather name="arrow-left" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.text }]}>Notifications</Text>
      </View>

      <FlatList
        data={MOCK_NOTIFS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <TouchableOpacity style={[s.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            <View style={[s.iconBox, { backgroundColor: item.color + '20' }]}>
              <Feather name={item.icon} size={20} color={item.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.cardTitle, { color: c.text }]}>{item.title}</Text>
              <Text style={[s.desc, { color: c.textMuted }]}>{item.desc}</Text>
              <Text style={[s.time, { color: c.textMuted }]}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={s.empty}>
            <Feather name="bell-off" size={48} color={c.border} />
            <Text style={{ color: c.textMuted, marginTop: 12 }}>You're all caught up!</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: 40,
  },
  title: { fontSize: 24, fontWeight: '800' },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    gap: 12,
    ...shadow.sm,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  desc: { fontSize: 13, marginTop: 4, lineHeight: 18 },
  time: { fontSize: 11, marginTop: 6 },
  empty: { alignItems: 'center', marginTop: 100 }
});
