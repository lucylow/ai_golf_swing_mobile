import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { toneBg, tone, V2 } from '../infra/theme';
import type { TrendDirection } from '../infra/types';
export function DeltaPill({value,direction}:{value:string;direction:TrendDirection}){const t=direction==='up'?'positive':direction==='down'?'danger':'neutral';return <View style={[s.wrap,{backgroundColor:toneBg(t)}]}><Text style={[s.text,{color:tone(t)}]}>{direction==='up'?'↗':direction==='down'?'↘':'→'} {value}</Text></View>}
const s=StyleSheet.create({wrap:{paddingHorizontal:8,paddingVertical:4,borderRadius:999,alignSelf:'flex-start'},text:{fontSize:8,fontWeight:'900'}});
