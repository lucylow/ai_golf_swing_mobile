import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { colors } from "@/lib/golf-data";

export function PremiumPrompt({ title, copy, onPress }: { title: string; copy: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`${title}. Open upgrade options`} onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}><View style={styles.icon}><IconSymbol name="lock.fill" size={16} color={colors.sun} /></View><View style={styles.copy}><Text style={styles.title}>{title}</Text><Text style={styles.body}>{copy}</Text></View><IconSymbol name="chevron.right" size={16} color={colors.sun} /></Pressable>;
}
const styles = StyleSheet.create({ container: { backgroundColor: "#244D40", borderRadius: 14, padding: 11, flexDirection: "row", alignItems: "center", gap: 9, marginBottom: 12 }, pressed: { opacity: 0.78 }, icon: { width: 31, height: 31, borderRadius: 10, backgroundColor: "#345F50", alignItems: "center", justifyContent: "center" }, copy: { flex: 1 }, title: { color: colors.surface, fontSize: 11, fontWeight: "900" }, body: { color: "#B8CEC2", fontSize: 10, lineHeight: 14, marginTop: 2 } });
