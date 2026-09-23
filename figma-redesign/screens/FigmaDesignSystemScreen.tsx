import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA, toneColor } from "../theme";
import { FIGMA_METRICS, HOME_TREND } from "../data";
import { TopBar } from "../ui/TopBar";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard, StaticCard } from "../ui/GlassCard";
import { LimeButton } from "../ui/LimeButton";
import { Chip } from "../ui/Chip";
import { Badge } from "../ui/Badge";
import { MetricBar } from "../ui/MetricBar";
import { ScoreRing } from "../ui/ScoreRing";
import { StatTile } from "../ui/StatTile";
import { MiniChart } from "../ui/MiniChart";
import { ProgressPill } from "../ui/ProgressPill";
import { SegmentedControl } from "../ui/SegmentedControl";
import { FilterPills } from "../ui/FilterPills";
import { TrendStat } from "../ui/TrendStat";
import { Timeline } from "../ui/Timeline";
import { ComparisonCard } from "../ui/ComparisonCard";
import { CoachQuote } from "../ui/CoachQuote";
import { ConfidenceBar } from "../ui/ConfidenceBar";

const modes=["COMPONENTS","PATTERNS","METRICS"] as const;
const filters=["ALL","GOOD","WATCH"] as const;
export default function FigmaDesignSystemScreen(){const[mode,setMode]=useState<(typeof modes)[number]>("COMPONENTS");const[filter,setFilter]=useState<(typeof filters)[number]>("ALL");const selected=useMemo(()=>FIGMA_METRICS.filter(m=>filter==="ALL"||(filter==="GOOD"&&m.tone==="good")||(filter==="WATCH"&&m.tone!=="good")),[filter]);return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="DESIGN SYSTEM" subtitle="Figma Make → Native components"/><SegmentedControl values={modes} value={mode} onChange={setMode}/><SectionHeader title="Color language" kicker="DEEP GREEN + LIME"/><GlassCard style={styles.swatches}>{Object.entries(FIGMA.colors).slice(0,12).map(([name,value])=><View key={name} style={styles.swatch}><View style={[styles.swatchColor,{backgroundColor:value}]}/><Text style={styles.swatchName}>{name}</Text><Text style={styles.swatchValue}>{value}</Text></View>)}</GlassCard><SectionHeader title="Buttons & status" kicker="ACTIVE / SECONDARY / STATE"/><StaticCard><View style={styles.row}><LimeButton label="PRIMARY ACTION" onPress={()=>undefined} style={styles.inline}/><Badge label="ANALYZED" tone="good"/></View><View style={styles.row}><Chip label="7 Iron"/><Chip label="+4 pts" tone="good"/><Chip label="74" tone="high"/></View></StaticCard><SectionHeader title="Scores" kicker="DATA HIERARCHY"/><View style={styles.scoreRow}><View style={styles.bigScore}><ScoreRing score={86} size={116}/></View><View style={styles.statCol}><StatTile label="TEMPO" value="88" hint="+2 pts" tone="good"/><StatTile label="EXTENSION" value="74" hint="-6 pts" tone="high"/></View></View><SectionHeader title="Metrics" kicker="FILTERABLE"/><FilterPills values={filters} value={filter} onChange={setFilter}/><View style={styles.metricList}>{selected.map(metric=><View key={metric.id} style={styles.metricItem}><View style={styles.metricHeader}><Text style={styles.metricName}>{metric.label}</Text><Text style={[styles.metricScore,{color:toneColor(metric.tone)}]}>{metric.score}</Text></View><MetricBar label="" value={metric.score} tone={metric.tone}/></View>)}</View><SectionHeader title="Charts" kicker="TREND / COMPARISON / CONFIDENCE"/><GlassCard style={styles.chart}><MiniChart values={HOME_TREND.map(x=>x.value)} width={290} height={80}/><View style={styles.trends}><TrendStat label="SCORE" value="86" delta="+4 this month"/><TrendStat label="STREAK" value="4d" delta="+1 day"/><TrendStat label="SWINGS" value="47" delta="+8"/></View></GlassCard><ComparisonCard label="Shoulder rotation" current={78} target={80} unit="°"/><ConfidenceBar value={93}/><CoachQuote quote="Small cue. Better swing. Repeat."/><SectionHeader title="Timeline" kicker="SWING PHASES"/><StaticCard><Timeline items={[{label:"Address",value:"Set"},{label:"Top",value:"Fuller turn",active:true},{label:"Downswing",value:"Smooth"},{label:"Impact",value:"Centered",active:true},{label:"Finish",value:"Balanced"}]}/><ProgressPill value={74} label="Example progress pill"/></StaticCard></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},swatches:{gap:8},swatch:{minHeight:34,flexDirection:"row",alignItems:"center",gap:8,borderBottomWidth:1,borderBottomColor:FIGMA.colors.border},swatchColor:{width:22,height:22,borderRadius:7,borderWidth:1,borderColor:FIGMA.colors.border},swatchName:{color:FIGMA.colors.textSoft,fontSize:9,fontWeight:"800",flex:1},swatchValue:{color:FIGMA.colors.muted,fontSize:8,fontWeight:"700"},row:{flexDirection:"row",alignItems:"center",gap:8,marginBottom:9},inline:{flex:1,minHeight:40},scoreRow:{flexDirection:"row",gap:8,alignItems:"center"},bigScore:{flex:1,alignItems:"center"},statCol:{flex:1,gap:8},metricList:{gap:8},metricItem:{padding:12,borderRadius:14,borderWidth:1,borderColor:FIGMA.colors.border,backgroundColor:FIGMA.colors.surface},metricHeader:{flexDirection:"row",justifyContent:"space-between",marginBottom:6},metricName:{color:FIGMA.colors.white,fontSize:10,fontWeight:"900"},metricScore:{fontSize:10,fontWeight:"900"},chart:{gap:14},trends:{flexDirection:"row",gap:7}});
