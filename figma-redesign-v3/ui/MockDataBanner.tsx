import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../../figma-redesign-v2/theme';
export function MockDataBanner({ label = 'MOCK DATA · VISUAL QA' }: { label?: string }) {
  return <View style={s.wrap}><View style={s.dot}/><Text style={s.text}>{label}</Text><Text style={s.text}>synthetic</Text></View>;
}
const s=StyleSheet.create({wrap:{flexDirection:'row',alignItems:'center',gap:7,paddingHorizontal:10,paddingVertical:8,borderRadius:999,borderWidth:1,borderColor:V2.colors.border,backgroundColor:V2.colors.glass,marginBottom:12},dot:{width:6,height:6,borderRadius:99,backgroundColor:V2.colors.lime},text:{fontSize:9,color:V2.colors.muted,fontWeight:'800',letterSpacing:1}});
