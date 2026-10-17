import {assert} from './assert';
import {makeFrames} from './fixture';
import {runAllRules} from '../src/rules/runAll';
import {deterministicSplit} from '../src/data/datasetSplits';
import {policyForClass} from '../src/runtime/devicePolicy';
export function run(){
  const frames=makeFrames(90);
  const rules=runAllRules(frames);
  assert(rules.length>20,'rule bank populated');
  const split=deterministicSplit('demo-subject-3');
  assert(split==='train'||split==='validation'||split==='test','split valid');
  const tiers = ['low','mid','high'] as const; const tier = tiers[frames.length % tiers.length]; const policy=policyForClass(tier);
  assert(policy.targetFps>=20 && policy.targetFps<=30,'runtime policy');
}

