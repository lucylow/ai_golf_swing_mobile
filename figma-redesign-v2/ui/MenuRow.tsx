import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function MenuRow({title,sub,onPress,accent=false}:{title:string;sub?:string;onPress?:()=>void;accent?:boolean}){return <Pressable onPress={onPress} style={s.row}><View style={{flex:1}}><Text style={[s.title,accent&&s.accent]}>{title}</Text>{sub?<Text style={s.sub}>{sub}</Text>:null}</View><Text style={s.arrow}>›</Text></Pressable>}
const s=StyleSheet.create({row:{minHeight:54,flexDirection:'row',alignItems:'center',gap:10},title:{color:V2.colors.text,fontSize:10,fontWeight:'800'},accent:{color:V2.colors.lime},sub:{color:V2.colors.dim,fontSize:8,marginTop:3},arrow:{color:V2.colors.dim,fontSize:18}});