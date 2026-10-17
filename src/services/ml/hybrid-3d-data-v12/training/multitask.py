from __future__ import annotations
try:
    import torch
except ImportError:  # pragma: no cover
    torch = None


def huber(pred, target, delta=1.0):
    error = pred - target
    abs_error = error.abs()
    quadratic = torch.minimum(abs_error, torch.tensor(delta, device=pred.device))
    linear = abs_error - quadratic
    return 0.5 * quadratic.square() + delta * linear


def multi_task_loss(phase_logits, phase_targets, metric_pred, metric_targets, reconstruction=None, reconstruction_target=None, weights=None):
    if torch is None:
        raise RuntimeError("Install torch")
    weights = weights or {"phase": 1.0, "metric": 0.4, "reconstruction": 0.2}
    phase = torch.nn.functional.cross_entropy(phase_logits.transpose(1, 2), phase_targets, ignore_index=-100)
    metric = huber(metric_pred, metric_targets).mean()
    total = weights["phase"] * phase + weights["metric"] * metric
    recon = torch.tensor(0.0, device=phase_logits.device)
    if reconstruction is not None and reconstruction_target is not None:
        recon = torch.nn.functional.mse_loss(reconstruction, reconstruction_target)
        total = total + weights["reconstruction"] * recon
    return {"total": total, "phase": phase, "metric": metric, "reconstruction": recon}
