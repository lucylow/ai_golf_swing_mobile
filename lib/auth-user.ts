export type StoredUser = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  lastSignedIn: Date;
};

function nullableString(value: unknown): string | null {
  return value === null || typeof value === "string" ? value : null;
}

export function parseStoredUserInfo(serialized: string): StoredUser | null {
  try {
    const value: unknown = JSON.parse(serialized);
    if (!value || typeof value !== "object") return null;
    const record = value as Record<string, unknown>;
    const timestamp = new Date(String(record.lastSignedIn ?? ""));
    if (!Number.isFinite(record.id) || typeof record.openId !== "string" || !record.openId || Number.isNaN(timestamp.getTime())) return null;
    return {
      id: Number(record.id),
      openId: record.openId,
      name: nullableString(record.name),
      email: nullableString(record.email),
      loginMethod: nullableString(record.loginMethod),
      lastSignedIn: timestamp,
    };
  } catch {
    return null;
  }
}
