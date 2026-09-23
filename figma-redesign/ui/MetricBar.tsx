import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA, toneColor, type FigmaTone } from "../theme";

export function MetricBar({ label, value, detail, tone = "good", showValue = true }: { label: string; value: number; detail?: string; tone?: FigmaTone; showValue?: boolean }) {
  const color = toneColor(tone);
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {showValue ? <Text style={[styles.value, { color }]}>{value}%</Text> : null}
      </View>
      <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: value }} style={styles.track}>
        <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }]} />
      </View>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { color: FIGMA.colors.text, fontSize: 12, fontWeight: "700" },
  value: { fontSize: 12, fontWeight: "900" },
  track: { height: 5, overflow: "hidden", borderRadius: 3, backgroundColor: FIGMA.colors.border },
  fill: { height: "100%", borderRadius: 3 },
  detail: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15 },
});
