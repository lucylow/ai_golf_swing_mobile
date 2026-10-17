import { Vec3, v3 } from './vector';

export type Mat3 = [Vec3, Vec3, Vec3];

export const identity3 = (): Mat3 => [v3(1,0,0), v3(0,1,0), v3(0,0,1)];

export function multiplyMat3Vec3(m: Mat3, v: Vec3): Vec3 {
  return {
    x: (m[0].x * v.x) + (m[1].x * v.y) + (m[2].x * v.z),
    y: (m[0].y * v.x) + (m[1].y * v.y) + (m[2].y * v.z),
    z: (m[0].z * v.x) + (m[1].z * v.y) + (m[2].z * v.z),
  };
}

export function rotationZ(degrees: number): Mat3 {
  const r = degrees * Math.PI / 180;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [v3(c,s,0), v3(-s,c,0), v3(0,0,1)];
}
