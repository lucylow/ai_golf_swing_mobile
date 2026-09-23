import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { ReleaseHealthPanel } from '../ui/ReleaseHealthPanel';
import { runReleaseChecks } from '../qa/releaseChecks';

export default function ReleaseReadinessScreen() {
  const [items, setItems] = React.useState<any[]>([]);
  React.useEffect(() => { runReleaseChecks().then(setItems).catch(() => setItems([{ key: 'runner', label: 'Release check runner', status: 'fail', detail: 'Could not execute checks.' }])); }, []);
  if (!items.length) return <View style={{ flex: 1, backgroundColor: '#06120E', alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /><Text style={{ color: '#91A69B', marginTop: 12 }}>Running release checks…</Text></View>;
  return <SafeAreaView style={{ flex: 1, backgroundColor: '#06120E' }}><Text style={{ color: '#F7FFF6', fontSize: 28, fontWeight: '900', padding: 20 }}>Release readiness</Text><ReleaseHealthPanel items={items} /></SafeAreaView>;
}
