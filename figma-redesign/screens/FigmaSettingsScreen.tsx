import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { SettingsRow } from "../ui/SettingsRow";
import { SectionHeader } from "../ui/SectionHeader";
import { ActionRow } from "../ui/ActionRow";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) { return <Switch value={value} onValueChange={onChange} trackColor={{ false: FIGMA.colors.borderStrong, true: FIGMA.colors.limeSoft }} thumbColor={value ? FIGMA.colors.white : FIGMA.colors.muted} />; }
export default function FigmaSettingsScreen() {
  const [haptics, setHaptics] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [coach, setCoach] = useState(true);
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="SETTINGS" subtitle="Tune the coaching experience" /><SectionHeader title="Coaching" kicker="HOW THE APP TALKS TO YOU" /><GlassCard style={styles.card}><SettingsRow title="AI coaching cues" subtitle="Show one focused cue after analysis" right={<Toggle value={coach} onChange={setCoach} />} /><SettingsRow title="Auto-play analysis" subtitle="Play the swing clip when the review opens" right={<Toggle value={autoplay} onChange={setAutoplay} />} /><SettingsRow title="Haptics" subtitle="Use light feedback on important actions" right={<Toggle value={haptics} onChange={setHaptics} />} /></GlassCard><SectionHeader title="Account" kicker="CONNECTED EXPERIENCE" /><GlassCard><ActionRow title="Connected devices" subtitle="Apple Health, watch, launch monitor" icon="⌁" onPress={() => undefined} /><ActionRow title="Data & privacy" subtitle="Exports, retention, permissions" icon="◌" onPress={() => undefined} /></GlassCard><SectionHeader title="About" kicker="BUILD INFO" /><GlassCard><ActionRow title="Version" subtitle="Figma visual layer · 1.0.0" icon="i" /><ActionRow title="Help center" subtitle="Troubleshoot capture and analysis" icon="?" onPress={() => undefined} /></GlassCard><View style={styles.note}><Text style={styles.noteText}>The redesign uses the Figma Make visual language while keeping the app's existing providers, state, monetization, and service boundaries available for the production wiring.</Text></View></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, card: { gap: 0 }, note: { padding: 12, borderWidth: 1, borderColor: FIGMA.colors.border, borderRadius: 13, backgroundColor: FIGMA.colors.surfaceQuiet }, noteText: { color: FIGMA.colors.muted, fontSize: 9, lineHeight: 14 } });
