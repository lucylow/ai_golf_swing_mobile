import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function HeroMetric({eyebrow,value,label}:{eyebrow:string;value:string;label:string}){return <View><Text style={s.eyebrow}>{eyebrow}</Text><Text style={s.value}>{value}</Text><Text style={s.label}>{label}</Text></View>}
const s=StyleSheet.create({eyebrow:{color:V2.colors.lime,fontSize:8,fontWeight:'900',letterSpacing:1},value:{color:V2.colors.white,fontSize:42,fontWeight:'900',lineHeight:47,marginTop:5},label:{color:V2.colors.dim,fontSize:8,fontWeight:'800'}});