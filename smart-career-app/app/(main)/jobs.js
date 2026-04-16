import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { colors, spacing, radius, shadow } from "../../theme/colors";
import { useAppStore } from "../../store/useAppStore";
import { useLang } from "../../context/languageContext";
import { useTheme } from "../../context/themeContext";

const CATEGORIES = ["All", "Tech", "Design", "Marketing", "Finance", "Remote"];

const ALL_JOBS = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangkok",
    salary: "30k - 50k",
    match: 92,
    type: "Full-time",
    category: "Tech",
    posted: "2 days ago",
    logo: "T",
    logoColor: "#4F46E5",
  },
];

function MatchBadge({ match }) {
  const bg =
    match >= 85
      ? colors.success
      : match >= 70
      ? colors.warning
      : colors.textMuted;

  return (
    <View style={[styles.matchBadge, { backgroundColor: bg + "18" }]}>
      <Text style={[styles.matchText, { color: bg }]}>{match}% Match</Text>
    </View>
  );
}

export default function Jobs() {
  const { t } = useLang();
  const { c } = useTheme();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { toggleSaveJob, isJobSaved } = useAppStore();

  const filteredJobs = ALL_JOBS.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      activeCategory === "All" || j.category === activeCategory;

    return matchSearch && matchCategory;
  });

  const renderHeader = () => (
    <View>
      {/* 🔍 Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Feather name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder={t("search")}
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Feather name="x" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Feather name="sliders" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* 🧩 Categories */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item: cat }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              activeCategory === cat && styles.categoryActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* 📊 Stats */}
      <View style={styles.statsRow}>
        <Text style={[styles.resultCount, { color: c.text }]}>
          {filteredJobs.length} {t("jobs")}
        </Text>
        <Text style={styles.sortText}>{t("sort")}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="briefcase" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: c.surface }]}
            activeOpacity={0.7}
            onPress={() => router.push("/(main)/job-detail")}
          >
            {/* Header */}
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.companyLogo,
                  { backgroundColor: item.logoColor + "15" },
                ]}
              >
                <Text
                  style={[styles.companyLogoText, { color: item.logoColor }]}
                >
                  {item.logo}
                </Text>
              </View>

              <View style={styles.cardHeaderInfo}>
                <Text style={[styles.cardTitle, { color: c.text }]}>
                  {item.title}
                </Text>
                <Text style={styles.cardCompany}>{item.company}</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  toggleSaveJob({
                    id: item.id,
                    title: item.title,
                    company: item.company,
                    location: item.location,
                    salary: item.salary,
                    match: item.match,
                    type: item.type,
                    savedAt: "",
                  })
                }
              >
                <FontAwesome
                  name={isJobSaved(item.id) ? "bookmark" : "bookmark-o"}
                  size={20}
                  color={
                    isJobSaved(item.id) ? colors.primary : colors.textMuted
                  }
                />
              </TouchableOpacity>
            </View>

            {/* Tags */}
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Feather name="map-pin" size={12} color={colors.textSecondary} />
                <Text style={styles.tagText}>{item.location}</Text>
              </View>
              <View style={styles.tag}>
                <Feather name="clock" size={12} color={colors.textSecondary} />
                <Text style={styles.tagText}>{item.type}</Text>
              </View>
              <View style={styles.tag}>
                <Feather name="dollar-sign" size={12} color={colors.textSecondary} />
                <Text style={styles.tagText}>{item.salary}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <MatchBadge match={item.match} />
              <Text style={styles.postedText}>{item.posted}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 4,
  },
  filterBtn: {
    backgroundColor: colors.primaryBg,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  categoryList: {
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: colors.textWhite,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  sortText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  companyLogoText: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  cardCompany: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  matchText: {
    fontSize: 12,
    fontWeight: "700",
  },
  postedText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
