import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { V2 } from '../../figma-redesign-v2/theme';

type VisualState = 'populated' | 'loading' | 'empty';
type MockListItem = { id: string; title: string; meta: string; value?: string };

export function MockList({ items, onPress, emptyTitle = 'No fixtures match this view', emptyBody = 'Use the populated state to review dense list layouts, or return to the data lab to inspect another fixture family.' }: { items: ReadonlyArray<MockListItem>; onPress?: (id: string) => void; emptyTitle?: string; emptyBody?: string }) {
  const [state, setState] = useState<VisualState>('populated');
  return <View>
    <View accessibilityRole="tablist" style={styles.stateControls}>
      <StateButton label="POPULATED" active={state === 'populated'} onPress={() => setState('populated')} />
      <StateButton label="LOADING" active={state === 'loading'} onPress={() => setState('loading')} />
      <StateButton label="EMPTY" active={state === 'empty'} onPress={() => setState('empty')} />
    </View>
    {state === 'loading' ? <LoadingRows /> : state === 'empty' ? <EmptyState title={emptyTitle} body={emptyBody} onPress={() => setState('populated')} /> : <View style={styles.wrap}>{items.map((item) => <Pressable accessibilityRole="button" accessibilityLabel={`Open ${item.title}`} key={item.id} onPress={() => onPress?.(item.id)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}><View style={styles.copy}><Text style={styles.title}>{item.title}</Text><Text style={styles.meta}>{item.meta}</Text></View>{item.value ? <Text style={styles.value}>{item.value}</Text> : null}<Text style={styles.chev}>›</Text></Pressable>)}</View>}
  </View>;
}

function StateButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={onPress} style={[styles.stateButton, active && styles.stateButtonActive]}><Text style={[styles.stateText, active && styles.stateTextActive]}>{label}</Text></Pressable>;
}

function LoadingRows() {
  return <View style={styles.wrap}>{Array.from({ length: 5 }, (_, index) => <View key={index} accessibilityLabel="Loading mock data" style={styles.loadingRow}><View style={styles.loadingCopy}><View style={[styles.shimmer, styles.shimmerTitle]} /><View style={[styles.shimmer, styles.shimmerMeta]} /></View><View style={[styles.shimmer, styles.shimmerValue]} /></View>)}</View>;
}

function EmptyState({ title, body, onPress }: { title: string; body: string; onPress: () => void }) {
  return <View style={styles.empty}><Text style={styles.emptyEyebrow}>EMPTY STATE</Text><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{body}</Text><Pressable accessibilityRole="button" onPress={onPress} style={styles.emptyAction}><Text style={styles.emptyActionText}>RESTORE FIXTURES</Text></Pressable></View>;
}

const styles = StyleSheet.create({
  stateControls: { flexDirection: 'row', gap: 6, marginBottom: 9 },
  stateButton: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 6, backgroundColor: V2.colors.surface, borderWidth: 1, borderColor: V2.colors.border },
  stateButtonActive: { backgroundColor: V2.colors.limeGlass, borderColor: 'rgba(182,255,24,0.28)' },
  stateText: { color: V2.colors.dim, fontSize: 7, fontWeight: '900', letterSpacing: .65 },
  stateTextActive: { color: V2.colors.lime },
  wrap: { borderWidth: 1, borderColor: V2.colors.border, borderRadius: 18, overflow: 'hidden', backgroundColor: V2.colors.surface },
  row: { minHeight: 72, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: V2.colors.borderSoft },
  copy: { flex: 1 },
  title: { fontSize: 13, color: V2.colors.white, fontWeight: '800' },
  meta: { fontSize: 9, color: V2.colors.muted, marginTop: 4 },
  value: { fontSize: 12, color: V2.colors.lime, fontWeight: '900' },
  chev: { fontSize: 25, color: V2.colors.dim },
  pressed: { opacity: .78 },
  loadingRow: { minHeight: 72, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: V2.colors.borderSoft },
  loadingCopy: { flex: 1, gap: 8 },
  shimmer: { backgroundColor: V2.colors.surface3, borderRadius: 99 },
  shimmerTitle: { width: '58%', height: 11 },
  shimmerMeta: { width: '81%', height: 8 },
  shimmerValue: { width: 34, height: 15 },
  empty: { padding: 22, borderRadius: 18, borderWidth: 1, borderStyle: 'dashed', borderColor: V2.colors.border, alignItems: 'center', backgroundColor: V2.colors.surface },
  emptyEyebrow: { color: V2.colors.lime, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  emptyTitle: { color: V2.colors.white, fontSize: 15, fontWeight: '900', textAlign: 'center', marginTop: 7 },
  emptyBody: { color: V2.colors.muted, fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 5 },
  emptyAction: { marginTop: 13, paddingHorizontal: 13, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(182,255,24,0.25)', backgroundColor: V2.colors.limeGlass },
  emptyActionText: { color: V2.colors.lime, fontSize: 8, fontWeight: '900', letterSpacing: .6 },
});
