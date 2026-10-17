import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {frameQuality,sequenceCoverage} from '../src/quality';
export function run(){assert(frameQuality(makeFrame(1))>0.5,"frame quality");}

