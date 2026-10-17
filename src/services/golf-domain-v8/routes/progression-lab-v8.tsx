import React from 'react';
import { ScrollView, Text, View } from 'react-native';
export const Screen = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <ScrollView style={{ flex: 1, backgroundColor: '#08110E' }} contentContainerStyle={{ padding: 24, gap: 14 }}>
    <Text style={{ color: '#B7FF3C', fontSize: 12, fontWeight: '800', letterSpacing: 2 }}>A.I. GOLF COACH • V8</Text>
    <Text style={{ color: '#F5F8F4', fontSize: 30, fontWeight: '800' }}>{title}</Text>
    {children}
  </ScrollView>
);
export const Card = ({ title, value, body }: { title: string; value?: string; body?: string }) => (
  <View style={{ backgroundColor: '#102019', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#1B4436', gap: 6 }}>
    <Text style={{ color: '#91A29A', fontSize: 11, fontWeight: '800', letterSpacing: 1 }}>{title}</Text>
    {value ? <Text style={{ color: '#B7FF3C', fontSize: 26, fontWeight: '800' }}>{value}</Text> : null}
    {body ? <Text style={{ color: '#E8EEE9', fontSize: 14, lineHeight: 20 }}>{body}</Text> : null}
  </View>
);

import { DEMO_HOLES_V8, DEMO_CLUBS_V8 } from '../src/fixtures/course';
import { DEMO_PROGRESSION_V8 } from '../src/fixtures/progression';
import { CALIBRATION_SAMPLES_V8 } from '../src/fixtures/calibrationSamples';
import { fitLaunchMonitorCalibration } from '../src/calibration/fitCalibration';
import { getCaddieRecommendation } from '../src/strategy/caddie';
import { coachForToday } from '../src/progression/coach';

export default function V8Screen() {
  const report = fitLaunchMonitorCalibration(CALIBRATION_SAMPLES_V8, 'Demo Launch Monitor', 'demo-v8');
  const caddie = getCaddieRecommendation(DEMO_HOLES_V8[0], DEMO_HOLES_V8[0].tee, DEMO_CLUBS_V8, { iterations: 500, seed: 73194, riskAversion: 0.55, targetPenaltyWeight: 1 });
  const drill = coachForToday(DEMO_PROGRESSION_V8);
  return (
    <Screen title="Adaptive Drill Progression">
      <Card title="WHAT THIS MODULE DOES" body="See mastery, readiness, regression logic, and the next personalized drill." />
      <Card title="CALIBRATION" value={report.pass ? 'READY' : 'REVIEW'} body={`Metrics: ${Object.keys(report.profile.coefficients).length} • samples: ${report.profile.sampleCount}`} />
      <Card title="A.I. CADDIE" value={caddie.primary.label} body={caddie.message} />
      <Card title="NEXT DRILL" value={drill.drill.title} body={drill.reason} />
    </Screen>
  );
}
