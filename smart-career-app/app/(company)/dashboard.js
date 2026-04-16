import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { companyService } from "../../services/companyService";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function CompanyDashboard() {
  const { t } = useLang();
  const { c } = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [s, apps] = await Promise.all([
        companyService.getStats("comp_1"),
        companyService.getJobApplicants("") 
      ]);
      setStats(s);
      setRecentApps(apps.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[s.container, { justifyContent: 'center', backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  const statCards = [
    { label: t("stat_jobs"), value: stats?.total_jobs, icon: "briefcase", color: "#818CF8", bg: "#818CF815" },
    { label: t("stat_apps"), value: stats?.total_applications, icon: "file-text", color: "#10B981", bg: "#10B98115" },
    { label: t("stat_pending"), value: stats?.pending_reviews, icon: "clock", color: "#F59E0B", bg: "#F59E0B15" },
    { label: t("stat_accepted"), value: stats?.accepted_candidates, icon: "check-circle", color: "#3B82F6", bg: "#3B82F615" },
  ];

  return (
    <ScrollView style={[s.container, { backgroundColor: c.background }]} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View>
          <Text style={[s.greeting, { color: c.text }]}>{t("dashboard")}</Text>
          <Text style={[s.subGreeting, { color: c.textMuted }]}>{t("dash_ready")}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity 
            style={[s.notifBtn, { backgroundColor: c.surface, borderColor: c.border }]}
            onPress={() => router.push("/(company)/notifications")}
          >
            <Feather name="bell" size={20} color={c.text} />
            <View style={s.notifBadge} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[s.profileBtn, { backgroundColor: c.surface, borderColor: c.border }]}
            onPress={() => router.push("/(company)/profile")}
          >
            <Text style={s.avatarText}>C</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={s.statsGrid}>
        {statCards.map((stat, i) => (
          <View key={i} style={[s.statCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <View style={[s.statIcon, { backgroundColor: stat.bg }]}>
              <Feather name={stat.icon} size={20} color={stat.color} />
            </View>
            <View>
                <Text style={[s.statLabel, { color: c.textMuted }]}>{stat.label}</Text>
                <Text style={[s.statValue, { color: c.text }]}>{stat.value}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* Quick Actions */}
      <View style={s.quickActions}>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => router.push("/(company)/chat")}>
            <View style={[s.actionIconBox, { backgroundColor: '#3B82F615' }]}>
              <Feather name="message-circle" size={20} color="#3B82F6" />
            </View>
            <Text style={[s.actionBtnText, { color: c.text }]}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => router.push("/(company)/interviews")}>
            <View style={[s.actionIconBox, { backgroundColor: '#8B5CF615' }]}>
              <Feather name="calendar" size={20} color="#8B5CF6" />
            </View>
            <Text style={[s.actionBtnText, { color: c.text }]}>Agenda</Text>
          </TouchableOpacity>
      </View>
      {/* Charts Section */}
      <View style={s.sectionHeader}>
        <Text style={[s.sectionTitle, { color: c.text }]}>{t("dash_trends")}</Text>
      </View>
      <View style={[s.chartMock, { backgroundColor: c.surface, borderColor: c.border }]}>
         <View style={s.chartBars}>
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <View key={i} style={[s.chartBar, { height: h, backgroundColor: i === 3 ? '#10B981' : '#10B98130' }]} />
            ))}
         </View>
         <View style={s.chartLabels}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => (
                <Text key={i} style={[s.chartLabel, { color: c.textMuted }]}>{l}</Text>
            ))}
         </View>
      </View>

      {/* Recent Applications */}
      <View style={s.sectionHeader}>
        <Text style={[s.sectionTitle, { color: c.text }]}>{t("dash_recent_apps")}</Text>
        <TouchableOpacity onPress={() => router.push("/(company)/applicants")}>
            <Text style={{ color: '#10B981', fontWeight: '600' }}>{t("see_all")}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[s.recentCard, { backgroundColor: c.surface, borderColor: c.border }]}>
        {recentApps.map((app, i) => (
          <View key={app.id}>
            <View style={s.appItem}>
                <View style={[s.appAvatar, { backgroundColor: i % 2 === 0 ? '#818CF830' : '#F59E0B30' }]}>
                    <Text style={{ color: i % 2 === 0 ? '#818CF8' : '#F59E0B', fontWeight: '800' }}>
                        {app.applicant_name[0]}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[s.appName, { color: c.text }]}>{app.applicant_name}</Text>
                    <Text style={[s.appTitle, { color: c.textMuted }]}>{app.job_title}</Text>
                </View>
                <View style={[s.statusBadge, { backgroundColor: app.status === 'accepted' ? '#10B98120' : '#F59E0B20' }]}>
                    <Text style={[s.statusText, { color: app.status === 'accepted' ? '#10B981' : '#F59E0B' }]}>
                        {t(`status_${app.status}`)}
                    </Text>
                </View>
            </View>
            {i < recentApps.length - 1 && <View style={[s.divider, { backgroundColor: c.border }]} />}
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    marginTop: 20,
  },
  greeting: { fontSize: 24, fontWeight: '800' },
  subGreeting: { fontSize: 13, marginTop: 2 },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#10B981' },

  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: 12,
    ...shadow.sm,
  },
  actionIconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: { fontSize: 15, fontWeight: '700' },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.md,
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '45%',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: { fontSize: 12, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: '800', marginTop: 2 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },

  chartMock: {
    marginHorizontal: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    ...shadow.sm,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    paddingHorizontal: 10,
  },
  chartBar: {
    width: 12,
    borderRadius: 6,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 5,
  },
  chartLabel: { fontSize: 11, fontWeight: '600' },

  recentCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    ...shadow.sm,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
  },
  appAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: { fontSize: 14, fontWeight: '700' },
  appTitle: { fontSize: 12, marginTop: 1 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  divider: { height: 1, width: '100%' },
});
