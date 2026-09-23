import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";
import { Badge } from "./Badge";

type Props = { index: number; title: string; copy: string; tag?: string; onPress?: () => void };
export function CoachCue({ index, title, copy, tag, onPress }: Props) {
  return <Pressable disabled={!onPress} onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}><View style={styles.number}><Text style={styles.numberText}>{String(index).padStart(2, "0")}</Text></View><View style={styles.copy}><View style={styles.header}><Text style={styles.title}>{title}</Text>{tag ? <Badge label={tag} tone="good" compact /> : null}</View><Text style={styles.body}>{copy}</Text></View><Text style={styles.chevron}>›</Text></Pressable>;
}
const styles = StyleSheet.create({ row: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: FIGMA.colors.border }, number: { width: 30, height: 30, borderRadius: 10, backgroundColor: FIGMA.colors.surfaceElevated, alignItems: "center", justifyContent: "center" }, numberText: { color: FIGMA.colors.mutedStrong, fontSize: 7, fontWeight: "900" }, copy: { flex: 1 }, header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 7 }, title: { flex: 1, color: FIGMA.colors.white, fontSize: 11, fontWeight: "900" }, body: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 14, marginTop: 4 }, chevron: { color: FIGMA.colors.muted, fontSize: 18, paddingTop: 4 }, pressed: { opacity: 0.68 } });
