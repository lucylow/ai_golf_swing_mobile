import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function CoachBubble({eyebrow,children}:{eyebrow:string;children:React.ReactNode}){return <View style={s.card}><View style={s.head}><View style={s.dot}/><Text style={s.eyebrow}>{eyebrow}</Text></View><Text style={s.copy}>{children}</Text></View>}
const s=StyleSheet.create({card:{backgroundColor:V2.colors.surface2,borderWidth:1,borderColor:V2.colors.borderStrong,borderRadius:18,padding:15},head:{flexDirection:'row',alignItems:'center',gap:7},dot:{width:7,height:7,borderRadius:4,backgroundColor:V2.colors.lime},eyebrow:{color:V2.colors.lime,fontSize:8,fontWeight:'900',letterSpacing:1},copy:{color:V2.colors.text,fontSize:11,lineHeight:17,marginTop:9}});