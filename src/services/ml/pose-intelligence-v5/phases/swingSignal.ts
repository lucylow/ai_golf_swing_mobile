import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { point3 } from '../geometry/joints';
import { sequenceSpeed } from '../features/kinematics';
import { mean } from '../math/scalar';

export type SwingSignal = {
  timestamps:number[];
  handSpeed:number[];
  hipTurn:number[];
  shoulderTurn:number[];
  wristHeight:number[];
  normalizedEnergy:number[];
};

export function buildSwingSignal(frames:PoseFrame[]):SwingSignal {
  const handSpeed=sequenceSpeed(frames,PoseLandmarkId.LeftWrist).map((v,i)=>Math.max(v,sequenceSpeed(frames,PoseLandmarkId.RightWrist)[i]??0));
  const hipTurn=frames.map(f=>{
    const l=point3(f,PoseLandmarkId.LeftHip);const r=point3(f,PoseLandmarkId.RightHip); return l&&r?Math.atan2(r.z-l.z,r.x-l.x)*180/Math.PI:0;
  });
  const shoulderTurn=frames.map(f=>{
    const l=point3(f,PoseLandmarkId.LeftShoulder);const r=point3(f,PoseLandmarkId.RightShoulder); return l&&r?Math.atan2(r.z-l.z,r.x-l.x)*180/Math.PI:0;
  });
  const wristHeight=frames.map(f=>{const l=point3(f,PoseLandmarkId.LeftWrist);const r=point3(f,PoseLandmarkId.RightWrist);return l&&r?(l.y+r.y)/2:0;});
  const max= Math.max(1e-6,...handSpeed);
  const energy=handSpeed.map(v=>v/max);
  return {timestamps:frames.map(f=>f.timestampMs),handSpeed,hipTurn,shoulderTurn,wristHeight,normalizedEnergy:energy};
}
