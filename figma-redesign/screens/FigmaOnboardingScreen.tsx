import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { LimeButton } from "../ui/LimeButton";

const PAGES = [
  ["SEE THE MOVE", "Video first. Metrics second. A clear visual explanation of what changed."],
  ["PRACTICE THE CUE", "Turn one observation into a short drill instead of a list of swing thoughts."],
  ["TRACK WHAT STICKS", "Use your history to separate a real trend from a one-session fluctuation."],
] as const;
export default function FigmaOnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [title, copy] = PAGES[index];
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><View style={styles.wrap}><View style={styles.logo}><Text style={styles.logoText}>AI</Text></View><View style={styles.main}><Text style={styles.kicker}>AI GOLF SWING</Text><Text style={styles.title}>{title}</Text><Text style={styles.copy}>{copy}</Text><View style={styles.orb}><View style={styles.orbCore}><Text style={styles.orbText}>{index + 1}</Text></View></View></View><View style={styles.bottom}><View style={styles.dots}>{PAGES.map((_, i) => <View key={i} style={[styles.dot, i === index && styles.dotActive]} />)}</View><LimeButton label={index === PAGES.length - 1 ? "GET STARTED" : "CONTINUE"} onPress={() => index === PAGES.length - 1 ? router.replace("/(tabs)") : setIndex((v) => v + 1)} /><Pressable onPress={() => router.replace("/(tabs)")}><Text style={styles.skip}>SKIP</Text></Pressable></View></View></ScreenContainer>;
}
const styles = StyleSheet.create({ wrap: { flex: 1, padding: 20, justifyContent: "space-between" }, logo: { width: 42, height: 42, borderRadius: 13, backgroundColor: FIGMA.colors.lime, alignItems: "center", justifyContent: "center" }, logoText: { color: FIGMA.colors.black, fontSize: 16, fontWeight: "900" }, main: { alignItems: "center" }, kicker: { color: FIGMA.colors.lime, fontSize: 8, fontWeight: "900", letterSpacing: 1 }, title: { color: FIGMA.colors.white, fontSize: 38, fontWeight: "900", lineHeight: 39, textAlign: "center", marginTop: 9 }, copy: { color: FIGMA.colors.muted, fontSize: 11, lineHeight: 17, textAlign: "center", maxWidth: 310, marginTop: 11 }, orb: { marginTop: 34, width: 190, height: 190, borderRadius: 95, borderWidth: 1, borderColor: FIGMA.colors.translucentLimeBorder, alignItems: "center", justifyContent: "center", backgroundColor: FIGMA.colors.surfaceQuiet }, orbCore: { width: 112, height: 112, borderRadius: 56, backgroundColor: FIGMA.colors.surfaceElevated, borderWidth: 2, borderColor: FIGMA.colors.lime, alignItems: "center", justifyContent: "center" }, orbText: { color: FIGMA.colors.lime, fontSize: 52, fontWeight: "900" }, bottom: { gap: 10 }, dots: { flexDirection: "row", gap: 5, alignSelf: "center", marginBottom: 6 }, dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: FIGMA.colors.borderStrong }, dotActive: { width: 18, backgroundColor: FIGMA.colors.lime }, skip: { color: FIGMA.colors.muted, fontSize: 8, fontWeight: "900", textAlign: "center", letterSpacing: 0.7 } });
