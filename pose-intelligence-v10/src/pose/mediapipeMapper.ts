import { PoseFrame3D,PoseJoint,POSE33_NAMES } from './types';
export type NativeLandmark={x:number;y:number;z:number;visibility?:number;presence?:number;score?:number};
export type NativeResult={timestampMs:number;width:number;height:number;landmarks:NativeLandmark[];worldLandmarks?:NativeLandmark[];latencyMs?:number};
export function mapMediaPipe(result:NativeResult):PoseFrame3D{
 const n=Math.max(1,result.landmarks.length), world=result.worldLandmarks??result.landmarks;
 const joints:PoseJoint[]=result.landmarks.map((p,i)=>{
  const w=world[i]??p; const detection=p.score??1,presence=p.presence??1,visibility=p.visibility??1,tracking=Math.min(presence,visibility);
  const combined=Math.max(0,Math.min(1,0.35*detection+0.25*presence+0.2*visibility+0.2*tracking));
  return {id:i,name:POSE33_NAMES[i]??`joint_${i}`,position:{x:w.x,y:w.y,z:w.z},normalized:{x:p.x,y:p.y,z:p.z},confidence:{detection,presence,visibility,tracking,combined}};
 });
 return {timestampMs:result.timestampMs,frameIndex:0,width:result.width,height:result.height,fps:0,joints,source:'mediapipe',cameraView:'unknown',latencyMs:result.latencyMs??0};
}
