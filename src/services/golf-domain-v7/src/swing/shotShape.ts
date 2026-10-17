import { ShotInput, ShotShape } from '../types';
import { clamp } from '../math/statistics';

export type ShotShapeResult = {
  shape: ShotShape;
  startingDirectionDeg: number;
  curvatureDeg: number;
  severity: number;
  explanation: string;
};

function classifyStart(clubPath: number): 'start-left' | 'start-right' | 'start-neutral' {
  if (clubPath > 2.0) return 'start-right';
  if (clubPath < -2.0) return 'start-left';
  return 'start-neutral';
}

export function classifyShotShape(input: ShotInput): ShotShapeResult {
  const start = classifyStart(input.clubPathDeg + input.faceToPathDeg * 0.3);
  const curvature = input.faceToPathDeg;
  const severity = clamp(Math.abs(curvature) / 6 + Math.abs(input.clubPathDeg) / 12, 0, 1);
  let shape: ShotShape = 'straight';
  if (curvature > 5.5 && start === 'start-right') shape = 'push-fade';
  else if (curvature < -5.5 && start === 'start-left') shape = 'pull-draw';
  else if (curvature > 7) shape = 'slice';
  else if (curvature < -7) shape = 'hook';
  else if (start === 'start-right' && curvature >= -2) shape = 'push';
  else if (start === 'start-left' && curvature <= 2) shape = 'pull';
  else if (curvature > 2) shape = 'fade';
  else if (curvature < -2) shape = 'draw';
  if (Math.abs(input.clubPathDeg) > 7 && Math.abs(curvature) < 2) shape = input.clubPathDeg > 0 ? 'block' : 'pull';
  const explanation = `Start direction ${start.replace('start-', '')}; face-to-path ${input.faceToPathDeg.toFixed(1)}°. Typical shape classification: ${shape}.`;
  return { shape, startingDirectionDeg: input.clubPathDeg, curvatureDeg: curvature, severity, explanation };
}

