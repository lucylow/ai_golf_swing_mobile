import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { APP_COPY, PROFILE_DEFAULTS } from "../data";
import { TopBar } from "../ui/TopBar";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { SectionHeader } from "../ui/SectionHeader";
import { MetricBar } from "../ui/MetricBar";
import { LimeButton } from "../ui/LimeButton";
import { ProgressPill } from "../ui/ProgressPill";

export default function FigmaGoalScreen() {
  const router = useRouter();
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="YOUR GOAL" subtitle="Keep the destination visible" /><GlassCard style={styles.hero}><Text style={styles.kicker}>12-WEEK TARGET</Text><Text style={styles.title}>{PROFILE_DEFAULTS.goal}</Text><Text style={styles.copy}>Turn better mechanics into a repeatable on-course result by narrowing practice around a few measurable moves.</Text><View style={styles.goalStat}><View><Text style={styles.big}>68%</Text><Text style={styles.small}>goal progress</Text></View><View style={styles.right}><Text style={styles.big}>4</Text><Text style={styles.small}>week streak</Text></View></View><MetricBar label="Overall goal progress" value={68} /></GlassCard><SectionHeader title="Milestones" kicker="ONE LAYER AT A TIME" /><StaticCard style={styles.list}><ProgressPill value={88} label="Stabilize tempo · nearly complete" /><ProgressPill value={76} label="Improve rotation · in progress" /><ProgressPill value={42} label="Reduce early extension · focus now" /></StaticCard><SectionHeader title="Practice rule" kicker="MAKE THE GOAL ACTIONABLE" /><GlassCard style={styles.rule}><Text style={styles.ruleText}>{APP_COPY.coachLine}</Text><Text style={styles.copy}>Finish each session with one sentence describing the next useful change. Avoid adding a second cue until the first one is repeatable.</Text></GlassCard><LimeButton label="START TODAY'S MISSION" onPress={() => router.push("/drill-library")} /></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, hero: { gap: 11 }, kicker: { color: FIGMA.colors.muted, fontSize: 7, fontWeight: "900", letterSpacing: 0.8 }, title: { color: FIGMA.colors.white, fontSize: 28, lineHeight: 32, fontWeight: "900" }, copy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 16 }, goalStat: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 }, right: { alignItems: "flex-end" }, big: { color: FIGMA.colors.lime, fontSize: 27, fontWeight: "900" }, small: { color: FIGMA.colors.muted, fontSize: 8, marginTop: -1 }, list: { gap: 12 }, rule: { gap: 7 }, ruleText: { color: FIGMA.colors.lime, fontSize: 17, fontWeight: "900" } });
