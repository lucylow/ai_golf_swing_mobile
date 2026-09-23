const SECRET_KEYS = /token|password|secret|authorization|cookie|refresh|id_token|access_token|api[_-]?key/i;
const PII_KEYS = /email|phone|address|name|dob|birth|deviceId|advertising/i;

export function redactKey(key: string, value: unknown): unknown {
  if (SECRET_KEYS.test(key)) return '[REDACTED]';
  if (PII_KEYS.test(key)) return '[PRIVATE]';
  if (typeof value === 'string' && value.length > 400) return `${value.slice(0, 200)}…[TRUNCATED]`;
  return value;
}

export function redact(value: unknown, depth = 0): unknown {
  if (depth > 5) return '[MAX_DEPTH]';
  if (value === null || value === undefined) return value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.slice(0, 50).map((item) => redact(item, depth + 1));
  if (value instanceof Error) return { name: value.name, message: value.message };
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = redactKey(key, redact(item, depth + 1));
    return out;
  }
  return String(value);
}

export function redactUrl(raw: string): string {
  try {
    const url = new URL(raw);
    for (const key of ['token', 'access_token', 'refresh_token', 'code', 'state']) url.searchParams.delete(key);
    return url.toString();
  } catch {
    return '[INVALID_URL]';
  }
}
