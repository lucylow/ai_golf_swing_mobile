import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { FIGMA_METRICS } from "../data";
import { TopBar } from "../ui/TopBar";
import { VideoStage } from "../ui/VideoStage";
import { LimeButton } from "../ui/LimeButton";
import { CoachCue } from "../ui/CoachCue";

export default function FigmaLiveCoachingScreen() {
  const [index, setIndex] = useState(0);
  const cue = useMemo(() => FIGMA_METRICS[index % FIGMA_METRICS.length], [index]);
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="LIVE COACHING" subtitle="One cue at a time" /><VideoStage phase="IMPACT" onPhaseChange={() => undefined} /><View style={styles.cueCard}><Text style={styles.kicker}>CURRENT CUE</Text><Text style={styles.title}>{cue.label}</Text><Text style={styles.copy}>{cue.observation}</Text><View style={styles.score}><Text style={styles.scoreValue}>{cue.score}</Text><Text style={styles.scoreLabel}>/100</Text></View></View><View style={styles.controls}><Pressable onPress={() => setIndex((v) => (v + FIGMA_METRICS.length - 1) % FIGMA_METRICS.length)} style={styles.control}><Text style={styles.controlText}>‹</Text></Pressable><Text style={styles.position}>{index + 1} / {FIGMA_METRICS.length}</Text><Pressable onPress={() => setIndex((v) => (v + 1) % FIGMA_METRICS.length)} style={styles.control}><Text style={styles.controlText}>›</Text></Pressable></View><CoachCue index={1} title={cue.label} copy={cue.action} tag="THIS SWING" /><LimeButton label="SAVE COACHING NOTE" onPress={() => undefined} /></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, cueCard: { minHeight: 160, borderRadius: 18, padding: 15, backgroundColor: FIGMA.colors.surfaceElevated, borderWidth: 1, borderColor: FIGMA.colors.translucentLimeBorder, gap: 8 }, kicker: { color: FIGMA.colors.lime, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 }, title: { color: FIGMA.colors.white, fontSize: 24, fontWeight: "900" }, copy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15, maxWidth: 250 }, score: { position: "absolute", right: 14, top: 14, alignItems: "center" }, scoreValue: { color: FIGMA.colors.lime, fontSize: 27, fontWeight: "900" }, scoreLabel: { color: FIGMA.colors.muted, fontSize: 7 }, controls: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, control: { width: 42, height: 38, borderRadius: 12, backgroundColor: FIGMA.colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: FIGMA.colors.border }, controlText: { color: FIGMA.colors.white, fontSize: 22 }, position: { color: FIGMA.colors.muted, fontSize: 9, fontWeight: "800" } });
