import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useLang } from "../../context/languageContext";
import { colors, spacing, radius, shadow } from "../../theme/colors";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    icon: "briefcase",
    iconBg: "#4F46E5",
    titleKey: "onboard_title_1",
    subtitleKey: "onboard_sub_1",
  },
  {
    icon: "cpu",
    iconBg: "#10B981",
    titleKey: "onboard_title_2",
    subtitleKey: "onboard_sub_2",
  },
  {
    icon: "zap",
    iconBg: "#F59E0B",
    titleKey: "onboard_title_3",
    subtitleKey: "onboard_sub_3",
  },
];

export default function Onboarding() {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("/(auth)/login");
    }
  };

  const skip = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={s.container}>
      {/* Skip */}
      <TouchableOpacity style={s.skipBtn} onPress={skip}>
        <Text style={s.skipText}>{t("skip")}</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={s.slide}>
            <View style={[s.iconCircle, { backgroundColor: item.iconBg + "18" }]}>
              <View style={[s.iconInner, { backgroundColor: item.iconBg }]}>
                <Feather name={item.icon} size={48} color="#fff" />
              </View>
            </View>
            <Text style={s.title}>{t(item.titleKey)}</Text>
            <Text style={s.subtitle}>{t(item.subtitleKey)}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={s.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[s.dot, i === currentIndex && s.dotActive]}
          />
        ))}
      </View>

      {/* Button */}
      <View style={s.bottomSection}>
        {currentIndex === SLIDES.length - 1 ? (
          <View style={s.choiceRow}>
            <TouchableOpacity 
              style={[s.nextBtn, { flex: 1, backgroundColor: colors.primary }]} 
              onPress={() => router.replace("/(auth)/login")} 
              activeOpacity={0.8}
            >
              <Text style={s.nextBtnText}>{t("onboard_choice_seeker") || "Find a Job"}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[s.nextBtn, { flex: 1, backgroundColor: "#10B981" }]} 
              onPress={() => router.replace("/(company-auth)/login")} 
              activeOpacity={0.8}
            >
              <Text style={s.nextBtnText}>{t("onboard_choice_employer") || "Hire Talent"}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={s.nextBtn} onPress={goNext} activeOpacity={0.8}>
            <Text style={s.nextBtnText}>{t("next")}</Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipBtn: {
    position: "absolute",
    top: 54,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: "600",
  },
  slide: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  iconInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    ...shadow.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 23,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.primary,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  nextBtn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: radius.md,
    gap: 8,
    ...shadow.md,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  choiceRow: {
    flexDirection: "row",
    gap: 12,
  },
});
