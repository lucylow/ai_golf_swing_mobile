import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";

const fallbackImage = "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=900&h=600&fit=crop&auto=format";

export function SwingThumbnail({ club, date, score, accent = FIGMA.colors.surface, compact = false, onPress }: { club: string; date: string; score: number; accent?: string; compact?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [compact ? styles.compactCard : styles.card, pressed && styles.pressed]}>
      <View style={[compact ? styles.compactVisual : styles.visual, { backgroundColor: accent }]}>
        <Image source={{ uri: fallbackImage }} style={StyleSheet.absoluteFillObject} />
        <View style={styles.overlay} />
        <View style={styles.horizon} />
        <View style={styles.player}><View style={styles.head} /><View style={styles.body} /><View style={styles.leg} /></View>
        <View style={styles.play}><IconSymbol name="play.fill" size={12} color={FIGMA.colors.black} /></View>
      </View>
      <View style={compact ? styles.compactBody : styles.bodyWrap}>
        <View style={styles.meta}><Text style={styles.club}>{club}</Text><Text style={styles.date}>{date}</Text></View>
        <View style={styles.scoreRow}><Text style={styles.score}>{score}</Text><Text style={styles.out}>/100</Text><Text style={styles.chev}>›</Text></View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 180, overflow: "hidden", borderRadius: 17, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border },
  compactCard: { flex: 1, overflow: "hidden", borderRadius: 14, backgroundColor: FIGMA.colors.surface, borderWidth: 1, borderColor: FIGMA.colors.border },
  visual: { height: 112, overflow: "hidden", position: "relative" },
  compactVisual: { height: 68, overflow: "hidden", position: "relative" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(6,13,6,0.36)" },
  horizon: { position: "absolute", left: 0, right: 0, bottom: 18, height: 1, backgroundColor: "rgba(255,255,255,0.28)" },
  player: { position: "absolute", left: 69, bottom: 0, width: 52, height: 94 },
  head: { width: 15, height: 15, borderRadius: 8, backgroundColor: "#F9E2C0", alignSelf: "center" },
  body: { width: 26, height: 41, borderRadius: 10, backgroundColor: "#0F261E", alignSelf: "center", marginTop: 4, transform: [{ rotate: "-10deg" }] },
  leg: { width: 36, height: 34, borderLeftWidth: 7, borderBottomWidth: 6, borderColor: "#0F261E", alignSelf: "center", transform: [{ rotate: "-12deg" }] },
  play: { position: "absolute", right: 9, bottom: 9, width: 27, height: 27, borderRadius: 14, backgroundColor: FIGMA.colors.white, alignItems: "center", justifyContent: "center" },
  bodyWrap: { padding: 11 },
  compactBody: { padding: 9 },
  meta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  club: { color: FIGMA.colors.white, fontSize: 12, fontWeight: "800" },
  date: { color: FIGMA.colors.muted, fontSize: 9 },
  scoreRow: { flexDirection: "row", alignItems: "baseline", marginTop: 7 },
  score: { color: FIGMA.colors.lime, fontSize: 24, fontWeight: "900" },
  out: { color: FIGMA.colors.muted, fontSize: 10, marginLeft: 2 },
  chev: { color: FIGMA.colors.muted, fontSize: 20, marginLeft: "auto" },
  pressed: { opacity: 0.8 },
});
