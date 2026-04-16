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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { companyService } from "../../services/companyService";

export default function Applicants() {
  const { t } = useLang();
  const { c } = useTheme();
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('all');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const data = await companyService.getJobApplicants(""); 
      // Add mock AI Match score for ranking
      const withMatch = data.map(app => ({
          ...app,
          match: Math.floor(Math.random() * 25) + 75 // 75-99%
      }));
      setApplicants(withMatch);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status) => {
      if (!selectedApp) return;
      try {
          await companyService.updateApplicationStatus(selectedApp.id, status);
          setShowStatusModal(false);
          fetchApplicants();
      } catch (e) {
          console.error(e);
      }
  };

  const filteredApplicants = applicants.filter(a => {
    const matchesSearch = a.applicant_name.toLowerCase().includes(search.toLowerCase()) || 
                          a.job_title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => b.match - a.match);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'reviewing': return '#3B82F6';
      case 'interview': return '#8B5CF6';
      default: return '#F59E0B';
    }
  };

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      <View style={s.header}>
        <Text style={[s.title, { color: c.text }]}>{t("applicants_title")}</Text>
        <Text style={[s.subtitle, { color: c.textMuted }]}>{t("applicants_sub")}</Text>
      </View>

      {/* Filter Bar */}
      <View style={s.filterRow}>
        <View style={[s.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Feather name="search" size={18} color={c.textMuted} />
          <TextInput
            placeholder={t("search_applicants")}
            placeholderTextColor={c.textMuted}
            style={[s.searchInput, { color: c.text }]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabScroll} contentContainerStyle={s.tabRow}>
        {['all', 'pending', 'accepted', 'rejected'].map((f) => (
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
      </ScrollView>

      {loading ? (
        <View style={s.center}>
          <ActivityIndicator color="#10B981" />
        </View>
      ) : (
        <FlatList
          data={filteredApplicants}
          keyExtractor={item => item.id}
          contentContainerStyle={s.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={[s.appCard, { backgroundColor: c.surface, borderColor: c.border }]}>
              <View style={s.cardTop}>
                <View style={[s.avatar, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[s.avatarText, { color: getStatusColor(item.status) }]}>{item.applicant_name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[s.name, { color: c.text }]}>{item.applicant_name}</Text>
                    <Text style={[s.role, { color: c.textMuted }]}>{item.job_title}</Text>
                </View>
                <View style={[s.matchBadge, { backgroundColor: '#10B98115' }]}>
                    <Feather name="cpu" size={12} color="#10B981" />
                    <Text style={{ fontSize: 12, fontWeight: '800', color: '#10B981', marginLeft: 4 }}>{item.match}%</Text>
                </View>
                <TouchableOpacity onPress={() => { setSelectedApp(item); setShowStatusModal(true); }} style={s.moreBtn}>
                    <Feather name="edit" size={18} color={c.textMuted} />
                </TouchableOpacity>
              </View>

              <View style={s.cardInfo}>
                  <View style={s.infoItem}>
                      <Feather name="mail" size={14} color={c.textMuted} />
                      <Text style={[s.infoText, { color: c.textMuted }]}>{item.applicant_email}</Text>
                  </View>
                  <View style={[s.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                      <Text style={[s.statusText, { color: getStatusColor(item.status) }]}>{t(`status_${item.status}`)}</Text>
                  </View>
              </View>

              <View style={s.cardActions}>
                  <TouchableOpacity style={[s.actionBtn, { borderColor: c.border }]}>
                      <Feather name="file-text" size={14} color={c.text} />
                      <Text style={[s.actionBtnText, { color: c.text }]}>Resume</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[s.actionBtn, { borderColor: c.border }]} onPress={() => router.push('/(company)/chat')}>
                      <Feather name="message-circle" size={14} color={c.text} />
                      <Text style={[s.actionBtnText, { color: c.text }]}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[s.actionBtn, { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' }]} onPress={() => router.push('/(company)/interviews')}>
                      <Feather name="calendar" size={14} color="#fff" />
                      <Text style={[s.actionBtnText, { color: '#fff' }]}>Schedule</Text>
                  </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={s.empty}>
              <Feather name="users" size={48} color={c.border} />
              <Text style={[s.emptyText, { color: c.textMuted }]}>{t("app_empty_title")}</Text>
            </View>
          }
        />
      )}

      {/* Status Modal */}
      <Modal visible={showStatusModal} animationType="fade" transparent={true}>
          <TouchableOpacity activeOpacity={1} onPress={() => setShowStatusModal(false)} style={s.modalOverlay}>
              <View style={[s.modalContent, { backgroundColor: c.surface }]}>
                  <Text style={[s.modalTitle, { color: c.text }]}>{t("change_status")}</Text>
                  <View style={s.statusOptions}>
                      {['pending', 'reviewing', 'interview', 'accepted', 'rejected'].map((st) => (
                          <TouchableOpacity 
                            key={st} 
                            style={[s.statusOpt, { borderBottomColor: c.border }]} 
                            onPress={() => handleUpdateStatus(st)}
                          >
                              <Text style={[s.statusOptText, { color: getStatusColor(st) }]}>{t(`status_${st}`)}</Text>
                              {selectedApp?.status === st && <Feather name="check" size={18} color={getStatusColor(st)} />}
                          </TouchableOpacity>
                      ))}
                  </View>
              </View>
          </TouchableOpacity>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.lg, marginTop: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  
  filterRow: { paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
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

  tabScroll: { maxHeight: 50, marginBottom: spacing.md },
  tabRow: {
    paddingHorizontal: spacing.lg,
    gap: 10,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  tabText: { fontSize: 12, fontWeight: '700' },

  list: { padding: spacing.lg, paddingBottom: 100 },
  appCard: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800' },
  name: { fontSize: 16, fontWeight: '700' },
  role: { fontSize: 13, marginTop: 2 },
  matchBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  moreBtn: { padding: 4 },

  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoText: { fontSize: 12 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },

  cardActions: {
      flexDirection: 'row',
      gap: 10,
      borderTopWidth: 1,
      borderTopColor: '#00000005',
      paddingTop: 16
  },
  actionBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 10,
      borderRadius: radius.md,
      borderWidth: 1,
  },
  actionBtnText: { fontSize: 13, fontWeight: '700' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { flex: 1, alignItems: 'center', marginTop: 100, gap: 16 },
  emptyText: { fontSize: 14, fontWeight: '600' },

  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24
  },
  modalContent: {
      width: '100%',
      padding: 24,
      borderRadius: radius.xl,
      ...shadow.lg,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 20, textAlign: 'center' },
  statusOptions: { gap: 4 },
  statusOpt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
  },
  statusOptText: { fontSize: 16, fontWeight: '700' },
});
