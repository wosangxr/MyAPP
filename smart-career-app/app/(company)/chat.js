import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { spacing, radius, shadow } from "../../theme/colors";

const MOCK_CHATS = [
  { id: "1", name: "สมชาย ใจดี", role: "Full Stack Developer", msg: "ผมส่งพอร์ตโฟลิโอให้พิจารณาเพิ่มเติมครับ", time: "10:30 AM", unread: 2 },
  { id: "2", name: "สุธิดา รักงาน", role: "UX/UI Designer", msg: "ขอบคุณค่ะ สะดวกสัมภาษณ์วันศุกร์นี้ค่ะ", time: "เมื่อวาน", unread: 0 },
  { id: "3", name: "ธนภัทร นักสู้", role: "System Analyst", msg: "ไม่ทราบว่าสวัสดิการมี WFH ไหมครับ?", time: "จันทร์", unread: 0 },
];

export default function CompanyChat() {
  const { t } = useLang();
  const { c } = useTheme();
  const [search, setSearch] = useState("");

  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Feather name="arrow-left" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.text }]}>Inbox</Text>
      </View>

      <View style={s.searchContainer}>
        <View style={[s.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Feather name="search" size={18} color={c.textMuted} />
          <TextInput
            placeholder="Search candidates..."
            placeholderTextColor={c.textMuted}
            style={[s.searchInput, { color: c.text }]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[s.chatCard, { backgroundColor: c.surface, borderColor: c.border }]}
            onPress={() => router.push({ pathname: '/(company)/chat-room', params: { name: item.name } })}
          >
            <View style={[s.avatar, { backgroundColor: '#10B98120' }]}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#10B981' }}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={s.chatHeader}>
                <Text style={[s.chatName, { color: c.text }]}>{item.name}</Text>
                <Text style={[s.time, { color: c.textMuted }]}>{item.time}</Text>
              </View>
              <Text style={[s.roleText, { color: c.textMuted }]}>{item.role}</Text>
              <View style={s.msgRow}>
                <Text style={[s.msgText, { color: item.unread > 0 ? c.text : c.textMuted }]} numberOfLines={1}>
                  {item.msg}
                </Text>
                {item.unread > 0 && (
                  <View style={s.badge}>
                    <Text style={s.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={{ color: c.textMuted }}>No conversations found</Text>
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
  searchContainer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    gap: 12,
    ...shadow.sm,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chatName: { fontSize: 16, fontWeight: '700' },
  roleText: { fontSize: 12, marginTop: 2, marginBottom: 4 },
  time: { fontSize: 12 },
  msgRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  msgText: { fontSize: 14, flex: 1, paddingRight: 10 },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  empty: { padding: 40, alignItems: 'center' }
});
