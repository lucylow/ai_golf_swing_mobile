import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function SmallStat({label,value}:{label:string;value:string}){return <View style={s.box}><Text style={s.label}>{label}</Text><Text style={s.value}>{value}</Text></View>}
const s=StyleSheet.create({box:{minWidth:78,padding:10,borderRadius:14,backgroundColor:V2.colors.surface,borderWidth:1,borderColor:V2.colors.border},label:{color:V2.colors.dim,fontSize:7,fontWeight:'900',letterSpacing:.6},value:{color:V2.colors.white,fontSize:13,fontWeight:'900',marginTop:4}});