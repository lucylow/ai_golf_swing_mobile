import { PoseFrame, PoseLandmarkId } from '../types/landmarks';
import { Vec3, sub3, normalize3, cross3, dot3, v3, scale3, add3 } from '../math/vector';

export type CanonicalFrame = {
  origin: Vec3;
  right: Vec3;
  up: Vec3;
  forward: Vec3;
  scale: number;
};

function medianScale(values: number[]): number {
  const sorted = values.filter(v => Number.isFinite(v) && v > 1e-6).sort((a,b)=>a-b);
  if (!sorted.length) return 1;
  return sorted[Math.floor(sorted.length/2)];
}

export function makeCanonicalFrame(frame: PoseFrame): CanonicalFrame {
  const hips = worldPoint(frame, PoseLandmarkId.LeftHip, PoseLandmarkId.RightHip);
  const shoulders = worldPoint(frame, PoseLandmarkId.LeftShoulder, PoseLandmarkId.RightShoulder);
  const leftKnee = getWorld(frame, PoseLandmarkId.LeftKnee);
  const rightKnee = getWorld(frame, PoseLandmarkId.RightKnee);
  const origin = hips ? scale3(add3(hips.a, hips.b), 0.5) : v3();
  const right = shoulders ? normalize3(sub3(shoulders.a, shoulders.b)) : v3(1,0,0);
  const shoulderMid = shoulders ? scale3(add3(shoulders.a,shoulders.b),0.5) : origin;
  const upCandidate = normalize3(sub3(shoulderMid, origin));
  const forward = normalize3(cross3(right, upCandidate));
  const up = normalize3(cross3(forward, right));
  const lengths = [
    shoulders ? distanceSafe(shoulders.a, shoulders.b) : 0,
    hips ? distanceSafe(hips.a, hips.b) : 0,
    leftKnee && frame.worldLandmarks?.[PoseLandmarkId.LeftAnkle] ? distanceSafe(leftKnee, getWorld(frame, PoseLandmarkId.LeftAnkle) as Vec3) : 0,
    rightKnee && frame.worldLandmarks?.[PoseLandmarkId.RightAnkle] ? distanceSafe(rightKnee, getWorld(frame, PoseLandmarkId.RightAnkle) as Vec3) : 0,
  ];
  return { origin, right, up, forward, scale: Math.max(0.05, medianScale(lengths)) };
}

function getWorld(frame: PoseFrame, id: PoseLandmarkId): Vec3 | null {
  const lm = frame.worldLandmarks?.[id] ?? frame.landmarks[id];
  return lm ? v3(lm.x,lm.y,lm.z) : null;
}

function worldPoint(frame: PoseFrame, a: PoseLandmarkId, b: PoseLandmarkId): {a:Vec3;b:Vec3} | null {
  const p1 = getWorld(frame,a); const p2 = getWorld(frame,b);
  return p1 && p2 ? {a:p1,b:p2} : null;
}

function distanceSafe(a:Vec3,b:Vec3):number { return Math.sqrt(((a.x-b.x)**2)+((a.y-b.y)**2)+((a.z-b.z)**2)); }

export function toCanonical(point: Vec3, basis: CanonicalFrame): Vec3 {
  const delta = sub3(point, basis.origin);
  return v3(
    dot3(delta,basis.right)/basis.scale,
    dot3(delta,basis.up)/basis.scale,
    dot3(delta,basis.forward)/basis.scale,
  );
}
