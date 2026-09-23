import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "@/lib/golf-data";

export function HydrationNotice({ label }: { label: string }) {
  return (
    <View accessible accessibilityRole="progressbar" accessibilityLabel={label} style={styles.container}>
      <ActivityIndicator size="small" color={colors.fairway} />
      <Text style={styles.text}>{label}…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#E8F2EC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 12,
  },
  text: {
    color: colors.fairway,
    fontSize: 11,
    fontWeight: "700",
  },
});
