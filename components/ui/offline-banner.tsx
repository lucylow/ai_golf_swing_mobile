import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/lib/golf-data";
import { useOfflineStatus } from "@/lib/device-state";
import { offlineBannerMessage } from "@/lib/offline-banner-state";

export { offlineBannerMessage } from "@/lib/offline-banner-state";

export function OfflineBanner() { const { isOnline } = useOfflineStatus(); if (isOnline) return null; return <View accessible accessibilityRole="alert" accessibilityLabel={offlineBannerMessage} style={styles.banner}><Text style={styles.text}>{offlineBannerMessage}</Text></View>; }
const styles = StyleSheet.create({ banner: { backgroundColor: colors.coral, paddingHorizontal: 14, paddingVertical: 8, alignItems: "center", zIndex: 40 }, text: { color: colors.surface, fontSize: 11, fontWeight: "800" } });
