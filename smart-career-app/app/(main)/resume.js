import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useResumeStore } from "../../store/useResumeStore";
import { useProfileStore } from "../../store/useProfileStore";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

function SectionCard({ title, icon, children, onAdd }) {
  return (
    <View style={s.sectionCard}>
      <View style={s.sectionHeader}>
        <View style={s.sectionIcon}>
          <Feather name={icon} size={16} color={colors.primary} />
        </View>
        <Text style={s.sectionTitle}>{title}</Text>
        {onAdd && (
          <TouchableOpacity onPress={onAdd} style={s.addBtn}>
            <Feather name="plus" size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

export default function Resume() {
  const resume = useResumeStore();
  const profile = useProfileStore();
  const { t } = useLang();
  const { c } = useTheme();
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newLang, setNewLang] = useState({ name: "", level: "Intermediate" });
  const [newCert, setNewCert] = useState({ name: "", issuer: "", year: "" });

  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      resume.setResume({ pdfUri: asset.uri, pdfName: asset.name });
      Alert.alert(t("resume_uploaded"), t("resume_uploaded_msg"));
    }
  };

  const removePdf = () => {
    resume.setResume({ pdfUri: "", pdfName: "" });
  };

  const startEdit = (field, value) => {
    setEditing(field);
    setEditValue(value);
  };

  const saveEdit = (field) => {
    resume.setResume({ [field]: editValue });
    setEditing(null);
  };

  const renderEditableField = (label, field, value, multiline = false) => (
    <View style={s.fieldRow}>
      <Text style={s.fieldLabel}>{label}</Text>
      {editing === field ? (
        <View style={s.editRow}>
          <TextInput
            style={[s.editInput, multiline && { height: 80, textAlignVertical: "top" }]}
            value={editValue}
            onChangeText={setEditValue}
            multiline={multiline}
            autoFocus
          />
          <View style={s.editActions}>
            <TouchableOpacity style={s.saveBtn} onPress={() => saveEdit(field)}>
              <Feather name="check" size={16} color={colors.textWhite} />
            </TouchableOpacity>
            <TouchableOpacity style={s.cancelBtn} onPress={() => setEditing(null)}>
              <Feather name="x" size={16} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => startEdit(field, value)} style={s.fieldValueRow}>
          <Text style={s.fieldValue}>{value}</Text>
          <Feather name="edit-2" size={13} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* Resume Header Preview */}
      <View style={s.previewCard}>
        <View style={s.previewHeader}>
          <View style={s.previewAvatar}>
            <Text style={s.previewAvatarText}>
              {resume.fullName.split(" ").map((n) => n[0]).join("")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.previewName}>{resume.fullName}</Text>
            <Text style={s.previewTitle}>{resume.jobTitle}</Text>
          </View>
          <View style={s.lastUpdatedBadge}>
            <Feather name="clock" size={12} color={colors.success} />
            <Text style={s.lastUpdatedText}>Updated {resume.lastUpdated}</Text>
          </View>
        </View>
        <View style={s.previewContact}>
          <View style={s.contactItem}>
            <Feather name="mail" size={13} color={colors.textMuted} />
            <Text style={s.contactText}>{resume.email}</Text>
          </View>
          <View style={s.contactItem}>
            <Feather name="phone" size={13} color={colors.textMuted} />
            <Text style={s.contactText}>{resume.phone}</Text>
          </View>
          <View style={s.contactItem}>
            <Feather name="map-pin" size={13} color={colors.textMuted} />
            <Text style={s.contactText}>{resume.location}</Text>
          </View>
          <View style={s.contactItem}>
            <Feather name="globe" size={13} color={colors.textMuted} />
            <Text style={s.contactText}>{resume.website}</Text>
          </View>
        </View>
      </View>

      {/* Editable Sections */}
      <SectionCard title={t("contact_info")} icon="user">
        {renderEditableField(t("full_name"), "fullName", resume.fullName)}
        {renderEditableField(t("job_title"), "jobTitle", resume.jobTitle)}
        {renderEditableField(t("email"), "email", resume.email)}
        {renderEditableField(t("phone"), "phone", resume.phone)}
        {renderEditableField(t("location"), "location", resume.location)}
        {renderEditableField(t("website"), "website", resume.website)}
      </SectionCard>

      <SectionCard title={t("professional_summary")} icon="align-left">
        {renderEditableField(t("summary"), "summary", resume.summary, true)}
      </SectionCard>

      {/* Skills */}
      <SectionCard
        title={t("skills")}
        icon="zap"
        onAdd={() => {
          if (newSkill.trim()) {
            resume.addResumeSkill(newSkill.trim());
            setNewSkill("");
          }
        }}
      >
        <View style={s.skillsWrap}>
          {resume.skills.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={s.skillChip}
              onLongPress={() => {
                Alert.alert(t("remove_skill"), `${t("remove_skill_confirm")}`, [
                  { text: t("cancel") },
                  { text: t("remove"), style: "destructive", onPress: () => resume.removeResumeSkill(skill) },
                ]);
              }}
            >
              <Text style={s.skillChipText}>{skill}</Text>
              <Feather name="x" size={12} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.addSkillRow}>
          <TextInput
            style={s.addSkillInput}
            placeholder={t("add_new_skill")}
            placeholderTextColor={colors.textMuted}
            value={newSkill}
            onChangeText={setNewSkill}
            onSubmitEditing={() => {
              if (newSkill.trim()) {
                resume.addResumeSkill(newSkill.trim());
                setNewSkill("");
              }
            }}
          />
          <TouchableOpacity
            style={[s.addSkillBtn, !newSkill.trim() && { opacity: 0.4 }]}
            onPress={() => {
              if (newSkill.trim()) {
                resume.addResumeSkill(newSkill.trim());
                setNewSkill("");
              }
            }}
          >
            <Feather name="plus" size={16} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </SectionCard>

      {/* Experience from Profile */}
      <SectionCard title={t("work_experience")} icon="briefcase">
        {profile.experiences.map((exp) => (
          <View key={exp.id} style={s.expItem}>
            <View style={s.expTimeline}>
              <View style={s.timelineDot} />
              <View style={s.timelineLine} />
            </View>
            <View style={s.expBody}>
              <Text style={s.expItemTitle}>{exp.title}</Text>
              <Text style={s.expItemCompany}>{exp.company}</Text>
              <Text style={s.expItemPeriod}>{exp.period}</Text>
              <Text style={s.expItemDesc}>{exp.description}</Text>
            </View>
          </View>
        ))}
      </SectionCard>

      {/* Education from Profile */}
      <SectionCard title={t("education")} icon="book-open">
        {profile.education.map((edu) => (
          <View key={edu.id} style={s.eduItem}>
            <View style={s.eduBullet}>
              <Feather name="award" size={16} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.eduItemDegree}>{edu.degree}</Text>
              <Text style={s.eduItemSchool}>{edu.school}</Text>
              <Text style={s.eduItemYear}>{edu.year}</Text>
            </View>
          </View>
        ))}
      </SectionCard>

      {/* Languages */}
      <SectionCard
        title={t("languages")}
        icon="globe"
        onAdd={() => {
          if (newLang.name.trim()) {
            resume.addLanguage(newLang);
            setNewLang({ name: "", level: "Intermediate" });
          }
        }}
      >
        {resume.languages.map((lang) => (
          <View key={lang.name} style={s.langItem}>
            <Text style={s.langName}>{lang.name}</Text>
            <View style={s.langLevel}>
              <Text style={s.langLevelText}>{lang.level}</Text>
            </View>
            <TouchableOpacity
              onPress={() => resume.removeLanguage(lang.name)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="trash-2" size={14} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={s.addLangRow}>
          <TextInput
            style={s.addLangInput}
            placeholder={t("language")}
            placeholderTextColor={colors.textMuted}
            value={newLang.name}
            onChangeText={(v) => setNewLang({ ...newLang, name: v })}
          />
          <TextInput
            style={s.addLangInput}
            placeholder={t("level")}
            placeholderTextColor={colors.textMuted}
            value={newLang.level}
            onChangeText={(v) => setNewLang({ ...newLang, level: v })}
          />
          <TouchableOpacity
            style={[s.addSkillBtn, !newLang.name.trim() && { opacity: 0.4 }]}
            onPress={() => {
              if (newLang.name.trim()) {
                resume.addLanguage(newLang);
                setNewLang({ name: "", level: "Intermediate" });
              }
            }}
          >
            <Feather name="plus" size={16} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </SectionCard>

      {/* Certifications */}
      <SectionCard
        title={t("certifications")}
        icon="award"
        onAdd={() => {
          if (newCert.name.trim()) {
            resume.addCertification(newCert);
            setNewCert({ name: "", issuer: "", year: "" });
          }
        }}
      >
        {resume.certifications.map((cert) => (
          <View key={cert.name} style={s.certItem}>
            <View style={s.certIcon}>
              <Feather name="check-circle" size={16} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.certName}>{cert.name}</Text>
              <Text style={s.certIssuer}>{cert.issuer} · {cert.year}</Text>
            </View>
            <TouchableOpacity
              onPress={() => resume.removeCertification(cert.name)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="trash-2" size={14} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={s.addCertRow}>
          <TextInput style={s.addCertInput} placeholder={t("cert_name")} placeholderTextColor={colors.textMuted} value={newCert.name} onChangeText={(t) => setNewCert({ ...newCert, name: t })} />
          <TextInput style={s.addCertInput} placeholder={t("issuer")} placeholderTextColor={colors.textMuted} value={newCert.issuer} onChangeText={(t) => setNewCert({ ...newCert, issuer: t })} />
          <TextInput style={[s.addCertInput, { width: 60 }]} placeholder={t("year")} placeholderTextColor={colors.textMuted} value={newCert.year} onChangeText={(t) => setNewCert({ ...newCert, year: t })} keyboardType="numeric" />
          <TouchableOpacity
            style={[s.addSkillBtn, !newCert.name.trim() && { opacity: 0.4 }]}
            onPress={() => {
              if (newCert.name.trim()) {
                resume.addCertification(newCert);
                setNewCert({ name: "", issuer: "", year: "" });
              }
            }}
          >
            <Feather name="plus" size={16} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </SectionCard>

      {/* PDF Resume Upload */}
      <SectionCard title={t("upload_resume_pdf")} icon="file">
        {resume.pdfUri ? (
          <View style={s.pdfRow}>
            <View style={s.pdfIcon}>
              <Feather name="file-text" size={22} color={colors.error} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.pdfName} numberOfLines={1}>{resume.pdfName}</Text>
              <Text style={s.pdfSize}>PDF</Text>
            </View>
            <TouchableOpacity onPress={removePdf} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Feather name="trash-2" size={16} color={colors.error} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={s.uploadBtn} onPress={pickPdf}>
            <Feather name="upload-cloud" size={28} color={colors.primary} />
            <Text style={s.uploadText}>{t("upload_resume_pdf")}</Text>
            <Text style={s.uploadHint}>PDF (max 10MB)</Text>
          </TouchableOpacity>
        )}
      </SectionCard>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  previewCard: {
    backgroundColor: colors.dark,
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
  },
  previewHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  previewAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  previewAvatarText: { color: colors.textWhite, fontSize: 18, fontWeight: "700" },
  previewName: { color: colors.textWhite, fontSize: 18, fontWeight: "700" },
  previewTitle: { color: colors.textMuted, fontSize: 13 },
  lastUpdatedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.success + "18",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  lastUpdatedText: { fontSize: 10, color: colors.success, fontWeight: "500" },
  previewContact: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginTop: spacing.lg },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  contactText: { fontSize: 12, color: colors.textMuted },

  sectionCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: { flex: 1, fontSize: 16, fontWeight: "700", color: colors.text },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },

  fieldRow: { marginBottom: spacing.md },
  fieldLabel: { fontSize: 12, fontWeight: "600", color: colors.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  fieldValueRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  fieldValue: { fontSize: 15, color: colors.text, flex: 1 },

  editRow: { gap: spacing.sm },
  editInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.primaryBg,
  },
  editActions: { flexDirection: "row", gap: spacing.sm },
  saveBtn: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: colors.errorBg,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  skillChipText: { fontSize: 13, fontWeight: "600", color: colors.primary },
  addSkillRow: { flexDirection: "row", gap: spacing.sm },
  addSkillInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },
  addSkillBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  expItem: { flexDirection: "row", marginBottom: spacing.lg },
  expTimeline: { alignItems: "center", width: 20, marginRight: spacing.md },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.primaryBg,
    marginTop: 4,
  },
  expBody: { flex: 1 },
  expItemTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  expItemCompany: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  expItemPeriod: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  expItemDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginTop: 6 },

  eduItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  eduBullet: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
  },
  eduItemDegree: { fontSize: 14, fontWeight: "600", color: colors.text },
  eduItemSchool: { fontSize: 13, color: colors.textSecondary },
  eduItemYear: { fontSize: 12, color: colors.textMuted },

  langItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  langName: { fontSize: 14, fontWeight: "600", color: colors.text, flex: 1 },
  langLevel: {
    backgroundColor: colors.primaryBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
    marginRight: spacing.sm,
  },
  langLevelText: { fontSize: 12, color: colors.primary, fontWeight: "600" },
  addLangRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  addLangInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },

  certItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  certIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.successBg,
    justifyContent: "center",
    alignItems: "center",
  },
  certName: { fontSize: 14, fontWeight: "600", color: colors.text },
  certIssuer: { fontSize: 12, color: colors.textMuted },
  addCertRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md, flexWrap: "wrap" },
  addCertInput: {
    flex: 1,
    minWidth: 80,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },

  /* PDF Upload */
  pdfRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.errorBg,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  pdfIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: colors.error + "18",
    justifyContent: "center",
    alignItems: "center",
  },
  pdfName: { fontSize: 14, fontWeight: "600", color: colors.text },
  pdfSize: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  uploadBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: radius.md,
    gap: 6,
  },
  uploadText: { fontSize: 14, fontWeight: "600", color: colors.primary },
  uploadHint: { fontSize: 12, color: colors.textMuted },
});
