import {assert,assertNear} from './assert';
import {makeFrame,makeFrames} from './fixture';
import {FrameScheduler,LatencyMonitor} from '../src/realtime';
export function run(){const m=new LatencyMonitor(); m.add(10); m.add(20); assert(m.p95()>=10,"latency");}

