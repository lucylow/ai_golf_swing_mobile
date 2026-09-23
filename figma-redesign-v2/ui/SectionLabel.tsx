import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function SectionLabel({title,meta}:{title:string;meta?:string}){return <View style={s.row}><Text style={s.title}>{title}</Text>{meta?<Text style={s.meta}>{meta}</Text>:null}</View>}
const s=StyleSheet.create({row:{flexDirection:'row',alignItems:'baseline',justifyContent:'space-between',marginTop:20,marginBottom:10},title:{color:V2.colors.white,fontSize:15,fontWeight:'900'},meta:{color:V2.colors.dim,fontSize:9,fontWeight:'800',letterSpacing:.8}});