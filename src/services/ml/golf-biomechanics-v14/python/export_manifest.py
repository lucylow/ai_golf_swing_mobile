from __future__ import annotations
import json
from pathlib import Path

def build(model_id,version,task,files,quantization='int8'):
    return {'model_id':model_id,'version':version,'task':task,'quantization':quantization,'files':[str(Path(f)) for f in files]}

def write(path,manifest):
    Path(path).write_text(json.dumps(manifest,indent=2))
