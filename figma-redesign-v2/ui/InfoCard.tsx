import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function InfoCard({title,body}:{title:string;body:string}){return <View style={s.card}><Text style={s.title}>{title}</Text><Text style={s.body}>{body}</Text></View>}
const s=StyleSheet.create({card:{backgroundColor:V2.colors.glass,borderWidth:1,borderColor:V2.colors.border,padding:13,borderRadius:15},title:{color:V2.colors.text,fontSize:10,fontWeight:'900'},body:{color:V2.colors.dim,fontSize:9,lineHeight:14,marginTop:5}});