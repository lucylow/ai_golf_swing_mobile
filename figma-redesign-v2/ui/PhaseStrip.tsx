import React from 'react';
import { StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function PhaseStrip({active=3}:{active?:number}){const items=Array.from({length:6});return <View style={s.row}>{items.map((_,i)=><View key={i} style={[s.seg,{backgroundColor:i<=active?V2.colors.lime:V2.colors.surface3,opacity:i===active?1:.72}]}/>)}</View>}
const s=StyleSheet.create({row:{flexDirection:'row',gap:4},seg:{height:5,flex:1,borderRadius:4}});