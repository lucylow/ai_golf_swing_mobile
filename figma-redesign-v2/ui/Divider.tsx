import React from 'react';
import { StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function Divider({inset=0}:{inset?:number}){return <View style={[s.line,{marginHorizontal:inset}]}/>};
const s=StyleSheet.create({line:{height:1,backgroundColor:V2.colors.border,marginVertical:3}});