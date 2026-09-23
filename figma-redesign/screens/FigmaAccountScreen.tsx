import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { FIGMA } from "../theme";
import { PROFILE_DEFAULTS } from "../data";
import { TopBar } from "../ui/TopBar";
import { ProfileAvatar } from "../ui/ProfileAvatar";
import { GlassCard } from "../ui/GlassCard";
import { ActionRow } from "../ui/ActionRow";
import { LimeButton } from "../ui/LimeButton";

export default function FigmaAccountScreen(){return <ScreenContainer containerClassName="bg-[#0A120A]" safeAreaClassName="bg-[#0A120A]"><ScrollView contentContainerStyle={styles.content}><TopBar title="ACCOUNT" subtitle="Your golf identity"/><GlassCard style={styles.profile}><ProfileAvatar name={PROFILE_DEFAULTS.name} size={58}/><View style={styles.copy}><Text style={styles.name}>{PROFILE_DEFAULTS.name}</Text><Text style={styles.meta}>Handicap {PROFILE_DEFAULTS.handicap} · {PROFILE_DEFAULTS.analyzedSwings} analyzed swings</Text></View></GlassCard><GlassCard><ActionRow title="Profile details" subtitle="Name, handicap, preferred clubs" icon="P" onPress={()=>undefined}/><ActionRow title="Practice goal" subtitle={PROFILE_DEFAULTS.goal} icon="G" onPress={()=>undefined}/><ActionRow title="Subscription" subtitle="Plan and billing" icon="$" onPress={()=>undefined}/></GlassCard><LimeButton label="SAVE ACCOUNT CHANGES" onPress={()=>undefined}/></ScrollView></ScreenContainer>}
const styles=StyleSheet.create({content:{padding:15,paddingBottom:30,gap:12},profile:{flexDirection:"row",alignItems:"center",gap:10},copy:{flex:1},name:{color:FIGMA.colors.white,fontSize:17,fontWeight:"900"},meta:{color:FIGMA.colors.muted,fontSize:9,marginTop:3}});
