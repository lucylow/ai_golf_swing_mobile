import React from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { V2 } from '../infra/theme';
export function Surface({children,style,onPress}:{children:React.ReactNode;style?:ViewStyle;onPress?:()=>void}){const body=<View style={[s.card,style]}>{children}</View>;return onPress?<Pressable onPress={onPress} style={({pressed})=>[s.card,style,pressed&&s.pressed]}>{children}</Pressable>:body}
const s=StyleSheet.create({card:{backgroundColor:V2.colors.surface,borderColor:V2.colors.border,borderWidth:1,borderRadius:20,padding:16},pressed:{opacity:.84,transform:[{scale:.992}]}});