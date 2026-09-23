import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { FIGMA_METRICS, SESSION_HISTORY } from "../data";
import { TopBar } from "../ui/TopBar";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { ScoreRing } from "../ui/ScoreRing";
import { MetricBar } from "../ui/MetricBar";
import { AIInsightCard } from "../ui/AIInsightCard";
import { LimeButton } from "../ui/LimeButton";
import { SectionHeader } from "../ui/SectionHeader";

export default function FigmaSwingDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const session = useMemo(() => SESSION_HISTORY.find((item) => item.id === params.id) ?? SESSION_HISTORY[0], [params.id]);
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><TopBar title="SESSION DETAIL" subtitle={`${session.club} · ${session.date}`} /><GlassCard style={styles.hero}><View style={styles.heroCopy}><Text style={styles.kicker}>SESSION SCORE</Text><Text style={styles.title}>{session.score}</Text><Text style={styles.meta}>{session.swings} swings · {session.duration} · focus: {session.focus}</Text></View><ScoreRing score={session.score} size={98} /></GlassCard><SectionHeader title="Coaching readout" kicker="THE USEFUL PART" /><StaticCard style={styles.metrics}>{FIGMA_METRICS.slice(0, 4).map((metric) => <View key={metric.id} style={styles.metric}><View style={styles.metricTop}><Text style={styles.metricName}>{metric.label}</Text><Text style={styles.metricScore}>{metric.score}</Text></View><MetricBar label="" value={metric.score} tone={metric.tone} showValue={false} /></View>)}</StaticCard><AIInsightCard observation="Your current session is trending toward better rotation and head stability." why="Those two changes reduce timing variability without asking you to add speed." action="Use the extension drill as the one focused practice change." confidence={91} onAction={() => router.push("/drill-detail")} /><LimeButton label="OPEN FULL ANALYSIS" onPress={() => router.push("/analysis-detail")} /></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, hero: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: 170 }, heroCopy: { flex: 1 }, kicker: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "900", letterSpacing: 0.8 }, title: { color: FIGMA.colors.lime, fontSize: 56, lineHeight: 58, fontWeight: "900", marginTop: 2 }, meta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 5 }, metrics: { gap: 11 }, metric: { gap: 4 }, metricTop: { flexDirection: "row", justifyContent: "space-between" }, metricName: { color: FIGMA.colors.white, fontSize: 10, fontWeight: "800" }, metricScore: { color: FIGMA.colors.lime, fontSize: 10, fontWeight: "900" } });
