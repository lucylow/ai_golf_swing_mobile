import { GolfBiomechanicsEngineV16 } from '../src/engine';
import { CameraCalibration, PoseFrame } from '../src/types';

function makeFrames(n = 180): PoseFrame[] {
  return Array.from({ length: n }, (_, i) => ({
    timestampMs: i * 33,
    landmarks: Array.from({ length: 33 }, (_, j) => ({
      index: j,
      x: Math.sin(i / 17 + j / 9) * 0.02 + (j % 4) * 0.008,
      y: 1.0 - Math.abs(j - 18) * 0.01 + Math.sin(i / 23) * 0.01,
      z: Math.cos(i / 19 + j / 13) * 0.03,
      visibility: 0.96,
    })),
  }));
}

const camera: CameraCalibration = {
  width: 1920, height: 1080,
  fx: 1400, fy: 1400, cx: 960, cy: 540,
  rollDeg: 0, pitchDeg: 0, yawDeg: 0,
};

const result = new GolfBiomechanicsEngineV16().analyze(makeFrames(), camera, 'right', 'consistency');
if (result.metrics.length < 15) throw new Error('expected expanded biomechanics metric set');
if (result.phases.length < 5) throw new Error('phase detector did not produce enough swing phases');
if (result.events.length < 2) throw new Error('event detector did not produce events');
if (!Number.isFinite(result.reliability.overall)) throw new Error('invalid reliability score');
if (!result.coaching && result.anomalies.length) throw new Error('anomaly-to-coaching bridge failed');
console.log('V16 smoke PASS', {
  metrics: result.metrics.length,
  phases: result.phases.length,
  events: result.events.length,
  anomalies: result.anomalies.length,
  reliability: result.reliability.overall.toFixed(3),
});
