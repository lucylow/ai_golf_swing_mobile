import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';

export function PermissionGate({ permission, title, body, onRequest }: { permission: 'camera' | 'microphone' | 'photos'; title: string; body: string; onRequest: () => Promise<boolean> }) {
  const [busy, setBusy] = React.useState(false);
  return (
    <View style={{ flex: 1, padding: 28, justifyContent: 'center', backgroundColor: '#06120E' }}>
      <Text style={{ color: '#F7FFF6', fontSize: 28, fontWeight: '800', marginBottom: 12 }}>{title}</Text>
      <Text style={{ color: '#9EB3AA', lineHeight: 22, marginBottom: 24 }}>{body}</Text>
      <Pressable disabled={busy} onPress={async () => { setBusy(true); try { const granted = await onRequest(); if (!granted) await Linking.openSettings(); } finally { setBusy(false); } }} style={{ backgroundColor: '#B7FF4A', padding: 16, borderRadius: 16, alignItems: 'center' }}>
        <Text style={{ color: '#06120E', fontWeight: '900' }}>{busy ? 'CHECKING…' : `ALLOW ${permission.toUpperCase()}`}</Text>
      </Pressable>
    </View>
  );
}
