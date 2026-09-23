import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FIGMA } from "../theme";
export function CoachQuote({quote,source="AI COACH"}:{quote:string;source?:string}){return <View style={styles.card}><Text style={styles.mark}>“</Text><Text style={styles.quote}>{quote}</Text><Text style={styles.source}>{source}</Text></View>}
const styles=StyleSheet.create({card:{borderRadius:16,padding:15,backgroundColor:FIGMA.colors.surfaceElevated,borderWidth:1,borderColor:FIGMA.colors.translucentLimeBorder},mark:{color:FIGMA.colors.lime,fontSize:28,lineHeight:22,fontWeight:"900"},quote:{color:FIGMA.colors.white,fontSize:15,lineHeight:21,fontWeight:"800"},source:{color:FIGMA.colors.muted,fontSize:7,fontWeight:"900",letterSpacing:.8,marginTop:10}});
