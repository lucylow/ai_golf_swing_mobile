from dataclasses import dataclass

@dataclass
class TrainConfig:
    sequence_length:int=120
    landmarks:int=33
    channels:int=3
    hidden:int=96
    latent:int=64
    batch_size:int=16
    epochs:int=80
    learning_rate:float=2e-4
    weight_decay:float=1e-4
    amp:bool=True
    gradient_clip:float=1.0
    seed:int=73194
    synthetic_ratio:float=0.65
    real_ratio:float=0.35
    require_subject_disjoint:bool=True
    require_session_disjoint:bool=True
