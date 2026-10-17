"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultModelAsset = void 0;
exports.validateAssetConfig = validateAssetConfig;
exports.defaultModelAsset = {
    id: 'mediapipe-pose-landmarker',
    assetPath: 'models/pose_landmarker.task',
    inputWidth: 640,
    inputHeight: 480,
    expectedLandmarks: 33,
    runtime: 'mediapipe',
};
function validateAssetConfig(asset) {
    const errors = [];
    if (!asset.id.trim())
        errors.push('missing_model_id');
    if (!asset.assetPath.trim())
        errors.push('missing_asset_path');
    if (asset.expectedLandmarks !== 33)
        errors.push('unexpected_landmark_count');
    if (asset.inputWidth < 128 || asset.inputHeight < 128)
        errors.push('input_resolution_too_small');
    return errors;
}
