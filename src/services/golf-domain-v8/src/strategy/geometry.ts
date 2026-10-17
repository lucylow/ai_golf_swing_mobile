import { Vec2, SurfacePolygon } from './types';
export function distance(a: Vec2, b: Vec2): number { return Math.hypot(a.x - b.x, a.y - b.y); }
export function add(a: Vec2, b: Vec2): Vec2 { return { x: a.x + b.x, y: a.y + b.y }; }
export function sub(a: Vec2, b: Vec2): Vec2 { return { x: a.x - b.x, y: a.y - b.y }; }
export function scale(a: Vec2, k: number): Vec2 { return { x: a.x * k, y: a.y * k }; }
export function rotate(v: Vec2, deg: number): Vec2 { const r = deg * Math.PI / 180; return { x: v.x * Math.cos(r) - v.y * Math.sin(r), y: v.x * Math.sin(r) + v.y * Math.cos(r) }; }
export function pointInPolygon(p: Vec2, poly: Vec2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    const intersect = ((a.y > p.y) !== (b.y > p.y)) && p.x < ((b.x - a.x) * (p.y - a.y)) / Math.max(1e-9, b.y - a.y) + a.x;
    if (intersect) inside = !inside;
  }
  return inside;
}
export function polygonContains(p: Vec2, surface: SurfacePolygon): boolean { return pointInPolygon(p, surface.points); }
export function projectToRay(origin: Vec2, directionDeg: number, distanceYards: number): Vec2 { const rad = directionDeg * Math.PI / 180; return { x: origin.x + Math.cos(rad) * distanceYards, y: origin.y + Math.sin(rad) * distanceYards }; }
export function nearestPointOnSegment(p: Vec2, a: Vec2, b: Vec2): Vec2 { const ab = sub(b, a); const ap = sub(p, a); const t = Math.max(0, Math.min(1, (ap.x * ab.x + ap.y * ab.y) / Math.max(1e-9, ab.x * ab.x + ab.y * ab.y))); return add(a, scale(ab, t)); }
