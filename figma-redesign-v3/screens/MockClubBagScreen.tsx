import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PageShell, PageHeader, Surface, SectionLabel, MetricRow, SessionCard, LimeCTA } from '../../figma-redesign-v2/ui';
import { V2 } from '../../figma-redesign-v2/theme';
import { MockDataBanner, FixtureStat, MockList } from '../ui';
import { mockClubs } from '../mock';
export default function MockClubBagScreen(){
  return <PageShell><PageHeader title="Club Bag" eyebrow="MOCK DATA V3" back/><MockDataBanner/><SectionLabel title="36 CLUB RECORDS" meta="USE + DISPERSION"/><MockList items={mockClubs.slice(0,24).map(c=>({id:c.id,title:c.name,meta:`${c.swings} swings · ${c.dispersionYards}y dispersion · ${Math.round(c.confidence*100)}% confidence`,value:`${c.avgCarry}y`}))}/><View style={s.gap}/><Surface><Text style={s.title}>Bag intelligence</Text><Text style={s.copy}>Favorites, trend deltas, last-used metadata, carry and dispersion are all prefilled.</Text></Surface></PageShell>;
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
