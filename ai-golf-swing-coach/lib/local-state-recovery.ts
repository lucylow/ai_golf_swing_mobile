export function parseStoredJson<T>(
  value: string | null,
  fallback: T,
  normalize: (parsed: unknown) => T = (parsed) => parsed as T,
  onError?: (error: unknown) => void,
): T {
  if (!value) return fallback;
  try {
    return normalize(JSON.parse(value));
  } catch (error) {
    onError?.(error);
    return fallback;
  }
}
