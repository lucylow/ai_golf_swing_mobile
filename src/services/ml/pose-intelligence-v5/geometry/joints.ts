import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { Vec2, Vec3, distance2, distance3, sub2, sub3, angleBetween3, v2, v3 } from '../math/vector';

export function point2(frame: PoseFrame, id: PoseLandmarkId): Vec2 | null {
  const lm = frame.landmarks[id];
  return lm ? {x: lm.x, y: lm.y} : null;
}

export function point3(frame: PoseFrame, id: PoseLandmarkId, world = true): Vec3 | null {
  const list = world && frame.worldLandmarks ? frame.worldLandmarks : frame.landmarks;
  const lm = list?.[id];
  return lm ? {x: lm.x, y: lm.y, z: lm.z} : null;
}

export function midpoint2(a: Vec2 | null, b: Vec2 | null): Vec2 | null {
  if (!a || !b) return null;
  return v2((a.x+b.x)/2, (a.y+b.y)/2);
}

export function midpoint3(a: Vec3 | null, b: Vec3 | null): Vec3 | null {
  if (!a || !b) return null;
  return v3((a.x+b.x)/2, (a.y+b.y)/2, (a.z+b.z)/2);
}

export function jointAngleDegrees(a: Vec3, b: Vec3, c: Vec3): number {
  return angleBetween3(sub3(a,b), sub3(c,b));
}

export function segmentLength(frame: PoseFrame, a: PoseLandmarkId, b: PoseLandmarkId, world = true): number {
  const p1 = point3(frame,a,world); const p2 = point3(frame,b,world);
  return p1 && p2 ? distance3(p1,p2) : 0;
}

export function segmentLength2D(frame: PoseFrame, a: PoseLandmarkId, b: PoseLandmarkId): number {
  const p1 = point2(frame,a); const p2 = point2(frame,b);
  return p1 && p2 ? distance2(p1,p2) : 0;
}

export function centerOf(frame: PoseFrame, ids: PoseLandmarkId[], world = true): Vec3 | null {
  const points = ids.map((id) => point3(frame,id,world)).filter(Boolean) as Vec3[];
  if (!points.length) return null;
  return v3(
    points.reduce((s,p)=>s+p.x,0)/points.length,
    points.reduce((s,p)=>s+p.y,0)/points.length,
    points.reduce((s,p)=>s+p.z,0)/points.length,
  );
}
