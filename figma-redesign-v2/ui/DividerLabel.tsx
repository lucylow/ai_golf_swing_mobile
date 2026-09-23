import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function DividerLabel({label}:{label:string}){return <View style={s.row}><View style={s.line}/><Text style={s.text}>{label}</Text><View style={s.line}/></View>}
const s=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',gap:8,marginVertical:12},line:{flex:1,height:1,backgroundColor:V2.colors.border},text:{color:V2.colors.dim,fontSize:7,fontWeight:'900',letterSpacing:.8}});