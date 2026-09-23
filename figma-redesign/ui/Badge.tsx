import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA, FigmaTone, toneBackground, toneColor } from "../theme";

type Props = { label: string; tone?: FigmaTone; compact?: boolean };
export function Badge({ label, tone = "neutral", compact = false }: Props) {
  return <View style={[styles.wrap, { backgroundColor: toneBackground(tone) }, compact && styles.compact]}><View style={[styles.dot, { backgroundColor: toneColor(tone) }]} /><Text style={[styles.text, { color: toneColor(tone) }, compact && styles.compactText]}>{label}</Text></View>;
}
const styles = StyleSheet.create({
  wrap: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 5, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 999, paddingHorizontal: 9, paddingVertical: 6 },
  compact: { paddingHorizontal: 7, paddingVertical: 4 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  text: { fontSize: 8, fontWeight: "900", letterSpacing: 0.6 },
  compactText: { fontSize: 7 },
});
