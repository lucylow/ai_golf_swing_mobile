import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { APP_COPY, FIGMA_METRICS, SCORE_HISTORY } from "../data";
import { TopBar } from "../ui/TopBar";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { ChartCard } from "../ui/ChartCard";
import { TrendRow } from "../ui/TrendRow";
import { Badge } from "../ui/Badge";

export default function FigmaTrendDetailScreen() {
  const values = SCORE_HISTORY.map((p) => p.value);
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><TopBar title="PROGRESS DETAIL" subtitle={APP_COPY.progressSubtitle} /><ChartCard title="Swing score" kicker="LAST 35 DAYS" value="86" caption="current" values={values} /><SectionHeader title="Metric trend" kicker="HOW THE PIECES ARE MOVING" /><StaticCard><View>{FIGMA_METRICS.slice(0, 5).map((m) => <TrendRow key={m.id} label={m.shortLabel} score={m.score} delta={m.delta} tone={m.tone} />)}</View></StaticCard><SectionHeader title="What changed" kicker="READ THE PATTERN, NOT THE NOISE" /><GlassCard style={styles.insight}><View style={styles.badges}><Badge label="ROTATION" tone="good" /><Badge label="HEAD" tone="good" compact /></View><Text style={styles.title}>Your better swings share the same transition pattern.</Text><Text style={styles.copy}>The last three sessions show tighter head control and a fuller turn. Extension remains the clearest coaching opportunity.</Text></GlassCard></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 28, gap: 12 }, insight: { gap: 9 }, badges: { flexDirection: "row", gap: 6 }, title: { color: FIGMA.colors.white, fontSize: 16, fontWeight: "900", lineHeight: 20 }, copy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 16 } });
