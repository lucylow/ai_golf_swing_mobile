import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { FIGMA_METRICS } from "../data";
import { TopBar } from "../ui/TopBar";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { InsightStack } from "../ui/InsightStack";
import { CoachQuote } from "../ui/CoachQuote";
import { ConfidenceBar } from "../ui/ConfidenceBar";

export default function FigmaInsightsScreen(){const router=useRouter();return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="AI INSIGHTS" subtitle="Signals from your recent swings" /><GlassCard style={styles.hero}><Text style={styles.kicker}>THEME DETECTED</Text><Text style={styles.title}>Sequencing is becoming more stable.</Text><Text style={styles.copy}>Three recent sessions point in the same direction: better rotation and head stability, with early extension still the clearest opportunity.</Text><ConfidenceBar value={93}/></GlassCard><SectionHeader title="Priority cues" kicker="ORDERED BY PRACTICE VALUE" /><StaticCard><InsightStack limit={4} onPress={(id)=>{const metric=FIGMA_METRICS.find(m=>m.id===id);if(metric?.drillId)router.push({pathname:"/drill-detail",params:{drillId:metric.drillId}})}}/></StaticCard><CoachQuote quote="Protect the move that is already working while you train the one that is not." /></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},hero:{gap:9},kicker:{color:FIGMA.colors.lime,fontSize:7,fontWeight:"900",letterSpacing:.8},title:{color:FIGMA.colors.white,fontSize:22,fontWeight:"900",lineHeight:28},copy:{color:FIGMA.colors.muted,fontSize:10,lineHeight:15}});
