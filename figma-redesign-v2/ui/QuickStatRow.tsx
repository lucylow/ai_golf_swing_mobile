import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function QuickStatRow({items}:{items:{label:string;value:string}[]}){return <View style={s.row}>{items.map(i=><View key={i.label} style={s.item}><Text style={s.value}>{i.value}</Text><Text style={s.label}>{i.label}</Text></View>)}</View>}
const s=StyleSheet.create({row:{flexDirection:'row',borderRadius:16,backgroundColor:V2.colors.surface,borderWidth:1,borderColor:V2.colors.border,padding:12},item:{flex:1,alignItems:'center'},value:{color:V2.colors.white,fontSize:13,fontWeight:'900'},label:{color:V2.colors.dim,fontSize:7,fontWeight:'800',marginTop:3}});