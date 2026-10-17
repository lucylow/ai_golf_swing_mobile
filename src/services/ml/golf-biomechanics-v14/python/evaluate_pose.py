
from __future__ import annotations
import math, json

def mpjpe(pred, truth):
    n=min(len(pred),len(truth));
    if n==0:return 0.0
    total=0.0; count=0
    for i in range(n):
        for a,b in zip(pred[i],truth[i]):
            total+=math.sqrt(sum((x-y)**2 for x,y in zip(a,b))); count+=1
    return total/max(1,count)

def phase_accuracy(pred,truth):
    n=min(len(pred),len(truth)); return sum(a==b for a,b in zip(pred[:n],truth[:n]))/max(1,n)

if __name__=='__main__': print(json.dumps({'mpjpe_contract':'implemented','phase_accuracy_contract':'implemented'}))
