import { assert } from './assert';
import { makeFrames, makeFrame } from './fixture';
import { defaultMediaPipeOptionsV9, LiveStreamTimestampGuard, validateMediaPipeTimestamp } from '../src/mediapipeContract';
import { roiFromPose, acceptFallbackFrame } from '../src/opencvFallback';
import { validateAssetConfig, defaultModelAsset } from '../src/modelAssets';
import { FrameBudgetController } from '../src/frameBudget';
import { GolfPoseAlgorithmV9 } from '../src/algorithmV9';
import { runAllRules } from '../src/rules/runAll';
import { deterministicSplit, detectSubjectLeakage } from '../src/data/datasetSplits';
import { distributionShift } from '../src/eval/drift';
import { chooseQuantization } from '../src/runtime/quantization';
import { policyForClass } from '../src/runtime/devicePolicy';

export function run(): void {
  assert(defaultMediaPipeOptionsV9.runningMode === 'LIVE_STREAM', 'MediaPipe mode');
  assert(validateMediaPipeTimestamp(10, 20).valid, 'monotonic timestamp');
  assert(!validateMediaPipeTimestamp(20, 20).valid, 'duplicate timestamp rejected');
  const guard = new LiveStreamTimestampGuard();
  assert(guard.accept(10) && !guard.accept(10) && guard.accept(20), 'guard');
  const frame = makeFrame(0);
  const roi = roiFromPose(frame);
  assert(roi.width > 0 && roi.height > 0, 'roi');
  assert(acceptFallbackFrame(0.8, 0.8), 'fallback');
  assert(validateAssetConfig(defaultModelAsset).length === 0, 'model asset');
  const budget = new FrameBudgetController(30, 2);
  assert(budget.decide(frame, 0).accept, 'frame budget');
  const result = new GolfPoseAlgorithmV9().analyze(makeFrames(90));
  assert(result.features.length >= 10, 'advanced features');
  assert(result.events.length >= 4, 'advanced events');
  assert(runAllRules(makeFrames(90)).length >= 60, 'rule bank');
  assert(deterministicSplit('subject-a') === deterministicSplit('subject-a'), 'deterministic split');
  assert(detectSubjectLeakage(['a'], ['b'], ['c']).pass, 'split leakage');
  assert(distributionShift([1,1,1],[1,1,1]) === 0, 'drift baseline');
  assert(chooseQuantization('low').mode === 'int8', 'low device quantization');
  assert(policyForClass('high').targetFps === 30, 'high device policy');
}
