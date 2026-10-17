import { PoseFrame, Landmark } from './types';
export function makeDemoFrames(count=90):PoseFrame[]{return Array.from({length:count},(_,i)=>{const landmarks:Landmark[]=Array.from({length:33},(_,id)=>({id,x:0.5+Math.sin(i*0.09+id*0.08)*0.08,y:0.5+Math.cos(i*0.07+id*0.05)*0.10,z:Math.sin(i*0.06+id*0.03)*0.03,confidence:0.92,visibility:0.96,presence:0.95}));return{timestampMs:i*33,frameIndex:i,width:1280,height:720,landmarks,detectionConfidence:0.93,trackingConfidence:0.91};});}

