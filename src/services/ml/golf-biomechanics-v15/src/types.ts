export type Side = 'left' | 'right';
export type Handedness = 'left' | 'right';
export type QualityLabel = 'excellent' | 'good' | 'degraded' | 'insufficient';
export type ConfidenceReason = 'visibility' | 'temporal' | 'anatomy' | 'camera' | 'fusion' | 'reference' | 'derived';
export interface Point3 { x:number; y:number; z:number; }
export interface Point2 { x:number; y:number; }
export interface Landmark3D extends Point3 { visibility:number; presence?:number; index:number; }
export interface HandLandmark extends Landmark3D { handedness:Handedness; }
export interface PoseFrame { timestampMs:number; landmarks:Landmark3D[]; hands?:HandLandmark[]; fps?:number; } 
export interface CameraModel { width:number; height:number; fx:number; fy:number; cx:number; cy:number; rollDeg:number; pitchDeg:number; yawDeg:number; distanceM?:number; }
export interface QualityScore { value:number; label:QualityLabel; reasons:string[]; confidence:number; }
export interface MetricEvidence { sources:string[]; confidence:number; quality:QualityLabel; reasons:string[]; phase?:string; }
export interface BioMetric { name:string; value:number; unit:string; evidence:MetricEvidence; reference?:{median:number; low:number; high:number}; }
export interface PhaseWindow { name:string; start:number; end:number; confidence:number; eventIndex?:number; }
export interface EventPoint { name:string; frameIndex:number; timestampMs:number; confidence:number; }
export interface Anomaly { phase:string; component:string; score:number; confidence:number; evidence:string[]; severity:'low'|'moderate'|'high'|'critical'; }
export interface CoachingAction { focus:string; feel:string; why:string; drill:string; reps:number; recheckSwings:number; confidence:number; }
export interface Reliability { overall:number; landmark:number; camera:number; anatomy:number; temporal:number; reasons:string[]; }
export interface V15Snapshot { version:string; metrics:BioMetric[]; phases:PhaseWindow[]; events:EventPoint[]; anomalies:Anomaly[]; coaching:CoachingAction|null; reliability:Reliability; warnings:string[]; }
export interface ReferenceProfile { id:string; label:string; metrics:Record<string,number[]>; preferredRanges:Record<string,[number,number]>; }
export interface GolfContext { handedness:Handedness; club:string; goal:string; targetLineDeg:number; stance:string; } 
