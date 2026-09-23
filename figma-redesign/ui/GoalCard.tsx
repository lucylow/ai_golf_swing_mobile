import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";
import { GlassCard } from "./GlassCard";
import { LimeButton } from "./LimeButton";
import { MetricBar } from "./MetricBar";

type Props = { title: string; copy: string; progress: number; target: string; onPress?: () => void };
export function GoalCard({ title, copy, progress, target, onPress }: Props) {
  return <GlassCard style={styles.card}><View style={styles.top}><View style={styles.icon}><Text style={styles.iconText}>↗</Text></View><View style={styles.meta}><Text style={styles.kicker}>CURRENT GOAL</Text><Text style={styles.title}>{title}</Text></View></View><Text style={styles.copy}>{copy}</Text><MetricBar label={`${progress}% complete`} value={progress} /><View style={styles.bottom}><Text style={styles.target}>{target}</Text>{onPress ? <Pressable onPress={onPress}><Text style={styles.link}>VIEW GOAL ›</Text></Pressable> : <LimeButton label="GOAL" onPress={() => undefined} />}</View></GlassCard>;
}
const styles = StyleSheet.create({
  card: { gap: 11 },
  top: { flexDirection: "row", alignItems: "center", gap: 9 },
  icon: { width: 36, height: 36, borderRadius: 12, backgroundColor: FIGMA.colors.translucentLime, borderWidth: 1, borderColor: FIGMA.colors.translucentLimeBorder, alignItems: "center", justifyContent: "center" },
  iconText: { color: FIGMA.colors.lime, fontSize: 18, fontWeight: "900" },
  meta: { flex: 1 },
  kicker: { color: FIGMA.colors.muted, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 },
  title: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900", marginTop: 2 },
  copy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15 },
  bottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  target: { color: FIGMA.colors.textSoft, fontSize: 9, fontWeight: "700" },
  link: { color: FIGMA.colors.lime, fontSize: 9, fontWeight: "900", letterSpacing: 0.4 },
});
