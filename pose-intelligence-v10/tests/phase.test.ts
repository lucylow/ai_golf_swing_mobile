import {assert,assertClose} from './assert';
import {pSystemClassify,P_STATES,tempoRatio} from '../src/phase/pSystem';
const f=pSystemClassify([0,0,0,0,0,0,4,0,0,0],7,500);assert(f.state==='P7');assertClose(f.confidence,Math.exp(4)/(Math.exp(4)+9),1e-6);assertClose(tempoRatio(0,900,1200),3,1e-6);assert(P_STATES.length===10);
