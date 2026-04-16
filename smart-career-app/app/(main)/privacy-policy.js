import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        We value your privacy. This app collects only the minimum data required for functionality and analytics. Your data is never sold or shared with third parties except as required by law. You may request data deletion at any time by contacting support.
      </Text>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.text}>
        By using this app, you agree to use it for lawful purposes only. The app is provided as-is without warranty. We reserve the right to update these terms at any time. Continued use of the app constitutes acceptance of any changes.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 16, marginBottom: 8, color: "#4F46E5" },
  text: { fontSize: 15, color: "#222", marginBottom: 16 },
});
