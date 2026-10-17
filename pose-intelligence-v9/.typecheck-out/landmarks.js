"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUIRED = exports.MP33 = void 0;
exports.get = get;
exports.requireLandmarks = requireLandmarks;
exports.torsoCenter = torsoCenter;
exports.bodyScale = bodyScale;
exports.MP33 = {
    NOSE: 0, LEFT_EYE_INNER: 1, LEFT_EYE: 2, LEFT_EYE_OUTER: 3, RIGHT_EYE_INNER: 4, RIGHT_EYE: 5, RIGHT_EYE_OUTER: 6,
    LEFT_EAR: 7, RIGHT_EAR: 8, MOUTH_LEFT: 9, MOUTH_RIGHT: 10, LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13, RIGHT_ELBOW: 14, LEFT_WRIST: 15, RIGHT_WRIST: 16, LEFT_PINKY: 17, RIGHT_PINKY: 18,
    LEFT_INDEX: 19, RIGHT_INDEX: 20, LEFT_THUMB: 21, RIGHT_THUMB: 22, LEFT_HIP: 23, RIGHT_HIP: 24,
    LEFT_KNEE: 25, RIGHT_KNEE: 26, LEFT_ANKLE: 27, RIGHT_ANKLE: 28, LEFT_HEEL: 29, RIGHT_HEEL: 30,
    LEFT_FOOT_INDEX: 31, RIGHT_FOOT_INDEX: 32,
};
exports.REQUIRED = [exports.MP33.NOSE, exports.MP33.LEFT_SHOULDER, exports.MP33.RIGHT_SHOULDER, exports.MP33.LEFT_ELBOW, exports.MP33.RIGHT_ELBOW,
    exports.MP33.LEFT_WRIST, exports.MP33.RIGHT_WRIST, exports.MP33.LEFT_HIP, exports.MP33.RIGHT_HIP, exports.MP33.LEFT_KNEE, exports.MP33.RIGHT_KNEE,
    exports.MP33.LEFT_ANKLE, exports.MP33.RIGHT_ANKLE];
function get(frame, id) { return frame.landmarks[id] ?? null; }
function requireLandmarks(frame, ids) { return ids.map(id => get(frame, id)).filter((v) => v !== null); }
function torsoCenter(frame) {
    const a = get(frame, exports.MP33.LEFT_SHOULDER), b = get(frame, exports.MP33.RIGHT_SHOULDER), c = get(frame, exports.MP33.LEFT_HIP), d = get(frame, exports.MP33.RIGHT_HIP);
    if (!a || !b || !c || !d)
        return null;
    return { x: (a.x + b.x + c.x + d.x) / 4, y: (a.y + b.y + c.y + d.y) / 4, z: (a.z + b.z + c.z + d.z) / 4 };
}
function bodyScale(frame) {
    const ls = get(frame, exports.MP33.LEFT_SHOULDER), rs = get(frame, exports.MP33.RIGHT_SHOULDER), lh = get(frame, exports.MP33.LEFT_HIP), rh = get(frame, exports.MP33.RIGHT_HIP);
    if (!ls || !rs || !lh || !rh)
        return 1;
    const shoulder = Math.hypot(ls.x - rs.x, ls.y - rs.y, ls.z - rs.z);
    const hip = Math.hypot(lh.x - rh.x, lh.y - rh.y, lh.z - rh.z);
    return Math.max((shoulder + hip) / 2, 0.01);
}
