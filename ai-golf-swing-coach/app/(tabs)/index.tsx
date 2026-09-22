import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { HydrationNotice } from "@/components/ui/hydration-notice";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors, drills } from "@/lib/golf-data";
import { useGolfAppState } from "@/lib/golf-app-state";
import { deriveHomeStatistics, derivePracticeStreak, formatHomeDate, getHomeFirstName, getHomeInitials, getTimeOfDayGreeting, homeDrillProgressLabel, homePracticeActionLabel, isPracticeLoggedToday, practicePrompt, practiceStreakLabel, selectHomeDrill, todayPracticeLabel } from "@/lib/home-statistics";
import { formatLastPracticedLabel } from "@/lib/drill-practice-meta";
import { recommendedDrillRoute } from "@/lib/drill-route";
import { formatScoreAccessibilityLabel, scoreAccessibilityValue } from "@/lib/score-accessibility";
import { useFadeIn, usePulse, useSlideIn } from "@/lib/ux";

function ScoreRing({ score }: { score: number }) {
  const pulse = usePulse();
  return (
    <Animated.View style={{ transform: [{ scale: pulse }] }}>
      <View accessible accessibilityRole="progressbar" accessibilityLabel={formatScoreAccessibilityLabel(score)} accessibilityValue={scoreAccessibilityValue(score)} style={styles.scoreRing}>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={styles.scoreLabel}>SWING SCORE</Text>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { sessions, profile, completedDrillSteps, lastPracticedDrills, hydrated } = useGolfAppState();
  const statistics = useMemo(() => deriveHomeStatistics(sessions), [sessions]);
  const latest = statistics.latest;
  const weeklyChange = statistics.weeklyChangeLabel;
  const firstName = getHomeFirstName(profile.displayName);
  const greeting = getTimeOfDayGreeting();
  const initials = getHomeInitials(profile.displayName);
  const practiceStreak = derivePracticeStreak(lastPracticedDrills);
  const practicePromptText = practicePrompt(lastPracticedDrills);
  const practiceLoggedToday = isPracticeLoggedToday(lastPracticedDrills);
  const todayLabel = todayPracticeLabel(practiceLoggedToday);
  const nextDrill = useMemo(() => selectHomeDrill(latest, drills), [latest]);
  const practiceActionLabel = homePracticeActionLabel(practiceLoggedToday, Boolean(nextDrill));
  const nextDrillProgress = homeDrillProgressLabel(nextDrill, nextDrill ? completedDrillSteps[nextDrill.id] : undefined);
  const nextDrillLastPracticed = formatLastPracticedLabel(nextDrill ? lastPracticedDrills[nextDrill.id] : undefined);
  const headerMotion = useFadeIn(220);
  const heroMotion = useSlideIn(16, 280);
  const recordMotion = useSlideIn(14, 320);
  const swingsMotion = useFadeIn(360);
  const drillMotion = useSlideIn(12, 400);

  return (
    <ScreenContainer containerClassName="bg-[#F5F7F2]" safeAreaClassName="bg-[#F5F7F2]">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!hydrated ? <HydrationNotice label="Restoring your local coaching data" /> : null}
        <Animated.View style={[styles.headerRow, { opacity: headerMotion.opacity }]}>
          <View>
            <Text style={styles.eyebrow}>{formatHomeDate()}</Text>
            <Text style={styles.title}>{greeting}, {firstName}</Text>
            <Text style={styles.subtitle}>{latest ? "Your latest swing is ready to review." : "Record your first swing to start your local progress history."}</Text>
          </View>
          <Pressable style={styles.avatar} accessibilityLabel="Open profile" onPress={() => router.push("/(tabs)/profile")}>
            <Text style={styles.avatarText}>{initials}</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: heroMotion.translateY }] }}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <View style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>READY TO IMPROVE</Text></View>
              <Text style={styles.heroTitle}>{latest ? "A sharper turn starts today." : "Your next swing starts here."}</Text>
              <Text style={styles.heroCopy}>{latest ? `Your latest ${latest.club} session scored ${latest.score}/100.` : "Keep your first session simple and repeatable."}</Text>
            </View>
            <ScoreRing score={latest?.score ?? 0} />
          </View>
          <View style={styles.heroFooter}>
            <View><Text style={styles.footerLabel}>RECENT CHANGE</Text><Text style={styles.footerValue}>{weeklyChange}</Text></View>
            <View><Text style={styles.footerLabel}>HANDICAP</Text><Text style={styles.footerValue}>{profile.handicap}</Text></View>
            <View><Text style={styles.footerLabel}>TODAY</Text><Text accessibilityLabel={`Today’s practice: ${todayLabel}`} style={styles.footerValue}>{todayLabel}</Text></View>
          </View>
          {nextDrill ? <Pressable accessibilityRole="button" accessibilityLabel={practiceActionLabel} onPress={() => router.push(recommendedDrillRoute(nextDrill.id))} style={({ pressed }) => [styles.heroPracticeButton, pressed && styles.pressed]}><Text style={styles.heroPracticeButtonText}>{practiceActionLabel}</Text><IconSymbol name="chevron.right" size={16} color={colors.ink} /></Pressable> : null}
        </View>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: recordMotion.translateY }] }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Record a new swing" style={({ pressed }) => [styles.recordButton, pressed && styles.pressed]} onPress={() => router.push("/(tabs)/analyze")}>
          <View style={styles.recordIcon}><IconSymbol name="camera.fill" size={23} color={colors.surface} /></View>
          <View style={styles.recordTextWrap}><Text style={styles.recordTitle}>Record a new swing</Text><Text style={styles.recordCopy}>Get feedback in under 5 seconds</Text></View>
          <IconSymbol name="chevron.right" size={22} color={colors.surface} />
        </Pressable>
        </Animated.View>

        <Animated.View style={{ opacity: swingsMotion.opacity }}>
        <View style={styles.sectionHeader}><Text accessibilityRole="header" style={styles.sectionTitle}>Recent swings</Text><Pressable accessibilityRole="button" accessibilityLabel="See all recent swings" onPress={() => router.push("/(tabs)/library")}><Text style={styles.linkText}>See all</Text></Pressable></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {statistics.recent.map((swing) => (
            <Pressable key={swing.id} accessibilityRole="button" accessibilityLabel={`Open ${swing.club} swing from ${swing.date}`} style={({ pressed }) => [styles.swingCard, pressed && styles.pressed]} onPress={() => router.push({ pathname: "/swing-detail", params: { id: swing.id } })}>
              <View style={[styles.swingVisual, { backgroundColor: swing.accent }]}><View style={styles.visualSun} /><View style={styles.visualPlayer}><View style={styles.playerHead} /><View style={styles.playerBody} /><View style={styles.playerLeg} /></View><View style={styles.playButton}><IconSymbol name="play.fill" size={14} color={colors.ink} /></View></View>
              <View style={styles.swingCardBody}><View style={styles.swingMeta}><Text style={styles.swingClub}>{swing.club}</Text><Text style={styles.swingDate}>{swing.date.split(",")[0]}</Text></View><View style={styles.swingScoreRow}><Text style={styles.swingScore}>{swing.score}</Text><Text style={styles.scoreOutOf}>/100</Text><Text style={styles.cardChevron}>›</Text></View></View>
            </Pressable>
          ))}
        </ScrollView>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: drillMotion.translateY }] }}>
        <View style={styles.sectionHeader}><Text accessibilityRole="header" style={styles.sectionTitle}>Your next drill</Text><Pressable accessibilityRole="button" accessibilityLabel="View practice plan" onPress={() => router.push("/(tabs)/progress")}><Text style={styles.linkText}>View plan</Text></Pressable></View>
        {nextDrill ? <Pressable accessibilityRole="button" accessibilityLabel={`Open recommended ${nextDrill.title}`} style={({ pressed }) => [styles.drillCard, pressed && styles.pressed]} onPress={() => router.push(recommendedDrillRoute(nextDrill.id))}><View style={styles.drillIcon}><IconSymbol name="bolt.fill" size={22} color={colors.sun} /></View><View style={styles.drillCopy}><Text style={styles.drillKicker}>RECOMMENDED FOR YOU</Text><Text style={styles.drillTitle}>{nextDrill.title}</Text><Text style={styles.drillDescription}>{nextDrill.description}</Text><Text accessibilityLabel={`Practice progress: ${nextDrillProgress}`} style={styles.drillProgress}>{nextDrillProgress}</Text><Text style={styles.drillLastPracticed}>{nextDrillLastPracticed} · {practiceStreakLabel(practiceStreak)}</Text><Text accessibilityLabel={practicePromptText} style={styles.drillPrompt}>{practicePromptText}</Text></View><View style={styles.drillTime}><Text style={styles.timeValue}>{nextDrill.time}</Text><Text style={styles.timeLabel}>practice</Text></View><IconSymbol name="chevron.right" size={18} color={colors.muted} /></Pressable> : null}
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 38, gap: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.2, marginBottom: 5 },
  title: { color: colors.ink, fontSize: 25, fontWeight: "800", letterSpacing: -0.6 },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 5 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.sand, justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: colors.surface },
  avatarText: { color: colors.ink, fontWeight: "800", fontSize: 13 },
  heroCard: { backgroundColor: colors.deep, borderRadius: 24, padding: 20, overflow: "hidden" },
  heroTop: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 14 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.sun },
  liveText: { color: "#BFE2D0", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  heroTitle: { color: colors.surface, fontSize: 21, fontWeight: "800", letterSpacing: -0.4, maxWidth: 210, lineHeight: 26 },
  heroCopy: { color: "#B8CEC2", fontSize: 12, lineHeight: 18, marginTop: 7, maxWidth: 190 },
  scoreRing: { width: 92, height: 92, borderRadius: 46, borderWidth: 7, borderColor: colors.sun, justifyContent: "center", alignItems: "center", marginTop: 3 },
  scoreValue: { color: colors.surface, fontSize: 28, fontWeight: "800", lineHeight: 31 },
  scoreLabel: { color: "#B8CEC2", fontSize: 7, fontWeight: "800", letterSpacing: 0.6 },
  heroPracticeButton: { marginTop: 16, alignSelf: "flex-start", backgroundColor: colors.sun, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, flexDirection: "row", alignItems: "center", gap: 6 }, heroPracticeButtonText: { color: colors.ink, fontSize: 11, fontWeight: "900" }, heroFooter: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#356556", marginTop: 21, paddingTop: 14, gap: 28 },
  footerLabel: { color: "#91B3A4", fontSize: 9, fontWeight: "800", letterSpacing: 0.9 },
  footerValue: { color: colors.surface, fontSize: 14, fontWeight: "800", marginTop: 5 },
  recordButton: { backgroundColor: colors.fairway, borderRadius: 18, padding: 15, flexDirection: "row", alignItems: "center", gap: 12 },
  recordIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#3A8267", alignItems: "center", justifyContent: "center" },
  recordTextWrap: { flex: 1 }, recordTitle: { color: colors.surface, fontSize: 16, fontWeight: "800" }, recordCopy: { color: "#C6E3D5", fontSize: 11, marginTop: 3 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 }, sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" }, linkText: { color: colors.fairway, fontSize: 12, fontWeight: "800" },
  horizontalList: { gap: 12, paddingRight: 20 }, swingCard: { width: 180, backgroundColor: colors.surface, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: colors.border },
  swingVisual: { height: 112, position: "relative", overflow: "hidden" }, visualSun: { position: "absolute", width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(244,185,66,0.82)", right: 16, top: 18 }, visualPlayer: { position: "absolute", left: 66, bottom: 0, width: 50, height: 91 }, playerHead: { width: 15, height: 15, borderRadius: 8, backgroundColor: "#F9E2C0", alignSelf: "center" }, playerBody: { width: 26, height: 40, borderRadius: 10, backgroundColor: "#102A24", alignSelf: "center", marginTop: 4, transform: [{ rotate: "-10deg" }] }, playerLeg: { width: 34, height: 33, borderLeftWidth: 7, borderBottomWidth: 6, borderColor: "#102A24", alignSelf: "center", transform: [{ rotate: "-12deg" }] }, playButton: { position: "absolute", right: 10, bottom: 10, width: 27, height: 27, borderRadius: 14, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  swingCardBody: { padding: 12 }, swingMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, swingClub: { color: colors.ink, fontSize: 13, fontWeight: "800" }, swingDate: { color: colors.muted, fontSize: 10 }, swingScoreRow: { flexDirection: "row", alignItems: "baseline", marginTop: 7 }, swingScore: { color: colors.fairway, fontSize: 25, fontWeight: "900" }, scoreOutOf: { color: colors.muted, fontSize: 11, marginLeft: 2 }, cardChevron: { color: colors.muted, fontSize: 21, marginLeft: "auto" },
  drillCard: { backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 15, flexDirection: "row", alignItems: "center", gap: 12 }, drillIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#FFF7E5", alignItems: "center", justifyContent: "center" }, drillCopy: { flex: 1 }, drillKicker: { color: colors.muted, fontSize: 9, fontWeight: "800", letterSpacing: 0.9 }, drillTitle: { color: colors.ink, fontSize: 15, fontWeight: "800", marginTop: 3 }, drillDescription: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 3 }, drillProgress: { color: colors.fairway, fontSize: 10, fontWeight: "900", marginTop: 5 }, drillLastPracticed: { color: colors.muted, fontSize: 10, marginTop: 2 }, drillPrompt: { color: colors.fairway, fontSize: 10, lineHeight: 14, marginTop: 2, fontWeight: "700" }, drillTime: { alignItems: "flex-end", alignSelf: "flex-start" }, timeValue: { color: colors.ink, fontSize: 13, fontWeight: "800" }, timeLabel: { color: colors.muted, fontSize: 10, marginTop: 2 }, pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },
});
