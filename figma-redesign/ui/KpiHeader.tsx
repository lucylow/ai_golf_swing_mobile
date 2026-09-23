import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA, toneColor } from "../theme";
export function KpiHeader({label,value,delta,tone="good"}:{label:string;value:string;delta?:string;tone?:"good"|"medium"|"high"}){return <View style={styles.wrap}><View><Text style={styles.label}>{label}</Text><Text style={styles.value}>{value}</Text></View>{delta?<Text style={[styles.delta,{color:toneColor(tone)}]}>{delta}</Text>:null}</View>}
const styles=StyleSheet.create({wrap:{flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between",minHeight:54},label:{color:FIGMA.colors.muted,fontSize:7,fontWeight:"900",letterSpacing:.8},value:{color:FIGMA.colors.white,fontSize:25,fontWeight:"900",marginTop:2},delta:{fontSize:9,fontWeight:"900",paddingBottom:5}});
