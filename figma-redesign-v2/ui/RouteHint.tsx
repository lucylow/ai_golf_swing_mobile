import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { V2 } from '../infra/theme';
export function RouteHint({label,onPress}:{label:string;onPress:()=>void}){return <Pressable onPress={onPress} style={s.btn}><Text style={s.text}>{label}</Text><Text style={s.arrow}>›</Text></Pressable>}
const s=StyleSheet.create({btn:{flexDirection:'row',alignItems:'center',gap:5,alignSelf:'flex-start'},text:{color:V2.colors.lime,fontSize:9,fontWeight:'900'},arrow:{color:V2.colors.lime,fontSize:14}});