import { PoseFrame } from '../types';
export type CenterOfMassProxy = { x: number; y: number; z: number; shiftPct: number };
export function estimateCenterOfMass(frames: PoseFrame[]): CenterOfMassProxy[] {
  return frames.map((frame, index) => {
    const hips = frame.joints.filter((joint) => joint.name.includes('Hip'));
    const x = hips.length ? hips.reduce((s, j) => s + j.position.x, 0) / hips.length : 0;
    const y = hips.length ? hips.reduce((s, j) => s + j.position.y, 0) / hips.length : 0;
    const z = hips.length ? hips.reduce((s, j) => s + j.position.z, 0) / hips.length : 0;
    const previous = index > 0 ? frames[index - 1].joints.filter((joint) => joint.name.includes('Hip')) : [];
    const prevX = previous.length ? previous.reduce((s, j) => s + j.position.x, 0) / previous.length : x;
    return { x, y, z, shiftPct: Math.abs(x - prevX) * 100 };
  });
}

