import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA, toneColor } from "../theme";
import { MiniChart } from "./MiniChart";

type Props = { label: string; score: number; delta: string; values?: number[]; tone?: "good" | "high" | "medium" };
export function TrendRow({ label, score, delta, values = [68, 71, 70, 74, 77, score], tone = "good" }: Props) {
  return <View style={styles.row}><View style={styles.title}><Text style={styles.label}>{label}</Text><Text style={[styles.delta, { color: toneColor(tone) }]}>{delta}</Text></View><MiniChart values={values} width={104} height={34} /><Text style={[styles.score, { color: toneColor(tone) }]}>{score}</Text></View>;
}
const styles = StyleSheet.create({ row: { minHeight: 54, flexDirection: "row", alignItems: "center", gap: 10, borderBottomWidth: 1, borderBottomColor: FIGMA.colors.border }, title: { width: 88 }, label: { color: FIGMA.colors.white, fontSize: 10, fontWeight: "800" }, delta: { fontSize: 8, marginTop: 2, fontWeight: "800" }, score: { width: 28, textAlign: "right", fontSize: 13, fontWeight: "900" }, });
