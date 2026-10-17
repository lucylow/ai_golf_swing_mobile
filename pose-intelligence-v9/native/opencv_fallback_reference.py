"""Minimal OpenCV fallback contract.
Use this when a project-level native module supplies a lightweight landmark detector.
The fallback intentionally does not pretend OpenCV itself is a pose model; OpenCV is
used here for frame transforms / tracking primitives around a separately supplied model.
"""
import cv2
from dataclasses import dataclass

@dataclass
class FrameStats:
    width: int
    height: int
    mean_brightness: float


def inspect_frame(frame) -> FrameStats:
    h, w = frame.shape[:2]
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    return FrameStats(width=w, height=h, mean_brightness=float(gray.mean()))


def resize_for_inference(frame, width=640):
    h, w = frame.shape[:2]
    scale = width / max(w, 1)
    return cv2.resize(frame, (width, max(1, int(h * scale))))

