import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {frameQuality,sequenceCoverage} from '../src/quality';
export function run(){assert(sequenceCoverage(makeFrames())>0.5,"coverage");}

