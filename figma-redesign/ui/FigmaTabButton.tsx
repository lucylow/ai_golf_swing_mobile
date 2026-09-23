import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";

type Name = "house.fill" | "bolt.fill" | "chart.bar.fill" | "person.crop.circle.fill";
export function FigmaTabButton({ active, label, icon, href }: { active: boolean; label: string; icon: Name; href: string }) {
  const router = useRouter();
  return <Pressable onPress={() => router.push(href as never)} style={({ pressed }) => [styles.button, pressed && styles.pressed]} accessibilityRole="tab" accessibilityState={{ selected: active }}><IconSymbol name={icon} size={20} color={active ? FIGMA.colors.lime : "#3D4E3D"} /><Text style={[styles.label, active && { color: FIGMA.colors.lime }]}>{label}</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { flex: 1, alignItems: "center", gap: 3, paddingVertical: 4 }, label: { color: "#3D4E3D", fontSize: 8, fontWeight: "800", letterSpacing: 0.5 }, pressed: { opacity: 0.72 } });
