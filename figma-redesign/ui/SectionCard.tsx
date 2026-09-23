import React from "react";
import { StyleSheet, View } from "react-native";
import { FIGMA } from "../theme";
export function SectionCard({children,selected=false}:{children:React.ReactNode;selected?:boolean}){return <View style={[styles.card,selected&&styles.selected]}>{children}</View>}
const styles=StyleSheet.create({card:{padding:13,borderRadius:16,borderWidth:1,borderColor:FIGMA.colors.border,backgroundColor:FIGMA.colors.surface},selected:{borderColor:FIGMA.colors.translucentLimeBorder,backgroundColor:FIGMA.colors.surfaceElevated}});
