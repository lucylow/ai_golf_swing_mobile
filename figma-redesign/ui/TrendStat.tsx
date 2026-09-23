import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA, FigmaTone, toneColor } from "../theme";
export function TrendStat({label,value,delta,tone="good"}:{label:string;value:string;delta:string;tone?:FigmaTone}){return <View style={styles.card}><Text style={styles.label}>{label}</Text><Text style={[styles.value,{color:toneColor(tone)}]}>{value}</Text><Text style={[styles.delta,{color:toneColor(tone)}]}>{delta}</Text></View>}
const styles=StyleSheet.create({card:{flex:1,minHeight:88,borderRadius:14,borderWidth:1,borderColor:FIGMA.colors.border,backgroundColor:FIGMA.colors.surface,padding:12},label:{color:FIGMA.colors.muted,fontSize:7,fontWeight:"900",letterSpacing:.6},value:{fontSize:22,fontWeight:"900",marginTop:8},delta:{fontSize:8,fontWeight:"900",marginTop:1}});
