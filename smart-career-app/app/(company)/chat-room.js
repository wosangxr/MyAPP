import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../context/themeContext";
import { radius, spacing } from "../../theme/colors";

export default function ChatRoom() {
  const { name } = useLocalSearchParams();
  const { c } = useTheme();
  const [msg, setMsg] = useState("");
  
  const [messages, setMessages] = useState([
    { id: "1", text: "สวัสดีครับ สนใจผู้สมัครคนนี้ไหมครับ?", sender: "hr", time: "10:00 AM" },
    { id: "2", text: "สวัสดีครับ สนใจร่วมงานกับบริษัทมากครับ พร้อมเริ่มงานทันที!", sender: "applicant", time: "10:30 AM" },
  ]);

  const autoReplies = [
      "ขอบคุณครับ สะดวกสัมภาษณ์ออนไลน์วันไหนบ้างครับ?",
      "ผมส่งเรซูเม่ฉบับอัปเดตไปให้แล้วนะครับ",
      "เรื่องเงินเดือนสามารถต่อรองได้ครับ",
      "บริษัทยังเปิดรับตำแหน่งนี้อยู่ไหมครับ?",
      "ยินดีมากครับ หวังว่าจะได้ร่วมงานกันนะครับ"
  ];

  const handleSend = () => {
    if (!msg.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      text: msg.trim(),
      sender: "hr",
      time: "Now",
    };
    setMessages(prev => [...prev, newMsg]);
    setMsg("");

    // Auto-reply bot in Thai after 1 second
    setTimeout(() => {
        const replyMsg = {
            id: (Date.now() + 1).toString(),
            text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
            sender: "applicant",
            time: "Now",
        };
        setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <SafeAreaView style={[s.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Feather name="arrow-left" size={24} color={c.text} />
        </TouchableOpacity>
        <View style={s.headerTitle}>
          <Text style={[s.name, { color: c.text }]}>{name || "Candidate"}</Text>
          <Text style={[s.status, { color: '#10B981' }]}>Online</Text>
        </View>
        <TouchableOpacity style={{ padding: 8 }}>
          <Feather name="phone" size={20} color={c.text} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => {
          const isHr = item.sender === "hr";
          return (
            <View style={[s.msgWrapper, isHr ? s.msgRight : s.msgLeft]}>
              <View style={[s.bubble, { backgroundColor: isHr ? '#4F46E5' : c.surface }]}>
                <Text style={[s.msgText, { color: isHr ? '#fff' : c.text }]}>{item.text}</Text>
              </View>
              <Text style={[s.msgTime, { color: c.textMuted }]}>{item.time}</Text>
            </View>
          );
        }}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[s.inputArea, { backgroundColor: c.surface, borderTopColor: c.border }]}>
          <TouchableOpacity style={s.attachBtn}>
            <Feather name="paperclip" size={20} color={c.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={[s.input, { color: c.text, backgroundColor: c.background }]}
            placeholder="Type a message..."
            placeholderTextColor={c.textMuted}
            value={msg}
            onChangeText={setMsg}
            multiline
          />
          <TouchableOpacity 
            style={[s.sendBtn, msg.trim() ? { backgroundColor: '#4F46E5' } : { backgroundColor: c.border }]} 
            onPress={handleSend}
            disabled={!msg.trim()}
          >
            <Feather name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginTop: 30, // For Android status bar
  },
  headerTitle: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '700' },
  status: { fontSize: 12, fontWeight: '600' },
  
  msgWrapper: { marginBottom: 16, maxWidth: '80%' },
  msgRight: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  msgLeft: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  msgText: { fontSize: 15, lineHeight: 22 },
  msgTime: { fontSize: 11, marginTop: 4, marginHorizontal: 4 },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
  },
  attachBtn: { padding: 8 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
