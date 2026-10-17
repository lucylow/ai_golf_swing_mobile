import { clamp, safeDivide } from '../math/scalar';

type FilterConfig = { minCutoffHz: number; beta: number; dCutoffHz: number };

function alpha(cutoffHz: number, dt: number): number {
  if (!(dt > 0)) return 1;
  const tau = 1 / (2 * Math.PI * Math.max(0.0001, cutoffHz));
  return 1 / (1 + tau / dt);
}

export class OneEuroFilter {
  private previous?: number;
  private previousDerivative = 0;
  private previousTime?: number;
  private readonly cfg: FilterConfig;

  constructor(cfg: FilterConfig) {
    this.cfg = cfg;
  }

  reset(): void {
    this.previous = undefined;
    this.previousDerivative = 0;
    this.previousTime = undefined;
  }

  filter(value: number, timestampMs: number): number {
    if (!Number.isFinite(value)) return this.previous ?? 0;
    if (this.previous === undefined || this.previousTime === undefined) {
      this.previous = value;
      this.previousTime = timestampMs;
      return value;
    }
    const dt = Math.max(1e-4, (timestampMs - this.previousTime) / 1000);
    const derivative = safeDivide(value - this.previous, dt, 0);
    const dAlpha = alpha(this.cfg.dCutoffHz, dt);
    this.previousDerivative = this.previousDerivative + (dAlpha * (derivative - this.previousDerivative));
    const cutoff = Math.max(this.cfg.minCutoffHz, this.cfg.minCutoffHz + (this.cfg.beta * Math.abs(this.previousDerivative)));
    const a = alpha(cutoff, dt);
    const filtered = this.previous + (a * (value - this.previous));
    this.previous = filtered;
    this.previousTime = timestampMs;
    return filtered;
  }
}

export class AdaptiveOneEuro3D {
  private readonly x: OneEuroFilter;
  private readonly y: OneEuroFilter;
  private readonly z: OneEuroFilter;

  constructor(cfg: Omit<FilterConfig, 'dCutoffHz'> & { dCutoffHz?: number }) {
    const full = { dCutoffHz: cfg.dCutoffHz ?? 1, minCutoffHz: cfg.minCutoffHz, beta: cfg.beta };
    this.x = new OneEuroFilter(full);
    this.y = new OneEuroFilter(full);
    this.z = new OneEuroFilter(full);
  }

  filter(value: {x:number; y:number; z:number}, timestampMs: number): {x:number;y:number;z:number} {
    return {
      x: this.x.filter(clamp(value.x, -10, 10), timestampMs),
      y: this.y.filter(clamp(value.y, -10, 10), timestampMs),
      z: this.z.filter(clamp(value.z, -10, 10), timestampMs),
    };
  }
}
