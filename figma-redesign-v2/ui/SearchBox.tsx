import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { V2 } from '../infra/theme';
export function SearchBox({value,onChange,placeholder='Search'}:{value:string;onChange:(v:string)=>void;placeholder?:string}){return <TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={V2.colors.dim} style={s.input} autoCapitalize="none"/>}
const s=StyleSheet.create({input:{height:44,borderRadius:14,borderWidth:1,borderColor:V2.colors.border,backgroundColor:V2.colors.surface,paddingHorizontal:14,color:V2.colors.text,fontSize:11}});