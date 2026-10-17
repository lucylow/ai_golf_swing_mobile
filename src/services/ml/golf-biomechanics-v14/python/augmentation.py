from __future__ import annotations
import random

def perturb(sequence, seed=7, noise=0.005, drop_prob=0.02):
    rng=random.Random(seed)
    out=[]
    for frame in sequence:
        row=[]
        for p in frame:
            if rng.random() < drop_prob:
                row.append(None)
            else:
                row.append(tuple(v+rng.gauss(0, noise) for v in p))
        out.append(row)
    return out
