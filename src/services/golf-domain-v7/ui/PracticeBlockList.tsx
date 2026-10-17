import React from 'react';
import { Text, View } from 'react-native';
import type { PracticeBlock } from '../src/types';
export function PracticeBlockList({ blocks }: { blocks: PracticeBlock[] }) {
  return <View>{blocks.slice(0,5).map((block) => <View key={block.id} style={{ backgroundColor:'#101D19', borderRadius:16, padding:14, marginBottom:10 }}><View style={{ flexDirection:'row', justifyContent:'space-between' }}><Text style={{ color:'#F5F8F4', fontWeight:'800', flex:1 }}>{block.title}</Text><Text style={{ color:'#B7FF3C', fontWeight:'800' }}>{block.minutes}m</Text></View><Text style={{ color:'#91A29A', fontSize:13, marginTop:6 }}>{block.target}</Text><Text style={{ color:'#91A29A', fontSize:12, marginTop:4 }}>Cue: {block.cue}</Text></View>)}</View>;
}

