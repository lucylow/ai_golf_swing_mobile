import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { ActionRow } from "../ui/ActionRow";
import { LimeButton } from "../ui/LimeButton";

export default function FigmaDevicesScreen() {
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="CONNECTED DEVICES" subtitle="Keep every useful measurement together" /><SectionHeader title="Connected" kicker="READY TO SYNC" /><GlassCard><ActionRow title="Apple Watch" subtitle="Movement + practice time · Connected" icon="⌁" /><ActionRow title="Launch monitor" subtitle="Ball data · Not connected" icon="⌖" onPress={() => undefined} /><ActionRow title="Camera" subtitle="Phone camera · Ready" icon="◎" /></GlassCard><SectionHeader title="What sync adds" kicker="WHY IT HELPS" /><View style={styles.grid}><View style={styles.tile}><Text style={styles.big}>+18%</Text><Text style={styles.copy}>more context around practice consistency</Text></View><View style={styles.tile}><Text style={styles.big}>3</Text><Text style={styles.copy}>data sources visible on one session</Text></View></View><LimeButton label="CONNECT A DEVICE" onPress={() => undefined} /></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, grid: { flexDirection: "row", gap: 8 }, tile: { flex: 1, minHeight: 100, padding: 13, borderRadius: 15, borderWidth: 1, borderColor: FIGMA.colors.border, backgroundColor: FIGMA.colors.surface }, big: { color: FIGMA.colors.lime, fontSize: 24, fontWeight: "900" }, copy: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 14, marginTop: 4 } });
