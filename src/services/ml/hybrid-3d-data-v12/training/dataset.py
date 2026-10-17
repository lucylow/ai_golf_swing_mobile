from __future__ import annotations
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

PHASES = [f"P{i}" for i in range(1, 11)]

@dataclass
class Sample:
    subject_id: str
    session_id: str
    swing_id: str
    phases: list[int]
    coordinates: list[list[list[float]]]


def load_jsonl(path: str | Path) -> list[dict]:
    p = Path(path)
    rows: list[dict] = []
    with p.open("r", encoding="utf-8") as fh:
        for line_no, line in enumerate(fh, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as exc:
                raise ValueError(f"Invalid JSONL at line {line_no}: {exc}") from exc
    return rows


def split_subject_disjoint(rows: list[dict], ratios=(0.8, 0.1, 0.1)):
    subjects = sorted({r["meta"]["subjectId"] for r in rows})
    n = len(subjects)
    a = int(n * ratios[0])
    b = a + int(n * ratios[1])
    train_subjects = set(subjects[:a])
    val_subjects = set(subjects[a:b])
    test_subjects = set(subjects[b:])
    return (
        [r for r in rows if r["meta"]["subjectId"] in train_subjects],
        [r for r in rows if r["meta"]["subjectId"] in val_subjects],
        [r for r in rows if r["meta"]["subjectId"] in test_subjects],
    )


def landmarks_to_tensor_rows(row: dict) -> list[list[list[float]]]:
    frames = row.get("frames", [])
    output: list[list[list[float]]] = []
    for frame in frames:
        coords = []
        for landmark in frame.get("landmarks", []):
            pos = landmark["position"]
            coords.append([float(pos["x"]), float(pos["y"]), float(pos["z"])])
        output.append(coords)
    return output
