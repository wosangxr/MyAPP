import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useProfileStore } from "../../store/useProfileStore";
import { useAppStore } from "../../store/useAppStore";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";
import { companyService } from "../../services/companyService";
import { useEffect, useState as useReactState } from "react";

const { width } = Dimensions.get("window");



export default function Dashboard() {
  const { lang, setLang, t } = useLang();
  const { c } = useTheme();
  const { name, careerScore, appliedJobs, savedJobs, interviewCount, avatar } =
    useProfileStore();
  const { unreadCount } = useAppStore();
  const unread = unreadCount();
  const [search, setSearch] = useReactState("");
  const [featuredJobs, setFeaturedJobs] = useReactState([]);

  useEffect(() => {
    companyService.getAllJobs().then(jobs => {
        // Map to format
        const mapped = jobs.slice(0, 5).map((j, i) => ({
            id: j.id,
            title: j.title,
            company: "TechCorp Asia", // Mock company name
            location: j.location,
            salary: j.salary,
            match: Math.floor(Math.random() * 20) + 80, // 80-99
            logo: null,
            tags: j.requirements.split(',').slice(0,2),
            color: ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B"][i % 4]
        }));
        setFeaturedJobs(mapped);
    });
  }, []);

  const successRate =
    appliedJobs > 0 ? Math.round((interviewCount / appliedJobs) * 100) : 0;

  const handleSearch = () => {
    if (search.trim()) router.push("/(main)/jobs");
  };

  const quickActions = [
    {
      label: t("find_jobs"),
      icon: "search",
      route: "/(main)/jobs",
      color: "#4F46E5",
      bg: "#EEF2FF",
    },
    {
      label: t("ai_matches"),
      icon: "cpu",
      route: "/(main)/matches",
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      label: t("swipe_jobs"),
      icon: "layers",
      route: "/(main)/swipe",
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
    {
      label: t("interviews"),
      icon: "calendar",
      route: "/(main)/interviews",
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
  ];

  const firstName = name ? name.split(" ")[0] : "User";

  return (
    <View style={[s.root, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        {/* ──── HERO SECTION ──── */}
        <View style={s.hero}>
          {/* Top bar */}
          <View style={s.heroTop}>
            <TouchableOpacity
              style={s.avatarWrap}
              onPress={() => router.push("/(main)/profile")}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={s.avatarImg} />
              ) : (
                <View style={s.avatarFallback}>
                  <Text style={s.avatarInitial}>
                    {firstName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={s.onlineDot} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={s.heroGreeting}>
                {t("dash_hello")}, {firstName}! 👋
              </Text>
              <Text style={s.heroSub}>{t("dash_ready")}</Text>
            </View>

            <View style={s.heroRight}>
              {/* Lang toggle */}
              <View style={s.langToggle}>
                <TouchableOpacity
                  style={[s.langBtn, lang === "en" && s.langBtnActive]}
                  onPress={() => setLang("en")}
                >
                  <Text style={[s.langBtnText, lang === "en" && s.langBtnTextActive]}>
                    EN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.langBtn, lang === "th" && s.langBtnActive]}
                  onPress={() => setLang("th")}
                >
                  <Text style={[s.langBtnText, lang === "th" && s.langBtnTextActive]}>
                    TH
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Notifications */}
              <TouchableOpacity
                style={s.notifBtn}
                onPress={() => router.push("/(main)/notifications")}
              >
                <Feather name="bell" size={20} color="#fff" />
                {unread > 0 && (
                  <View style={s.badge}>
                    <Text style={s.badgeText}>{unread}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Career Score Banner */}
          <View style={s.scoreBanner}>
            <View>
              <Text style={s.scoreLabel}>{t("career_score")}</Text>
              <Text style={s.scoreVal}>{careerScore}%</Text>
            </View>
            <View style={s.scoreBars}>
              {[20, 40, 60, 80, 100].map((step) => (
                <View
                  key={step}
                  style={[
                    s.scoreSegment,
                    {
                      backgroundColor:
                        careerScore >= step
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.2)",
                    },
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity
              style={s.improveBtn}
              onPress={() => router.push("/(main)/profile")}
            >
              <Text style={s.improveBtnText}>{t("edit_full_profile")}</Text>
              <Feather name="arrow-right" size={12} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View style={s.searchBar}>
            <Feather name="zap" size={17} color="#4F46E5" />
            <TextInput
              style={s.searchInput}
              placeholder={t("search_ai_placeholder")}
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={s.searchBtn} onPress={handleSearch}>
              <Text style={s.searchBtnTxt}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ──── STATS ROW ──── */}
        <View style={s.statsRow}>
          {[
            {
              icon: "send",
              value: appliedJobs,
              label: t("applied"),
              color: "#4F46E5",
            },
            {
              icon: "calendar",
              value: interviewCount,
              label: t("interviews"),
              color: "#10B981",
            },
            {
              icon: "bookmark",
              value: savedJobs,
              label: t("saved"),
              color: "#F59E0B",
            },
            {
              icon: "trending-up",
              value: `${successRate}%`,
              label: t("dash_success_rate"),
              color: "#8B5CF6",
            },
          ].map((s2, i) => (
            <View key={i} style={[s.statCard, { backgroundColor: c.surface, borderColor: c.border }]}>
              <View style={[s.statIconBox, { backgroundColor: s2.color + "15" }]}>
                <Feather name={s2.icon} size={16} color={s2.color} />
              </View>
              <Text style={[s.statVal, { color: c.text }]}>{s2.value}</Text>
              <Text style={[s.statLbl, { color: c.textMuted }]}>{s2.label}</Text>
            </View>
          ))}
        </View>

        {/* ──── QUICK ACTIONS ──── */}
        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: c.text }]}>
            {t("dash_quick_actions")}
          </Text>
          <View style={s.actionsRow}>
            {quickActions.map((action, i) => (
              <TouchableOpacity
                key={i}
                style={s.actionPill}
                onPress={() => router.push(action.route)}
                activeOpacity={0.75}
              >
                <View style={[s.actionIconBox, { backgroundColor: action.bg }]}>
                  <Feather name={action.icon} size={22} color={action.color} />
                </View>
                <Text style={[s.actionLbl, { color: c.text }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ──── FEATURED JOBS ──── */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={[s.sectionTitle, { color: c.text }]}>
              {t("ai_matching_skills")}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(main)/matches")}>
              <Text style={s.seeAll}>{t("see_all")}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.jobsScroll}
          >
            {featuredJobs.map((job) => (
              <TouchableOpacity
                key={job.id}
                style={[s.jobCard, { backgroundColor: c.surface, borderColor: c.border }]}
                activeOpacity={0.85}
                onPress={() => router.push("/(main)/jobs")}
              >
                {/* Match badge */}
                <View style={[s.matchBadge, { backgroundColor: job.color + "18" }]}>
                  <Feather name="cpu" size={11} color={job.color} />
                  <Text style={[s.matchText, { color: job.color }]}>
                    {job.match}% {t("match")}
                  </Text>
                </View>

                {/* Company logo placeholder */}
                <View style={[s.companyLogo, { backgroundColor: job.color + "20" }]}>
                  <Text style={[s.companyLogoText, { color: job.color }]}>
                    {job.company.charAt(0)}
                  </Text>
                </View>

                <Text style={[s.jobTitle, { color: c.text }]} numberOfLines={2}>
                  {job.title}
                </Text>
                <Text style={[s.jobCompany, { color: c.textMuted }]}>
                  {job.company}
                </Text>

                <View style={s.jobMeta}>
                  <Feather name="map-pin" size={11} color={c.textMuted} />
                  <Text style={[s.jobMetaText, { color: c.textMuted }]}>
                    {job.location}
                  </Text>
                </View>

                <Text style={[s.jobSalary, { color: job.color }]}>{job.salary}</Text>

                <View style={s.jobTags}>
                  {job.tags.map((tag) => (
                    <View key={tag} style={[s.tag, { backgroundColor: c.surfaceAlt }]}>
                      <Text style={[s.tagText, { color: c.textSecondary }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[s.applyBtn, { borderColor: job.color }]}
                  onPress={() => router.push("/(main)/apply")}
                >
                  <Text style={[s.applyBtnText, { color: job.color }]}>
                    {t("quick_apply")}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ──── RECENT ACTIVITY ──── */}
        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: c.text }]}>{t("dash_recent")}</Text>
          <View style={[s.activityCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            {[
              {
                icon: "send",
                color: "#4F46E5",
                title: t("dash_activity_applied"),
                sub: "Frontend Developer · TechCorp",
                time: t("dash_2days_ago"),
              },
              {
                icon: "eye",
                color: "#10B981",
                title: t("dash_activity_viewed"),
                sub: "InnoTech HR viewed your profile",
                time: t("dash_1day_ago"),
              },
              {
                icon: "calendar",
                color: "#F59E0B",
                title: t("dash_activity_interview"),
                sub: "StartupXYZ · April 10, 2026",
                time: t("dash_3days_ago"),
              },
            ].map((item, i, arr) => (
              <View key={i}>
                <View style={s.actRow}>
                  <View style={[s.actIcon, { backgroundColor: item.color + "18" }]}>
                    <Feather name={item.icon} size={15} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.actTitle, { color: c.text }]}>{item.title}</Text>
                    <Text style={[s.actSub, { color: c.textMuted }]}>{item.sub}</Text>
                  </View>
                  <Text style={[s.actTime, { color: c.textMuted }]}>{item.time}</Text>
                </View>
                {i < arr.length - 1 && (
                  <View style={[s.divider, { backgroundColor: c.border }]} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },

  /* HERO */
  hero: {
    backgroundColor: "#4F46E5",
    paddingTop: 52,
    paddingHorizontal: spacing.lg,
    paddingBottom: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  avatarWrap: { position: "relative" },
  avatarImg: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" },
  avatarFallback: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  avatarInitial: { fontSize: 20, fontWeight: "800", color: "#fff" },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#4F46E5",
  },
  heroGreeting: { fontSize: 17, fontWeight: "800", color: "#fff" },
  heroSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  heroRight: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  langToggle: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.full,
    padding: 2,
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  langBtnActive: { backgroundColor: "#fff" },
  langBtnText: { fontSize: 10, fontWeight: "800", color: "rgba(255,255,255,0.8)" },
  langBtnTextActive: { color: "#4F46E5" },
  notifBtn: { position: "relative", padding: 8 },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "800" },

  /* CAREER SCORE BANNER */
  scoreBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  scoreLabel: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: "600" },
  scoreVal: { fontSize: 24, fontWeight: "900", color: "#fff" },
  scoreBars: { flex: 1, flexDirection: "row", gap: 4 },
  scoreSegment: { flex: 1, height: 6, borderRadius: 3 },
  improveBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  improveBtnText: { fontSize: 10, fontWeight: "800", color: "#4F46E5" },

  /* SEARCH */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    marginHorizontal: -spacing.lg,
    marginBottom: -20,
    marginTop: 4,
    height: 52,
    gap: 8,
    ...shadow.md,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#0F172A" },
  searchBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  searchBtnTxt: { color: "#fff", fontSize: 13, fontWeight: "700" },

  /* STATS */
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxxl + spacing.sm,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: "center",
    ...shadow.sm,
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statVal: { fontSize: 18, fontWeight: "900" },
  statLbl: { fontSize: 10, fontWeight: "600", marginTop: 2, textAlign: "center" },

  /* SECTIONS */
  section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", marginBottom: spacing.md },
  seeAll: { fontSize: 13, fontWeight: "700", color: "#4F46E5" },

  /* QUICK ACTIONS */
  actionsRow: { flexDirection: "row", justifyContent: "space-between" },
  actionPill: { alignItems: "center", gap: 8, flex: 1 },
  actionIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLbl: { fontSize: 11, fontWeight: "600", textAlign: "center" },

  /* FEATURED JOBS CAROUSEL */
  jobsScroll: { paddingRight: spacing.lg, gap: spacing.md },
  jobCard: {
    width: width * 0.64,
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    ...shadow.sm,
  },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  matchText: { fontSize: 11, fontWeight: "800" },
  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  companyLogoText: { fontSize: 22, fontWeight: "900" },
  jobTitle: { fontSize: 15, fontWeight: "800", lineHeight: 20, marginBottom: 4 },
  jobCompany: { fontSize: 12, fontWeight: "600", marginBottom: 6 },
  jobMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 8 },
  jobMetaText: { fontSize: 11 },
  jobSalary: { fontSize: 14, fontWeight: "800", marginBottom: spacing.md },
  jobTags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: spacing.md },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.full },
  tagText: { fontSize: 10, fontWeight: "600" },
  applyBtn: {
    borderWidth: 1.5,
    borderRadius: radius.full,
    paddingVertical: 8,
    alignItems: "center",
  },
  applyBtnText: { fontSize: 12, fontWeight: "800" },

  /* ACTIVITY */
  activityCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    ...shadow.sm,
  },
  actRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  actIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actTitle: { fontSize: 13, fontWeight: "700" },
  actSub: { fontSize: 11, marginTop: 2 },
  actTime: { fontSize: 10 },
  divider: { height: 1, marginVertical: 4 },
});
