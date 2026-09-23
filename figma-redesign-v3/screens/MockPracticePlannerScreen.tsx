import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockPractice } from '../mock';
export default function MockPracticePlannerScreen(){
  return <PageShell><PageHeader title="Practice Planner" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="42 BLOCKS" meta="7-DAY ROTATION"/><MockList items={mockPractice.slice(0,21).map(x=>({id:x.id,title:`${x.day} · ${x.title}`,meta:`${x.focus} · ${x.minutes}m · ${x.intensity}`,value:x.completed?'DONE':String(x.score)}))}/><View style={s.gap}/><Surface><Text style={s.title}>Plan density</Text><Text style={s.copy}>Completed, pending, short and hard blocks are represented for calendar and planner states.</Text></Surface></PageShell>;
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
