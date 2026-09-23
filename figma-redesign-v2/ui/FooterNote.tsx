import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { V2 } from '../infra/theme';
export function FooterNote({children}:{children:React.ReactNode}){return <Text style={s.text}>{children}</Text>}
const s=StyleSheet.create({text:{color:V2.colors.dim,fontSize:7,lineHeight:12,textAlign:'center',paddingVertical:14}});