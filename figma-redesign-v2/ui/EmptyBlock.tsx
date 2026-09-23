import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function EmptyBlock({title,body}:{title:string;body:string}){return <View style={s.wrap}><Text style={s.icon}>∅</Text><Text style={s.title}>{title}</Text><Text style={s.body}>{body}</Text></View>}
const s=StyleSheet.create({wrap:{padding:28,borderRadius:18,borderWidth:1,borderStyle:'dashed',borderColor:V2.colors.borderStrong,alignItems:'center'},icon:{fontSize:22,color:V2.colors.dim},title:{color:V2.colors.text,fontSize:12,fontWeight:'900',marginTop:8},body:{color:V2.colors.dim,fontSize:9,lineHeight:14,textAlign:'center',marginTop:4,maxWidth:260}});