import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockRangeLane } from '../mock';
export default function MockRangeLaneScreen(){
  return <PageShell><PageHeader title="Range Lane Board" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="LANES" meta="24 FIXTURES"/><MockList items={mockRangeLane.map(r=>({id:r.id,title:`Lane ${r.lane} · ${r.club}`,meta:`${r.distance} yd · ${r.status}`,value:r.target}))}/><View style={s.gap}/><Surface><Text style={s.title}>Range session density</Text><Text style={s.copy}>Synthetic lanes show open, active, complete and hold states for the live-range redesign.</Text></Surface></PageShell>;
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
