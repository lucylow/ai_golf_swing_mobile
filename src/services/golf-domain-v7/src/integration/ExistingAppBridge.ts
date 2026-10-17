import { PoseFrame, ShotInput, GolfSession } from '../types';
import { GolfDomainV7Bridge } from './V7Bridge';
export type ExistingAnalysisPayload = { golferId: string; sessionId: string; clubId: string; shots: ShotInput[]; insights?: GolfSession['insights'] };
export function makeGolfSession(payload: ExistingAnalysisPayload): GolfSession {
  return { id: payload.sessionId, golferId: payload.golferId, startedAt: new Date().toISOString(), clubId: payload.clubId, shots: payload.shots, insights: payload.insights ?? [], practiceBlocks: [] };
}
export type PoseAugmentation = { frameCount: number; averageFrameQuality: number; recommendation: string };
export function augmentExistingPoseFrames(frames: PoseFrame[]): PoseAugmentation {
  const quality = frames.length ? frames.reduce((sum, frame) => sum + frame.frameQuality, 0) / frames.length : 0;
  return { frameCount: frames.length, averageFrameQuality: quality, recommendation: quality > 0.75 ? 'Run golf-specific feature extraction.' : 'Request a clearer swing recording.' };
}
export const golfDomainV7Bridge = new GolfDomainV7Bridge();

