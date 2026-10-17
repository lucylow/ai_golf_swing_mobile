from __future__ import annotations
from dataclasses import dataclass
from hashlib import sha256

@dataclass(frozen=True)
class Sample:
    id: str
    subject: str
    device: str
    source: str

def stable_bucket(value: str, buckets: int = 1000) -> int:
    return int(sha256(value.encode()).hexdigest()[:8], 16) % buckets

def split(samples: list[Sample], train=0.75, val=0.10):
    subjects = sorted({s.subject for s in samples}, key=stable_bucket)
    n_train = int(len(subjects) * train)
    n_val = int(len(subjects) * val)
    train_ids = set(subjects[:n_train])
    val_ids = set(subjects[n_train:n_train+n_val])
    return (
        [s for s in samples if s.subject in train_ids],
        [s for s in samples if s.subject in val_ids],
        [s for s in samples if s.subject not in train_ids and s.subject not in val_ids],
    )
