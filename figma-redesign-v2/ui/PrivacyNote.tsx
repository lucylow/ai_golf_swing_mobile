import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { V2 } from '../infra/theme';
export function PrivacyNote(){return <Text style={s.text}>Swing video stays on your device until you choose to sync or share it. Camera overlays are visualized locally in this redesign layer.</Text>}
const s=StyleSheet.create({text:{color:V2.colors.dim,fontSize:8,lineHeight:13}});