import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { Vec3, cross3, normalize3, sub3, dot3 } from '../math/vector';
import { point3 } from './joints';

export type Plane = { origin: Vec3; normal: Vec3; confidence: number };

export function fitSwingPlane(points: Vec3[]): Plane | null {
  if (points.length < 3) return null;
  const a = points[0];
  let bestNormal: Vec3 | null = null;
  let bestMagnitude = 0;
  for (let i=1;i<points.length-1;i+=1) {
    const b = sub3(points[i],a);
    const c = sub3(points[i+1],a);
    const n = cross3(b,c);
    const mag = Math.sqrt((n.x*n.x)+(n.y*n.y)+(n.z*n.z));
    if (mag > bestMagnitude) { bestMagnitude = mag; bestNormal = normalize3(n); }
  }
  if (!bestNormal) return null;
  const residuals = points.map(p => Math.abs(dot3(sub3(p,a), bestNormal as Vec3)));
  const meanResidual = residuals.reduce((s,v)=>s+v,0)/residuals.length;
  const confidence = Math.max(0, Math.min(1, 1/(1+meanResidual*5)));
  return { origin:a, normal:bestNormal, confidence };
}

export function estimateHandClubPlane(frames: PoseFrame[]): Plane | null {
  const handPoints: Vec3[] = [];
  for (const frame of frames) {
    const l = point3(frame,PoseLandmarkId.LeftWrist); const r = point3(frame,PoseLandmarkId.RightWrist);
    if (!l || !r) continue;
    handPoints.push({x:(l.x+r.x)/2,y:(l.y+r.y)/2,z:(l.z+r.z)/2});
  }
  return fitSwingPlane(handPoints);
}
