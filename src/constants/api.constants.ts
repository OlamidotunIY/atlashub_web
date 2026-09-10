// Using @ts-ignore on import.meta to prevent TS errors in non-Vite environments (like Jest or pure Node)
export const API_BASE_URL =
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_BASE_URL) ||
  'http://localhost:8080/api/';

export const WS_BASE_URL =
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WS_BASE_URL) ||
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_WS_BASE_URL) ||
  'ws://localhost:3000/ws/';

export const API_TIMEOUT_MS = 10000; // 10 seconds
export const API_VERSION = 'v1';