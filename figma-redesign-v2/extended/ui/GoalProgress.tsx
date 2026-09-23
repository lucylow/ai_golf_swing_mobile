import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../../infra/theme';

export function GoalProgress({ current = 76, target = 80, label = 'AVG SCORE' }: { current?: number; target?: number; label?: string }) {
  const percent = Math.min(100, Math.max(0, (current / Math.max(target, 1)) * 100));
  return (
    <View style={styles.wrap}>
      <View style={styles.labels}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{current} → {target}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.caption}>Keep the trend moving before chasing the target.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  labels: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: V2.colors.dim, fontSize: 7, fontWeight: '900', letterSpacing: .8 },
  value: { color: V2.colors.white, fontSize: 9, fontWeight: '900' },
  track: { height: 7, borderRadius: 8, overflow: 'hidden', backgroundColor: V2.colors.surface3 },
  fill: { height: '100%', borderRadius: 8, backgroundColor: V2.colors.lime },
  caption: { color: V2.colors.dim, fontSize: 8, lineHeight: 12 },
});
