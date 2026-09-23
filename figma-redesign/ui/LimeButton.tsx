import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";

export function LimeButton({ label, onPress, icon = "chevron.right", busy = false, style }: { label: string; onPress: () => void; icon?: "chevron.right" | "camera.fill" | "play.fill"; busy?: boolean; style?: ViewStyle }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={busy}
      style={({ pressed }) => [styles.button, style, pressed && !busy && styles.pressed, busy && styles.busy]}
      accessibilityRole="button"
      accessibilityState={{ busy, disabled: busy }}
    >
      {busy ? <ActivityIndicator color={FIGMA.colors.black} /> : <Text style={styles.text}>{label}</Text>}
      {!busy ? <IconSymbol name={icon} size={16} color={FIGMA.colors.black} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 48, borderRadius: FIGMA.radius.pill, backgroundColor: FIGMA.colors.lime, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, paddingHorizontal: 20 },
  text: { color: FIGMA.colors.black, fontSize: 13, fontWeight: "900", letterSpacing: 0.45 },
  pressed: { opacity: 0.86, transform: [{ scale: 0.985 }] },
  busy: { opacity: 0.75 },
});
