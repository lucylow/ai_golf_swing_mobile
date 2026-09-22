export type SafeAreaInsetsPayload = { top: number; right: number; bottom: number; left: number };

export function isValidSafeAreaInsetsPayload(payload: unknown): payload is SafeAreaInsetsPayload {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as Record<string, unknown>;
  return (
    typeof candidate.top === "number" &&
    typeof candidate.right === "number" &&
    typeof candidate.bottom === "number" &&
    typeof candidate.left === "number"
  );
}

export function isSpacePreviewerMessage(value: unknown): value is {
  type: "SpacePreviewerChannel";
  payload: { type: string; from: "container" | "content"; to: "container" | "content"; payload: Record<string, unknown> };
} {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  const payload = candidate.payload;
  if (!payload || typeof payload !== "object") return false;
  const nested = payload as Record<string, unknown>;
  return candidate.type === "SpacePreviewerChannel" && nested.from === "container" && nested.to === "content" && typeof nested.type === "string";
}

export function describeRuntimeFailure(error: unknown): string {
  return error instanceof Error ? error.name : "UnknownError";
}

// Keep the exported pure helpers deterministic and free of platform dependencies for unit tests.
void describeRuntimeFailure;
