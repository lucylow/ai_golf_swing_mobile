import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { V2 } from '../infra/theme';
export function PillRow({labels}:{labels:string[]}){return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>{labels.map(l=><View key={l} style={s.pill}><Text style={s.text}>{l}</Text></View>)}</ScrollView>}
const s=StyleSheet.create({row:{gap:7},pill:{paddingHorizontal:10,paddingVertical:6,borderRadius:999,backgroundColor:V2.colors.surface3,borderWidth:1,borderColor:V2.colors.border},text:{color:V2.colors.muted,fontSize:8,fontWeight:'800'}});