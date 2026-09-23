import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";

export function SectionHeader({ title, kicker, link, onPress }: { title: string; kicker?: string; link?: string; onPress?: () => void }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {link ? (
        <Pressable onPress={onPress} hitSlop={8} accessibilityRole="button">
          <Text style={styles.link}>{link}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  left: { flex: 1 },
  kicker: { color: FIGMA.colors.mutedStrong, fontSize: FIGMA.type.kicker, fontWeight: "800", letterSpacing: 1.15, marginBottom: 4 },
  title: { color: FIGMA.colors.white, fontSize: 17, fontWeight: "900" },
  link: { color: FIGMA.colors.lime, fontSize: 10, fontWeight: "800", letterSpacing: 0.7 },
});
