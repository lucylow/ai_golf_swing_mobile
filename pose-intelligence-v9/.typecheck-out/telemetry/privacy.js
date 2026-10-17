"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPrivacyPolicy = void 0;
exports.shouldStoreRawVideo = shouldStoreRawVideo;
exports.defaultPrivacyPolicy = { storeRawVideo: false, storeLandmarks: true, retainDays: 30, analyticsOptIn: false };
function shouldStoreRawVideo(policy) { return policy.storeRawVideo && policy.retainDays > 0; }
