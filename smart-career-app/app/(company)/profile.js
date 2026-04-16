import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { companyService } from "../../services/companyService";

export default function CompanyProfileScreen() {
  const { lang, setLang, t } = useLang();
  const { c, isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [perks, setPerks] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await companyService.getProfile("comp_1");
      setName(data.name);
      setIndustry(data.industry);
      setLocation(data.location || "");
      setSize(data.size || "");
      setDescription(data.description || "");
      setWebsite(data.website || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setVision(data.vision || "");
      setPerks(data.perks || "");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await companyService.updateProfile("comp_1", { name, industry, location, size, description, website, email, phone, vision, perks });
      Alert.alert(t("profile_saved"), t("profile_updated"));
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
      return (
          <View style={[s.container, { justifyContent: 'center', backgroundColor: c.background }]}>
              <ActivityIndicator size="large" color="#10B981" />
          </View>
      );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Feather name="arrow-left" size={24} color={c.text} />
        </TouchableOpacity>
        <View>
            <Text style={[s.title, { color: c.text }]}>{t("comp_profile_title")}</Text>
            <Text style={[s.subtitle, { color: c.textMuted }]}>{t("comp_profile_sub")}</Text>
        </View>
      </View>

      <View style={[s.card, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={s.profileHeader}>
            <TouchableOpacity style={[s.logoContainer, { backgroundColor: c.primaryBg, borderColor: c.primary + '30' }]}>
                <Feather name="camera" size={24} color={c.primary} />
                <Text style={[s.logoText, { color: c.primary }]}>{t("upload_logo")}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Text style={[s.headerName, { color: c.text }]}>{name}</Text>
                <Text style={[s.headerSub, { color: c.textMuted }]}>{industry}</Text>
            </View>
        </View>

        <View style={s.form}>
            <Text style={[s.label, { color: c.text }]}>{t("company_name_label")}</Text>
            <TextInput
                style={[s.input, { color: c.text, borderColor: c.border }]}
                value={name}
                onChangeText={setName}
            />

            <View style={s.row}>
                <View style={{ flex: 1 }}>
                    <Text style={[s.label, { color: c.text }]}>{t("industry_label")}</Text>
                    <TextInput
                        style={[s.input, { color: c.text, borderColor: c.border }]}
                        value={industry}
                        onChangeText={setIndustry}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[s.label, { color: c.text }]}>{t("location_label")}</Text>
                    <TextInput
                        style={[s.input, { color: c.text, borderColor: c.border }]}
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>
            </View>

            <Text style={[s.label, { color: c.text }]}>{t("about_company")}</Text>
            <TextInput
                style={[s.input, { color: c.text, borderColor: c.border, height: 100, textAlignVertical: 'top' }]}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text style={[s.label, { color: c.text }]}>Company Vision & Culture</Text>
            <TextInput
                style={[s.input, { color: c.text, borderColor: c.border, height: 80, textAlignVertical: 'top' }]}
                value={vision}
                onChangeText={setVision}
                multiline
                placeholderTextColor={c.textMuted}
                placeholder="Ex: We aim to revolutionize the AI landscape..."
            />

            <Text style={[s.label, { color: c.text }]}>Perks & Benefits</Text>
            <TextInput
                style={[s.input, { color: c.text, borderColor: c.border }]}
                value={perks}
                onChangeText={setPerks}
                placeholderTextColor={c.textMuted}
                placeholder="Ex: Free lunch, WFH, Health Insurance..."
            />

            <Text style={[s.label, { color: c.text }]}>{t("website_label")}</Text>
            <TextInput
                style={[s.input, { color: c.text, borderColor: c.border }]}
                value={website}
                onChangeText={setWebsite}
            />

            <View style={s.row}>
                <View style={{ flex: 1 }}>
                    <Text style={[s.label, { color: c.text }]}>{t("contact_email_label")}</Text>
                    <TextInput
                        style={[s.input, { color: c.text, borderColor: c.border }]}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[s.label, { color: c.text }]}>{t("contact_phone_label")}</Text>
                    <TextInput
                        style={[s.input, { color: c.text, borderColor: c.border }]}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
            </View>
        </View>

        <TouchableOpacity style={s.saveBtn} onPress={handleSave} disabled={saving}>
            {saving ? <ActivityIndicator color="#fff" /> : (
                <>
                    <Feather name="save" size={18} color="#fff" />
                    <Text style={s.saveBtnText}>{t("save_profile_btn")}</Text>
                </>
            )}
        </TouchableOpacity>
      </View>



      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, marginTop: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  
  card: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    ...shadow.sm,
  },
  profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24,
  },
  logoContainer: {
      width: 80,
      height: 80,
      borderRadius: radius.md,
      borderWidth: 1,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoText: { fontSize: 10, fontWeight: '700', marginTop: 4 },
  headerName: { fontSize: 18, fontWeight: '800' },
  headerSub: { fontSize: 13, marginTop: 2 },

  form: { gap: 16, marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: {
      borderWidth: 1,
      borderRadius: radius.md,
      padding: 12,
      fontSize: 14,
  },

  saveBtn: {
      backgroundColor: '#10B981',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: radius.md,
      ...shadow.md,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 14,
  },
  menuText: { fontSize: 15, fontWeight: '600' },
  divider: { height: 1, width: '100%' },
});
