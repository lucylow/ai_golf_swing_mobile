import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../../figma-redesign-v2/theme';
export function FixtureStat({label,value,detail}:{label:string;value:string;detail?:string}){return <View style={s.box}><Text style={s.label}>{label}</Text><Text style={s.value}>{value}</Text>{detail?<Text style={s.detail}>{detail}</Text>:null}</View>}
const s=StyleSheet.create({box:{flex:1,minWidth:98,borderWidth:1,borderColor:V2.colors.border,borderRadius:16,padding:14,backgroundColor:V2.colors.surface},label:{fontSize:8,color:V2.colors.dim,fontWeight:'900',letterSpacing:1},value:{fontSize:21,color:V2.colors.white,fontWeight:'900',marginTop:7},detail:{fontSize:9,color:V2.colors.muted,marginTop:4}});
