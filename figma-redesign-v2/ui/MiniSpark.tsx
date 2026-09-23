import React from 'react';
import { StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function MiniSpark({values,width=140,height=42}:{values:number[];width?:number;height?:number}){const max=Math.max(...values,1),min=Math.min(...values,0);return <View style={[s.wrap,{width,height}]}>{values.map((v,i)=><View key={i} style={[s.bar,{height:Math.max(4,((v-min)/(max-min||1))*height),left:i*((width-4)/(values.length||1))+2,width:Math.max(3,width/(values.length+4)),backgroundColor:i===values.length-1?V2.colors.lime:V2.colors.surface3}]}/>)}</View>}
const s=StyleSheet.create({wrap:{justifyContent:'flex-end',overflow:'hidden'},bar:{position:'absolute',bottom:0,borderRadius:4}});