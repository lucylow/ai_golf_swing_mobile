from __future__ import annotations
import math

def mpjpe(pred, truth):
    total=0; count=0
    for a,b in zip(pred,truth):
        for pa,pb in zip(a,b):
            total += math.dist(pa,pb); count += 1
    return total/max(1,count)

def pck(pred,truth,threshold=.05):
    hits=0; count=0
    for a,b in zip(pred,truth):
        for pa,pb in zip(a,b):
            hits += math.dist(pa,pb) <= threshold; count += 1
    return hits/max(1,count)

def phase_f1(pred,truth,labels):
    scores=[]
    for label in labels:
        tp=sum(p==label and t==label for p,t in zip(pred,truth))
        fp=sum(p==label and t!=label for p,t in zip(pred,truth))
        fn=sum(p!=label and t==label for p,t in zip(pred,truth))
        precision=tp/max(1,tp+fp); recall=tp/max(1,tp+fn)
        scores.append(2*precision*recall/max(1e-9,precision+recall))
    return sum(scores)/max(1,len(scores))
