from __future__ import annotations
try:
    import torch
    from torch import nn
except ImportError:  # pragma: no cover
    torch = None
    nn = object


class HybridGolfModel(nn.Module):
    """Compact multi-task model scaffold for mobile-oriented golf sequence learning.

    The implementation intentionally separates spatial pose encoding from temporal
    reasoning so the architecture can later be distilled or converted to Core ML.
    """
    def __init__(self, joints=33, channels=3, hidden=96, latent=64, classes=10, metrics=16):
        if torch is None:
            raise RuntimeError("Install torch to construct the training model")
        super().__init__()
        self.pose = nn.Sequential(
            nn.Linear(joints * channels, hidden), nn.LayerNorm(hidden), nn.GELU(),
            nn.Linear(hidden, hidden), nn.GELU()
        )
        encoder = nn.TransformerEncoderLayer(d_model=hidden, nhead=4, batch_first=True, norm_first=True)
        self.temporal = nn.TransformerEncoder(encoder, num_layers=3)
        self.latent = nn.Linear(hidden, latent)
        self.phase_head = nn.Linear(latent, classes)
        self.metric_head = nn.Linear(latent, metrics)
        self.reconstruction_head = nn.Linear(latent, joints * channels)

    def forward(self, x, padding_mask=None):
        # x: [B, T, J, C]
        b, t, j, c = x.shape
        z = self.pose(x.reshape(b, t, j * c))
        z = self.temporal(z, src_key_padding_mask=padding_mask)
        h = self.latent(z)
        phase_logits = self.phase_head(h)
        metric = self.metric_head(h.mean(dim=1))
        reconstruction = self.reconstruction_head(h)
        return {"latent":h, "phase_logits":phase_logits, "metrics":metric, "reconstruction":reconstruction}
