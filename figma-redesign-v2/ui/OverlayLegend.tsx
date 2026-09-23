import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function OverlayLegend(){return <View style={s.row}>{[['POSE',V2.colors.lime],['PLANE',V2.colors.cyan],['TARGET',V2.colors.amber]].map(([x,c])=><View key={x} style={s.item}><View style={[s.dot,{backgroundColor:c}]}/><Text style={s.text}>{x}</Text></View>)}</View>}
const s=StyleSheet.create({row:{flexDirection:'row',gap:13,flexWrap:'wrap'},item:{flexDirection:'row',alignItems:'center',gap:5},dot:{width:6,height:6,borderRadius:3},text:{color:V2.colors.dim,fontSize:8,fontWeight:'900'}});