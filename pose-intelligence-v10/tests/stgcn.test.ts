import {assert} from './assert';
import {GOLF_GRAPH} from '../src/stgcn/graph';
import {zeros,graphConvolution} from '../src/stgcn/layer';
assert(GOLF_GRAPH.nodes===33);const x=zeros(4,33,2);x[0][11][0]=1;const y=graphConvolution(x,GOLF_GRAPH,{inChannels:2,outChannels:3,kernel:[[1,0,1],[0,1,1]]});assert(y.length===4&&y[0].length===33&&y[0][11].length===3);
