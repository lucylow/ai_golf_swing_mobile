"""V13 production-oriented training/data module.
Model weights are external; this file provides reproducible scaffolding and contracts.
"""
from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Any, Iterable, Sequence
import hashlib
import json
import math
import random


def clamp(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    if not math.isfinite(x):
        return lo
    return max(lo, min(hi, x))


def stable_hash(*parts: object) -> str:
    h = hashlib.sha256()
    for p in parts:
        h.update(str(p).encode())
        h.update(b"|")
    return h.hexdigest()[:16]


@dataclass(frozen=True)
class Record: 
    sample_id: str
    subject_id: str
    domain: str
    quality: float
    features: tuple[float, ...] = ()


def summarize(records: Sequence[Record]) -> dict[str, float]:
    if not records:
        return {"count": 0.0, "mean_quality": 0.0}
    return {"count": float(len(records)), "mean_quality": sum(r.quality for r in records) / len(records)}


def build_losses_artifact(records: Sequence[Record], seed: int = 105) -> dict[str, Any]:
    """Training losses."""
    rng = random.Random(seed)
    weighted = []
    for r in records:
        domain_weight = 0.65 if r.domain == "real" else 0.35
        noise = rng.uniform(-0.02, 0.02)
        weighted.append(clamp(r.quality * domain_weight + noise))
    return {
        "name": "losses",
        "count": len(records),
        "summary": summarize(records),
        "weighted_quality": sum(weighted) / len(weighted) if weighted else 0.0,
        "fingerprint": stable_hash("training/losses.py", len(records), seed),
    }


def validate_records(records: Iterable[Record]) -> list[str]:
    errors: list[str] = []
    seen: set[str] = set()
    for r in records:
        if not r.sample_id: errors.append("missing sample_id")
        if not r.subject_id: errors.append("missing subject_id")
        if r.sample_id in seen: errors.append(f"duplicate sample_id: {r.sample_id}")
        seen.add(r.sample_id)
        if not 0.0 <= r.quality <= 1.0: errors.append(f"quality out of range: {r.sample_id}")
    return errors


def write_manifest(path: str, records: Sequence[Record], extra: dict[str, Any] | None = None) -> None:
    payload = {"records": [asdict(r) for r in records], "summary": summarize(records), "extra": extra or {}}
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, sort_keys=True)
