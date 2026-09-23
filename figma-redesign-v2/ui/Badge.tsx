import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tone, toneBg, type V2Tone } from '../infra/theme';
export function Badge({label,t='neutral'}:{label:string;t?:V2Tone}){return <View style={[s.wrap,{backgroundColor:toneBg(t)}]}><View style={[s.dot,{backgroundColor:tone(t)}]}/><Text style={[s.text,{color:tone(t)}]}>{label.toUpperCase()}</Text></View>}
const s=StyleSheet.create({wrap:{alignSelf:'flex-start',flexDirection:'row',alignItems:'center',gap:6,paddingHorizontal:9,paddingVertical:5,borderRadius:999},dot:{width:5,height:5,borderRadius:3},text:{fontSize:8,fontWeight:'900',letterSpacing:.7}});