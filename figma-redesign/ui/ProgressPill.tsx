import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";

export function ProgressPill({ value, label }: { value: number; label: string }) {
  return <View style={styles.wrap}><View style={styles.bar}><View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value))}%` }]} /></View><Text style={styles.label}>{label}</Text></View>;
}
const styles = StyleSheet.create({ wrap: { gap: 5 }, bar: { height: 4, backgroundColor: FIGMA.colors.border, borderRadius: 99, overflow: "hidden" }, fill: { height: 4, borderRadius: 99, backgroundColor: FIGMA.colors.lime }, label: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "700" } });
