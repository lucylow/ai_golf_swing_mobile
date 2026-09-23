import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function ScoreChip({score}:{score:number}){return <View style={s.wrap}><Text style={s.value}>{score}</Text><Text style={s.unit}>/100</Text></View>}
const s=StyleSheet.create({wrap:{flexDirection:'row',alignItems:'baseline'},value:{color:V2.colors.lime,fontSize:24,fontWeight:'900'},unit:{color:V2.colors.dim,fontSize:8,fontWeight:'800',marginLeft:2}});