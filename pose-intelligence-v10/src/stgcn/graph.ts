export type Graph={nodes:number;edges:[number,number][];adjacency:number[][];degree:number[]};
export const GOLF_SKELETON_EDGES:[number,number][]= [[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],[23,25],[25,27],[24,26],[26,28],[15,17],[15,19],[15,21],[16,18],[16,20],[16,22],[27,29],[27,31],[28,30],[28,32],[0,11],[0,12],[11,14],[12,13]];
export function buildGraph(nodes=33,edges=GOLF_SKELETON_EDGES):Graph{const A=Array.from({length:nodes},()=>Array(nodes).fill(0));edges.forEach(([a,b])=>{A[a][b]=1;A[b][a]=1});for(let i=0;i<nodes;i++)A[i][i]=1;const degree=A.map(r=>r.reduce((s,x)=>s+x,0));return{nodes,edges,adjacency:A,degree}}
export const GOLF_GRAPH=buildGraph();
export function normalizedAdjacency(g:Graph){return g.adjacency.map((row,i)=>row.map((v,j)=>v/Math.sqrt(g.degree[i]*g.degree[j]||1)));}
