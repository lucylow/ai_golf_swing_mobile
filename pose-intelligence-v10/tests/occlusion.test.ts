import {assert} from './assert';
import {bridgeOcclusion} from '../src/tracking/occlusionRecovery';
const r=bridgeOcclusion({timestampMs:0,point:{x:0,y:0,z:0},confidence:1,occluded:false},{timestampMs:50,point:{x:1,y:1,z:1},confidence:1,occluded:false},{timestampMs:0,point:{x:0,y:0,z:0},confidence:1,occluded:false});assert(r.length>=1);assert(r[0].occluded===true);
