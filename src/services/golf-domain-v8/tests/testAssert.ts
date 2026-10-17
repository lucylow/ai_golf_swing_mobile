export function assert(condition: unknown, message: string): void { if (!condition) throw new Error(message); }
export function assertClose(actual: number, expected: number, tolerance: number, message: string): void { if (Math.abs(actual - expected) > tolerance) throw new Error(`${message}: ${actual} vs ${expected}`); }
