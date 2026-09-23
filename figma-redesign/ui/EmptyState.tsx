import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";
import { GlassCard } from "./GlassCard";
import { LimeButton } from "./LimeButton";

export function EmptyState({ title, copy, action, onPress }: { title: string; copy: string; action?: string; onPress?: () => void }) {
  return <GlassCard style={styles.card}><View style={styles.icon}><Text style={styles.iconText}>＋</Text></View><Text style={styles.title}>{title}</Text><Text style={styles.copy}>{copy}</Text>{action && onPress ? <LimeButton label={action} onPress={onPress} /> : null}</GlassCard>;
}
const styles = StyleSheet.create({ card: { alignItems: "center", paddingVertical: 28, gap: 8 }, icon: { width: 44, height: 44, borderRadius: 14, backgroundColor: FIGMA.colors.translucentLime, alignItems: "center", justifyContent: "center", marginBottom: 3 }, iconText: { color: FIGMA.colors.lime, fontSize: 22, fontWeight: "900" }, title: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900", textAlign: "center" }, copy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15, textAlign: "center", maxWidth: 280 } });
