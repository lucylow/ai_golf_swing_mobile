import { PoseFrame } from './types';
import { LM } from './landmarks';
import { argMax } from './math';
import { velocity } from './temporal';

export interface SegmentVelocitySeries {
  pelvis: number[];
  thorax: number[];
  arms: number[];
  club: number[];
  times: number[];
}

export function orientationSeries(frames: PoseFrame[], a: number, b: number): number[] {
  return frames.map(frame => {
    const p = frame.landmarks[a];
    const q = frame.landmarks[b];
    return Math.atan2(p.z - q.z, p.x - q.x) * 180 / Math.PI;
  });
}

export function sequenceSeries(frames: PoseFrame[]): SegmentVelocitySeries {
  const times = frames.map(frame => frame.timestampMs);
  const pelvisAngle = orientationSeries(frames, LM.leftHip, LM.rightHip);
  const thoraxAngle = orientationSeries(frames, LM.leftShoulder, LM.rightShoulder);
  const handSeparation = frames.map(frame => {
    const left = frame.landmarks[LM.leftWrist];
    const right = frame.landmarks[LM.rightWrist];
    return Math.hypot(left.x - right.x, left.z - right.z);
  });
  const clubProxy = frames.map(frame => {
    const left = frame.landmarks[LM.leftWrist];
    return left.x + left.z;
  });
  return {
    pelvis: velocity(pelvisAngle, times).map(value => Math.abs(value)),
    thorax: velocity(thoraxAngle, times).map(value => Math.abs(value)),
    arms: velocity(handSeparation, times).map(value => Math.abs(value)),
    club: velocity(clubProxy, times).map(value => Math.abs(value)),
    times,
  };
}

export function peakOrder(series: SegmentVelocitySeries) {
  const pelvisIndex = argMax(series.pelvis);
  const thoraxIndex = argMax(series.thorax);
  const armsIndex = argMax(series.arms);
  const clubIndex = argMax(series.club);
  return {
    pelvisIndex,
    thoraxIndex,
    armsIndex,
    clubIndex,
    ordered: pelvisIndex <= thoraxIndex && thoraxIndex <= armsIndex && armsIndex <= clubIndex,
  };
}

export function sequenceEfficiency(series: SegmentVelocitySeries): number {
  const peaks = peakOrder(series);
  const span = Math.max(series.times.length - 1, 1);
  const inversions =
    Math.max(0, peaks.pelvisIndex - peaks.thoraxIndex) +
    Math.max(0, peaks.thoraxIndex - peaks.armsIndex) +
    Math.max(0, peaks.armsIndex - peaks.clubIndex);
  return Math.max(0, 1 - inversions / span);
}

export function timingMilliseconds(series: SegmentVelocitySeries) {
  const peaks = peakOrder(series);
  return {
    pelvisToThorax: (series.times[peaks.thoraxIndex] ?? 0) - (series.times[peaks.pelvisIndex] ?? 0),
    thoraxToArms: (series.times[peaks.armsIndex] ?? 0) - (series.times[peaks.thoraxIndex] ?? 0),
    armsToClub: (series.times[peaks.clubIndex] ?? 0) - (series.times[peaks.armsIndex] ?? 0),
  };
}
