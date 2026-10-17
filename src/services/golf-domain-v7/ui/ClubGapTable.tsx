import React from 'react';
import { Text, View } from 'react-native';
import type { GapHealth } from '../src/equipment/clubGapping';
export function ClubGapTable({ data }: { data: GapHealth }) {
  return <View style={{ backgroundColor: '#101D19', borderRadius: 18, padding: 16, marginBottom: 12 }}><Text style={{ color: '#F5F8F4', fontSize: 15, fontWeight: '800', marginBottom: 12 }}>Club gapping</Text>{data.gaps.slice(0,7).map((gap) => <View key={gap.clubId} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#18352B' }}><Text style={{ color: '#91A29A', fontSize: 12 }}>{gap.clubId}</Text><Text style={{ color: '#F5F8F4', fontWeight: '700' }}>{Math.round(gap.carryYards)} yd</Text><Text style={{ color: gap.overlap > 0.35 ? '#C6FF55' : '#91A29A', fontSize: 12 }}>{Math.round(gap.gapFromPriorYards)} gap</Text></View>)}</View>;
}

