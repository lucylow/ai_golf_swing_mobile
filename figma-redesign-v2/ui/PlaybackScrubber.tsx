import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function PlaybackScrubber({progress,onChange}:{progress:number;onChange:(n:number)=>void}){return <Pressable onPress={(e)=>onChange(Math.min(1,Math.max(0,e.nativeEvent.locationX/300)))} style={s.track}><View style={[s.fill,{width:`${progress*100}%`}]}/><View style={[s.thumb,{left:`${progress*100}%`}]}/></Pressable>}
const s=StyleSheet.create({track:{height:12,position:'relative',justifyContent:'center'},fill:{height:4,backgroundColor:V2.colors.lime,borderRadius:4},thumb:{position:'absolute',top:2,width:8,height:8,borderRadius:4,backgroundColor:V2.colors.white,marginLeft:-4}});