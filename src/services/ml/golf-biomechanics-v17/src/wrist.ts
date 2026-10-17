import {PoseFrame,Handedness} from './types';
import {LM} from './landmarks';
import {angleDeg} from './math';
export function leadWristAngle(frame:PoseFrame,h:Handedness){const shoulder=h==='right'?LM.rightShoulder:LM.leftShoulder;const elbow=h==='right'?LM.rightElbow:LM.leftElbow;const wrist=h==='right'?LM.rightWrist:LM.leftWrist;const s=frame.landmarks[shoulder],e=frame.landmarks[elbow],w=frame.landmarks[wrist];return angleDeg([s.x-e.x,s.y-e.y,s.z-e.z],[w.x-e.x,w.y-e.y,w.z-e.z]);}
export function trailWristAngle(frame:PoseFrame,h:Handedness){const shoulder=h==='right'?LM.leftShoulder:LM.rightShoulder;const elbow=h==='right'?LM.leftElbow:LM.rightElbow;const wrist=h==='right'?LM.leftWrist:LM.rightWrist;const s=frame.landmarks[shoulder],e=frame.landmarks[elbow],w=frame.landmarks[wrist];return angleDeg([s.x-e.x,s.y-e.y,s.z-e.z],[w.x-e.x,w.y-e.y,w.z-e.z]);}
export function leadWristFlexionProxy(frames:PoseFrame[],h:Handedness){if(!frames.length)return 0;const values=frames.map(f=>180-leadWristAngle(f,h));return values[Math.floor(values.length*.5)]??0;}
