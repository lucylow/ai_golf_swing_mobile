import {assert} from './assert';
import {v10Engine} from '../src/V10Engine';
import {generateSyntheticSwing} from '../src/data/syntheticSwing';
const frames=generateSyntheticSwing({frames:96,fps:120,noise:0.002,seed:12,earlyExtension:0.3,overTop:0.2});const r=v10Engine.analyze(frames);assert(r.kinematics.length===96);assert(r.phaseFrames.length===96);assert(r.quality>0.5);assert(r.xFactorPeakDeg===Math.max(...r.kinematics.map(k=>k.xFactorDeg)));
