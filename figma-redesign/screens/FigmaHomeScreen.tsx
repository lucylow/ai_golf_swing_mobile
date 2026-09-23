import React, { useMemo } from "react";
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useGolfAppState } from "@/lib/golf-app-state";
import { drills } from "@/lib/golf-data";
import { deriveHomeStatistics, practiceStreakLabel, derivePracticeStreak, isPracticeLoggedToday, homePracticeActionLabel, selectHomeDrill } from "@/lib/home-statistics";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { getCoachingPriority } from "../adapters";
import { FIGMA } from "../theme";
import { useFigmaEntrance } from "../animations";
import { SectionHeader } from "../ui/SectionHeader";
import { ScoreRing } from "../ui/ScoreRing";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { LimeButton } from "../ui/LimeButton";
import { MetricBar } from "../ui/MetricBar";
import { ProfileAvatar } from "../ui/ProfileAvatar";
import { MiniChart } from "../ui/MiniChart";
import { SwingThumbnail } from "../ui/SwingThumbnail";

export default function FigmaHomeScreen() {
  const router = useRouter();
  const { sessions, profile, lastPracticedDrills, completedDrillSteps } = useGolfAppState();
  const data = useMemo(() => deriveHomeStatistics(sessions), [sessions]);
  const latest = data.latest;
  const prioritySignal = useMemo(() => getCoachingPriority(latest ?? undefined), [latest]);
  const streak = derivePracticeStreak(lastPracticedDrills);
  const loggedToday = isPracticeLoggedToday(lastPracticedDrills);
  const nextDrill = useMemo(() => selectHomeDrill(latest, drills), [latest]);
  const missionProgress = nextDrill ? Math.round(((completedDrillSteps[nextDrill.id]?.length ?? 0) / Math.max(nextDrill.steps?.length ?? 0, 1)) * 100) : 0;
  const hero = useFigmaEntrance(120, 16);
  const recent = useFigmaEntrance(220, 12);
  const priority = useFigmaEntrance(320, 10);

  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.goodEvening}>GOOD EVENING</Text>
            <Text style={styles.name}>{profile.displayName?.split(" ")[0] || "Alex"}</Text>
            <Text style={styles.subtitle}>Your next swing is a data point.</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.streak}><Text style={styles.streakEmoji}>🔥</Text><Text style={styles.streakText}>{streak}d</Text></View>
            <ProfileAvatar name={profile.displayName} />
          </View>
        </View>

        <Animated.View style={{ opacity: hero.opacity, transform: [{ translateY: hero.translateY }] }}>
          <View style={styles.heroCard}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1100&h=700&fit=crop&auto=format" }} style={StyleSheet.absoluteFillObject} />
            <View style={styles.heroOverlay} />
            <View style={styles.heroTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>SWING SCORE</Text></View>
                <Text style={styles.heroTitle}>{latest?.score ?? 0}<Text style={styles.heroSmall}>/100</Text></Text>
                <Text style={styles.heroCopy}>{latest ? `${latest.club} · ${latest.date}` : "Record your first swing to begin."}</Text>
              </View>
              <ScoreRing score={latest?.score ?? 0} size={100} />
            </View>
            <View style={styles.heroDivider} />
            <View style={styles.heroStats}>
              <View><Text style={styles.statLabel}>RECENT CHANGE</Text><Text style={styles.statValue}>{data.weeklyChangeLabel || "+0"}</Text></View>
              <View><Text style={styles.statLabel}>HANDICAP</Text><Text style={styles.statValue}>{profile.handicap}</Text></View>
              <View><Text style={styles.statLabel}>TODAY</Text><Text style={styles.statValue}>{loggedToday ? "Logged" : "Open"}</Text></View>
            </View>
          </View>
        </Animated.View>

        <Pressable onPress={() => router.push("/(tabs)/analyze")} style={({ pressed }) => [styles.record, pressed && styles.pressed]}>
          <View style={styles.recordIcon}><IconSymbol name="camera.fill" size={22} color={FIGMA.colors.black} /></View>
          <View style={{ flex: 1 }}><Text style={styles.recordTitle}>Record a new swing</Text><Text style={styles.recordCopy}>Get a coaching cue in under 5 seconds</Text></View>
          <IconSymbol name="chevron.right" size={18} color={FIGMA.colors.white} />
        </Pressable>

        <Pressable accessibilityRole="button" accessibilityLabel="Open coaching command center" onPress={() => router.push("/command-center")} style={({ pressed }) => [styles.commandCenter, pressed && styles.pressed]}>
          <View style={{ flex: 1 }}><Text style={styles.commandKicker}>NEW COACHING VIEW</Text><Text style={styles.commandTitle}>Open your command center</Text><Text style={styles.commandCopy}>A denser dashboard for your latest analysis, goal, and next practice action.</Text></View>
          <IconSymbol name="arrow.up.right" size={19} color={FIGMA.colors.lime} />
        </Pressable>

        <Animated.View style={{ opacity: recent.opacity, transform: [{ translateY: recent.translateY }] }}>
          <SectionHeader title="Recent swings" kicker="YOUR PRACTICE HISTORY" link="SEE ALL" onPress={() => router.push("/(tabs)/library")} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {sessions.slice(0, 5).map((swing) => <SwingThumbnail key={swing.id} club={swing.club} date={swing.date.split(",")[0]} score={swing.score} accent={swing.accent} onPress={() => router.push({ pathname: "/swing-detail", params: { id: swing.id } })} />)}
          </ScrollView>
        </Animated.View>

        <Animated.View style={{ opacity: priority.opacity, transform: [{ translateY: priority.translateY }] }}>
          <SectionHeader title="Coaching priority" kicker="WHAT TO FIX NEXT" />
          <StaticCard style={styles.priorityCard}>
            <View style={styles.priorityHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priorityTitle}>{prioritySignal.title}</Text>
                <Text style={styles.priorityCopy}>{prioritySignal.observation}</Text>
              </View>
              <View style={styles.priorityScore}><Text style={styles.priorityScoreValue}>{prioritySignal.score}</Text><Text style={styles.priorityScoreLabel}>/100</Text></View>
            </View>
            <MetricBar label="Session signal" value={prioritySignal.score} tone={prioritySignal.tone} />
            <View style={styles.priorityActions}><LimeButton label="VIEW SWING" onPress={() => latest && router.push({ pathname: "/swing-detail", params: { id: latest.id } })} style={styles.smallButton} /><Pressable onPress={() => router.push({ pathname: "/drill-detail", params: { drillId: prioritySignal.drillId } })} style={styles.darkButton}><Text style={styles.darkButtonText}>DRILL</Text></Pressable></View>
          </StaticCard>
        </Animated.View>

        <SectionHeader title="30-day trend" kicker="YOUR MOMENTUM" />
        <StaticCard style={styles.trendCard}>
          <View style={styles.trendTop}><View><Text style={styles.trendValue}>{data.latest?.score ?? 0}</Text><Text style={styles.trendCopy}>Latest score</Text></View><MiniChart values={sessions.slice(0, 8).map((s) => s.score).reverse()} width={158} height={54} /></View>
          <View style={styles.trendBottom}><Text style={styles.muted}>A steady score is becoming a repeatable swing.</Text><Text style={styles.limeMeta}>{practiceStreakLabel(streak)}</Text></View>
        </StaticCard>

        <SectionHeader title="Today's mission" kicker="10 MIN FOCUSED WORK" />
        <StaticCard style={styles.missionCard}>
          <View style={styles.missionTop}><View style={styles.missionBadge}><Text style={styles.missionBadgeText}>AI PRIORITY</Text></View><Text style={styles.missionTime}>10 min</Text></View>
          <Text style={styles.missionTitle}>{nextDrill?.title ?? "Record a baseline swing"}</Text>
          <Text style={styles.missionCopy}>{nextDrill?.description ?? "Your first analysis will unlock a focused practice mission built from your own session."}</Text>
          <MetricBar label="Mission progress" value={missionProgress} />
          <Pressable onPress={() => nextDrill && router.push({ pathname: "/drill-detail", params: { drillId: nextDrill.id } })} style={styles.missionLink}><Text style={styles.missionLinkText}>{homePracticeActionLabel(loggedToday, Boolean(nextDrill))}</Text><IconSymbol name="chevron.right" size={13} color={FIGMA.colors.lime} /></Pressable>
        </StaticCard>

        <View style={{ height: 12 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 15, paddingBottom: 28, gap: 13 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 2 },
  headerRight: { alignItems: "flex-end", gap: 10 },
  goodEvening: { color: FIGMA.colors.mutedStrong, fontSize: 9, fontWeight: "700", letterSpacing: 1.1 },
  name: { color: FIGMA.colors.white, fontSize: 27, fontWeight: "900", lineHeight: 30, marginTop: 1 },
  subtitle: { color: FIGMA.colors.muted, fontSize: 11, marginTop: 4 },
  streak: { flexDirection: "row", gap: 5, alignItems: "center", backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 5 },
  streakEmoji: { fontSize: 13 },
  streakText: { color: FIGMA.colors.lime, fontSize: 11, fontWeight: "800" },
  heroCard: { minHeight: 235, borderRadius: 20, overflow: "hidden", backgroundColor: FIGMA.colors.black, position: "relative", padding: 16 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(5,12,6,0.74)" },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: FIGMA.colors.lime },
  liveText: { color: FIGMA.colors.lime, fontSize: 9, fontWeight: "900", letterSpacing: 1.0 },
  heroTitle: { color: FIGMA.colors.white, fontSize: 54, fontWeight: "900", lineHeight: 58 },
  heroSmall: { color: FIGMA.colors.muted, fontSize: 13, fontWeight: "800" },
  heroCopy: { color: FIGMA.colors.muted, fontSize: 10, marginTop: 4 },
  heroDivider: { height: 1, backgroundColor: FIGMA.colors.border, marginTop: 17, marginBottom: 13 },
  heroStats: { flexDirection: "row", gap: 24 },
  statLabel: { color: FIGMA.colors.mutedStrong, fontSize: 7, fontWeight: "800", letterSpacing: 0.7 },
  statValue: { color: FIGMA.colors.white, fontSize: 13, fontWeight: "900", marginTop: 3 },
  record: { minHeight: 78, borderRadius: 18, backgroundColor: "#163C2F", padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  recordIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: FIGMA.colors.lime, justifyContent: "center", alignItems: "center" },
  recordTitle: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900" },
  recordCopy: { color: "#B6CCC2", fontSize: 10, marginTop: 3 },
  commandCenter: { minHeight: 86, borderRadius: 18, backgroundColor: "#111D12", borderWidth: 1, borderColor: "rgba(170,255,0,0.22)", padding: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  commandKicker: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 0.8 },
  commandTitle: { color: FIGMA.colors.white, fontSize: 14, fontWeight: "900", marginTop: 3 },
  commandCopy: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 13, marginTop: 3 },
  horizontalList: { gap: 10, paddingRight: 15, marginTop: 8 },
  priorityCard: { marginTop: 8, gap: 11 },
  priorityHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  priorityTitle: { color: FIGMA.colors.white, fontSize: 16, fontWeight: "900" },
  priorityCopy: { color: FIGMA.colors.muted, fontSize: 11, lineHeight: 17, marginTop: 4 },
  priorityScore: { width: 58, height: 58, borderRadius: 13, backgroundColor: FIGMA.colors.surfaceQuiet, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: FIGMA.colors.border },
  priorityScoreValue: { color: FIGMA.colors.high, fontSize: 22, fontWeight: "900" },
  priorityScoreLabel: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "800" },
  priorityActions: { flexDirection: "row", gap: 8 },
  smallButton: { minHeight: 38, flex: 1 },
  darkButton: { minHeight: 38, flex: 1, borderRadius: 99, backgroundColor: FIGMA.colors.border, borderWidth: 1, borderColor: FIGMA.colors.borderStrong, alignItems: "center", justifyContent: "center" },
  darkButtonText: { color: FIGMA.colors.white, fontSize: 10, fontWeight: "800", letterSpacing: 0.5 },
  trendCard: { gap: 14, marginTop: 8 },
  trendTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  trendValue: { color: FIGMA.colors.lime, fontSize: 34, fontWeight: "900" },
  trendCopy: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 2 },
  trendBottom: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  muted: { flex: 1, color: FIGMA.colors.muted, fontSize: 9, lineHeight: 13 },
  limeMeta: { color: FIGMA.colors.lime, fontSize: 9, fontWeight: "800" },
  missionCard: { gap: 9, marginTop: 8 },
  missionTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  missionBadge: { backgroundColor: "rgba(170,255,0,0.08)", borderRadius: 99, paddingHorizontal: 8, paddingVertical: 4 },
  missionBadgeText: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 0.55 },
  missionTime: { color: FIGMA.colors.muted, fontSize: 9, fontWeight: "700" },
  missionTitle: { color: FIGMA.colors.white, fontSize: 18, fontWeight: "900" },
  missionCopy: { color: FIGMA.colors.muted, fontSize: 11, lineHeight: 17 },
  missionLink: { alignSelf: "flex-start", flexDirection: "row", gap: 5, alignItems: "center", marginTop: 2 },
  missionLinkText: { color: FIGMA.colors.lime, fontSize: 10, fontWeight: "900" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
