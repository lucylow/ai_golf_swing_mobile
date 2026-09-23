import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { SESSION_TOKEN_KEY, USER_INFO_KEY } from "@/constants/oauth";
import { describeError } from "@/lib/safe-diagnostics";
import { reportAppError } from "@/lib/error-reporting";
import { parseStoredUserInfo, type StoredUser } from "@/lib/auth-user";

export type User = StoredUser;

function reportAuthFailure(operation: string, error: unknown) {
  reportAppError(`auth-${operation}`, error);
  if (__DEV__) console.error(`[Auth] ${operation} failed (${describeError(error)})`);
}

export async function getSessionToken(): Promise<string | null> {
  try {
    if (Platform.OS === "web") return null;
    return await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
  } catch (error) {
    reportAuthFailure("getSessionToken", error);
    return null;
  }
}

export async function setSessionToken(token: string): Promise<void> {
  try {
    if (Platform.OS === "web") return;
    await SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);
  } catch (error) {
    reportAuthFailure("setSessionToken", error);
    throw error;
  }
}

export async function removeSessionToken(): Promise<void> {
  try {
    if (Platform.OS === "web") return;
    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
  } catch (error) {
    reportAuthFailure("removeSessionToken", error);
  }
}

export async function getUserInfo(): Promise<User | null> {
  try {
    let info: string | null = null;
    if (Platform.OS === "web") {
      info = window.localStorage.getItem(USER_INFO_KEY);
    } else {
      info = await SecureStore.getItemAsync(USER_INFO_KEY);
    }

    if (!info) return null;
    return parseStoredUserInfo(info);
  } catch (error) {
    reportAuthFailure("getUserInfo", error);
    return null;
  }
}

export async function setUserInfo(user: User): Promise<void> {
  try {
    const serialized = JSON.stringify(user);
    if (Platform.OS === "web") {
      window.localStorage.setItem(USER_INFO_KEY, serialized);
      return;
    }
    await SecureStore.setItemAsync(USER_INFO_KEY, serialized);
  } catch (error) {
    reportAuthFailure("setUserInfo", error);
  }
}

export async function clearUserInfo(): Promise<void> {
  try {
    if (Platform.OS === "web") {
      window.localStorage.removeItem(USER_INFO_KEY);
      return;
    }
    await SecureStore.deleteItemAsync(USER_INFO_KEY);
  } catch (error) {
    reportAuthFailure("clearUserInfo", error);
  }
}
