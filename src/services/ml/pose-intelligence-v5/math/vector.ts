import { safeDivide } from './scalar';

export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };

export const v2 = (x = 0, y = 0): Vec2 => ({ x, y });
export const v3 = (x = 0, y = 0, z = 0): Vec3 => ({ x, y, z });

export function add2(a: Vec2, b: Vec2): Vec2 { return { x: a.x + b.x, y: a.y + b.y }; }
export function sub2(a: Vec2, b: Vec2): Vec2 { return { x: a.x - b.x, y: a.y - b.y }; }
export function scale2(a: Vec2, s: number): Vec2 { return { x: a.x * s, y: a.y * s }; }
export function magnitude2(a: Vec2): number { return Math.hypot(a.x, a.y); }
export function normalize2(a: Vec2): Vec2 {
  const m = magnitude2(a);
  return m > 1e-9 ? scale2(a, 1 / m) : v2();
}
export function dot2(a: Vec2, b: Vec2): number { return (a.x * b.x) + (a.y * b.y); }
export function distance2(a: Vec2, b: Vec2): number { return magnitude2(sub2(a, b)); }

export function add3(a: Vec3, b: Vec3): Vec3 { return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }; }
export function sub3(a: Vec3, b: Vec3): Vec3 { return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }; }
export function scale3(a: Vec3, s: number): Vec3 { return { x: a.x * s, y: a.y * s, z: a.z * s }; }
export function magnitude3(a: Vec3): number { return Math.sqrt((a.x ** 2) + (a.y ** 2) + (a.z ** 2)); }
export function normalize3(a: Vec3): Vec3 {
  const m = magnitude3(a);
  return m > 1e-9 ? scale3(a, 1 / m) : v3();
}
export function dot3(a: Vec3, b: Vec3): number { return (a.x * b.x) + (a.y * b.y) + (a.z * b.z); }
export function cross3(a: Vec3, b: Vec3): Vec3 {
  return { x: (a.y * b.z) - (a.z * b.y), y: (a.z * b.x) - (a.x * b.z), z: (a.x * b.y) - (a.y * b.x) };
}
export function distance3(a: Vec3, b: Vec3): number { return magnitude3(sub3(a, b)); }
export function projectOnto(a: Vec3, basis: Vec3): Vec3 {
  const unit = normalize3(basis);
  return scale3(unit, dot3(a, unit));
}
export function rejectFrom(a: Vec3, basis: Vec3): Vec3 { return sub3(a, projectOnto(a, basis)); }
export function safeNormalize3(a: Vec3, fallback: Vec3 = v3(1, 0, 0)): Vec3 {
  const n = normalize3(a);
  return magnitude3(n) < 1e-6 ? fallback : n;
}
export function angleBetween3(a: Vec3, b: Vec3): number {
  const d = safeDivide(dot3(normalize3(a), normalize3(b)), 1, 0);
  return Math.acos(Math.max(-1, Math.min(1, d))) * (180 / Math.PI);
}
