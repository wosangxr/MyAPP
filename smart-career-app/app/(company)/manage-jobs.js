import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { companyService } from "../../services/companyService";

export default function ManageJobs() {
  const { t } = useLang();
  const { c } = useTheme();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [jobType, setJobType] = useState('full-time');
  const [remote, setRemote] = useState('onsite');
  const [category, setCategory] = useState("IT");
  const [exp, setExp] = useState('mid');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await companyService.getMyJobs("comp_1");
      setJobs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
      setTitle("");
      setLocation("");
      setSalary("");
      setDescription("");
      setRequirements("");
      setJobType('full-time');
      setRemote('onsite');
      setCategory("IT");
      setExp('mid');
      setEditingJob(null);
  };

  const handleOpenAdd = () => {
      resetForm();
      setShowModal(true);
  };

  const handleOpenEdit = (job) => {
      setEditingJob(job);
      setTitle(job.title);
      setLocation(job.location);
      setSalary(job.salary);
      setDescription(job.description);
      setRequirements(job.requirements);
      setJobType(job.job_type);
      setRemote(job.remote_option);
      setCategory(job.category);
      setExp(job.experience_level);
      setShowModal(true);
  };

  const handleSubmit = async () => {
      const data = { title, location, salary, description, requirements, job_type: jobType, remote_option: remote, category, experience_level: exp };
      try {
          if (editingJob) {
              await companyService.updateJob(editingJob.id, data);
          } else {
              await companyService.createJob(data);
          }
          setShowModal(false);
          fetchJobs();
      } catch (e) {
          console.error(e);
      }
  };

  const handleDelete = async (id) => {
      try {
          await companyService.deleteJob(id);
          fetchJobs();
      } catch (e) {
          console.error(e);
      }
  };

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || j.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      <View style={s.header}>
        <Text style={[s.title, { color: c.text }]}>{t("manage_jobs_title")}</Text>
        <Text style={[s.subtitle, { color: c.textMuted }]}>{t("manage_jobs_sub")}</Text>
      </View>

      {/* Filter Bar */}
      <View style={s.filterRow}>
        <View style={[s.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Feather name="search" size={18} color={c.textMuted} />
          <TextInput
            placeholder={t("search_jobs")}
            placeholderTextColor={c.textMuted}
            style={[s.searchInput, { color: c.text }]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={s.tabRow}>
        {['all', 'active', 'closed'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[
              s.tab,
              filter === f && { backgroundColor: '#10B981', borderColor: '#10B981' },
              filter !== f && { borderColor: c.border }
            ]}
          >
            <Text style={[s.tabText, { color: filter === f ? '#fff' : c.textMuted }]}>
              {t(f === 'all' ? 'app_total' : `status_${f}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator color="#10B981" />
        </View>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={item => item.id}
          contentContainerStyle={s.list}
          renderItem={({ item }) => (
            <View style={[s.jobCard, { backgroundColor: c.surface, borderColor: c.border }]}>
              <View style={s.jobHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[s.jobTitle, { color: c.text }]}>{item.title}</Text>
                  <Text style={[s.jobLoc, { color: c.textMuted }]}>
                    <Feather name="map-pin" size={12} /> {item.location} · {t(`job_type_${item.job_type.replace('-', '_')}`)}
                  </Text>
                </View>
                <View style={[s.statusBadge, { backgroundColor: item.status === 'active' ? '#10B98120' : '#EF444420' }]}>
                  <Text style={[s.statusText, { color: item.status === 'active' ? '#10B981' : '#EF4444' }]}>
                    {t(`status_${item.status}`)}
                  </Text>
                </View>
              </View>

              <View style={s.jobFooter}>
                <View style={s.stat}>
                  <Text style={[s.statNum, { color: c.text }]}>{item.applications_count}</Text>
                  <Text style={[s.statLab, { color: c.textMuted }]}>{t("app_total")}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity onPress={() => handleOpenEdit(item)} style={[s.editBtn, { borderColor: c.border }]}>
                        <Feather name="edit-2" size={14} color={c.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={[s.editBtn, { borderColor: colors.error + '30' }]}>
                        <Feather name="trash-2" size={14} color={colors.error} />
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={s.empty}>
              <Feather name="briefcase" size={48} color={c.border} />
              <Text style={[s.emptyText, { color: c.textMuted }]}>{t("no_saved_jobs")}</Text>
            </View>
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity 
        style={s.fab} 
        onPress={handleOpenAdd}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Form Modal */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.modalOverlay}>
            <View style={[s.modalContent, { backgroundColor: c.surface }]}>
                <View style={s.modalHeader}>
                    <Text style={[s.modalTitle, { color: c.text }]}>{editingJob ? t("edit_job") : t("add_new_job")}</Text>
                    <TouchableOpacity onPress={() => setShowModal(false)}>
                        <Feather name="x" size={24} color={c.text} />
                    </TouchableOpacity>
                </View>
                
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    <Text style={[s.label, { color: c.text }]}>{t("job_title")}</Text>
                    <TextInput style={[s.input, { borderColor: c.border, color: c.text }]} value={title} onChangeText={setTitle} />

                    <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[s.label, { color: c.text }]}>{t("location_label")}</Text>
                            <TextInput style={[s.input, { borderColor: c.border, color: c.text }]} value={location} onChangeText={setLocation} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[s.label, { color: c.text }]}>{t("salary_label")}</Text>
                            <TextInput placeholder={t("salary_negotiable")} placeholderTextColor={c.textMuted} style={[s.input, { borderColor: c.border, color: c.text }]} value={salary} onChangeText={setSalary} />
                        </View>
                    </View>

                    <Text style={[s.label, { color: c.text, marginTop: 12 }]}>{t("job_description")}</Text>
                    <TextInput multiline numberOfLines={3} style={[s.input, { borderColor: c.border, color: c.text, height: 80, textAlignVertical: 'top' }]} value={description} onChangeText={setDescription} />

                    <Text style={[s.label, { color: c.text, marginTop: 12 }]}>{t("requirements")}</Text>
                    <TextInput multiline numberOfLines={3} style={[s.input, { borderColor: c.border, color: c.text, height: 80, textAlignVertical: 'top' }]} value={requirements} onChangeText={setRequirements} />
                </ScrollView>

                <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
                    <Text style={s.submitBtnText}>{editingJob ? t("save") : t("add")}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.lg, marginTop: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  
  filterRow: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
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

  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: 10,
    marginBottom: spacing.md,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  tabText: { fontSize: 12, fontWeight: '700' },

  list: { padding: spacing.lg, paddingBottom: 100 },
  jobCard: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  jobHeader: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  jobTitle: { fontSize: 16, fontWeight: '700' },
  jobLoc: { fontSize: 12, marginTop: 4 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  statusText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },

  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#00000008',
  },
  stat: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  statNum: { fontSize: 18, fontWeight: '800' },
  statLab: { fontSize: 12 },
  editBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
  },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, alignItems: 'center', marginTop: 100, gap: 16 },
  emptyText: { fontSize: 14, fontWeight: '600' },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.md,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '80%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  input: {
      borderWidth: 1,
      borderRadius: radius.md,
      padding: 12,
      fontSize: 14,
      marginBottom: 8
  },
  submitBtn: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
