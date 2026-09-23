import React from 'react';
import { ScrollView, View, Text } from 'react-native';

export type HealthItem = { key: string; label: string; status: 'pass' | 'warn' | 'fail'; detail: string };

export function ReleaseHealthPanel({ items }: { items: HealthItem[] }) {
  const counts = items.reduce((acc, item) => ({ ...acc, [item.status]: acc[item.status] + 1 }), { pass: 0, warn: 0, fail: 0 });
  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {(['pass', 'warn', 'fail'] as const).map((status) => <View key={status} style={{ flex: 1, borderRadius: 14, padding: 14, backgroundColor: '#101D18' }}><Text style={{ color: '#91A69B', fontSize: 11 }}>{status.toUpperCase()}</Text><Text style={{ color: '#F7FFF6', fontSize: 24, fontWeight: '900' }}>{counts[status]}</Text></View>)}
      </View>
      {items.map((item) => (
        <View key={item.key} style={{ padding: 15, borderRadius: 16, backgroundColor: '#0C1713', borderWidth: 1, borderColor: item.status === 'fail' ? '#6B3A3D' : '#20372E' }}>
          <Text style={{ color: '#F7FFF6', fontWeight: '800' }}>{item.label}</Text>
          <Text style={{ color: '#91A69B', marginTop: 5, lineHeight: 18 }}>{item.detail}</Text>
          <Text style={{ color: item.status === 'pass' ? '#B7FF4A' : item.status === 'warn' ? '#FFD97A' : '#FF9A9A', marginTop: 8, fontWeight: '900' }}>{item.status.toUpperCase()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
