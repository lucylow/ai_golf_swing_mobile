import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {repairGaps} from '../src/gapRepair';
export function run(){const fs=makeFrames(10); fs[5].landmarks[0].confidence=0.01; const out=repairGaps(fs,3); assert(out[5].landmarks[0].confidence>0.01,"gap repair");}

