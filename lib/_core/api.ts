import { Platform } from "react-native";
import { getApiBaseUrl } from "@/constants/oauth";
import * as Auth from "./auth";
import { describeError, describeRequest } from "@/lib/safe-diagnostics";
import { withTimeout } from "@/lib/request-timeout";
import { reportAppError } from "@/lib/error-reporting";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const API_REQUEST_TIMEOUT_MS = 15_000;

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const method = options.method || "GET";
  let hasToken = false;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (Platform.OS !== "web") {
      const sessionToken = await Auth.getSessionToken();
      hasToken = Boolean(sessionToken);
      if (sessionToken) headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    const baseUrl = getApiBaseUrl();
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = baseUrl ? `${cleanBaseUrl}${cleanEndpoint}` : endpoint;

    if (__DEV__) console.debug("[API] request", describeRequest(endpoint, method, hasToken));

    const response = await withTimeout(
      fetch(url, {
        ...options,
        headers,
        credentials: "include",
      }),
      API_REQUEST_TIMEOUT_MS,
      "API request timed out",
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = errorText;
      try {
        const errorJson = JSON.parse(errorText) as ApiResponse<unknown> & { message?: string };
        errorMessage = errorJson.error || errorJson.message || errorText;
      } catch {
        // Preserve the server's text for the thrown error, but never log it.
      }
      throw new Error(errorMessage || `API call failed: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as T;
  } catch (error) {
    const safeRequest = describeRequest(endpoint, method, hasToken);
    reportAppError("api-request", error);
    if (__DEV__) console.error(`[API] ${safeRequest.method} ${safeRequest.endpoint} failed (${describeError(error)})`);
    if (error instanceof Error) throw error;
    throw new Error("Unknown error occurred");
  }
}

export async function exchangeOAuthCode(
  code: string,
  state: string,
): Promise<{ sessionToken: string; user: any }> {
  const params = new URLSearchParams({ code, state });
  const endpoint = `/api/oauth/mobile?${params.toString()}`;
  const result = await apiCall<{ app_session_id: string; user: any }>(endpoint);

  return {
    sessionToken: result.app_session_id,
    user: result.user,
  };
}

export async function logout(): Promise<void> {
  await apiCall<void>("/api/auth/logout", {
    method: "POST",
  });
}

export async function getMe(): Promise<{
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  lastSignedIn: string;
} | null> {
  try {
    const result = await apiCall<{ user: any }>("/api/auth/me");
    return result.user || null;
  } catch (error) {
    reportAppError("auth-get-me", error);
    if (__DEV__) console.error(`[API] getMe failed (${describeError(error)})`);
    return null;
  }
}

export async function establishSession(token: string): Promise<boolean> {
  const endpoint = "/api/auth/session";
  try {
    const baseUrl = getApiBaseUrl();
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const url = `${cleanBaseUrl}${endpoint}`;
    const response = await withTimeout(
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
      API_REQUEST_TIMEOUT_MS,
      "Session request timed out",
    );

    if (!response.ok) {
      const failure = new Error(`Session establishment failed (${response.status})`);
      reportAppError("auth-session", failure);
      if (__DEV__) console.error(`[API] ${describeRequest(endpoint, "POST", true).endpoint} failed (${describeError(failure)})`);
      return false;
    }

    return true;
  } catch (error) {
    reportAppError("auth-session", error);
    if (__DEV__) console.error(`[API] ${describeRequest(endpoint, "POST", true).endpoint} failed (${describeError(error)})`);
    return false;
  }
}
