import React from 'react';
import { StyleSheet, View } from 'react-native';
export function TwoCol({children,gap=10}:{children:React.ReactNode;gap?:number}){return <View style={[s.row,{gap}]}>{React.Children.map(children,(child,i)=><View key={i} style={s.col}>{child}</View>)}</View>}
const s=StyleSheet.create({row:{flexDirection:'row'},col:{flex:1}});