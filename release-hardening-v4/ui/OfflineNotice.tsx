import React from 'react';
import { View, Text } from 'react-native';

export function OfflineNotice({ visible, label = 'Offline mode' }: { visible: boolean; label?: string }) {
  if (!visible) return null;
  return (
    <View style={{ marginHorizontal: 16, marginTop: 10, borderRadius: 12, paddingVertical: 9, paddingHorizontal: 12, backgroundColor: '#252219', borderWidth: 1, borderColor: '#544C35' }}>
      <Text style={{ color: '#FFD97A', fontWeight: '800', fontSize: 12 }}>{label} · Some actions may wait until you reconnect.</Text>
    </View>
  );
}
