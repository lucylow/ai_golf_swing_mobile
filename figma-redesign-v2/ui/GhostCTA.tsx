import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { V2 } from '../infra/theme';
export function GhostCTA({label,onPress}:{label:string;onPress?:()=>void}){return <Pressable onPress={onPress} style={({pressed})=>[s.btn,pressed&&s.pressed]}><Text style={s.text}>{label}</Text></Pressable>}
const s=StyleSheet.create({btn:{minHeight:42,borderRadius:999,borderColor:V2.colors.borderStrong,borderWidth:1,paddingHorizontal:15,alignItems:'center',justifyContent:'center',backgroundColor:V2.colors.glass},text:{color:V2.colors.text,fontSize:10,fontWeight:'900',letterSpacing:.7},pressed:{opacity:.68}});