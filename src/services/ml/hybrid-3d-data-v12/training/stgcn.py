from __future__ import annotations
try:
    import torch
    from torch import nn
except ImportError:  # pragma: no cover
    torch = None
    nn = object


class GraphConv(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, adjacency):
        super().__init__()
        if torch is None:
            raise RuntimeError("Install torch to train ST-GCN models")
        self.register_buffer("A", torch.tensor(adjacency, dtype=torch.float32))
        self.proj = nn.Conv2d(in_channels, out_channels, kernel_size=1)
        self.norm = nn.BatchNorm2d(out_channels)

    def forward(self, x):
        # x: [B, C, T, V]. Aggregate spatial neighbors, then project channels.
        x = torch.einsum("bctv,vu->bctu", x, self.A)
        return self.norm(self.proj(x))


class TemporalBlock(nn.Module):
    def __init__(self, channels: int, dilation: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(channels, channels, (5, 1), padding=(2 * dilation, 0), dilation=(dilation, 1)),
            nn.BatchNorm2d(channels), nn.GELU(),
            nn.Conv2d(channels, channels, (3, 1), padding=(dilation, 0), dilation=(dilation, 1)),
            nn.BatchNorm2d(channels),
        )

    def forward(self, x):
        return torch.nn.functional.gelu(x + self.net(x))


class STGCNEncoder(nn.Module):
    def __init__(self, in_channels: int, hidden: int, latent: int, adjacency):
        super().__init__()
        self.g1 = GraphConv(in_channels, hidden, adjacency)
        self.g2 = GraphConv(hidden, hidden, adjacency)
        self.temporal = nn.Sequential(TemporalBlock(hidden, 1), TemporalBlock(hidden, 2), TemporalBlock(hidden, 4))
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(hidden, latent)

    def forward(self, x):
        x = torch.nn.functional.gelu(self.g1(x))
        x = torch.nn.functional.gelu(self.g2(x))
        x = self.temporal(x)
        return self.fc(self.pool(x).flatten(1))
