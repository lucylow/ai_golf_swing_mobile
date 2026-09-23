import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { swings } from "@/lib/golf-data";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { ScoreRing } from "../ui/ScoreRing";
import { StaticCard } from "../ui/GlassCard";
import { StatTile } from "../ui/StatTile";
import { MetricBar } from "../ui/MetricBar";
import { LimeButton } from "../ui/LimeButton";
import { AIInsightCard } from "../ui/AIInsightCard";

export default function FigmaSessionRecapScreen() {
  const router = useRouter();
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><TopBar title="SESSION RECAP" subtitle="MAY 2 · 7-IRON" back /><StaticCard style={styles.score}><Text style={styles.kicker}>SESSION SCORE</Text><ScoreRing score={82} size={142} pulse /><Text style={styles.delta}>+6 from last session</Text><Text style={styles.caption}>Your best session in 2 weeks</Text></StaticCard><View style={styles.grid}><StatTile label="TOTAL SWINGS" value="8" icon="⚡" /><StatTile label="BEST SWING" value="86" icon="🏆" /><StatTile label="AVG SCORE" value="82" icon="📊" /><StatTile label="VS PREVIOUS" value="+6pts" accent icon="📈" /></View><StaticCard style={styles.card}><Text style={styles.kicker}>TOP COACHING SIGNAL</Text><Text style={styles.title}>Keep your hips deeper through impact</Text><MetricBar label="Early Extension" value={74} tone="high" detail="Main improvement opportunity" /></StaticCard><AIInsightCard observation="Hip depth improved slightly from the previous swing." why="The pattern still appears when transition accelerates." action="Run Hip Depth Reset before your next range session." confidence={94} onAction={() => router.push("/drill-detail")} /><LimeButton label="START DRILL" onPress={() => router.push("/drill-detail")} /><LimeButton label="COMPARE TO REFERENCE" onPress={() => router.push("/compare")} /><View style={{ height: 12 }} /></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 13, paddingBottom: 30, gap: 12 }, score: { alignItems: "center", paddingVertical: 20 }, kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.9, marginBottom: 10 }, delta: { color: FIGMA.colors.lime, fontSize: 18, fontWeight: "900", marginTop: 8 }, caption: { color: FIGMA.colors.muted, fontSize: 10, marginTop: 3 }, grid: { flexDirection: "row", gap: 7, flexWrap: "wrap" }, card: { gap: 10 }, title: { color: FIGMA.colors.white, fontSize: 16, fontWeight: "900" } });
