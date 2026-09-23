import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockSessions } from '../mock';
export default function MockSessionArchiveScreen(){
  return <PageShell><PageHeader title="Session Archive" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="60 SESSIONS" meta="ARCHIVE FIXTURES"/>{mockSessions.slice(0,18).map(x=><View key={x.id} style={s.gap}><SessionCard session={{id:x.id,date:x.date.slice(5),club:x.club,score:x.score,swings:x.swings,focus:x.focus,duration:`${Math.floor(x.durationSec/60)}:${String(x.durationSec%60).padStart(2,'0')}`,quality:x.quality==='excellent'?'Clean':x.quality==='good'?'Strong':'Mixed'}}/></View>)}</PageShell>;
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
