import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FIGMA } from "../theme";
import { PHASES, Phase, PhaseStrip } from "./PhaseStrip";

export function VideoStage({ phase, onPhaseChange, compact = false, onCompare }: { phase: Phase; onPhaseChange: (phase: Phase) => void; compact?: boolean; onCompare?: () => void }) {
  return (
    <View style={[styles.stage, compact && styles.compact]}>
      <Image source={{ uri: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1000&h=650&fit=crop&auto=format" }} style={StyleSheet.absoluteFillObject} />
      <View style={styles.tint} />
      <View style={styles.gridVerticalLeft} /><View style={styles.gridVerticalRight} /><View style={styles.gridHorizontalTop} /><View style={styles.gridHorizontalBottom} />
      <View style={styles.swingArc} />
      <View style={styles.pose}><View style={styles.head} /><View style={styles.torso} /><View style={styles.legs} /><View style={styles.club} /></View>
      <View style={styles.topRow}><View style={styles.live}><View style={styles.dot} /><Text style={styles.liveText}>AI TRACKING</Text></View><Text style={styles.meta}>7-IRON · 8 SWINGS</Text></View>
      <View style={styles.centerBadge}><IconSymbol name="checkmark.circle.fill" size={16} color={FIGMA.colors.lime} /><Text style={styles.badgeText}>{phase === "IMPACT" ? "CONTACT WINDOW" : `${phase} PHASE`}</Text></View>
      {!compact ? <View style={styles.bottom}><View style={styles.play}><IconSymbol name="play.fill" size={13} color={FIGMA.colors.black} /></View><View style={{ flex: 1 }}><PhaseStrip active={phase} onChange={onPhaseChange} /><View style={styles.timeRow}><Text style={styles.time}>▶ 0:00 / 0:08</Text>{onCompare ? <Pressable onPress={onCompare}><Text style={styles.compare}>COMPARE</Text></Pressable> : null}</View></View></View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { height: 245, marginHorizontal: 0, borderRadius: 20, overflow: "hidden", backgroundColor: FIGMA.colors.black, position: "relative" },
  compact: { height: 190 },
  tint: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(6,13,6,0.25)" },
  gridVerticalLeft: { position: "absolute", top: 0, bottom: 0, left: "33%", width: 1, backgroundColor: "rgba(170,255,0,0.08)" },
  gridVerticalRight: { position: "absolute", top: 0, bottom: 0, left: "66%", width: 1, backgroundColor: "rgba(170,255,0,0.08)" },
  gridHorizontalTop: { position: "absolute", left: 0, right: 0, top: "38%", height: 1, backgroundColor: "rgba(170,255,0,0.08)" },
  gridHorizontalBottom: { position: "absolute", left: 0, right: 0, top: "70%", height: 1, backgroundColor: "rgba(170,255,0,0.08)" },
  swingArc: { position: "absolute", width: 180, height: 150, borderWidth: 2, borderColor: "rgba(170,255,0,0.58)", borderTopColor: "transparent", borderRightColor: "transparent", borderRadius: 100, right: 18, bottom: 45, transform: [{ rotate: "-28deg" }] },
  pose: { position: "absolute", left: "44%", bottom: 28, width: 52, height: 112 },
  head: { width: 15, height: 15, borderRadius: 8, backgroundColor: "#F8E0BF", alignSelf: "center" },
  torso: { width: 27, height: 48, borderRadius: 11, backgroundColor: "#0C241C", alignSelf: "center", marginTop: 4, transform: [{ rotate: "-7deg" }] },
  legs: { width: 38, height: 38, borderLeftWidth: 7, borderBottomWidth: 6, borderColor: "#0C241C", alignSelf: "center", transform: [{ rotate: "-10deg" }] },
  club: { position: "absolute", width: 2, height: 88, backgroundColor: "#D7DDD4", right: 1, top: 27, transform: [{ rotate: "35deg" }] },
  topRow: { position: "absolute", top: 12, left: 12, right: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  live: { flexDirection: "row", gap: 6, alignItems: "center" },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: FIGMA.colors.lime },
  liveText: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 0.9 },
  meta: { color: "rgba(255,255,255,0.72)", fontSize: 8, fontWeight: "800" },
  centerBadge: { position: "absolute", top: "44%", left: 12, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(6,13,6,0.72)", borderWidth: 1, borderColor: FIGMA.colors.borderStrong, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 6 },
  badgeText: { color: FIGMA.colors.white, fontSize: 8, fontWeight: "800", letterSpacing: 0.55 },
  bottom: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 12, flexDirection: "row", gap: 10, backgroundColor: "rgba(6,13,6,0.70)" },
  play: { width: 30, height: 30, borderRadius: 15, backgroundColor: FIGMA.colors.lime, alignItems: "center", justifyContent: "center" },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  time: { color: "rgba(255,255,255,0.70)", fontSize: 8 },
  compare: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "800", letterSpacing: 0.5 },
});
