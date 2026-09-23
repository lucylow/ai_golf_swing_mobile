import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { getUserErrorMessage } from '../core/AppError';

export function InlineError({ error, onRetry, compact = false }: { error?: unknown; onRetry?: () => void; compact?: boolean }) {
  if (!error) return null;
  return (
    <View style={{ borderRadius: 16, padding: compact ? 12 : 16, backgroundColor: '#211A1B', borderWidth: 1, borderColor: '#6B3A3D', gap: 8 }}>
      <Text style={{ color: '#FF9A9A', fontWeight: '800', fontSize: 13 }}>Couldn’t complete that</Text>
      <Text style={{ color: '#E4C8C8', lineHeight: 20, fontSize: 13 }}>{getUserErrorMessage(error)}</Text>
      {onRetry ? <Pressable onPress={onRetry}><Text style={{ color: '#B7FF4A', fontWeight: '800' }}>Try again</Text></Pressable> : null}
    </View>
  );
}
