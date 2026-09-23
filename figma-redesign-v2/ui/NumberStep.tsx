import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function NumberStep({n,title,body}:{n:number;title:string;body:string}){return <View style={s.row}><View style={s.n}><Text style={s.nText}>{n}</Text></View><View style={s.copy}><Text style={s.title}>{title}</Text><Text style={s.body}>{body}</Text></View></View>}
const s=StyleSheet.create({row:{flexDirection:'row',gap:10,marginVertical:8},n:{width:26,height:26,borderRadius:13,backgroundColor:V2.colors.surface3,alignItems:'center',justifyContent:'center'},nText:{color:V2.colors.lime,fontSize:9,fontWeight:'900'},copy:{flex:1},title:{color:V2.colors.white,fontSize:10,fontWeight:'900'},body:{color:V2.colors.dim,fontSize:8,lineHeight:13,marginTop:3}});