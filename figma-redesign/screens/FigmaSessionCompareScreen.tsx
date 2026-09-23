import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { ComparisonCard } from "../ui/ComparisonCard";
import { Timeline } from "../ui/Timeline";
import { LimeButton } from "../ui/LimeButton";

export default function FigmaSessionCompareScreen(){return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="SESSION COMPARE" subtitle="Sep 09 vs Aug 24"/><GlassCard style={styles.hero}><View><Text style={styles.kicker}>CURRENT</Text><Text style={styles.score}>86</Text><Text style={styles.date}>Sep 09 · 7 Iron</Text></View><Text style={styles.vs}>VS</Text><View style={styles.old}><Text style={styles.kicker}>EARLIER</Text><Text style={styles.oldScore}>80</Text><Text style={styles.date}>Aug 24 · 5 Iron</Text></View></GlassCard><ComparisonCard label="Shoulder rotation" current={78} target={80} unit="°"/><ComparisonCard label="Head stability" current={92} target={95} unit="%"/><ComparisonCard label="Tempo" current={88} target={90} unit="%"/><GlassCard><Text style={styles.heading}>Sequence</Text><Timeline items={[{label:"Address",value:"Stable setup"},{label:"Top",value:"Turn +6°" ,active:true},{label:"Transition",value:"Quicker"},{label:"Impact",value:"Centered" ,active:true},{label:"Finish",value:"Balanced"}]}/></GlassCard><LimeButton label="USE NEW SWING AS BASELINE" onPress={()=>undefined}/></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:10},hero:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},kicker:{color:FIGMA.colors.muted,fontSize:7,fontWeight:"900",letterSpacing:.8},score:{color:FIGMA.colors.lime,fontSize:47,fontWeight:"900"},oldScore:{color:FIGMA.colors.textSoft,fontSize:36,fontWeight:"900"},date:{color:FIGMA.colors.muted,fontSize:8},vs:{color:FIGMA.colors.borderStrong,fontSize:12,fontWeight:"900"},old:{alignItems:"flex-end"},heading:{color:FIGMA.colors.white,fontSize:13,fontWeight:"900",marginBottom:9}});
