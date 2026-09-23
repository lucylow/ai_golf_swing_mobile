import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function FocusBanner({title,body}:{title:string;body:string}){return <View style={s.banner}><Text style={s.eyebrow}>TODAY'S FOCUS</Text><Text style={s.title}>{title}</Text><Text style={s.body}>{body}</Text></View>}
const s=StyleSheet.create({banner:{padding:17,borderRadius:20,backgroundColor:'#163A2E',borderWidth:1,borderColor:'#245342'},eyebrow:{color:V2.colors.lime,fontSize:8,fontWeight:'900',letterSpacing:1},title:{color:V2.colors.white,fontSize:18,fontWeight:'900',marginTop:6},body:{color:'#B5CCC0',fontSize:9,lineHeight:14,marginTop:4}});