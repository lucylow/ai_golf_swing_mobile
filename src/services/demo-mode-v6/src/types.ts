export type DemoTone = "positive" | "warning" | "danger" | "info" | "neutral";
export type DemoNetwork = "online" | "offline" | "degraded";
export type DemoAnalysis = "idle" | "capturing" | "processing" | "complete" | "failed";
export type DemoPlan = "free" | "pro" | "elite";
export type DemoPhase = "address" | "takeaway" | "top" | "transition" | "delivery" | "impact" | "release" | "finish";
export interface DemoUser { id:string; name:string; handicap:number; goal:string; plan:DemoPlan; streak:number; weeklyMinutes:number; typicalMiss:string; preferredClub:string; skill:string; }
export interface DemoSession { id:string; userId:string; date:string; title:string; club:string; focus:string; score:number; swings:number; quality:string; confidence:number; durationSec:number; course:string; note:string; tags:string[]; }
export interface DemoSwing { id:string; sessionId:string; index:number; score:number; carry:number; clubSpeed:number; ballSpeed:number; launch:number; spin:number; attack:number; clubPath:number; faceAngle:number; lowPoint:number; tempo:string; primaryPattern:string; coachCue:string; phaseScores:Record<DemoPhase,number>; }
export interface DemoPosePoint { name:string; x:number; y:number; z:number; confidence:number; visible:boolean; }
export interface DemoPoseFrame { frame:number; timestampMs:number; phase:DemoPhase; quality:number; points:DemoPosePoint[]; }
export interface DemoMetric { id:string; label:string; unit:string; value:number; display:string; score:number; delta:number; tone:DemoTone; cue:string; target:number; }
export interface DemoInsight { id:string; title:string; body:string; confidence:number; tone:DemoTone; evidence:string[]; action:string; metricIds:string[]; }
export interface DemoDrill { id:string; title:string; focus:string; minutes:number; difficulty:number; progress:number; completionRate:number; steps:string[]; equipment:string[]; tags:string[]; }
export interface DemoGoal { id:string; title:string; current:number; target:number; unit:string; progress:number; due:string; nextAction:string; tone:DemoTone; }
export interface DemoNotification { id:string; kind:string; title:string; body:string; timestamp:string; unread:boolean; route:string; }
export interface DemoTrend { id:string; label:string; values:number[]; target:number[]; labels:string[]; }
export interface DemoScenario { id:string; title:string; description:string; network:DemoNetwork; analysis:DemoAnalysis; durationMs:number; tags:string[]; }
export interface DemoStoreState { enabled:boolean; seed:number; activeUserId:string; network:DemoNetwork; analysis:DemoAnalysis; scenarioId:string; latencyMs:number; sessionCounter:number; lastError:string|null; }
export interface DemoStore { users:DemoUser[]; sessions:DemoSession[]; swings:DemoSwing[]; poses:DemoPoseFrame[]; metrics:DemoMetric[]; insights:DemoInsight[]; drills:DemoDrill[]; goals:DemoGoal[]; notifications:DemoNotification[]; trends:DemoTrend[]; scenarios:DemoScenario[]; state:DemoStoreState; }
export interface DemoAnalysisResult { session:DemoSession; swing:DemoSwing; metrics:DemoMetric[]; insight:DemoInsight; pose:DemoPoseFrame; processingMs:number; quality:number; }

export type DemoEventType =
  | "scenario:change"
  | "network:change"
  | "analysis:start"
  | "analysis:error"
  | "analysis:complete"
  | "demo:start";
export interface DemoEvent {
  type: DemoEventType;
  at: number;
  payload: Record<string, unknown>;
}
