import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";

type Props<T extends string> = { values: readonly T[]; value: T; onChange: (v: T) => void };
export function SegmentedControl<T extends string>({ values, value, onChange }: Props<T>) {
  return <View style={styles.shell}>{values.map((item) => <Pressable key={item} onPress={() => onChange(item)} style={[styles.item, value === item && styles.active]}><Text style={[styles.text, value === item && styles.activeText]}>{item}</Text></Pressable>)}</View>;
}
const styles = StyleSheet.create({ shell: { flexDirection: "row", padding: 3, borderRadius: 10, backgroundColor: FIGMA.colors.surfaceQuiet, borderWidth: 1, borderColor: FIGMA.colors.border }, item: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 8 }, active: { backgroundColor: FIGMA.colors.lime }, text: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "900", letterSpacing: 0.3 }, activeText: { color: FIGMA.colors.black } });
