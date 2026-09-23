import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function StepRow({index,title,done=false}:{index:number;title:string;done?:boolean}){return <View style={s.row}><View style={[s.num,{backgroundColor:done?V2.colors.lime:V2.colors.surface3}]}><Text style={[s.numTxt,{color:done?V2.colors.ink:V2.colors.white}]}>{done?'✓':index}</Text></View><Text style={[s.title,done&&s.done]}>{title}</Text></View>}
const s=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',gap:10,marginVertical:6},num:{width:27,height:27,borderRadius:14,alignItems:'center',justifyContent:'center'},numTxt:{fontSize:9,fontWeight:'900'},title:{color:V2.colors.text,fontSize:10,fontWeight:'800',flex:1},done:{color:V2.colors.muted}});