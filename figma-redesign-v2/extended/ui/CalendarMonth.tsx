import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { V2 } from '../../infra/theme';

export function CalendarMonth() {
  const days = Array.from({ length: 35 }, (_, index) => index - 2);
  const trained = new Set([3, 5, 8, 11, 15, 18, 22, 24]);
  return (
    <View style={styles.grid}>
      {days.map(day => {
        const valid = day > 0 && day <= 30;
        const active = trained.has(day);
        return (
          <View key={day} style={[styles.day, active && styles.active]}>
            <Text style={[styles.number, active && styles.numberActive]}>{valid ? day : ''}</Text>
            {active ? <View style={styles.dot} /> : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  day: { width: '12.1%', height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: V2.colors.surface2 },
  active: { backgroundColor: V2.colors.limeGlass, borderWidth: 1, borderColor: 'rgba(182,255,24,.18)' },
  number: { color: V2.colors.muted, fontSize: 9, fontWeight: '800' },
  numberActive: { color: V2.colors.white },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: V2.colors.lime, marginTop: 3 },
});
