import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function IconTile({symbol,tint=V2.colors.lime}:{symbol:string;tint?:string}){return <View style={[s.tile,{backgroundColor:`${tint}12`,borderColor:`${tint}2a`}]}><Text style={[s.text,{color:tint}]}>{symbol}</Text></View>}
const s=StyleSheet.create({tile:{width:40,height:40,borderRadius:13,borderWidth:1,alignItems:'center',justifyContent:'center'},text:{fontSize:17,fontWeight:'900'}});