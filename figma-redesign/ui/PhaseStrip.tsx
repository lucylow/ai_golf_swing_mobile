import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";

export const PHASES = ["ADDRESS", "TOP", "DOWNSWING", "IMPACT", "FINISH"] as const;
export type Phase = (typeof PHASES)[number];

export function PhaseStrip({ active, onChange }: { active: Phase; onChange: (phase: Phase) => void }) {
  const activeIndex = PHASES.indexOf(active);
  return (
    <View style={styles.wrap}>
      <View style={styles.bars}>
        {PHASES.map((phase, index) => <Pressable key={phase} onPress={() => onChange(phase)} style={[styles.bar, phase === active ? styles.active : index < activeIndex && styles.past]} />)}
      </View>
      <View style={styles.labels}>{PHASES.map((phase) => <Text key={phase} style={[styles.label, phase === active && styles.activeLabel]}>{phase}</Text>)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  bars: { flexDirection: "row", gap: 5 },
  bar: { flex: 1, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.18)" },
  active: { backgroundColor: FIGMA.colors.lime },
  past: { backgroundColor: "rgba(170,255,0,0.42)" },
  labels: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "rgba(255,255,255,0.42)", fontSize: 7, fontWeight: "800" },
  activeLabel: { color: FIGMA.colors.lime },
});
