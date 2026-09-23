import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockInsights, mockNotifications } from '../mock';
export default function MockCoachInboxScreen(){
  return <PageShell><PageHeader title="Coach Inbox" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="COACH INSIGHTS" meta="32 FIXTURES"/><MockList items={mockInsights.slice(0,14).map(x=>({id:x.id,title:x.title,meta:`${x.impact} · ${x.tone}`,value:x.metricIds[0]}))}/><View style={s.gap}/><SectionLabel title="NOTIFICATIONS" meta="36 FIXTURES"/><MockList items={mockNotifications.slice(0,12).map(x=>({id:x.id,title:x.title,meta:`${x.type} · ${x.timestamp}`,value:x.unread?'NEW':''}))}/></PageShell>;
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
