import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { drills, swings } from "@/lib/golf-data";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { VideoStage } from "../ui/VideoStage";
import { Phase, PHASES } from "../ui/PhaseStrip";
import { MetricBar } from "../ui/MetricBar";
import { AIInsightCard } from "../ui/AIInsightCard";
import { SectionHeader } from "../ui/SectionHeader";
import { LimeButton } from "../ui/LimeButton";
import { StaticCard } from "../ui/GlassCard";
import { StatusChip } from "../ui/Chip";

const metrics = [
  { key: "extension", label: "Early Extension", score: 74, tone: "high" as const, observation: "Your hips move toward the ball 8cm through impact.", why: "This reduces power transfer and makes contact less repeatable.", action: "Practice Hip Depth Reset — 3 sets, slow swings.", confidence: 94 },
  { key: "rotation", label: "Shoulder Rotation", score: 81, tone: "medium" as const, observation: "Your shoulder turn is 12° shorter than the target at the top.", why: "A fuller turn gives you more room to create speed without rushing transition.", action: "Use Rotation Through Impact for three slow sets.", confidence: 88 },
  { key: "head", label: "Head Stability", score: 92, tone: "good" as const, observation: "Only 2cm of lateral drift during transition.", why: "You are close to a repeatable center point through the strike.", action: "Keep the feet-together balance drill in rotation.", confidence: 91 },
  { key: "tempo", label: "Tempo", score: 88, tone: "good" as const, observation: "Your 3:1 backswing-to-downswing ratio is consistent.", why: "Repeatable timing makes it easier to coordinate rotation and contact.", action: "Keep this cue stable while you change other mechanics.", confidence: 97 },
];

export default function FigmaAnalyzeScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("IMPACT");
  const [tab, setTab] = useState<"VIDEO" | "POSE" | "PLANE" | "COMPARE">("VIDEO");
  const [openMetric, setOpenMetric] = useState<string | null>(metrics[0].key);
  const latest = swings[0];
  const topMetrics = useMemo(() => metrics.slice(0, 3), []);
  return (
    <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TopBar title="SWING ANALYSIS" subtitle="AI BIOMECHANICS" />
        <VideoStage phase={phase} onPhaseChange={setPhase} onCompare={() => router.push("/compare")} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {["VIDEO", "POSE", "PLANE", "COMPARE"].map((item) => <Pressable key={item} onPress={() => { setTab(item as typeof tab); if (item === "COMPARE") router.push("/compare"); }} style={[styles.tab, tab === item && styles.tabActive]}><Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text></Pressable>)}
        </ScrollView>

        <StaticCard style={styles.sessionHeader}>
          <View><Text style={styles.kicker}>LATEST SESSION</Text><Text style={styles.sessionTitle}>{latest.club} · {latest.date.split(",")[0]}</Text><Text style={styles.sessionMeta}>8 swings · captured locally · AI review ready</Text></View>
          <StatusChip label="ANALYZED" tone="good" />
        </StaticCard>

        <SectionHeader title="Top coaching cues" kicker="OBSERVATION → EXPLANATION → ACTION" />
        <View style={styles.stack}>
          {topMetrics.map((metric) => <View key={metric.key}>
            <Pressable onPress={() => setOpenMetric(openMetric === metric.key ? null : metric.key)} style={styles.metricCard}>
              <View style={styles.metricIndex}><Text style={styles.metricIndexText}>{metrics.indexOf(metric) + 1}</Text></View>
              <View style={{ flex: 1 }}><View style={styles.metricHeader}><Text style={styles.metricLabel}>{metric.label}</Text><Text style={[styles.metricScore, { color: metric.tone === "high" ? FIGMA.colors.high : metric.tone === "medium" ? FIGMA.colors.medium : FIGMA.colors.lime }]}>{metric.score}%</Text></View><MetricBar label="" value={metric.score} tone={metric.tone} showValue={false} /></View>
              <Text style={styles.chevron}>{openMetric === metric.key ? "⌃" : "⌄"}</Text>
            </Pressable>
            {openMetric === metric.key ? <View style={styles.insightWrap}><AIInsightCard observation={metric.observation} why={metric.why} action={metric.action} confidence={metric.confidence} onAction={() => router.push("/drill-detail")} /></View> : null}
          </View>)}
        </View>

        <StaticCard style={styles.allMetrics}>
          <Text style={styles.kicker}>ALL METRICS</Text>
          {metrics.map((metric) => <View key={metric.key} style={styles.metricLine}><Text style={styles.metricLineLabel}>{metric.label}</Text><View style={{ flex: 1 }}><MetricBar label="" value={metric.score} tone={metric.tone} showValue={false} /></View><Text style={styles.metricLineValue}>{metric.score}%</Text></View>)}
        </StaticCard>

        <LimeButton label="SESSION RECAP" onPress={() => router.push("/session-recap")} />
        <Pressable onPress={() => router.push("/capture")} style={styles.practiceAgain}><Text style={styles.practiceAgainText}>PRACTICE AGAIN</Text></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 13, paddingBottom: 28, gap: 12 },
  tabs: { gap: 6, paddingVertical: 2 },
  tab: { borderRadius: 8, borderWidth: 1, borderColor: FIGMA.colors.border, backgroundColor: FIGMA.colors.surface, paddingHorizontal: 10, paddingVertical: 8 },
  tabActive: { backgroundColor: FIGMA.colors.lime, borderColor: FIGMA.colors.lime },
  tabText: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "900", letterSpacing: 0.7 },
  tabTextActive: { color: FIGMA.colors.black },
  sessionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.9, marginBottom: 5 },
  sessionTitle: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900" },
  sessionMeta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 3 },
  stack: { gap: 7, marginTop: 7 },
  metricCard: { backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 14, padding: 12, flexDirection: "row", alignItems: "center", gap: 9 },
  metricIndex: { width: 21, height: 21, borderRadius: 11, backgroundColor: FIGMA.colors.border, justifyContent: "center", alignItems: "center" },
  metricIndexText: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "900" },
  metricHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  metricLabel: { color: FIGMA.colors.white, fontSize: 12, fontWeight: "800" },
  metricScore: { fontSize: 12, fontWeight: "900" },
  chevron: { color: FIGMA.colors.muted, fontSize: 15 },
  insightWrap: { marginHorizontal: 4, marginTop: -2, backgroundColor: FIGMA.colors.surfaceQuiet, padding: 8, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
  allMetrics: { gap: 8 },
  metricLine: { flexDirection: "row", alignItems: "center", gap: 8 },
  metricLineLabel: { width: 92, color: FIGMA.colors.muted, fontSize: 10 },
  metricLineValue: { width: 34, textAlign: "right", color: FIGMA.colors.white, fontSize: 10, fontWeight: "800" },
  practiceAgain: { minHeight: 46, borderRadius: 99, borderWidth: 1, borderColor: FIGMA.colors.borderStrong, backgroundColor: FIGMA.colors.surface, alignItems: "center", justifyContent: "center" },
  practiceAgainText: { color: FIGMA.colors.white, fontSize: 12, fontWeight: "800", letterSpacing: 0.5 },
});
