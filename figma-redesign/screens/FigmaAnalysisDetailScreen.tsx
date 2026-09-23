import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { StaticCard } from "../ui/GlassCard";
import { VideoStage } from "../ui/VideoStage";
import { Phase, PHASES } from "../ui/PhaseStrip";
import { MetricBar } from "../ui/MetricBar";
import { AIInsightCard } from "../ui/AIInsightCard";
import { LimeButton } from "../ui/LimeButton";

export default function FigmaAnalysisDetailScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("IMPACT");
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}><TopBar title="EARLY EXTENSION" subtitle="BIOMECHANICAL DEEP DIVE" back /><StaticCard style={styles.overview}><View style={styles.scoreBubble}><Text style={styles.score}>74</Text><Text style={styles.scoreLabel}>/100</Text></View><View style={{ flex: 1 }}><Text style={styles.kicker}>PRIMARY FAULT</Text><Text style={styles.title}>Pelvis moves toward the ball through impact.</Text><Text style={styles.meta}>8cm forward drift · 94% model confidence</Text></View></StaticCard><VideoStage phase={phase} onPhaseChange={setPhase} compact /><StaticCard style={styles.card}><Text style={styles.kicker}>IMPACT WINDOW</Text><MetricBar label="Hip depth" value={68} tone="high" detail="Target: within 2–4cm of address position" /><MetricBar label="Rotation continuity" value={82} tone="good" detail="Keep the lower body moving while staying back" /><MetricBar label="Head stability" value={92} tone="good" /></StaticCard><AIInsightCard observation="Your hips move closer to the ball as your downswing speeds up." why="That changes the low point and can force compensations in the hands." action="Use Hip Depth Reset: 3 sets of 10 slow swings." confidence={94} /><LimeButton label="START FIX DRILL" onPress={() => router.push("/drill-detail")} /><View style={styles.callout}><Text style={styles.calloutTitle}>Coach cue</Text><Text style={styles.calloutCopy}>“Keep your trail hip behind you while your belt buckle continues rotating.”</Text></View></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 13, paddingBottom: 32, gap: 12 }, overview: { flexDirection: "row", alignItems: "center", gap: 12 }, scoreBubble: { width: 66, height: 66, borderRadius: 16, backgroundColor: "rgba(255,102,102,0.08)", borderWidth: 1, borderColor: "rgba(255,102,102,0.16)", alignItems: "center", justifyContent: "center" }, score: { color: FIGMA.colors.high, fontSize: 23, fontWeight: "900" }, scoreLabel: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "800" }, kicker: { color: FIGMA.colors.mutedStrong, fontSize: 8, fontWeight: "800", letterSpacing: 0.9, marginBottom: 6 }, title: { color: FIGMA.colors.white, fontSize: 14, fontWeight: "900", lineHeight: 19 }, meta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 4 }, card: { gap: 12 }, callout: { backgroundColor: "rgba(170,255,0,0.05)", borderWidth: 1, borderColor: FIGMA.colors.translucentLimeBorder, borderRadius: 14, padding: 14 }, calloutTitle: { color: FIGMA.colors.lime, fontSize: 9, fontWeight: "900", letterSpacing: 0.8 }, calloutCopy: { color: FIGMA.colors.text, fontSize: 12, lineHeight: 18, marginTop: 5 } });
