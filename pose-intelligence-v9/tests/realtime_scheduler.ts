import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {FrameScheduler,LatencyMonitor} from '../src/realtime';
export function run(){const q=new FrameScheduler(2); q.push({runtime:"mock",timestampMs:1,landmarks:[],latencyMs:1,detectionConfidence:1,trackingConfidence:1}); assert(q.size()===1,"scheduler");}

