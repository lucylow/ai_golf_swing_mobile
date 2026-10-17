from __future__ import annotations
import random
from dataclasses import asdict
from .train_config import TrainConfig


def seed_everything(seed:int):
    random.seed(seed)
    try:
        import torch
        torch.manual_seed(seed)
        if torch.cuda.is_available(): torch.cuda.manual_seed_all(seed)
    except ImportError:
        pass


def build_training_plan(config:TrainConfig):
    seed_everything(config.seed)
    return {
        "sequence_length": config.sequence_length,
        "batch_size": config.batch_size,
        "epochs": config.epochs,
        "learning_rate": config.learning_rate,
        "synthetic_fraction": config.synthetic_ratio,
        "real_fraction": config.real_ratio,
        "subject_disjoint": config.require_subject_disjoint,
        "session_disjoint": config.require_session_disjoint,
    }
