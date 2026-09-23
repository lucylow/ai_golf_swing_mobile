import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { V2 } from '../infra/theme';
export function FilterChip({label,active,onPress}:{label:string;active:boolean;onPress:()=>void}){return <Pressable onPress={onPress} style={[s.chip,active&&s.active]}><Text style={[s.text,active&&s.activeText]}>{label}</Text></Pressable>}
const s=StyleSheet.create({chip:{borderRadius:999,borderWidth:1,borderColor:V2.colors.border,paddingHorizontal:10,paddingVertical:6,backgroundColor:V2.colors.surface},active:{backgroundColor:V2.colors.limeGlass,borderColor:'rgba(182,255,24,.22)'},text:{fontSize:8,fontWeight:'900',color:V2.colors.dim},activeText:{color:V2.colors.lime}});