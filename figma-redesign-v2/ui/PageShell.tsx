import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import { V2 } from '../infra/theme';
export function PageShell({children, scroll=true, pad=18}:{children:React.ReactNode;scroll?:boolean;pad?:number}){ const body=<View style={[styles.body,{paddingHorizontal:pad}]}>{children}</View>; return <SafeAreaView edges={['top','left','right']} style={styles.safe}>{scroll?<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>{body}</ScrollView>:body}</SafeAreaView>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:V2.colors.bg},scroll:{paddingBottom:36},body:{flex:1}});