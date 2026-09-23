import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";

type Props = { title: string; subtitle?: string; icon?: string; onPress?: () => void; danger?: boolean };
export function ActionRow({ title, subtitle, icon = "›", onPress, danger }: Props) {
  const body = <><View style={[styles.icon, danger && styles.dangerIcon]}><Text style={[styles.iconText, danger && styles.dangerText]}>{icon}</Text></View><View style={styles.copy}><Text style={[styles.title, danger && styles.dangerText]}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View><Text style={styles.chevron}>›</Text></>;
  return onPress ? <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>{body}</Pressable> : <View style={styles.row}>{body}</View>;
}
const styles = StyleSheet.create({ row: { minHeight: 62, flexDirection: "row", alignItems: "center", gap: 10, borderBottomWidth: 1, borderBottomColor: FIGMA.colors.border }, icon: { width: 34, height: 34, borderRadius: 11, backgroundColor: FIGMA.colors.surfaceElevated, justifyContent: "center", alignItems: "center" }, dangerIcon: { backgroundColor: "rgba(255,102,102,0.10)" }, iconText: { color: FIGMA.colors.lime, fontSize: 15, fontWeight: "900" }, dangerText: { color: FIGMA.colors.high }, copy: { flex: 1 }, title: { color: FIGMA.colors.white, fontSize: 11, fontWeight: "800" }, subtitle: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 3 }, chevron: { color: FIGMA.colors.muted, fontSize: 18 }, pressed: { opacity: 0.72 } });
