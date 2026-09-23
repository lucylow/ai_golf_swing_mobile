import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { V2, tone, toneBg, type V2Tone } from '../../infra/theme';

/** Compare card */
export function CompareCard({
  title = 'CompareCard',
  value = '86',
  body = 'Keep the next cue small and repeatable.',
  onPress,
  toneValue = 'positive' as V2Tone,
  compact = false,
}: {
  title?: string;
  value?: string;
  body?: string;
  onPress?: () => void;
  toneValue?: V2Tone;
  compact?: boolean;
}) {
  const content = (
    <View style={[styles.card, compact && styles.compact]}>
      <View style={styles.topRow}>
        <View style={styles.headingGroup}>
          <Text style={styles.eyebrow}>{title.toUpperCase()}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
        <View style={[styles.valueBox, { backgroundColor: toneBg(toneValue) }]}>
          <Text style={[styles.value, { color: tone(toneValue) }]}>{value}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.bottomRow}>
        <View style={styles.signal}>
          <View style={[styles.dot, { backgroundColor: tone(toneValue) }]} />
          <Text style={styles.caption}>AI COACH SIGNAL</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${title}`}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: V2.colors.border,
    backgroundColor: V2.colors.surface,
    padding: 16,
    minHeight: 118,
  },
  compact: {
    minHeight: 90,
    padding: 13,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headingGroup: {
    flex: 1,
    gap: 7,
  },
  eyebrow: {
    color: V2.colors.dim,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  body: {
    color: V2.colors.text,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '800',
  },
  valueBox: {
    minWidth: 55,
    height: 55,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
  },
  divider: {
    height: 1,
    backgroundColor: V2.colors.border,
    marginVertical: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  caption: {
    color: V2.colors.dim,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.7,
  },
  arrow: {
    color: V2.colors.dim,
    fontSize: 18,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.992 }],
  },
});
