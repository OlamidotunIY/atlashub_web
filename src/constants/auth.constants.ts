export const ACCESS_TOKEN_EXPIRY_BUFFER_MS = 30000; // 30 seconds
export const AUTH_HEADER = 'Authorization';
export const BEARER_PREFIX = 'Bearer ';

export const AUTH_WEB_URL =
  (import.meta.env.VITE_AUTH_WEB_URL as string | undefined) ||
  (import.meta.env.PROD ? 'https://auth.atlashub.name.ng' : 'http://localhost:5174');
