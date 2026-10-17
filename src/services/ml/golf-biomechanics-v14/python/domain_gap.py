
from __future__ import annotations
import statistics

def summarize(real, synthetic):
    def stat(xs):
        return {'mean':statistics.mean(xs) if xs else 0.0,'stdev':statistics.pstdev(xs) if len(xs)>1 else 0.0}
    r,s=stat(real),stat(synthetic)
    return {'mean_shift':r['mean']-s['mean'],'stdev_ratio':r['stdev']/max(s['stdev'],1e-9)}
