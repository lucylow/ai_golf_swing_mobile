import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA, type FigmaTone } from "../theme";
import { StatusChip } from "./Chip";

type DrillRowProps = { title: string; description?: string; time?: string; difficulty?: string; target?: string; subtitle?: string; meta?: string; badge?: string; recommended?: boolean; completed?: boolean; onPress?: () => void };

export function DrillRow({ title, description, time, difficulty, target, subtitle, meta, badge, recommended = false, completed = false, onPress }: DrillRowProps) {
  const secondaryMeta = subtitle ?? [time, difficulty].filter(Boolean).join(" · ");
  const detail = description ?? meta ?? "Open session details";
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconBox, completed && { backgroundColor: "rgba(170,255,0,0.12)" }]}><IconSymbol name={completed ? "checkmark.circle.fill" : "bolt.fill"} size={21} color={completed ? FIGMA.colors.lime : FIGMA.colors.medium} /></View>
      <View style={styles.content}>
        <View style={styles.header}><Text style={styles.title}>{title}</Text>{badge ? <StatusChip label={badge} tone="neutral" /> : recommended ? <StatusChip label="AI" tone="good" /> : completed ? <StatusChip label="DONE" tone="good" /> : null}</View>
        {secondaryMeta ? <Text style={styles.meta}>{secondaryMeta}</Text> : null}
        {target ? <Text style={styles.target}>Target <Text style={{ color: FIGMA.colors.lime }}>{target}</Text></Text> : null}
        <Text numberOfLines={2} style={styles.description}>{detail}</Text>
      </View>
      <IconSymbol name="chevron.right" size={16} color={FIGMA.colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 100, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 15, padding: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  pressed: { opacity: 0.78 },
  iconBox: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#1D2414", alignItems: "center", justifyContent: "center" },
  content: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  title: { flex: 1, color: FIGMA.colors.white, fontSize: 13, fontWeight: "800" },
  meta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 3 },
  target: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 2 },
  description: { color: FIGMA.colors.mutedStrong, fontSize: 9, lineHeight: 13, marginTop: 5 },
});
