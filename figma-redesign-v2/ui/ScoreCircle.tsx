import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function ScoreCircle({score,size=86}:{score:number;size?:number}){return <View style={[s.circle,{width:size,height:size,borderRadius:size/2,borderWidth:3,borderColor:score>=88?V2.colors.lime:score>=78?V2.colors.amber:V2.colors.danger}]}><Text style={s.score}>{score}</Text><Text style={s.unit}>SCORE</Text></View>}
const s=StyleSheet.create({circle:{alignItems:'center',justifyContent:'center',backgroundColor:V2.colors.surface2},score:{color:V2.colors.white,fontSize:25,fontWeight:'900'},unit:{color:V2.colors.dim,fontSize:7,fontWeight:'900',letterSpacing:1,marginTop:1}});