export type PerformanceBudget={maxP95LatencyMs:number;maxFrameDropRatio:number;minTrackingContinuity:number;maxMemoryMb:number};
export const defaultPerformanceBudget:PerformanceBudget={maxP95LatencyMs:120,maxFrameDropRatio:0.15,minTrackingContinuity:0.8,maxMemoryMb:180};
export function budgetPass(stats:{p95LatencyMs:number;dropRatio:number;continuity:number;memoryMb:number},b=defaultPerformanceBudget){return stats.p95LatencyMs<=b.maxP95LatencyMs&&stats.dropRatio<=b.maxFrameDropRatio&&stats.continuity>=b.minTrackingContinuity&&stats.memoryMb<=b.maxMemoryMb;}

