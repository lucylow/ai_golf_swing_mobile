import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
export type OverlayPoint={id:PoseLandmarkId;x:number;y:number;opacity:number};
export type OverlayLine={a:PoseLandmarkId;b:PoseLandmarkId;opacity:number};
export const DEFAULT_EDGES:[PoseLandmarkId,PoseLandmarkId][]=[
 [0,11],[0,12],[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[24,26],[26,28],
];
export function makeOverlayModel(frame:PoseFrame,threshold=.35):{points:OverlayPoint[];lines:OverlayLine[]} {
 const points=frame.landmarks.map(l=>({id:l.id,x:l.x,y:l.y,opacity:l.confidence>=threshold?l.confidence:0}));
 const lines=DEFAULT_EDGES.map(([a,b])=>({a,b,opacity:Math.min(points[a]?.opacity??0,points[b]?.opacity??0)}));
 return {points,lines};
}
