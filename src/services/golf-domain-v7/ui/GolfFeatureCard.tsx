import React from 'react';
import { Text, View } from 'react-native';
export function GolfFeatureCard({ label, value, detail, accent = false }: { label: string; value: string; detail?: string; accent?: boolean }) {
  return <View style={{ backgroundColor: '#101D19', borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1C3B30' }}><Text style={{ color: '#91A29A', fontSize: 11, letterSpacing: 1.1, marginBottom: 6 }}>{label.toUpperCase()}</Text><Text style={{ color: accent ? '#B7FF3C' : '#F5F8F4', fontSize: 22, fontWeight: '800' }}>{value}</Text>{detail ? <Text style={{ color: '#91A29A', fontSize: 13, lineHeight: 18, marginTop: 6 }}>{detail}</Text> : null}</View>;
}

