import React from 'react';
import { Text, View } from 'react-native';
import { AnalysisResult } from '../types/model';
export function PoseDebugPanel({analysis}:{analysis:AnalysisResult}){
 return <View style={{padding:16,borderRadius:16,backgroundColor:'#101D19'}}>
  <Text style={{color:'#B7FF3C',fontWeight:'700'}}>POSE ENGINE</Text>
  <Text style={{color:'#F5F8F4',marginTop:8}}>Frames: {analysis.frames.length}</Text>
  <Text style={{color:'#F5F8F4'}}>Quality: {(analysis.quality.score*100).toFixed(0)}%</Text>
  <Text style={{color:'#91A29A'}}>Phases: {analysis.phases.length} · Patterns: {analysis.patterns.length}</Text>
 </View>;
}
