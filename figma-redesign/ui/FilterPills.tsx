import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { FIGMA } from "../theme";

type Props<T extends string> = { values: readonly T[]; value: T; onChange: (v: T) => void };
export function FilterPills<T extends string>({ values, value, onChange }: Props<T>) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content}>{values.map((item) => { const active = item === value; return <Pressable key={item} onPress={() => onChange(item)} style={[styles.pill, active && styles.active]}><Text style={[styles.text, active && styles.activeText]}>{item}</Text></Pressable>; })}</ScrollView>;
}
const styles = StyleSheet.create({
  content: { gap: 6, paddingRight: 12 },
  pill: { borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 7, backgroundColor: FIGMA.colors.surface },
  active: { backgroundColor: FIGMA.colors.lime, borderColor: FIGMA.colors.lime },
  text: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "900", letterSpacing: 0.5 },
  activeText: { color: FIGMA.colors.black },
});
