export type Handedness = 'left' | 'right';
export type Quality = 'excellent' | 'good' | 'degraded' | 'insufficient';
export type PhaseName = 'P1'|'P2'|'P3'|'P4'|'P5'|'P6'|'P7'|'P8'|'P9'|'P10';
export interface Point3 { x:number; y:number; z:number; }
export interface Landmark3D extends Point3 { index:number; visibility:number; presence?:number; }
export interface HandPoint extends Landmark3D { side:'left'|'right'; }
export interface PoseFrame { timestampMs:number; landmarks:Landmark3D[]; hands?:HandPoint[]; fps?:number; }
export interface CameraCalibration { width:number; height:number; fx:number; fy:number; cx:number; cy:number; rollDeg:number; pitchDeg:number; yawDeg:number; distanceM?:number; targetLineDeg?:number; }
export interface MetricEvidence { confidence:number; quality:Quality; sources:string[]; reasons:string[]; phase?:PhaseName; }
export interface BioMetric { name:string; value:number; unit:string; evidence:MetricEvidence; reference?:{median:number; low:number; high:number}; }
export interface EventPoint { name:string; frameIndex:number; timestampMs:number; confidence:number; }
export interface PhaseWindow { name:PhaseName; start:number; end:number; confidence:number; eventIndex?:number; }
export interface Anomaly { component:string; phase:string; score:number; severity:'low'|'moderate'|'high'|'critical'; confidence:number; evidence:string[]; }
export interface CoachingAction { focus:string; feel:string; why:string; drill:string; reps:number; recheckSwings:number; confidence:number; }
export interface Reliability { overall:number; landmark:number; camera:number; anatomy:number; temporal:number; phase:number; reasons:string[]; }
export interface V16Snapshot { version:string; metrics:BioMetric[]; events:EventPoint[]; phases:PhaseWindow[]; anomalies:Anomaly[]; coaching:CoachingAction|null; reliability:Reliability; warnings:string[]; diagnostics:Record<string,number|string|boolean>; }
export interface GolfContext { handedness:Handedness; club:string; goal:string; targetLineDeg:number; stance:'open'|'square'|'closed'; }
export interface ReferenceProfile { id:string; metrics:Record<string,number[]>; labels:Record<string,string>; }
export interface FeatureSeries { name:string; values:number[]; timestampsMs:number[]; confidence:number[]; }
export interface PoseSequence { frames:PoseFrame[]; handedness:Handedness; fps:number; }
export interface CameraFramePoint { x:number; y:number; z:number; }
export interface ForceProxy { lateral:number; vertical:number; rotational:number; confidence:number; }
export interface CoordinationMatrix { names:string[]; values:number[][]; sampleCount:number; }
export interface TrainingExample { id:string; subjectId:string; domain:'synthetic'|'real'; sequence:PoseFrame[]; labels:Record<string,number|string|boolean>; }
