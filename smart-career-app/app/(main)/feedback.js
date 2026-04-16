import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { logEvent } from "../../utils/analytics";

export default function FeedbackScreen() {
  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert("Please enter your message.");
      return;
    }
    setSending(true);
    // Log analytics event
    logEvent("feedback_submitted", { type });
    // Simulate sending (replace with real API/email integration)
    setTimeout(() => {
      setSending(false);
      setMessage("");
      setEmail("");
      Alert.alert("Thank you! Your message has been sent.");
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Support / Feedback</Text>
      <View style={styles.typeRow}>
        <Button title="Feedback" onPress={() => setType("feedback")}
          color={type === "feedback" ? "#4F46E5" : undefined} />
        <Button title="Report Bug" onPress={() => setType("bug")}
          color={type === "bug" ? "#F87171" : undefined} />
        <Button title="Contact" onPress={() => setType("contact")}
          color={type === "contact" ? "#06B6D4" : undefined} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Your email (optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder={type === "bug" ? "Describe the bug..." : "Type your message..."}
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button
        title={sending ? "Sending..." : "Send"}
        onPress={handleSubmit}
        disabled={sending}
        color="#4F46E5"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16, color: "#4F46E5" },
  typeRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#F8FAFC"
  },
});
