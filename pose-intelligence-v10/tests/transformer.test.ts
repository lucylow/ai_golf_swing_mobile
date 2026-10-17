import {assert} from './assert';
import {causalMask,localWindowMask} from '../src/transformer/masking';
import {dotAttention,sinusoidalPosition} from '../src/transformer/attention';
assert(causalMask(4)[0][0]===true&&causalMask(4)[0][3]===false);assert(localWindowMask(5,1)[2][3]===true);assert(sinusoidalPosition(4,8).length===4);const o=dotAttention([[1,0]],[[1,0],[0,1]],[[1,2],[3,4]]);assert(o[0][0]>1);
