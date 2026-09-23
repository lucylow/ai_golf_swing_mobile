import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function LoadingSkeleton({lines=4}:{lines?:number}){return <View style={s.wrap}>{Array.from({length:lines}).map((_,i)=><View key={i} style={[s.line,{width:i===lines-1?'64%':'100%'}]}/>)}</View>}
const s=StyleSheet.create({wrap:{gap:8,paddingVertical:4},line:{height:10,borderRadius:6,backgroundColor:V2.colors.surface3}});