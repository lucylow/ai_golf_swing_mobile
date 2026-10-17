from __future__ import annotations
from dataclasses import dataclass

@dataclass
class Candidate:
    swing_id:str
    confidence:float
    disagreement:float
    rarity:float

def priority(c:Candidate)->float:
    uncertainty=1-c.confidence
    return 0.45*uncertainty+0.35*c.disagreement+0.20*c.rarity

def select(candidates:list[Candidate],limit:int):
    return sorted(candidates,key=priority,reverse=True)[:limit]
