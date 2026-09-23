import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { FIGMA } from "../theme";
export function ActionPill({label,onPress,active=false}:{label:string;onPress?:()=>void;active?:boolean}){return <Pressable disabled={!onPress} onPress={onPress} style={({pressed})=>[styles.pill,active&&styles.active,pressed&&styles.pressed]}><Text style={[styles.text,active&&styles.activeText]}>{label}</Text></Pressable>}
const styles=StyleSheet.create({pill:{minHeight:34,paddingHorizontal:12,borderRadius:999,borderWidth:1,borderColor:FIGMA.colors.borderStrong,backgroundColor:FIGMA.colors.surface,alignItems:"center",justifyContent:"center"},active:{backgroundColor:FIGMA.colors.lime,borderColor:FIGMA.colors.lime},text:{color:FIGMA.colors.textSoft,fontSize:8,fontWeight:"900",letterSpacing:.5},activeText:{color:FIGMA.colors.black},pressed:{opacity:.72}});
