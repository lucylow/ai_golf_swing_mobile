import React from 'react';
import { StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function AccentRule(){return <View style={s.row}><View style={s.accent}/><View style={s.rest}/></View>}
const s=StyleSheet.create({row:{height:2,flexDirection:'row'},accent:{width:38,backgroundColor:V2.colors.lime},rest:{flex:1,backgroundColor:V2.colors.border}});