from __future__ import annotations
import statistics

def robust_bias(predicted,reference):
    residual=[r-p for p,r in zip(predicted,reference)]
    return statistics.median(residual) if residual else 0.0

def affine_fit(predicted,reference):
    if len(predicted)<2:return {'scale':1.0,'bias':0.0}
    xm=statistics.mean(predicted); ym=statistics.mean(reference)
    num=sum((x-xm)*(y-ym) for x,y in zip(predicted,reference))
    den=sum((x-xm)**2 for x in predicted) or 1e-9
    scale=num/den; bias=ym-scale*xm
    return {'scale':scale,'bias':bias}
