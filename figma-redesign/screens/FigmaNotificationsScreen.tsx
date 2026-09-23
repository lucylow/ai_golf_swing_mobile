import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { ActionRow } from "../ui/ActionRow";
import { Badge } from "../ui/Badge";

export default function FigmaNotificationsScreen(){return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="NOTIFICATIONS" subtitle="Only the things worth seeing"/><GlassCard><ActionRow title="Swing analysis ready" subtitle="Your 7 Iron session from Sep 09 is ready to review." icon="✓"/><ActionRow title="Goal streak · 4 days" subtitle="You logged focused practice four days in a row." icon="↗"/><ActionRow title="New drill suggestion" subtitle="A hip-depth drill matches your current priority." icon="+"/></GlassCard><View style={styles.notice}><Badge label="QUIET MODE" tone="neutral"/><Text style={styles.copy}>Notifications are designed to reinforce practice, not interrupt every session.</Text></View></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},notice:{padding:13,borderRadius:14,backgroundColor:FIGMA.colors.surfaceQuiet,borderWidth:1,borderColor:FIGMA.colors.border,gap:7},copy:{color:FIGMA.colors.muted,fontSize:9,lineHeight:14}});
