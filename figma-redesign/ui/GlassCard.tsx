import React from "react";
import { Pressable, StyleSheet, View, type PressableProps, type ViewStyle } from "react-native";
import { FIGMA } from "../theme";

export function GlassCard({ children, style, ...props }: { children: React.ReactNode; style?: ViewStyle } & PressableProps) {
  return (
    <Pressable {...props} style={({ pressed }) => [styles.card, style, props.onPress && pressed && styles.pressed]}>
      {children}
    </Pressable>
  );
}

export function StaticCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: FIGMA.radius.card, padding: FIGMA.spacing.lg },
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
});
