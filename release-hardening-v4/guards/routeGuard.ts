import type { Href } from 'expo-router';
import { AppError } from '../core/AppError';
import { RELEASE_ERROR_CODES } from '../core/errorCodes';

const PUBLIC_ROUTES = new Set<string>(['/', '/onboarding', '/login', '/privacy', '/terms']);

export function guardRoute(href: Href, signedIn: boolean): Href {
  const path = String(href);
  if (signedIn || PUBLIC_ROUTES.has(path)) return href;
  throw new AppError({ code: RELEASE_ERROR_CODES.AUTH_REQUIRED, message: 'Route requires authentication.', userMessage: 'Sign in to continue.' });
}
