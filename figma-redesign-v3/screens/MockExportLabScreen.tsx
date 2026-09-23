import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockExportPreset } from '../mock';
export default function MockExportLabScreen(){
  return <PageShell><PageHeader title="Export Lab" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="SHARE PRESETS" meta="16 FIXTURES"/><MockList items={mockExportPreset.map(p=>({id:p.id,title:p.label,meta:`${p.format} · ${p.resolution}px · ${p.duration}s`,value:p.includeMetrics?'METRICS':'CLIP'}))}/><View style={s.gap}/><Surface><Text style={s.title}>Share surface coverage</Text><Text style={s.copy}>Different aspect ratios and metadata combinations populate export/share UI states.</Text></Surface></PageShell>;
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
