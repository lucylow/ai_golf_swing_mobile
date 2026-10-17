"""Reference implementation for validating the MediaPipe Pose Landmarker contract.
This is intentionally separate from the React Native bridge so the mobile project can
choose a native Tasks integration without coupling the TypeScript intelligence layer
through Python.
"""
from dataclasses import dataclass
from typing import List, Optional
import mediapipe as mp

@dataclass
class PosePoint:
    x: float
    y: float
    z: float
    visibility: float
    presence: float


def landmarks_from_result(result) -> List[PosePoint]:
    if not result.pose_landmarks:
        return []
    return [PosePoint(p.x, p.y, p.z, float(getattr(p, "visibility", 1.0)), float(getattr(p, "presence", 1.0)))
            for p in result.pose_landmarks[0]]


def create_video_landmarker(model_asset_path: str):
    options = mp.tasks.vision.PoseLandmarkerOptions(
        base_options=mp.tasks.BaseOptions(model_asset_path=model_asset_path),
        running_mode=mp.tasks.vision.RunningMode.VIDEO,
        num_poses=1,
        min_pose_detection_confidence=0.5,
        min_pose_presence_confidence=0.5,
        min_tracking_confidence=0.5,
        output_segmentation_masks=False,
    )
    return mp.tasks.vision.PoseLandmarker.create_from_options(options)

