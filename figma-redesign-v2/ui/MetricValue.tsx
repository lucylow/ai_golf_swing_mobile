import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tone, type V2Tone } from '../infra/theme';
export function MetricValue({value,delta,t}:{value:string;delta?:string;t?:V2Tone}){return <View><Text style={s.value}>{value}</Text>{delta?<Text style={[s.delta,{color:tone(t||'neutral')}]}>{delta}</Text>:null}</View>}
const s=StyleSheet.create({value:{color:'#F5FFF4',fontSize:20,fontWeight:'900'},delta:{fontSize:8,fontWeight:'900',marginTop:2}});