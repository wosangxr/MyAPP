import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useProfileStore } from "../../store/useProfileStore";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

function FormField({ label, icon, value, onChangeText, placeholder, multiline = false }) {
  return (
    <View style={s.fieldGroup}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={[s.inputBox, multiline && { alignItems: "flex-start" }]}>
        <Feather name={icon} size={18} color={colors.textMuted} style={{ marginTop: multiline ? 4 : 0 }} />
        <TextInput
          style={[s.input, multiline && { height: 100, textAlignVertical: "top" }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
        />
      </View>
    </View>
  );
}

export default function EditProfile() {
  const store = useProfileStore();
  const { c } = useTheme();
  const [name, setName] = useState(store.name);
  const [title, setTitle] = useState(store.title);
  const [email, setEmail] = useState(store.email);
  const [phone, setPhone] = useState(store.phone);
  const [location, setLocation] = useState(store.location);
  const [bio, setBio] = useState(store.bio);
  const [avatarUri, setAvatarUri] = useState(store.avatar);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([...store.skills]);

  // Experience form
  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expPeriod, setExpPeriod] = useState("");
  const [expDesc, setExpDesc] = useState("");

  // Portfolio form
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTags, setProjTags] = useState("");
  const { t } = useLang();

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addExperience = () => {
    if (!expTitle.trim() || !expCompany.trim()) {
      Alert.alert(t("required"), t("enter_job_company"));
      return;
    }
    store.addExperience({
      id: Date.now().toString(),
      title: expTitle,
      company: expCompany,
      period: expPeriod,
      description: expDesc,
    });
    setExpTitle("");
    setExpCompany("");
    setExpPeriod("");
    setExpDesc("");
    Alert.alert(t("added"), t("experience_added"));
  };

  const addProject = () => {
    if (!projTitle.trim()) {
      Alert.alert(t("required"), t("enter_project_title"));
      return;
    }
    store.addPortfolio({
      id: Date.now().toString(),
      title: projTitle,
      description: projDesc,
      tags: projTags.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setProjTitle("");
    setProjDesc("");
    setProjTags("");
    Alert.alert(t("added"), t("project_added"));
  };

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(t("permission_needed"), t("gallery_permission_msg"));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    store.setProfile({ name, title, email, phone, location, bio, skills, avatar: avatarUri });
    Alert.alert(t("profile_saved"), t("profile_updated"), [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.avatarEdit}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={s.avatarImg} />
          ) : (
            <View style={s.avatar}>
              <Feather name="user" size={32} color={colors.textWhite} />
            </View>
          )}
          <TouchableOpacity style={s.cameraBtn} onPress={pickAvatar}>
            <Feather name="camera" size={14} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
        <Text style={s.headerTitle}>{t("edit_your_profile")}</Text>
        <Text style={s.headerSub}>{t("complete_profile_hint")}</Text>
      </View>

      {/* Basic Info */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{t("basic_info")}</Text>
        <FormField label={t("full_name")} icon="user" value={name} onChangeText={setName} />
        <FormField label={t("job_title")} icon="briefcase" value={title} onChangeText={setTitle} />
        <FormField label={t("email")} icon="mail" value={email} onChangeText={setEmail} />
        <FormField label={t("phone")} icon="phone" value={phone} onChangeText={setPhone} />
        <FormField label={t("location")} icon="map-pin" value={location} onChangeText={setLocation} />
        <FormField label={t("bio")} icon="align-left" value={bio} onChangeText={setBio} multiline />
      </View>

      {/* Skills */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{t("skills_expertise")}</Text>
        <View style={s.skillsWrap}>
          {skills.map((skill) => (
            <TouchableOpacity key={skill} style={s.skillChip} onPress={() => removeSkill(skill)}>
              <Text style={s.skillChipText}>{skill}</Text>
              <Feather name="x" size={12} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.addRow}>
          <TextInput
            style={s.addInput}
            placeholder={t("add_skill_placeholder")}
            placeholderTextColor={colors.textMuted}
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={addSkill}
          />
          <TouchableOpacity style={s.addRowBtn} onPress={addSkill}>
            <Feather name="plus" size={18} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Experience */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{t("add_experience")}</Text>
        <FormField label={t("job_title")} icon="briefcase" value={expTitle} onChangeText={setExpTitle} placeholder="e.g. Software Engineer" />
        <FormField label={t("company")} icon="home" value={expCompany} onChangeText={setExpCompany} placeholder="e.g. TechCorp" />
        <FormField label={t("period")} icon="calendar" value={expPeriod} onChangeText={setExpPeriod} placeholder="e.g. Jan 2024 - Present" />
        <FormField label={t("description")} icon="file-text" value={expDesc} onChangeText={setExpDesc} placeholder="" multiline />
        <TouchableOpacity style={s.outlineBtn} onPress={addExperience}>
          <Feather name="plus-circle" size={16} color={colors.primary} />
          <Text style={s.outlineBtnText}>{t("add_experience")}</Text>
        </TouchableOpacity>

        {/* Existing Experiences */}
        {store.experiences.length > 0 && (
          <View style={s.existingList}>
            <Text style={s.existingTitle}>{t("current_experiences")}</Text>
            {store.experiences.map((exp) => (
              <View key={exp.id} style={s.existingItem}>
                <View style={{ flex: 1 }}>
                  <Text style={s.existingItemTitle}>{exp.title}</Text>
                  <Text style={s.existingItemSub}>{exp.company} · {exp.period}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(t("delete"), `${t("remove")} "${exp.title}"?`, [
                      { text: t("cancel") },
                      { text: t("delete"), style: "destructive", onPress: () => store.removeExperience(exp.id) },
                    ]);
                  }}
                >
                  <Feather name="trash-2" size={16} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Add Portfolio */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>{t("add_project_portfolio")}</Text>
        <FormField label={t("project_title")} icon="folder" value={projTitle} onChangeText={setProjTitle} placeholder="" />
        <FormField label={t("description")} icon="align-left" value={projDesc} onChangeText={setProjDesc} placeholder="" multiline />
        <FormField label={t("tags_comma")} icon="tag" value={projTags} onChangeText={setProjTags} placeholder="React, Node.js, Firebase" />
        <TouchableOpacity style={s.outlineBtn} onPress={addProject}>
          <Feather name="plus-circle" size={16} color={colors.primary} />
          <Text style={s.outlineBtnText}>{t("add_project")}</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <View style={s.saveSection}>
        <TouchableOpacity style={s.saveBtn} onPress={handleSave}>
          <Feather name="check" size={18} color={colors.textWhite} />
          <Text style={s.saveBtnText}>{t("save_changes")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.cancelBtn} onPress={() => router.back()}>
          <Text style={s.cancelBtnText}>{t("cancel")}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: { alignItems: "center", paddingVertical: spacing.xxl, backgroundColor: colors.surface },
  avatarEdit: { position: "relative" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.surface,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: colors.text, marginTop: spacing.md },
  headerSub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },

  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: colors.text, marginBottom: spacing.md },

  fieldGroup: { marginBottom: spacing.md },
  fieldLabel: { fontSize: 12, fontWeight: "600", color: colors.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    backgroundColor: colors.surfaceAlt,
    gap: spacing.sm,
  },
  input: { flex: 1, fontSize: 15, color: colors.text },

  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  skillChipText: { fontSize: 13, fontWeight: "600", color: colors.primary },

  addRow: { flexDirection: "row", gap: spacing.sm },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
  },
  addRowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    borderStyle: "dashed",
    marginTop: spacing.sm,
  },
  outlineBtnText: { fontSize: 14, fontWeight: "600", color: colors.primary },

  existingList: { marginTop: spacing.lg },
  existingTitle: { fontSize: 14, fontWeight: "600", color: colors.textSecondary, marginBottom: spacing.sm },
  existingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  existingItemTitle: { fontSize: 14, fontWeight: "600", color: colors.text },
  existingItemSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },

  saveSection: { padding: spacing.lg, gap: spacing.sm },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    ...shadow.md,
  },
  saveBtnText: { color: colors.textWhite, fontSize: 16, fontWeight: "700" },
  cancelBtn: {
    padding: 14,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelBtnText: { color: colors.textSecondary, fontSize: 15, fontWeight: "600" },
});
