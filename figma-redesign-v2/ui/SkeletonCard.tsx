import React from 'react';
import { StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function SkeletonCard(){return <View style={s.card}><View style={s.w1}/><View style={s.w2}/><View style={s.w3}/></View>}
const s=StyleSheet.create({card:{height:112,backgroundColor:V2.colors.surface,borderRadius:18,borderWidth:1,borderColor:V2.colors.border,padding:15,gap:9},w1:{height:12,width:'45%',borderRadius:6,backgroundColor:V2.colors.surface3},w2:{height:10,width:'90%',borderRadius:6,backgroundColor:V2.colors.surface3},w3:{height:7,width:'60%',borderRadius:6,backgroundColor:V2.colors.surface3}});