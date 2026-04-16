import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { colors, spacing, radius } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const INITIAL_MESSAGES = [
  { id: "1", text: "สวัสดีค่ะ! ดิฉัน HR จาก TechCorp ค่ะ 😊", sender: "hr", time: "10:00" },
  { id: "2", text: "เราสนใจโปรไฟล์ของคุณมากค่ะ", sender: "hr", time: "10:01" },
  { id: "3", text: "สนใจตำแหน่ง Frontend Developer ไหมคะ?", sender: "hr", time: "10:01" },
];

const AUTO_REPLIES = [
  "ขอบคุณสำหรับข้อความค่ะ! 😊",
  "ดิฉันจะตรวจสอบให้นะคะ กรุณารอสักครู่ค่ะ",
  "เยี่ยมเลยค่ะ! ทักษะของคุณตรงกับที่เราต้องการมากค่ะ",
  "สนใจนัดสัมภาษณ์ไหมคะ? สัปดาห์หน้าว่างไหมคะ",
  "ได้เลยค่ะ! จะส่งรายละเอียดให้ทางอีเมลนะคะ",
];

export default function Chat() {
  const { t } = useLang();
  const { c } = useTheme();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);
  const replyIndex = useRef(0);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate HR typing
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = AUTO_REPLIES[replyIndex.current % AUTO_REPLIES.length];
      replyIndex.current++;
      const hrMsg = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "hr",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, hrMsg]);
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, typing]);

  return (
    <KeyboardAvoidingView
      style={[s.container, { backgroundColor: c.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header */}
      <View style={s.header}>
        <View style={s.headerAvatar}>
          <Text style={s.headerAvatarText}>T</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.headerName}>TechCorp HR</Text>
          <Text style={s.headerStatus}>
            {typing ? t("chat_typing") : t("chat_online")}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.messageList}
        renderItem={({ item }) => (
          <View
            style={[
              s.bubble,
              item.sender === "user" ? s.bubbleUser : s.bubbleHR,
            ]}
          >
            <Text
              style={[
                s.bubbleText,
                item.sender === "user" ? s.bubbleTextUser : s.bubbleTextHR,
              ]}
            >
              {item.text}
            </Text>
            <Text
              style={[
                s.bubbleTime,
                item.sender === "user" ? s.bubbleTimeUser : s.bubbleTimeHR,
              ]}
            >
              {item.time}
            </Text>
          </View>
        )}
        ListFooterComponent={
          typing ? (
            <View style={[s.bubble, s.bubbleHR]}>
              <Text style={s.typingDots}>●  ●  ●</Text>
            </View>
          ) : null
        }
      />

      {/* Input */}
      <View style={s.inputBar}>
        <TextInput
          style={s.input}
          placeholder={t("chat_placeholder")}
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[s.sendBtn, !input.trim() && s.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!input.trim()}
        >
          <Feather name="send" size={18} color={input.trim() ? "#fff" : colors.textMuted} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: { fontSize: 16, fontWeight: "700", color: colors.primary },
  headerName: { fontSize: 15, fontWeight: "700", color: colors.text },
  headerStatus: { fontSize: 12, color: colors.success, marginTop: 1 },

  messageList: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },

  bubble: {
    maxWidth: "78%",
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  bubbleHR: {
    backgroundColor: colors.surface,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleTextUser: { color: "#fff" },
  bubbleTextHR: { color: colors.text },
  bubbleTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  bubbleTimeUser: { color: "rgba(255,255,255,0.7)" },
  bubbleTimeHR: { color: colors.textMuted },

  typingDots: {
    color: colors.textMuted,
    fontSize: 16,
    letterSpacing: 2,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnDisabled: {
    backgroundColor: colors.surfaceAlt,
  },
});
