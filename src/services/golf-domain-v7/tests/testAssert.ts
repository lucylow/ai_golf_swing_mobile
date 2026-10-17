export const strict = {
  equal(actual: unknown, expected: unknown, message?: string) { if (actual !== expected) throw new Error(message ?? `Expected ${String(expected)}, received ${String(actual)}`); },
  ok(value: unknown, message?: string) { if (!value) throw new Error(message ?? 'Assertion failed'); },
};
