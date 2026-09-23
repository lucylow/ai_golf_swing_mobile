import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";

export function ProfileAvatar({ name = "Alex Thompson", size = 42 }: { name?: string; size?: number }) {
  const initials = name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase() || "A";
  return <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}><Image source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&h=180&fit=crop&auto=format" }} style={{ width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }} /><View style={styles.fallback}><Text style={styles.initials}>{initials}</Text></View></View>;
}
const styles = StyleSheet.create({ wrap: { borderWidth: 2, borderColor: FIGMA.colors.borderStrong, backgroundColor: FIGMA.colors.surface, alignItems: "center", justifyContent: "center", overflow: "hidden" }, fallback: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(10,18,10,0.08)" }, initials: { color: FIGMA.colors.white, fontSize: 11, fontWeight: "900" } });
