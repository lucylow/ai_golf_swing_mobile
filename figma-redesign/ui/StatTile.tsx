import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA, toneColor, type FigmaTone } from "../theme";

export function StatTile({ label, value, accent = false, caption, hint, tone, icon }: { label: string; value: string; accent?: boolean; caption?: string; hint?: string; tone?: FigmaTone; icon?: string }) {
  const valueColor = tone ? toneColor(tone) : accent ? FIGMA.colors.lime : FIGMA.colors.white;
  return (
    <View style={styles.tile}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {caption ?? hint ? <Text style={styles.caption}>{caption ?? hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: { flex: 1, minHeight: 92, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 14, padding: 12, justifyContent: "center" },
  icon: { fontSize: 18, marginBottom: 3 },
  value: { color: FIGMA.colors.white, fontSize: 19, fontWeight: "900" },
  label: { color: FIGMA.colors.muted, fontSize: 9, fontWeight: "700", letterSpacing: 0.65, marginTop: 4 },
  caption: { color: FIGMA.colors.mutedStrong, fontSize: 9, marginTop: 2 },
});
