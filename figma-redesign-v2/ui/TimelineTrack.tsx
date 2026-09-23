import React from 'react';
import { StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function TimelineTrack({progress=.45}:{progress?:number}){return <View style={s.track}><View style={[s.fill,{width:`${Math.max(0,Math.min(1,progress))*100}%`}]}/><View style={[s.dot,{left:`${Math.max(0,Math.min(1,progress))*100}%`}]}/></View>}
const s=StyleSheet.create({track:{height:4,borderRadius:3,backgroundColor:V2.colors.surface3,position:'relative'},fill:{height:4,backgroundColor:V2.colors.lime,borderRadius:3},dot:{position:'absolute',top:-3,width:10,height:10,borderRadius:5,backgroundColor:V2.colors.white,marginLeft:-5}});