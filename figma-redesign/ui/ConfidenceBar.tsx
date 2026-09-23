import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";
export function ConfidenceBar({value}:{value:number}){const safe=Math.max(0,Math.min(100,value));return <View style={styles.wrap}><View style={styles.row}><Text style={styles.label}>AI CONFIDENCE</Text><Text style={styles.value}>{safe}%</Text></View><View style={styles.track}><View style={[styles.fill,{width:`${safe}%`}]}/></View></View>}
const styles=StyleSheet.create({wrap:{gap:5},row:{flexDirection:"row",justifyContent:"space-between"},label:{color:FIGMA.colors.muted,fontSize:7,fontWeight:"900",letterSpacing:.7},value:{color:FIGMA.colors.lime,fontSize:8,fontWeight:"900"},track:{height:4,borderRadius:99,backgroundColor:FIGMA.colors.border,overflow:"hidden"},fill:{height:4,backgroundColor:FIGMA.colors.lime,borderRadius:99}});
