import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA_METRICS } from "../data";
import { FIGMA } from "../theme";
import { MetricBar } from "./MetricBar";
export function ScoreBreakdown() { return <View style={styles.wrap}>{FIGMA_METRICS.map((metric) => <View key={metric.id} style={styles.row}><View style={styles.left}><Text style={styles.label}>{metric.shortLabel}</Text><Text style={styles.value}>{metric.value}</Text></View><View style={styles.bar}><MetricBar label="" value={metric.score} tone={metric.tone} showValue={false} /></View><Text style={styles.score}>{metric.score}</Text></View>)}</View>; }
const styles = StyleSheet.create({ wrap: { gap: 9 }, row: { flexDirection: "row", alignItems: "center", gap: 9 }, left: { width: 82 }, label: { color: FIGMA.colors.white, fontSize: 9, fontWeight: "800" }, value: { color: FIGMA.colors.muted, fontSize: 7, marginTop: 2 }, bar: { flex: 1 }, score: { color: FIGMA.colors.textSoft, width: 25, textAlign: "right", fontSize: 9, fontWeight: "900" } });
