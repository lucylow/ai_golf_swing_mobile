import React from "react";
import { StyleSheet, View } from "react-native";
import { CoachingMetric } from "../data";
import { MetricBar } from "./MetricBar";
import { StatTile } from "./StatTile";

export function MetricGrid({ metrics }: { metrics: CoachingMetric[] }) {
  return <View style={styles.grid}>{metrics.map((metric) => <View key={metric.id} style={styles.item}><StatTile label={metric.shortLabel} value={`${metric.score}`} hint={metric.delta} tone={metric.tone === "high" ? "high" : metric.tone === "medium" ? "neutral" : "good"} /><View style={styles.bar}><MetricBar label="" value={metric.score} tone={metric.tone} showValue={false} /></View></View>)}</View>;
}
const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  item: { width: "48.8%", gap: 7 },
  bar: { marginHorizontal: 2 },
});
