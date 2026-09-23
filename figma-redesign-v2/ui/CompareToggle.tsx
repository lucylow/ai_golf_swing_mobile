import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function CompareToggle({mode,onChange}:{mode:'YOU'|'PRO';onChange:(m:'YOU'|'PRO')=>void}){return <View style={s.wrap}>{(['YOU','PRO'] as const).map(x=><Pressable key={x} onPress={()=>onChange(x)} style={[s.item,mode===x&&s.active]}><Text style={[s.text,mode===x&&s.activeText]}>{x}</Text></Pressable>)}</View>}
const s=StyleSheet.create({wrap:{flexDirection:'row',padding:3,borderRadius:999,backgroundColor:V2.colors.surface,borderWidth:1,borderColor:V2.colors.border},item:{paddingHorizontal:14,paddingVertical:7,borderRadius:999},active:{backgroundColor:V2.colors.lime},text:{color:V2.colors.dim,fontSize:8,fontWeight:'900'},activeText:{color:V2.colors.ink}});