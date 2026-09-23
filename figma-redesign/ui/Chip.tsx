import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { FIGMA, toneBackground, toneColor, type FigmaTone } from "../theme";

export function StatusChip({ label, tone = "neutral" as FigmaTone, active = false, onPress }: { label: string; tone?: FigmaTone; active?: boolean; onPress?: () => void }) {
  const content = <Text style={[styles.text, { color: active ? FIGMA.colors.black : toneColor(tone) }]}>{label}</Text>;
  if (onPress) {
    return <Pressable onPress={onPress} style={[styles.chip, { backgroundColor: active ? FIGMA.colors.lime : toneBackground(tone), borderColor: active ? FIGMA.colors.lime : FIGMA.colors.border }]}>{content}</Pressable>;
  }
  return <Pressable disabled style={[styles.chip, { backgroundColor: toneBackground(tone), borderColor: FIGMA.colors.border }]}>{content}</Pressable>;
}

export function Chip({ label, tone = "neutral" as FigmaTone }: { label: string; tone?: FigmaTone }) {
  return <StatusChip label={label} tone={tone} />;
}

const styles = StyleSheet.create({
  chip: { minHeight: 26, borderRadius: 13, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 9 },
  text: { fontSize: 9, fontWeight: "800", letterSpacing: 0.35 },
});
