import axios from 'axios';
import { applyAuthInterceptor } from './interceptor/auth.interceptor.js';
import { applyErrorInterceptor } from './interceptor/error.interceptor.js';
import { API_BASE_URL, API_TIMEOUT_MS, API_VERSION } from '@/constants';

export function createApiClient(options?: {
  getToken: () => string | null;
  onTokenRefresh: () => Promise<string>;
}) {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}${API_VERSION}`,
    timeout: API_TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  applyAuthInterceptor(instance, options);
  applyErrorInterceptor(instance);

  return instance;
}

export type ApiClient = ReturnType<typeof createApiClient>;
