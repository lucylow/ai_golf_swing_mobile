import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function BrandMark(){return <View style={s.row}><View style={s.logo}><View style={s.line}/><View style={s.line2}/></View><Text style={s.text}>AIGOLF</Text></View>}
const s=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',gap:8},logo:{width:28,height:28,borderRadius:9,backgroundColor:V2.colors.lime,alignItems:'center',justifyContent:'center',transform:[{rotate:'-8deg'}]},line:{width:14,height:2,backgroundColor:V2.colors.ink,transform:[{rotate:'20deg'}]},line2:{width:9,height:2,backgroundColor:V2.colors.ink,marginTop:4,transform:[{rotate:'-30deg'}]},text:{color:V2.colors.white,fontSize:11,fontWeight:'900',letterSpacing:1}});