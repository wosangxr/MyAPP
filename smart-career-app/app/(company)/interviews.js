import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { spacing, radius, shadow } from "../../theme/colors";

const MOCK_INTERVIEWS = [
  { id: "1", name: "Alex Johnson", role: "Frontend Developer", date: "Today", time: "2:00 PM", type: "Video Call" },
  { id: "2", name: "Sarah Connor", role: "UX Designer", date: "Tomorrow", time: "10:00 AM", type: "On-site" },
  { id: "3", name: "John Doe", role: "Backend Engineer", date: "Friday", time: "11:30 AM", type: "Video Call" },
];

export default function CompanyInterviews() {
  const { t } = useLang();
  const { c } = useTheme();

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Feather name="arrow-left" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.text }]}>Interview Agenda</Text>
      </View>

      <FlatList
        data={MOCK_INTERVIEWS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <View style={[s.card, { backgroundColor: c.surface, borderColor: c.border }]}>
            <View style={s.cardTop}>
              <View style={[s.dateBox, { backgroundColor: '#8B5CF615' }]}>
                <Text style={{ fontSize: 10, color: '#8B5CF6', textTransform: 'uppercase', fontWeight: '700' }}>{item.date}</Text>
                <Text style={{ fontSize: 16, color: '#8B5CF6', fontWeight: '800' }}>{item.time.split(' ')[0]}</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <Text style={[s.name, { color: c.text }]}>{item.name}</Text>
                <Text style={[s.role, { color: c.textMuted }]}>{item.role}</Text>
              </View>
              <View style={[s.badge, { backgroundColor: item.type === 'Video Call' ? '#3B82F620' : '#F59E0B20' }]}>
                <Text style={[s.badgeText, { color: item.type === 'Video Call' ? '#3B82F6' : '#F59E0B' }]}>{item.type}</Text>
              </View>
            </View>

            <View style={s.actions}>
              <TouchableOpacity style={[s.actionBtn, { borderColor: c.border }]}>
                <Feather name="file-text" size={14} color={c.text} />
                <Text style={[s.actionText, { color: c.text }]}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.actionBtn, { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' }]}>
                <Feather name="video" size={14} color="#fff" />
                <Text style={[s.actionText, { color: '#fff' }]}>Join Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={s.empty}>
            <Feather name="calendar" size={48} color={c.border} />
            <Text style={{ color: c.textMuted, marginTop: 12 }}>No upcoming interviews</Text>
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
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  dateBox: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '700' },
  role: { fontSize: 13, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '800' },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#00000008',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 8,
  },
  actionText: { fontSize: 13, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 100 }
});
