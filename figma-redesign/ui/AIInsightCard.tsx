import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";
import { StatusChip } from "./Chip";

export function AIInsightCard({ observation, why, action, confidence = 92, onAction }: { observation: string; why: string; action: string; confidence?: number; onAction?: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.spark}><Text style={styles.sparkText}>✦</Text></View>
        <View style={styles.content}>
          <View style={styles.header}><Text style={styles.ai}>AI COACH</Text><StatusChip label={`${confidence}% confidence`} tone="neutral" /></View>
          <View style={styles.row}><Text style={styles.label}>OBSERVATION</Text><Text style={styles.copy}>{observation}</Text></View>
          {expanded ? <>
            <View style={styles.row}><Text style={[styles.label, styles.why]}>WHY</Text><Text style={styles.copyMuted}>{why}</Text></View>
            <View style={styles.row}><Text style={[styles.label, styles.action]}>ACTION</Text><Text style={styles.copy}>{action}</Text></View>
          </> : null}
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable onPress={() => setExpanded((value) => !value)} style={styles.footerButton}>
          <Text style={styles.footerLink}>{expanded ? "LESS" : "WHY DOES THIS MATTER?"}</Text>
        </Pressable>
        {onAction ? <Pressable onPress={onAction} style={[styles.footerButton, styles.footerRight]}><Text style={[styles.footerLink, { color: FIGMA.colors.lime }]}>SHOW ME</Text><IconSymbol name="chevron.right" size={12} color={FIGMA.colors.lime} /></Pressable> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: FIGMA.colors.translucentLime, borderWidth: 1, borderColor: FIGMA.colors.translucentLimeBorder, borderRadius: 14, overflow: "hidden" },
  top: { padding: 14, flexDirection: "row", gap: 10 },
  spark: { width: 24, height: 24, alignItems: "center", justifyContent: "center" },
  sparkText: { color: FIGMA.colors.lime, fontSize: 20 },
  content: { flex: 1, gap: 10 },
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  ai: { color: FIGMA.colors.lime, fontSize: 10, fontWeight: "800", letterSpacing: 0.8 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  label: { color: FIGMA.colors.mutedStrong, backgroundColor: FIGMA.colors.border, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, fontSize: 8, fontWeight: "800", letterSpacing: 0.5 },
  why: { color: FIGMA.colors.medium, backgroundColor: "rgba(255,184,0,0.1)" },
  action: { color: FIGMA.colors.lime, backgroundColor: "rgba(170,255,0,0.1)" },
  copy: { flex: 1, color: FIGMA.colors.text, fontSize: 12, lineHeight: 18 },
  copyMuted: { flex: 1, color: FIGMA.colors.textSoft, fontSize: 12, lineHeight: 18 },
  footer: { borderTopWidth: 1, borderTopColor: "rgba(170,255,0,0.10)", flexDirection: "row" },
  footerButton: { flex: 1, minHeight: 38, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 4 },
  footerRight: { borderLeftWidth: 1, borderLeftColor: "rgba(170,255,0,0.10)" },
  footerLink: { color: FIGMA.colors.muted, fontSize: 9, fontWeight: "800", letterSpacing: 0.7 },
});
