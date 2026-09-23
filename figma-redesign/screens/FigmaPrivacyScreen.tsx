import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, Switch, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { SettingsRow } from "../ui/SettingsRow";
import { SectionHeader } from "../ui/SectionHeader";

function Toggle({value,onChange}:{value:boolean;onChange:(v:boolean)=>void}){return <Switch value={value} onValueChange={onChange} trackColor={{false:FIGMA.colors.borderStrong,true:FIGMA.colors.limeSoft}} thumbColor={FIGMA.colors.white}/>}
export default function FigmaPrivacyScreen(){const[a,setA]=useState(true);const[b,setB]=useState(false);const[c,setC]=useState(true);return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="DATA & PRIVACY" subtitle="Control what stays local and what syncs"/><SectionHeader title="Sharing" kicker="YOUR CHOICE"/><GlassCard><SettingsRow title="Cloud analysis" subtitle="Allow uploaded swing clips to be processed by the analysis service" right={<Toggle value={a} onChange={setA}/>}/><SettingsRow title="Practice analytics" subtitle="Use session history for progress summaries" right={<Toggle value={c} onChange={setC}/>}/><SettingsRow title="Personalized recommendations" subtitle="Use your practice trends to suggest drills" right={<Toggle value={b} onChange={setB}/>} /></GlassCard><SectionHeader title="Local data" kicker="ON THIS DEVICE"/><GlassCard style={styles.note}><Text style={styles.title}>Export or delete</Text><Text style={styles.copy}>Keep the UI layer separate from storage so the existing repository's persistence and app-state flows remain the source of truth.</Text></GlassCard></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},note:{gap:6},title:{color:FIGMA.colors.white,fontSize:13,fontWeight:"900"},copy:{color:FIGMA.colors.muted,fontSize:9,lineHeight:14}});
