from __future__ import annotations
import json
from pathlib import Path
from dataclasses import dataclass, asdict

@dataclass
class MobileModelManifest:
    model_id:str
    task:str
    input_shape:list[int]
    output_names:list[str]
    precision:str
    quantization:str
    max_sequence_length:int
    min_ios_major:int
    benchmark_required:bool=True


def write_manifest(path:str|Path, manifest:MobileModelManifest)->None:
    Path(path).write_text(json.dumps(asdict(manifest), indent=2), encoding="utf-8")
