"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deterministicSplit = deterministicSplit;
exports.groupAwareSplit = groupAwareSplit;
exports.detectSubjectLeakage = detectSubjectLeakage;
function deterministicSplit(id) { let h = 0; for (const c of id)
    h = (h * 31 + c.charCodeAt(0)) >>> 0; const p = h % 100; return p < 70 ? 'train' : p < 85 ? 'validation' : 'test'; }
function groupAwareSplit(ids) { return ids.reduce((a, id) => { var _a; (a[_a = deterministicSplit(id)] ?? (a[_a] = [])).push(id); return a; }, { train: [], validation: [], test: [] }); }
function detectSubjectLeakage(train, validation, test) {
    const a = new Set(train), b = new Set(validation), c = new Set(test), leaked = [];
    for (const id of a)
        if (b.has(id) || c.has(id))
            leaked.push(id);
    for (const id of b)
        if (c.has(id))
            leaked.push(id);
    return { leaked: [...new Set(leaked)], pass: leaked.length === 0 };
}
