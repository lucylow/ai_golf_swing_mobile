import { LieV8, HoleModelV8, Vec2 } from './types';
import { expectedStrokesToFinish } from './expectedScore';
import { distance } from './geometry';
export type CourseStateV8 = { position: Vec2; lie: LieV8; strokes: number; };
export function stateValue(hole: HoleModelV8, state: CourseStateV8): number { return state.strokes + expectedStrokesToFinish(distance(state.position, hole.green.pin), state.lie); }
export function greenTargetValue(hole: HoleModelV8, point: Vec2): number { return expectedStrokesToFinish(distance(point, hole.green.pin), 'green'); }
