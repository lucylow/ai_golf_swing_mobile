import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { toAppError } from '../core/AppError';
import { releaseLogger } from '../core/logger';

export function AsyncActionButton({ title, busyTitle = 'Working…', disabled, onPress }: { title: string; busyTitle?: string; disabled?: boolean; onPress: () => Promise<void> | void }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Pressable
      disabled={disabled || busy}
      onPress={async () => {
        setBusy(true); setFailed(false);
        try { await onPress(); }
        catch (error) { setFailed(true); releaseLogger.error(toAppError(error), { action: title }); }
        finally { setBusy(false); }
      }}
      style={{ minHeight: 52, paddingHorizontal: 20, borderRadius: 16, backgroundColor: disabled ? '#23312B' : '#B7FF4A', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 }}
    >
      {busy ? <ActivityIndicator /> : null}
      <Text style={{ color: disabled ? '#6E8178' : '#06120E', fontWeight: '900' }}>{failed ? 'TRY AGAIN' : (busy ? busyTitle : title)}</Text>
    </Pressable>
  );
}
