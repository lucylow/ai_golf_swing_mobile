import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2, tone, toneBg, type V2Tone } from '../infra/theme';
export function NoticeBanner({title,body,t='info'}:{title:string;body:string;t?:V2Tone}){return <View style={[s.wrap,{backgroundColor:toneBg(t),borderColor:`${tone(t)}35`}]}><Text style={[s.title,{color:tone(t)}]}>{title}</Text><Text style={s.body}>{body}</Text></View>}
const s=StyleSheet.create({wrap:{borderWidth:1,borderRadius:16,padding:12},title:{fontSize:9,fontWeight:'900'},body:{color:V2.colors.muted,fontSize:8,lineHeight:13,marginTop:3}});