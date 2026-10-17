from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path
import json

@dataclass
class HybridRow:
    source: str
    subject_id: str
    session_id: str
    swing_id: str
    frames: list


def read_records(path: str|Path, source: str) -> list[HybridRow]:
    rows=[]
    with Path(path).open("r",encoding="utf-8") as fh:
        for line in fh:
            if not line.strip(): continue
            obj=json.loads(line)
            meta=obj.get("meta",{})
            rows.append(HybridRow(source,meta.get("subjectId","unknown"),meta.get("sessionId","unknown"),meta.get("swingId","unknown"),obj.get("frames",[])))
    return rows


def mix_sources(synthetic:list[HybridRow], real:list[HybridRow], synthetic_ratio:float=0.65)->list[HybridRow]:
    if not synthetic and not real: return []
    target_syn=round(len(synthetic)+len(real))*synthetic_ratio
    target_real=round(len(synthetic)+len(real))-target_syn
    return synthetic[:target_syn] + real[:target_real]
