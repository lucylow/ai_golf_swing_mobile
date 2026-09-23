import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Metric } from '../infra/types';
import { MetricValue, Surface, DeltaPill } from '.';
import { V2,tone } from '../infra/theme';
export function MetricGrid({items}:{items:Metric[]}){return <View style={s.grid}>{items.map((m,i)=><Surface key={m.id} style={s.card}><View style={s.top}><TextSafe label={m.label}/><View style={[s.dot,{backgroundColor:tone(m.tone)}]}/></View><MetricValue value={m.value} delta={m.delta} t={m.tone}/><DeltaPill value={`${m.score}`} direction={m.direction}/></Surface>)}</View>}
function TextSafe({label}:{label:string}){return <Text style={stylesText.label}>{label}</Text>}
const stylesText=StyleSheet.create({label:{color:V2.colors.dim,fontSize:8,fontWeight:'900',letterSpacing:.3}});
const s=StyleSheet.create({grid:{flexDirection:'row',flexWrap:'wrap',gap:9},card:{width:'48%',minHeight:102},top:{flexDirection:'row',justifyContent:'space-between',marginBottom:10},dot:{width:6,height:6,borderRadius:3}});
