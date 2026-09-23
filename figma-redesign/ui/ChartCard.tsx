import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";
import { GlassCard } from "./GlassCard";
import { MiniChart } from "./MiniChart";

export function ChartCard({ title, kicker, value, caption, values }: { title: string; kicker?: string; value: string; caption: string; values: number[] }) {
  return <GlassCard style={styles.card}><View style={styles.header}><View><Text style={styles.kicker}>{kicker ?? "TREND"}</Text><Text style={styles.title}>{title}</Text></View><View style={styles.valueWrap}><Text style={styles.value}>{value}</Text><Text style={styles.caption}>{caption}</Text></View></View><MiniChart values={values} width={296} height={84} /></GlassCard>;
}
const styles = StyleSheet.create({ card: { gap: 14 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }, kicker: { color: FIGMA.colors.muted, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 }, title: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900", marginTop: 3 }, valueWrap: { alignItems: "flex-end" }, value: { color: FIGMA.colors.lime, fontSize: 26, fontWeight: "900" }, caption: { color: FIGMA.colors.muted, fontSize: 8, marginTop: -2 }, });
