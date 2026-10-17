from __future__ import annotations
try:
    import torch
    from torch import nn
except ImportError:  # pragma: no cover
    torch = None
    nn = object


class PhaseTransformer(nn.Module):
    def __init__(self, feature_dim: int, d_model: int = 128, heads: int = 4, layers: int = 3, classes: int = 10):
        super().__init__()
        if torch is None:
            raise RuntimeError("Install torch to train the transformer")
        self.input = nn.Linear(feature_dim, d_model)
        enc = nn.TransformerEncoderLayer(d_model=d_model, nhead=heads, batch_first=True, norm_first=True)
        self.encoder = nn.TransformerEncoder(enc, num_layers=layers)
        self.head = nn.Linear(d_model, classes)

    def forward(self, sequence, padding_mask=None):
        x = self.input(sequence)
        x = self.encoder(x, src_key_padding_mask=padding_mask)
        return self.head(x)
