"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeatureRecord = createFeatureRecord;
exports.isProductionSafe = isProductionSafe;
exports.partition = partition;
function createFeatureRecord(input) {
    return {
        sessionId: String(input.sessionId ?? 'unknown'),
        swingId: String(input.swingId ?? 'unknown'),
        featureName: String(input.featureName ?? 'unknown'),
        value: Number.isFinite(input.value ?? NaN) ? Number(input.value) : 0,
        normalizedValue: Number.isFinite(input.normalizedValue ?? NaN) ? Number(input.normalizedValue) : 0,
        confidence: Math.max(0, Math.min(1, Number(input.confidence ?? 0))),
        phase: String(input.phase ?? 'unknown'),
        source: String(input.source ?? 'pose'),
        modelVersion: String(input.modelVersion ?? 'v9'),
        createdAtMs: Number(input.createdAtMs ?? Date.now()),
    };
}
function isProductionSafe(record) {
    return record.confidence >= 0.45 && Number.isFinite(record.value) && Number.isFinite(record.normalizedValue);
}
function partition(records) {
    const safe = [];
    const review = [];
    for (const record of records)
        (isProductionSafe(record) ? safe : review).push(record);
    return { safe, review };
}
