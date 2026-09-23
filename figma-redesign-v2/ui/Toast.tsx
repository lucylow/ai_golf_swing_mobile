import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function Toast({text}:{text:string}){return <View style={s.toast}><Text style={s.dot}>✓</Text><Text style={s.text}>{text}</Text></View>}
const s=StyleSheet.create({toast:{flexDirection:'row',alignItems:'center',gap:8,paddingHorizontal:12,paddingVertical:9,borderRadius:999,backgroundColor:V2.colors.surface2,borderWidth:1,borderColor:V2.colors.borderStrong},dot:{width:18,height:18,borderRadius:9,backgroundColor:V2.colors.lime,color:V2.colors.ink,textAlign:'center',lineHeight:18,fontSize:10,fontWeight:'900'},text:{color:V2.colors.text,fontSize:9,fontWeight:'800'}});