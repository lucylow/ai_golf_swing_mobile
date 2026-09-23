import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { ScoreRing } from "../ui/ScoreRing";
import { LimeButton } from "../ui/LimeButton";
import { Chip } from "../ui/Chip";

export default function FigmaShareScreen() {
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="SHARE SESSION" subtitle="A clean recap for coach or playing partner" /><GlassCard style={styles.card}><Text style={styles.kicker}>SWING SESSION · 7 IRON</Text><View style={styles.header}><View><Text style={styles.title}>Alex Thompson</Text><Text style={styles.meta}>Sep 09, 2026 · 12 swings</Text></View><ScoreRing score={86} size={88} /></View><View style={styles.chips}><Chip label="Rotation +4" /><Chip label="Tempo 88" /><Chip label="Extension 74" tone="high" /></View></GlassCard><GlassCard style={styles.quote}><Text style={styles.quoteText}>“Focus on hip depth. Keep the rhythm you already have.”</Text><Text style={styles.quoteMeta}>AI COACH · SESSION SUMMARY</Text></GlassCard><LimeButton label="EXPORT SESSION" onPress={() => undefined} /><View style={styles.secondary}><Text style={styles.secondaryText}>Share as image · Share as text · Copy coaching cue</Text></View></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, card: { gap: 10 }, kicker: { color: FIGMA.colors.muted, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, title: { color: FIGMA.colors.white, fontSize: 20, fontWeight: "900" }, meta: { color: FIGMA.colors.muted, fontSize: 9, marginTop: 3 }, chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 }, quote: { gap: 10, borderColor: FIGMA.colors.translucentLimeBorder }, quoteText: { color: FIGMA.colors.white, fontSize: 16, lineHeight: 22, fontWeight: "800" }, quoteMeta: { color: FIGMA.colors.lime, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 }, secondary: { alignItems: "center", paddingTop: 3 }, secondaryText: { color: FIGMA.colors.muted, fontSize: 8 } });
