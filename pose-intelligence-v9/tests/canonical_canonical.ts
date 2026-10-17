import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {canonicalize} from '../src/canonical';
export function run(){const c=canonicalize(makeFrame(1)); assert(c.length===33,"canonical");}

