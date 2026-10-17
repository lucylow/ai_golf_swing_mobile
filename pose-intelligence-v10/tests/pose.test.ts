import {assert,assertClose} from './assert';
import {generateSyntheticSwing} from '../src/data/syntheticSwing';
import {makeCanonicalFrame,xFactorDeg} from '../src/pose/kinematicFrames';
const frames=generateSyntheticSwing({frames:80,fps:120,noise:0.001,seed:7,earlyExtension:0.2,overTop:0.1});assert(frames.length===80);const k=makeCanonicalFrame(frames[40]);assert(k.localJoints.length===33);assertClose(k.scale>0?1:0,1,0.0001);
