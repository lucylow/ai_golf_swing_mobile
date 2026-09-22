export function describeError(error: unknown): string {
  if (error instanceof Error && error.name) return error.name;
  return "UnknownError";
}

function sanitizeEndpoint(endpoint: string): string {
  if (!endpoint) return "unknown";
  const withoutQuery = endpoint.split(/[?#]/, 1)[0];
  return withoutQuery.slice(0, 200) || "unknown";
}

export function describeRequest(endpoint: string, method = "GET", hasToken = false) {
  return { endpoint: sanitizeEndpoint(endpoint), method, hasToken };
}
