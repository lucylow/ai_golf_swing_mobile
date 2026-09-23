import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockSwings } from '../mock';
export default function MockSwingTimelineScreen(){
  return <PageShell><PageHeader title="Swing Timeline" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="SWING CLIPS" meta="120 FIXTURES"/><MockList items={mockSwings.slice(0,30).map(w=>({id:w.id,title:`Swing ${String(w.index).padStart(2,'0')} · ${w.score}`,meta:`Carry ${w.carryYards}y · ${w.clubSpeedMph} mph · ${w.tempo}`,value:`${w.launchDeg}°`}))}/><View style={s.gap}/><Surface><Text style={s.title}>Timeline notes</Text><Text style={s.copy}>Index, score, launch, speed and tempo are all mock-backed so the redesigned timeline stays dense during visual QA.</Text></Surface></PageShell>;
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
