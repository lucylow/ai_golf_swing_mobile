import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { TopBar } from "../ui/TopBar";
import { GlassCard } from "../ui/GlassCard";
import { ActionPill } from "../ui/ActionPill";
import { LimeButton } from "../ui/LimeButton";

const modes=["IMAGE","TEXT","DATA"] as const;
export default function FigmaExportScreen(){const[mode,setMode]=useState<(typeof modes)[number]>("IMAGE");return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="EXPORT" subtitle="Take the useful parts with you"/><View style={styles.modes}>{modes.map(m=><ActionPill key={m} label={m} active={m===mode} onPress={()=>setMode(m)}/>)}</View><GlassCard style={styles.preview}><Text style={styles.kicker}>PREVIEW · {mode}</Text><Text style={styles.score}>86</Text><Text style={styles.title}>7 Iron · Sep 09</Text><Text style={styles.copy}>Rotation is improving. Early extension is the next focus.</Text><View style={styles.divider}/><Text style={styles.meta}>Swing score · 86/100</Text><Text style={styles.meta}>Tempo · 88/100</Text><Text style={styles.meta}>Head stability · 92/100</Text></GlassCard><LimeButton label={`EXPORT ${mode}`} onPress={()=>undefined}/><Pressable style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},modes:{flexDirection:"row",gap:6},preview:{minHeight:300,padding:18,gap:8},kicker:{color:FIGMA.colors.lime,fontSize:7,fontWeight:"900",letterSpacing:.8},score:{color:FIGMA.colors.white,fontSize:61,fontWeight:"900",marginTop:8},title:{color:FIGMA.colors.white,fontSize:15,fontWeight:"900"},copy:{color:FIGMA.colors.muted,fontSize:10,lineHeight:15,maxWidth:270},divider:{height:1,backgroundColor:FIGMA.colors.border,marginVertical:8},meta:{color:FIGMA.colors.textSoft,fontSize:9},cancel:{alignItems:"center",padding:7},cancelText:{color:FIGMA.colors.muted,fontSize:9,fontWeight:"800"}});
