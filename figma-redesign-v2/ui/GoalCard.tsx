import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GoalMeter, } from './GoalMeter';
import { V2 } from '../infra/theme';
import type { Goal } from '../infra/types';
export function GoalCard({goal,onPress}:{goal:Goal;onPress?:()=>void}){return <Pressable onPress={onPress} style={({pressed})=>[s.card,pressed&&s.pressed]}><View style={s.top}><Text style={s.title}>{goal.title}</Text><Text style={s.due}>{goal.due}</Text></View><Text style={s.caption}>{goal.unit}</Text><GoalMeter current={goal.current} target={goal.target} unit={goal.unit} t={goal.color}/></Pressable>}
const s=StyleSheet.create({card:{backgroundColor:V2.colors.surface,borderWidth:1,borderColor:V2.colors.border,borderRadius:18,padding:15,gap:7},top:{flexDirection:'row',justifyContent:'space-between',gap:8},title:{color:V2.colors.white,fontSize:13,fontWeight:'900',flex:1},due:{color:V2.colors.dim,fontSize:8,fontWeight:'800'},caption:{color:V2.colors.dim,fontSize:8},pressed:{opacity:.84}});