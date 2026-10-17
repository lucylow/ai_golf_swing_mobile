
from __future__ import annotations
from dataclasses import dataclass, asdict
import json, math, random
from pathlib import Path

@dataclass
class PoseFrame:
    t: float
    landmarks: list[tuple[float,float,float]]
    phase: str

PHASES=['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10']

def generate(seed:int=7, frames:int=180, noise:float=0.01)->list[PoseFrame]:
    rng=random.Random(seed); out=[]
    for i in range(frames):
        u=i/max(1,frames-1); phase=PHASES[min(9,int(u*10))]
        points=[]
        for j in range(33):
            a=2*math.pi*u + j*0.07
            x=0.45+0.12*math.sin(a)*(0.5+u)
            y=0.35+0.20*math.cos(a*0.8)+j*0.002
            z=0.10*math.sin(a*0.6)
            points.append((x+rng.gauss(0,noise),y+rng.gauss(0,noise),z+rng.gauss(0,noise)))
        out.append(PoseFrame(i/60.0,points,phase))
    return out

def write_json(path:Path, seed:int=7):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps([asdict(x) for x in generate(seed)],indent=2))

if __name__=='__main__':
    write_json(Path('synthetic_v14.json'))
