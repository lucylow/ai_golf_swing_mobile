import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
export function makeDemoPoseFrame(timestampMs:number,frameIndex:number):PoseFrame{
  const landmarks=Array.from({length:33},(_,id)=>({id:id as PoseLandmarkId,x:0.5+Math.sin((frameIndex/10)+(id*.13))*0.03,y:0.5+Math.cos((frameIndex/14)+(id*.08))*0.04,z:0,visibility:0.98,presence:0.98,confidence:0.98}));
  return {timestampMs,frameIndex,width:1920,height:1080,landmarks};
}
export function makeDemoSequence(count=90):PoseFrame[]{return Array.from({length:count},(_,i)=>makeDemoPoseFrame(i*16.7,i));}
