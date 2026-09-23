import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";

export function SettingsRow({ label, value, onPress, toggle, checked, title, subtitle, right }: { label?: string; value?: string; onPress?: () => void; toggle?: boolean; checked?: boolean; title?: string; subtitle?: string; right?: React.ReactNode }) {
  const rowLabel = label ?? title ?? "Setting";
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.copy}><Text style={styles.label}>{rowLabel}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>
      {right ?? (toggle ? <Switch value={checked} onValueChange={onPress} trackColor={{ false: FIGMA.colors.borderStrong, true: FIGMA.colors.limeSoft }} thumbColor={checked ? FIGMA.colors.lime : FIGMA.colors.textSoft} /> : <View style={styles.right}>{value ? <Text style={styles.value}>{value}</Text> : null}{onPress ? <IconSymbol name="chevron.right" size={14} color={FIGMA.colors.muted} /> : null}</View>)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 54, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 13, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  copy: { flex: 1, paddingRight: 10 },
  right: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { color: FIGMA.colors.white, fontSize: 13, fontWeight: "600" },
  subtitle: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 13, marginTop: 3 },
  value: { color: FIGMA.colors.muted, fontSize: 11 },
  pressed: { opacity: 0.78 },
});
