from __future__ import annotations
import os, random

def seed_everything(seed:int):
    os.environ['PYTHONHASHSEED']=str(seed)
    random.seed(seed)
    return seed
