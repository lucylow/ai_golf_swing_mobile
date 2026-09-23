import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { FIGMA_METRICS } from "../data";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { MetricBar } from "../ui/MetricBar";
import { ConfidenceBar } from "../ui/ConfidenceBar";
import { CoachQuote } from "../ui/CoachQuote";
import { LimeButton } from "../ui/LimeButton";

export default function FigmaMetricDetailScreen(){const {id}=useLocalSearchParams<{id?:string}>();const router=useRouter();const metric=FIGMA_METRICS.find(m=>m.id===id)||FIGMA_METRICS[0];return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="METRIC DETAIL" subtitle={metric.label}/><GlassCard style={styles.hero}><Text style={styles.kicker}>{metric.shortLabel.toUpperCase()}</Text><Text style={styles.score}>{metric.score}</Text><Text style={styles.meta}>{metric.value} · {metric.delta}</Text><MetricBar label="Current level" value={metric.score} tone={metric.tone}/></GlassCard><GlassCard style={styles.card}><Text style={styles.heading}>Observation</Text><Text style={styles.copy}>{metric.observation}</Text><Text style={styles.heading}>Why it matters</Text><Text style={styles.copy}>{metric.explanation}</Text><ConfidenceBar value={metric.id==="extension"?94:88}/></GlassCard><CoachQuote quote={metric.action} source="PRACTICE CUE" />{metric.drillId?<LimeButton label="OPEN DRILL" onPress={()=>router.push({pathname:"/drill-detail",params:{drillId:metric.drillId}})} />:null}</ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},hero:{gap:8},kicker:{color:FIGMA.colors.muted,fontSize:7,fontWeight:"900",letterSpacing:.8},score:{color:FIGMA.colors.lime,fontSize:60,lineHeight:62,fontWeight:"900"},meta:{color:FIGMA.colors.textSoft,fontSize:9,marginBottom:3},card:{gap:10},heading:{color:FIGMA.colors.white,fontSize:11,fontWeight:"900"},copy:{color:FIGMA.colors.muted,fontSize:10,lineHeight:16}});
