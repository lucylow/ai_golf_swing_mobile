"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineLinearCalibrator = void 0;
class OnlineLinearCalibrator {
    constructor() {
        this.n = 0;
        this.meanX = 0;
        this.meanY = 0;
        this.sxx = 0;
        this.sxy = 0;
    }
    update(x, y) { this.n++; const dx = x - this.meanX; this.meanX += dx / this.n; const dy = y - this.meanY; this.meanY += dy / this.n; this.sxx += dx * (x - this.meanX); this.sxy += dx * (y - this.meanY); }
    coefficients() { const scale = this.sxx > 1e-9 ? this.sxy / this.sxx : 1; return { intercept: this.meanY - scale * this.meanX, scale }; }
    count() { return this.n; }
}
exports.OnlineLinearCalibrator = OnlineLinearCalibrator;
