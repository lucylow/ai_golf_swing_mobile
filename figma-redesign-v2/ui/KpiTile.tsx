import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function KpiTile({label,value,sub}:{label:string;value:string;sub?:string}){return <View style={s.card}><Text style={s.label}>{label}</Text><Text style={s.value}>{value}</Text>{sub?<Text style={s.sub}>{sub}</Text>:null}</View>}
const s=StyleSheet.create({card:{flex:1,backgroundColor:V2.colors.surface,padding:13,borderRadius:16,borderWidth:1,borderColor:V2.colors.border},label:{color:V2.colors.dim,fontSize:7,fontWeight:'900',letterSpacing:.8},value:{color:V2.colors.white,fontSize:18,fontWeight:'900',marginTop:5},sub:{color:V2.colors.muted,fontSize:8,marginTop:2}});