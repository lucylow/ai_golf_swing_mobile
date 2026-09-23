import { StyleSheet } from 'react-native';
import { V2 } from './theme';
export const page = StyleSheet.create({ root: { flex: 1, backgroundColor: V2.colors.bg }, content: { padding: V2.space[16], paddingBottom: 42 }, row: { flexDirection: 'row', alignItems: 'center' }, center: { alignItems: 'center', justifyContent: 'center' }, grow: { flex: 1 } });
