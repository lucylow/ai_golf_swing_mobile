import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function CalendarMonth(){const days=Array.from({length:35},(_,i)=>i-2);return <View style={s.wrap}>{days.map(d=><View key={d} style={[s.day,d===22&&s.active]}><Text style={[s.text,d===22&&s.activeText]}>{d>0&&d<31?d:''}</Text></View>)}</View>}
const s=StyleSheet.create({wrap:{flexDirection:'row',flexWrap:'wrap',gap:6},day:{width:'12%',height:34,borderRadius:9,alignItems:'center',justifyContent:'center'},active:{backgroundColor:V2.colors.lime},text:{color:V2.colors.muted,fontSize:9,fontWeight:'800'},activeText:{color:V2.colors.ink}});