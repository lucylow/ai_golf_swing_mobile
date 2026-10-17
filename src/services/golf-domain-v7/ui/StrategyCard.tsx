import React from 'react';
import { Text, View } from 'react-native';
export function StrategyCard({ club, target, risk, reason }: { club: string; target: number; risk: number; reason: string }) {
  return <View style={{ backgroundColor: '#101D19', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#18352B' }}><Text style={{ color: '#91A29A', fontSize: 11, letterSpacing: 1.1 }}>ON-COURSE PLAN</Text><Text style={{ color: '#B7FF3C', fontSize: 23, fontWeight: '800', marginTop: 6 }}>{club}</Text><Text style={{ color: '#F5F8F4', fontSize: 18, fontWeight: '700', marginTop: 4 }}>{Math.round(target)} yd target</Text><Text style={{ color: '#91A29A', fontSize: 13, marginTop: 8 }}>Risk {Math.round(risk * 100)}%</Text><Text style={{ color: '#91A29A', fontSize: 13, lineHeight: 18, marginTop: 8 }}>{reason}</Text></View>;
}

