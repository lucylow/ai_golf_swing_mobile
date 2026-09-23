import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockMetrics } from '../mock';
export default function MockMetricsHistoryScreen(){
  return <PageShell><PageHeader title="Metric History" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="8 TRACKED METRICS" meta="14 HISTORY POINTS EACH"/>{mockMetrics.map(m=><View key={m.id} style={s.gap}><MetricRow metric={{id:m.id,label:m.label,score:m.score,value:m.display,delta:m.deltaLabel,direction:m.delta>=0?'up':'down',tone:m.tone,note:m.cue}}/></View>)}<Surface><Text style={s.title}>History density</Text><Text style={s.copy}>Each metric also carries 14 time-series points for chart and trend components elsewhere in the redesign.</Text></Surface></PageShell>;
}
const s=StyleSheet.create({
  grid:{flexDirection:'row',flexWrap:'wrap',gap:10},
  copy:{fontSize:11,color:V2.colors.muted,lineHeight:17},
  title:{fontSize:16,color:V2.colors.white,fontWeight:'900'},
  lime:{color:V2.colors.lime},
  gap:{marginBottom:10},
  stack:{gap:10},
  row:{flexDirection:'row',gap:10,alignItems:'center'},
  pill:{paddingHorizontal:10,paddingVertical:8,borderRadius:999,borderWidth:1,borderColor:V2.colors.border,backgroundColor:V2.colors.glass},
  pillText:{fontSize:9,color:V2.colors.text,fontWeight:'800'},
});
