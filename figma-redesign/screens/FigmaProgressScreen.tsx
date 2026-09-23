import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useGolfAppState } from "@/lib/golf-app-state";
import { derivePracticeStreak, deriveWeeklyPracticeCalendar, practiceStreakLabel } from "@/lib/home-statistics";
import { deriveProgressMetric, nextProgressMetric, progressMetricLabel, progressMetricUnit, type ProgressMetric } from "@/lib/progress-metrics";
import { drills } from "@/lib/golf-data";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Toast } from "@/components/ui/feedback";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { StaticCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { ProgressChart } from "../ui/ProgressChart";
import { MetricBar } from "../ui/MetricBar";
import { StatTile } from "../ui/StatTile";
import { DrillRow } from "../ui/DrillRow";

export default function FigmaProgressScreen() {
  const router = useRouter();
  const { sessions, activeGoal, completedDrills, lastPracticedDrills, preferredProgressMetric, updateProgressMetric } = useGolfAppState();
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState("");
  const metric = preferredProgressMetric as ProgressMetric;
  const metricData = useMemo(() => deriveProgressMetric(sessions, metric), [metric, sessions]);
  const average = metricData.average == null ? "—" : metricData.average.toFixed(metric === "tempo" ? 1 : 0);
  const streak = derivePracticeStreak(lastPracticedDrills);
  const week = deriveWeeklyPracticeCalendar(lastPracticedDrills);
  const values = metricData.values.length ? metricData.values : [0, 0, 0];
  const goalPct = Math.min(100, Math.round((activeGoal.current / activeGoal.target) * 100));
  const cycleMetric = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await updateProgressMetric(nextProgressMetric(metric));
    } catch {
      setToast("Could not save the progress metric. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="PROGRESS" subtitle="THE LONG GAME" actionIcon="gearshape.fill" onAction={() => router.push("/(tabs)/profile")} />
        <Text style={styles.title}>Build a repeatable swing.</Text>
        <Text style={styles.subtitle}>The app should make progress visible, not noisy.</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Open extended trends dashboard" onPress={() => router.push("/trends-v2")} style={styles.exploreLink}><Text style={styles.exploreLinkText}>EXPLORE EXTENDED TRENDS</Text><IconSymbol name="arrow.up.right" size={13} color={FIGMA.colors.lime} /></Pressable>

        <StaticCard style={styles.trendCard}>
          <View style={styles.trendHeader}><View><Text style={styles.kicker}>TRACKING</Text><Text style={styles.metricTitle}>{progressMetricLabel(metric)}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={`Change tracked metric, currently ${progressMetricLabel(metric)}`} onPress={() => { void cycleMetric(); }} style={styles.selector}><Text style={styles.selectorText}>{isSaving ? "SAVING" : "CHANGE"}</Text><IconSymbol name="chevron.down" size={13} color={FIGMA.colors.lime} /></Pressable></View>
          <View style={styles.avgRow}><View><Text style={styles.average}>{average}<Text style={styles.unit}> {progressMetricUnit(metric)}</Text></Text><Text style={styles.avgCaption}>Average across saved sessions</Text></View><View style={styles.change}><Text style={styles.changeValue}>{metricData.changePercent == null ? "—" : `${metricData.changePercent >= 0 ? "+" : ""}${metricData.changePercent.toFixed(1)}%`}</Text><Text style={styles.changeCaption}>vs earlier</Text></View></View>
          <ProgressChart values={values} labels={["EARLY", "MID", "RECENT"]} />
        </StaticCard>

        <SectionHeader title="Active goal" kicker="ONE TARGET AT A TIME" link="GOALS" onPress={() => router.push("/goals-v2")} />
        <StaticCard style={styles.goalCard}>
          <View style={styles.goalIcon}><IconSymbol name="target" size={21} color={FIGMA.colors.lime} /></View>
          <View style={{ flex: 1 }}><Text style={styles.goalTitle}>Reach {activeGoal.target} mph club speed</Text><Text style={styles.goalMeta}>By {activeGoal.deadline} · {goalPct}% complete</Text><View style={styles.track}><View style={[styles.fill, { width: `${goalPct}%` }]} /></View></View>
          <Text style={styles.goalValue}>{activeGoal.current}</Text>
        </StaticCard>

        <View style={styles.twoCol}><StatTile label="PRACTICE STREAK" value={`${streak}d`} accent icon="🔥" caption={practiceStreakLabel(streak)} /><StatTile label="COMPLETED DRILLS" value={`${completedDrills.length}`} icon="⚡" caption="This season" /></View>

        <SectionHeader title="This week's focus" kicker="AI COACHING SIGNAL" />
        <StaticCard style={styles.focusCard}><View style={styles.focusIcon}><IconSymbol name="bolt.fill" size={22} color={FIGMA.colors.medium} /></View><View style={{ flex: 1 }}><Text style={styles.focusTitle}>Keep your hips deeper through impact</Text><Text style={styles.focusCopy}>The same cue appears across your last few sessions, so the next drill stays focused.</Text></View></StaticCard>

        <SectionHeader title="Last 7 days" kicker="PRACTICE RHYTHM" />
        <StaticCard style={styles.weekCard}><View style={styles.weekRow}>{week.map((day) => <Pressable key={day.key} onPress={() => day.count > 0 && router.push({ pathname: "/drill-detail", params: { drillId: drills[0]?.id } })} style={styles.day}><View style={[styles.dayDot, day.practiced && styles.dayDotActive]}><Text style={[styles.dayCount, day.practiced && styles.dayCountActive]}>{day.count || "·"}</Text></View><Text style={styles.dayLabel}>{day.label}</Text></Pressable>)}</View></StaticCard>

        <SectionHeader title="Recommended drills" kicker="PERSONALIZED PRACTICE" link="PRACTICE" onPress={() => router.push({ pathname: "/drill-detail", params: { drillId: drills[0]?.id } })} />
        <View style={styles.drills}>{drills.map((drill, index) => <DrillRow key={drill.id} title={drill.title} description={drill.description} time={drill.time} difficulty={index === 0 ? "Intermediate" : "Beginner"} target={index === 0 ? "Early Extension" : "Tempo"} recommended={index === 0} completed={completedDrills.includes(drill.id)} onPress={() => router.push({ pathname: "/drill-detail", params: { drillId: drill.id } })} />)}</View>
      </ScrollView>
      <Toast visible={Boolean(toast)} message={toast} tone="error" onHide={() => setToast("")} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 15, paddingBottom: 32, gap: 12 },
  title: { color: FIGMA.colors.white, fontSize: 26, fontWeight: "900", marginTop: 1 },
  subtitle: { color: FIGMA.colors.muted, fontSize: 11, marginTop: -4 },
  exploreLink: { alignSelf: "flex-start", flexDirection: "row", gap: 5, alignItems: "center", borderRadius: 99, borderWidth: 1, borderColor: "rgba(170,255,0,0.22)", backgroundColor: "rgba(170,255,0,0.05)", paddingHorizontal: 9, paddingVertical: 6, marginTop: -2 },
  exploreLinkText: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 0.55 },
  kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.85, marginBottom: 5 },
  trendCard: { gap: 13 },
  trendHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  metricTitle: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900" },
  selector: { flexDirection: "row", gap: 4, alignItems: "center", backgroundColor: FIGMA.colors.surfaceQuiet, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 6 },
  selectorText: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900" },
  avgRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  average: { color: FIGMA.colors.lime, fontSize: 32, fontWeight: "900" },
  unit: { color: FIGMA.colors.muted, fontSize: 10, fontWeight: "800" },
  avgCaption: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 1 },
  change: { alignItems: "flex-end" },
  changeValue: { color: FIGMA.colors.lime, fontSize: 15, fontWeight: "900" },
  changeCaption: { color: FIGMA.colors.muted, fontSize: 8, marginTop: 1 },
  goalCard: { flexDirection: "row", alignItems: "center", gap: 10 },
  goalIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "rgba(170,255,0,0.08)", alignItems: "center", justifyContent: "center" },
  goalTitle: { color: FIGMA.colors.white, fontSize: 13, fontWeight: "800" },
  goalMeta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 4 },
  track: { height: 5, backgroundColor: FIGMA.colors.border, borderRadius: 3, overflow: "hidden", marginTop: 8 },
  fill: { height: "100%", backgroundColor: FIGMA.colors.lime, borderRadius: 3 },
  goalValue: { color: FIGMA.colors.white, fontSize: 18, fontWeight: "900" },
  twoCol: { flexDirection: "row", gap: 8 },
  focusCard: { flexDirection: "row", gap: 10, alignItems: "center" },
  focusIcon: { width: 43, height: 43, borderRadius: 12, backgroundColor: "rgba(255,184,0,0.10)", alignItems: "center", justifyContent: "center" },
  focusTitle: { color: FIGMA.colors.white, fontSize: 14, fontWeight: "900" },
  focusCopy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15, marginTop: 3 },
  weekCard: { paddingVertical: 15 },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  day: { alignItems: "center", gap: 5 },
  dayDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: FIGMA.colors.surfaceQuiet, borderWidth: 1, borderColor: FIGMA.colors.border, alignItems: "center", justifyContent: "center" },
  dayDotActive: { backgroundColor: FIGMA.colors.lime, borderColor: FIGMA.colors.lime },
  dayCount: { color: FIGMA.colors.muted, fontSize: 10, fontWeight: "800" },
  dayCountActive: { color: FIGMA.colors.black },
  dayLabel: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800" },
  drills: { gap: 8 },
});
