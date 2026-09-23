import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";

export function TopBar({
  title,
  subtitle,
  back = false,
  actionIcon,
  onAction,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  actionIcon?: "gearshape.fill" | "square.and.arrow.up" | "bell.fill";
  onAction?: () => void;
}) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <Pressable
        disabled={!back}
        onPress={() => router.back()}
        style={({ pressed }) => [styles.iconButton, !back && styles.iconButtonHidden, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={back ? "Go back" : undefined}
      >
        <IconSymbol name="chevron.right" size={18} color={FIGMA.colors.textSoft} style={styles.backIcon} />
      </Pressable>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Pressable
        disabled={!actionIcon}
        onPress={onAction}
        style={({ pressed }) => [styles.iconButton, !actionIcon && styles.iconButtonHidden, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={actionIcon ? "Open screen action" : undefined}
      >
        {actionIcon ? <IconSymbol name={actionIcon} size={18} color={FIGMA.colors.textSoft} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: 8 },
  center: { flex: 1, alignItems: "center" },
  title: { color: FIGMA.colors.white, fontSize: 13, fontWeight: "900", letterSpacing: 1.1 },
  subtitle: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 2 },
  iconButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border, alignItems: "center", justifyContent: "center" },
  iconButtonHidden: { opacity: 0 },
  backIcon: { transform: [{ rotate: "180deg" }] },
  pressed: { opacity: 0.72, transform: [{ scale: 0.96 }] },
});
