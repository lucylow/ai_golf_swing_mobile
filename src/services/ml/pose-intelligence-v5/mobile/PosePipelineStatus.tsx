import React from 'react';
import { Text, View } from 'react-native';
import { PoseControllerState } from '../integration/poseController';
const label:Record<PoseControllerState,string>={idle:'Ready',initializing:'Loading pose model…',tracking:'Tracking',paused:'Paused',error:'Pose unavailable',disposed:'Offline'};
export function PosePipelineStatus({state}:{state:PoseControllerState}){
 return <View style={{flexDirection:'row',alignItems:'center',gap:8}}><View style={{width:8,height:8,borderRadius:8,backgroundColor:state==='tracking'?'#B7FF3C':'#91A29A'}}/><Text style={{color:'#F5F8F4'}}>{label[state]}</Text></View>;
}
