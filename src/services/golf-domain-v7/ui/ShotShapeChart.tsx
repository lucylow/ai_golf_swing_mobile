import React from 'react';
import { Text, View } from 'react-native';
export function ShotShapeChart({ startDeg, curvatureDeg, label }: { startDeg: number; curvatureDeg: number; label: string }) {
  const width = 220;
  const offset = Math.max(-100, Math.min(100, startDeg * 10));
  const curve = Math.max(-90, Math.min(90, curvatureDeg * 8));
  return <View style={{ backgroundColor: '#0C1714', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#18352B' }}><Text style={{ color: '#F5F8F4', fontSize: 14, fontWeight: '800', marginBottom: 12 }}>{label}</Text><View style={{ width, height: 120, alignSelf: 'center', backgroundColor: '#09120F', borderRadius: 12, overflow: 'hidden' }}><View style={{ position: 'absolute', left: width / 2 - 1, top: 0, width: 2, height: 120, backgroundColor: '#1E5540' }} /><View style={{ position: 'absolute', left: width / 2 - 1 + offset, bottom: 12, width: 3, height: 70, backgroundColor: '#B7FF3C', transform: [{ rotate: `${curve / 3}deg` }] }} /></View><Text style={{ color: '#91A29A', fontSize: 12, marginTop: 8, textAlign: 'center' }}>Start {startDeg.toFixed(1)}° · curve {curvatureDeg.toFixed(1)}°</Text></View>;
}

