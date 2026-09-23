import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { ActionRow } from "../ui/ActionRow";

export default function FigmaHelpScreen() {
  return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="HELP" subtitle="Practical answers for practice day" /><GlassCard><ActionRow title="How should I frame the swing?" subtitle="Keep the full body visible with a little space above the club." icon="1" onPress={() => undefined} /><ActionRow title="Why is analysis taking longer?" subtitle="Uploads and model processing can vary by device and connection." icon="2" onPress={() => undefined} /><ActionRow title="How do I retry a failed capture?" subtitle="Open the session and choose retry analysis or replace the video." icon="3" onPress={() => undefined} /><ActionRow title="How are scores calculated?" subtitle="The score is a coaching summary derived from the available swing metrics." icon="4" onPress={() => undefined} /></GlassCard><GlassCard style={styles.card}><Text style={styles.title}>Need human support?</Text><Text style={styles.copy}>Keep the session date, club, and capture mode in your message so the team can reproduce the issue faster.</Text></GlassCard></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ content: { padding: 15, paddingBottom: 30, gap: 12 }, card: { gap: 7 }, title: { color: FIGMA.colors.white, fontSize: 15, fontWeight: "900" }, copy: { color: FIGMA.colors.muted, fontSize: 10, lineHeight: 15 } });
